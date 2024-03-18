import { TikTokCallbackPage } from "@danklabs/cake/brand-admin";

export default function ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return <TikTokCallbackPage searchParams={searchParams} />;
}
