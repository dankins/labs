import { Button } from "@danklabs/pattern-library/core";
import Link from "next/link";
import { buildInstagramAuthorizeUrl, buildRedirectUri } from "./utils";

export function AuthorizeButton({ slug }: { slug: string }) {
  const link = buildInstagramAuthorizeUrl(slug);

  return (
    <Link href={link}>
      <Button>Connect Instagram Account</Button>
    </Link>
  );
}
