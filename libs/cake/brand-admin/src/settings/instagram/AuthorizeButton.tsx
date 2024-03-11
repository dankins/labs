import { getInstagramAuthorizeLink } from "@danklabs/cake/services/admin-service";
import { Button } from "@danklabs/pattern-library/core";
import Link from "next/link";

export function AuthorizeButton({ slug }: { slug: string }) {
  const link = getInstagramAuthorizeLink(slug);
  return (
    <Link href={link}>
      <Button>Connect Instagram Account</Button>
    </Link>
  );
}
