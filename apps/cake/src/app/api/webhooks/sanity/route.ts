import { brands } from "@danklabs/cake/services/admin-service";
import { isValidSignature, SIGNATURE_HEADER_NAME } from "@sanity/webhook";
import { z } from "zod";

const webhookSecret = process.env["SANITY_WEBHOOK_SECRET"]!;
export async function POST(req: Request) {
  const signature = req.headers.get(SIGNATURE_HEADER_NAME);
  if (!signature) {
    console.log("signature header not present");
    return new Response("signature header not present", { status: 400 });
  }

  const body = await req.text();
  if (!(await isValidSignature(body, signature, webhookSecret))) {
    console.log("sanit webhook invalid signature", signature);
    return new Response("Invalid signature", { status: 401 });
  }

  try {
    const payload = JSON.parse(body);
    const data = z
      .object({
        _id: z.string(),
        _type: z.enum(["brand", "content", "faq", "orderRank", "page", "site"]),
        slug: z.object({
          current: z.string(),
        }),
      })
      .parse(payload);

    console.log("sanity webhook payload", data);

    switch (data._type) {
      case "brand":
        // handle brand webhook
        brands.clearBrandCache(data.slug.current);
        brands.clearGetBrandsCache();
        break;
      case "content":
        // handle content webhook
        break;
      case "faq":
        // handle faq webhook
        break;
      case "orderRank":
        // handle orderRank webhook
        break;
      case "page":
        // handle page webhook
        break;
      case "site":
        // handle site webhook
        break;
    }

    return new Response("handled event", {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  } catch (err) {
    console.log("sanity webhook error", err);
    return new Response("Invalid payload", { status: 400 });
  }
}
