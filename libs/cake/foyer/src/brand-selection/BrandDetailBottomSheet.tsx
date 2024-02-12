import { redirect } from "next/navigation";
import { getBrandAdmin } from "@danklabs/cake/cms";
import { BottomSheet } from "@danklabs/pattern-library/core";

export async function BrandDetailBottomSheet({ slug }: { slug?: string }) {
  if (!slug) {
    return <></>;
  }

  const detail = await getBrandAdmin(slug);

  async function handleClose() {
    "use server";
    redirect(`/invitation?step=brand_selection`);
  }

  return (
    <BottomSheet open={true} onClose={handleClose}>
      {JSON.stringify(detail)}
    </BottomSheet>
  );
}
