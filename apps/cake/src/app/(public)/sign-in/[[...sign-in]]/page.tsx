import { SignInPage } from "@danklabs/cake/auth";

export default function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return <SignInPage searchParams={searchParams} />;
}
