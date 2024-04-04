// import { auth } from "@clerk/nextjs/server";
// import { getBrandPassOffers } from "@danklabs/cake/services/admin-service";
// import { getBrandAdmin } from "@danklabs/cake/cms";
// import {
//   Button,
//   CopyIcon,
//   CopyIconWithText,
// } from "@danklabs/pattern-library/core";

// export async function BrandPass({ brandSlug }: { brandSlug: string }) {
//   const { userId } = auth().protect();
//   const [result, cmsData] = await Promise.all([
//     getBrandPassOffers(userId, brandSlug),
//     getBrandAdmin(brandSlug),
//   ]);

//   const pass = result[0].passes;
//   const brand = result[0].brands;
//   const offerCode = result[0].offer_codes;
//   const offers = result.filter((r) => r.offers !== null).map((r) => r.offers);
//   return (
//     <div>
//       <div>Pass: {brand.slug}</div>
//       <div>
//         {offers.map((o) => (
//           <OfferRow
//             offer={o!}
//             offerCode={offerCode}
//             brandWebsite={cmsData.website!}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// function OfferRow({
//   offer,
//   offerCode,
//   brandWebsite,
// }: {
//   offer: NonNullable<
//     Awaited<ReturnType<typeof getBrandPassOffers>>[0]["offers"]
//   >;
//   offerCode: Awaited<ReturnType<typeof getBrandPassOffers>>[0]["offer_codes"];
//   brandWebsite: string;
// }) {
//   return (
//     <div>
//       <div>Offer:</div>
//       {offerCode?.code && (
//         <div className="flex flex-row gap-3">
//           {offerCode.code} <CopyIconWithText text={offerCode.code} />{" "}
//           <a
//             href={`${brandWebsite}?discount=${offerCode.code}`}
//             target="_blank"
//           >
//             Start Shopping
//           </a>
//         </div>
//       )}
//     </div>
//   );
// }
