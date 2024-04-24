"use client";

import { ChevronRightIcon, Heading4 } from "@danklabs/pattern-library/core";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FullMenu } from "./Menu";

export function MobileMenu() {
  const path = usePathname();

  if (path === "/account") {
    return (
      <div>
        <Heading4>Account</Heading4>
        <FullMenu />
      </div>
    );
  }

  let routeLabel = "";
  switch (path) {
    case "/account/profile":
      routeLabel = "Member Profile";
      break;
    case "/account/membership":
      routeLabel = "Manage Account";
      break;
    case "/account/invites":
      routeLabel = "Cake Invites";
      break;
    case "/account/favorites":
      routeLabel = "My Favorites";
      break;
    case "/account/notifications":
      routeLabel = "Notification Preferences";
      break;
    case "/account/faq":
      routeLabel = "FAQ";
      break;
    case "/account/support":
      routeLabel = "Support";
      break;
    case "/account/privacy-policy":
      routeLabel = "Privacy Policy";
      break;
    case "/account/terms-of-service":
      routeLabel = "Terms of Service";
      break;
  }
  return (
    <div className="mb-4 flex flex-row items-center gap-2 text-xs text-[#A2988E]">
      <Link href="/account">Account</Link>
      <ChevronRightIcon />
      <span>{routeLabel}</span>
    </div>
  );
}
