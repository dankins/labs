import { SanityImageType } from "@danklabs/cake/pattern-library/core";

export type Brand = {
  cms: {
    slug: string;
    name?: string | null;
    summary?: string | null;
    website?: string | null;
    passBackgroundDesktop: SanityImageType | null;
    passBackground: SanityImageType | null;
    passLogo: SanityImageType | null;
  };
};
