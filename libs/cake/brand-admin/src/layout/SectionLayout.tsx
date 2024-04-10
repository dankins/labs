"use client";
import { AdminNav, NavItem } from "@danklabs/cake/pattern-library/core";
import {
  BrandIcon,
  HomeIcon,
  MembersIcon,
  OffersIcon,
  SettingsIcon,
  UserIcon,
} from "@danklabs/pattern-library/core";
import { useSelectedLayoutSegments } from "next/navigation";

export function SectionLayout({
  slug,
  children,
}: {
  slug: string;
  children?: React.ReactNode;
}) {
  const baseRoute = `/brand-admin/${slug}`;
  const segments = useSelectedLayoutSegments();

  return (
    <div className="flex flex-row">
      <AdminNav>
        <NavItem
          href={`${baseRoute}`}
          title="Home"
          icon={HomeIcon}
          activeSection={!segments[0]}
          activePage={!segments[0]}
        ></NavItem>
        <NavItem
          href={`${baseRoute}/members`}
          title="Members"
          icon={MembersIcon}
          activeSection={segments[0] === "members"}
          activePage={segments[0] === "members"}
        ></NavItem>
        <NavItem
          href={`${baseRoute}/settings`}
          title="Settings"
          icon={SettingsIcon}
          activeSection={segments[0] === "settings"}
          activePage={segments[0] === "settings"}
        ></NavItem>
      </AdminNav>
      <div className="px-4 grow">{children}</div>
    </div>
  );
}
