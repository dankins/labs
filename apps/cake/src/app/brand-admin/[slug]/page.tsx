import { DashboardPage } from "@danklabs/cake/brand-admin";

export default function ({ params }: { params: { slug: string } }) {
  return <DashboardPage slug={params.slug} />;
}
