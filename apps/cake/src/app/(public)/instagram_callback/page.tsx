import {
  DashboardPage,
  InstagramCallbackPage,
} from "@danklabs/cake/brand-admin";

export default function ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return <InstagramCallbackPage searchParams={searchParams} />;
}
