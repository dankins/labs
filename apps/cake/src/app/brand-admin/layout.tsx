import { auth } from "@clerk/nextjs/server";
import { cachedGetBrandAdminOptions } from "@danklabs/cake/services/admin-service";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = auth().protect();

  const brands = await cachedGetBrandAdminOptions(userId);
  if (brands.length < 1) {
    redirect("/");
  }

  return <>{children}</>;
}
