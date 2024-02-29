import { getBrandAdmin } from "@danklabs/cake/cms";
import { db } from "@danklabs/cake/db";
import {
  Currency,
  LogoSpace,
  SectionHeading,
  WalletCard,
} from "@danklabs/cake/pattern-library/core";
import {
  createBrandPass,
  getMemberByIAM,
} from "@danklabs/cake/services/admin-service";
import { SanityImage } from "@danklabs/cake/pattern-library/core";
import { revalidatePath } from "next/cache";
import { Suspense, useMemo } from "react";
import { SelectPassButton } from "./SelectPassButton";
import { auth } from "@clerk/nextjs";
import {
  AddIcon,
  ChevronRightIcon,
  OutlineButton,
} from "@danklabs/pattern-library/core";
import { AddPassActionBar } from "./AddPassActionBar";
import { BrandContent } from "./BrandContent";

export async function BrandPage({ slug }: { slug: string }) {
  return (
    <Suspense fallback={<Loading />}>
      <BrandContent slug={slug} />
    </Suspense>
  );
}

function Loading() {
  return <div>loading</div>;
}
