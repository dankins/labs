import { BrandSettings } from "@danklabs/cake/db";
import { SanityImageType } from "@danklabs/cake/pattern-library/core";

export type Brand = {
  db: {
    id: string;
    slug: string;
    cmsId: string | null;
    status: "active" | "paused" | "draft" | "deactivated";
    settings: BrandSettings;
  };
  cms?: {
    slug: string;
    name?: string | null;
    summary?: string | null;
    website?: string | null;
    featured?: string | null;
    logoSquare: SanityImageType | null;
    passBackgroundDesktop: SanityImageType | null;
    passBackground: SanityImageType | null;
    passLogo: SanityImageType | null;
  };
};
