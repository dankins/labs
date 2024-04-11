import { getInstagramAuthorizeLink } from "@danklabs/cake/services/admin-service";
import { PrimaryButton } from "@danklabs/pattern-library/core";
import Link from "next/link";

export function AuthorizeButton({ slug }: { slug: string }) {
  const link = getInstagramAuthorizeLink(slug);
  return (
    <Link href={link}>
      <PrimaryButton>Connect Instagram Account</PrimaryButton>
    </Link>
  );
}
