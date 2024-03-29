import { auth } from "@clerk/nextjs/server";
import { AdminSectionLayout } from "@danklabs/cake/admin";
import { superadmin } from "@danklabs/cake/services/admin-service";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!(await isSuperAdmin())) {
    return redirect("/");
  }
  return <AdminSectionLayout>{children}</AdminSectionLayout>;
}

async function isSuperAdmin() {
  const { userId } = auth().protect();

  const superAdmins = await superadmin.cachedGetSuperAdmins();
  return superAdmins.map((a) => a.iam).includes(userId);
}
