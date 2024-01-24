import {
  Centered,
  PageContent,
  PageWithNavbar,
} from "@danklabs/pattern-library/core";
import Link from "next/link";

export function LoggedOutPage() {
  return (
    <PageWithNavbar navbar={<Nav />}>
      <Centered>Member's Only!</Centered>
    </PageWithNavbar>
  );
}

function Nav() {
  return (
    <div className="flex flex-row justify-end p-4">
      <Link prefetch={false} href="/sign-in">
        Member Login
      </Link>
    </div>
  );
}
