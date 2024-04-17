import { CopyIcon } from "@danklabs/pattern-library/core";
import { CopyButton } from "@danklabs/pattern-library/motion";
import { Suspense } from "react";

export function ShopifySettings({ slug }: { slug: string }) {
  return (
    <Suspense>
      <Component slug={slug} />
    </Suspense>
  );
}

async function Component({ slug }: { slug: string }) {
  const code = `analytics.subscribe("checkout_completed", event => {
    let isCakeDiscount = false;
    event.data.checkout.discountApplications.forEach(discount => {
      if(discount.title.toLowerCase().startsWith("cake")){
        isCakeDiscount = true;
      }
    })
  
    // only send the event if the discount is a cake discount
    if(isCakeDiscount){
      fetch('${process.env["NEXT_PUBLIC_SITE_URL"]}api/webhooks/shopify', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ${slug}|${process.env["SHOPIFY_COMMON_TOKEN"]}'
          },
          body: JSON.stringify(event),
      })
      .then(response => {
          if (!response.ok) {
              // Handle error
              console.error('Error sending checkout_completed event', response);
          } else {
              console.log('checkout_completed event sent successfully');
          }
      })
      .catch(error => {
          // Handle error
          console.error('Error sending checkout_completed event', error);
      });
    }
  });`;
  return (
    <div>
      <div className="bg-gray-100 m-4 p-6 rounded-sm">
        <pre className="text-xs text-gray-600 ">{code}</pre>
      </div>
      <div className="flex flex-row m-4 justify-end">
        <CopyButton text={code} icon={<CopyIcon />} size="sm">
          Copy Code
        </CopyButton>
      </div>
    </div>
  );
}
