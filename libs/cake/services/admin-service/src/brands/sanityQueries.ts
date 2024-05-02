import {
  makeSafeQueryRunner,
  q,
  sanityImage,
  Selection,
  TypeFromSelection,
} from "groqd";

export const brandSelection = {
  slug: q.slug("slug"),
  name: q.string().optional().nullable(),
  website: q.string().optional().nullable(),
  summary: q.string().optional().nullable(),
  passLogo: sanityImage("pass_logo", {
    withAsset: ["base", "dimensions"],
  }).nullable(),
  logoSquare: sanityImage("logo_square", {
    withAsset: ["base", "dimensions", "lqip"],
    withHotspot: true,
    withCrop: true,
  }).nullable(),
  passBackground: sanityImage("pass_background", {
    withAsset: ["base", "dimensions", "lqip"],
    withHotspot: true,
    withCrop: true,
  }).nullable(),
  passBackgroundDesktop: sanityImage("pass_background_desktop", {
    withAsset: ["base", "dimensions", "lqip"],
    withHotspot: true,
    withCrop: true,
  }).nullable(),
  featured: q.string().nullable(),
  products: q(`*[_type == "product" && references(^._id)]`, {
    isArray: true,
  }).grab({
    name: q.string(),
    pdpLink: q.string(),
    price: q.string().nullish(),
    image: sanityImage("image", {
      withAsset: ["base", "dimensions", "lqip"],
      withHotspot: true,
      withCrop: true,
    }),
  }),
  // https://www.sanity.io/plugins/color-input
  pass_color: q
    .object({
      hex: q.string(),
      rgb: q.object({
        r: q.number(),
        g: q.number(),
        b: q.number(),
      }),
    })
    .nullable(),
} satisfies Selection;

export type BrandSelection = TypeFromSelection<typeof brandSelection>;
