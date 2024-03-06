import { SettingsPage } from "@danklabs/cake/brand-admin";

export default function Page({ params }: { params: { slug: string } }) {
  return <SettingsPage slug={params.slug} />;
}
