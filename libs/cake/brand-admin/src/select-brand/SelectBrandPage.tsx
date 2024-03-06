import { auth } from "@clerk/nextjs";
import { cachedGetBrandAdminOptions } from "@danklabs/cake/services/admin-service";
import { redirect } from "next/navigation";

export async function SelectBrandPage() {
  const { userId } = auth();
  const brands = await cachedGetBrandAdminOptions(userId!);
  if (brands.length < 1) {
    throw new Error("not brand admin");
  } else if (brands.length === 1) {
    redirect(`/brand-admin/${brands[0]}`);
  }

  return <div>brand admin</div>;
}
