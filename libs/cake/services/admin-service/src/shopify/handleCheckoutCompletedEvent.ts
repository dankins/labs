import {
  db,
  offerCodes,
  offers,
  members as membersModel,
  passes,
} from "@danklabs/cake/db";
import { trackShopifyRawCheckoutCompletedEvent } from "@danklabs/cake/events";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { members } from "../members";

export async function handleCheckoutCompletedEvent(
  brandSlug: string,
  event: any
) {
  console.log("handleCheckoutCompletedEvent", brandSlug, event);
  await trackShopifyRawCheckoutCompletedEvent(brandSlug, event);

  const parsed = shopifyCheckoutCompleteSchema.parse(event);

  // find the discount code that was used that starts with "CAKE"
  const discountCode = parsed.data?.checkout?.discountApplications
    ?.map((discount) => discount.title)
    ?.find((code) => code?.startsWith("CAKE") || code?.startsWith("cake"));

  if (!discountCode) {
    console.log("No discount code found", parsed);
    return;
  }

  const code = await db.query.offerCodes.findFirst({
    where: eq(offerCodes.code, discountCode),
    with: {
      offer: {
        with: {
          pass: {
            with: {
              passport: {
                with: {
                  member: true,
                },
              },
            },
          },
        },
      },
    },
  });

  if (!code) {
    console.error("No offer code found", discountCode);
    return;
  }
  if (!code.offerId) {
    console.error("No offer related with this offer code", code);
    return;
  }

  console.log("found code related to shopify event", code);

  const orderId = parsed.data?.checkout?.order?.id;
  if (!orderId) {
    console.error("Could not extract order ID from shopify event", parsed);
    return;
  }
  const timestamp = parsed.timestamp;
  if (!timestamp) {
    console.error("Could not extract timestamp from shopify event", parsed);
    return;
  }
  // update the offer with the order id and redemption date
  await db
    .update(offers)
    .set({
      orderId,
      redemptionDate: new Date(timestamp),
      status: "redeemed",
      updatedAt: new Date(),
    })
    .where(eq(offers.id, code.offerId));

  const member = code.offer?.pass?.passport?.member;
  if (member) {
    // clear get member cache
    members.member.clearCache(member.iam);
  }
}

/* SAMPLE EVENT
{"id":"sh-c8d47077-FA63-4589-3BFE-19E69E7E2430","name":"checkout_completed","data":{"checkout":{"attributes":[],"billingAddress":{"address1":"52 Cushing Road","city":"Milton","country":"US","countryCode":"US","firstName":"dan","lastName":"kinsley","province":"MA","provinceCode":"MA","zip":"02186"},"token":"688cbb44effb6dfd1992322219e12a1b","currencyCode":"USD","discountApplications":[{"allocationMethod":"ACROSS","targetSelection":"ALL","targetType":"LINE_ITEM","title":"CAKEB9WK-NS","type":"code","value":{"amount":100,"currencyCode":"XXX"}}],"email":"kinsleyd@gmail.com","lineItems":[{"discountAllocations":[{"amount":{"amount":1,"currencyCode":"USD"},"discountApplication":{"allocationMethod":"ACROSS","targetSelection":"ALL","targetType":"LINE_ITEM","title":"CAKEB9WK-NS","type":"code","value":{"amount":100,"currencyCode":"XXX"}}}],"id":"40992238436430","quantity":1,"title":"Literally Nothing","variant":{"id":"40992238436430","image":{},"price":{"amount":1,"currencyCode":"USD"},"product":{"id":"7122210783310","title":"Literally Nothing","vendor":"Cake Shop","type":"","untranslatedTitle":"Literally Nothing","url":"/products/literally-nothing"},"untranslatedTitle":""}}],"order":{"customer":{"id":"6816454410318"},"id":"5183136301134"},"shippingAddress":{},"subtotalPrice":{"amount":1,"currencyCode":"USD"},"shippingLine":{"price":{}},"totalTax":{"amount":0,"currencyCode":"USD"},"totalPrice":{"amount":0,"currencyCode":"USD"},"transactions":[]}},"type":"standard","clientId":"6fa5691b-d9ba-4015-80d2-d791a325ea4c","timestamp":"2024-04-10T16:25:26.193Z","context":{"document":{"location":{"href":"https://cakemembers.myshopify.com/checkouts/bin/55d367df974d8f1fb3008c1a4ff7c530/thank-you","hash":"","host":"cakemembers.myshopify.com","hostname":"cakemembers.myshopify.com","origin":"https://cakemembers.myshopify.com","pathname":"/checkouts/bin/55d367df974d8f1fb3008c1a4ff7c530/thank-you","port":"","protocol":"https:","search":""},"referrer":"https://cakemembers.myshopify.com/products/literally-nothing","characterSet":"UTF-8","title":"Checkout - Cake Shop"},"navigator":{"language":"en-US","cookieEnabled":true,"languages":["en-US","en"],"userAgent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36"},"window":{"innerHeight":1328,"innerWidth":1933,"outerHeight":1380,"outerWidth":1953,"pageXOffset":0,"pageYOffset":0,"location":{"href":"https://cakemembers.myshopify.com/checkouts/bin/55d367df974d8f1fb3008c1a4ff7c530/thank-you","hash":"","host":"cakemembers.myshopify.com","hostname":"cakemembers.myshopify.com","origin":"https://cakemembers.myshopify.com","pathname":"/checkouts/bin/55d367df974d8f1fb3008c1a4ff7c530/thank-you","port":"","protocol":"https:","search":""},"origin":"https://cakemembers.myshopify.com","screen":{"height":1600,"width":3840},"screenX":1748,"screenY":104,"scrollX":0,"scrollY":0}}}
*/

const shopifyCheckoutCompleteSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  timestamp: z.string().optional(),
  data: z
    .object({
      checkout: z
        .object({
          attributes: z.array(z.any()).optional(),
          billingAddress: z
            .object({
              address1: z.string().optional(),
              address2: z.string().optional(),
              city: z.string().optional(),
              country: z.string().optional(),
              countryCode: z.string().optional(),
              firstName: z.string().optional(),
              lastName: z.string().optional(),
              province: z.string().optional(),
              provinceCode: z.string().optional(),
              zip: z.string().optional(),
            })
            .optional(),
          token: z.string().optional(),
          currencyCode: z.string().optional(),
          discountApplications: z
            .array(
              z.object({
                allocationMethod: z.string().optional(),
                targetSelection: z.string().optional(),
                targetType: z.string().optional(),
                title: z.string().optional(),
                type: z.string().optional(),
                value: z
                  .object({
                    amount: z.number().optional(),
                    currencyCode: z.string().optional(),
                  })
                  .optional(),
              })
            )
            .optional(),
          email: z.string().optional(),
          lineItems: z
            .array(
              z.object({
                discountAllocations: z
                  .array(
                    z.object({
                      amount: z
                        .object({
                          amount: z.number().optional(),
                          currencyCode: z.string().optional(),
                        })
                        .optional(),
                      discountApplication: z
                        .object({
                          allocationMethod: z.string().optional(),
                          targetSelection: z.string().optional(),
                          targetType: z.string().optional(),
                          title: z.string().optional(),
                          type: z.string().optional(),
                          value: z
                            .object({
                              amount: z.number().optional(),
                              currencyCode: z.string().optional(),
                            })
                            .optional(),
                        })
                        .optional(),
                    })
                  )
                  .optional(),
                id: z.string().optional(),
                quantity: z.number().optional(),
                title: z.string().optional(),
                variant: z
                  .object({
                    id: z.string().optional(),
                    image: z.any().optional(),
                    price: z
                      .object({
                        amount: z.number().optional(),
                        currencyCode: z.string().optional(),
                      })
                      .optional(),
                    product: z
                      .object({
                        id: z.string().optional(),
                        title: z.string().optional(),
                        vendor: z.string().optional(),
                        type: z.string().optional(),
                        untranslatedTitle: z.string().optional(),
                        url: z.string().optional(),
                      })
                      .optional(),
                    untranslatedTitle: z.string().optional(),
                  })
                  .optional(),
              })
            )
            .optional(),
          order: z
            .object({
              customer: z
                .object({
                  id: z.string().optional(),
                })
                .optional(),
              id: z.string().optional(),
            })
            .optional(),
          shippingAddress: z.object({}).optional(),
          subtotalPrice: z
            .object({
              amount: z.number().optional(),
              currencyCode: z.string().optional(),
            })
            .optional(),
          shippingLine: z
            .object({
              price: z.object({}).optional(),
            })
            .optional(),
          totalTax: z
            .object({
              amount: z.number().optional(),
              currencyCode: z.string().optional(),
            })
            .optional(),
          totalPrice: z
            .object({
              amount: z.number().optional(),
              currencyCode: z.string().optional(),
            })
            .optional(),
          transactions: z.array(z.any()).optional(),
        })
        .optional(),
    })
    .optional(),
});

type CheckoutCompleteSchemaType = {
  id: string;
  name: string;
  timestamp: string;
  data: {
    checkout: {
      discountApplications: {
        title: string;
        type: string;
        value: {
          amount: number;
          currencyCode: string;
        };
      }[];
      lineItems: {
        id: string;
        quantity: number;
        title: string;
        variant: {
          id: string;
          image: any;
          price: {
            amount: number;
            currencyCode: string;
          };
          product: {
            id: string;
            title: string;
            vendor: string;
            type: string;
            untranslatedTitle: string;
            url: string;
          };
          untranslatedTitle: string;
        };
      }[];
    };
  };
};
