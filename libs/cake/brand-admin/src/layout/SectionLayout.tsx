import { AdminNav, NavItem } from "@danklabs/cake/pattern-library/core";
import {
  HomeIcon,
  MembersIcon,
  SettingsIcon,
} from "@danklabs/pattern-library/core";
import { BrandSwitcher } from "./BrandSwitcher";

export function SectionLayout({
  slug,
  children,
}: {
  slug: string;
  children?: React.ReactNode;
}) {
  const baseRoute = `/brand-admin/${slug}`;

  return (
    <div className="flex flex-row">
      <AdminNav
        subheading="manager"
        switcher={<BrandSwitcher currentBrand={slug} />}
      >
        <NavItem
          href={`${baseRoute}`}
          title="Home"
          icon={HomeIcon}
          match={[]}
        ></NavItem>
        <NavItem
          href={`${baseRoute}/members`}
          title="Members"
          icon={MembersIcon}
          match={["members"]}
        ></NavItem>
        <NavItem
          href={`${baseRoute}/settings`}
          title="Settings"
          icon={SettingsIcon}
          match={["settings"]}
        ></NavItem>
      </AdminNav>
      <div className="px-4 grow">{children}</div>
    </div>
  );
}
