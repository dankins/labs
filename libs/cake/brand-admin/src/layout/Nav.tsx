"use client";
import Link from "next/link";
import { IconBaseProps } from "react-icons/lib";
import {
  BrandIcon,
  HomeIcon,
  MembersIcon,
  OffersIcon,
  SettingsIcon,
  UserIcon,
} from "@danklabs/pattern-library/core";
import nav from "./Nav.module.scss";
import { useSelectedLayoutSegments } from "next/navigation";
import classNames from "classnames";

export function Nav({ slug }: { slug: string }) {
  const baseRoute = `/brand-admin/${slug}`;
  const segments = useSelectedLayoutSegments();

  return (
    <div className={nav.Nav}>
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
    </div>
  );
}

function NavItem({
  title,
  href,
  icon: Icon,
  activeSection,
  activePage,
  children,
}: {
  title: string;
  href: string;
  icon: React.FC<IconBaseProps>;
  activeSection: boolean;
  activePage: boolean;
  children?: React.ReactNode;
}) {
  return (
    <>
      <Link
        href={href}
        className={classNames(
          nav.NavItem,
          activeSection && nav.activeSection,
          activePage && nav.activePage
        )}
      >
        <Icon /> {title}
      </Link>
      {children ? <div>{children}</div> : undefined}
    </>
  );
}
