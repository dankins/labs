import type { getBrandAdmin } from "@danklabs/cake/cms";

export type CMSBrand = Awaited<ReturnType<typeof getBrandAdmin>>;
