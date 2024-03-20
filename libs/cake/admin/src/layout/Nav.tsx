"use client";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { WalletIcon } from "@danklabs/cake/pattern-library/core";
import { IconBaseProps } from "react-icons/lib";
import {
  BrandIcon,
  MembersIcon,
  OffersIcon,
  SettingsIcon,
  UserIcon,
} from "@danklabs/pattern-library/core";
import nav from "./Nav.module.scss";
import { useSelectedLayoutSegments } from "next/navigation";
import classNames from "classnames";
import Image from "next/image";

export function Nav() {
  const segments = useSelectedLayoutSegments();
  const isBrandDetail = segments[0] === "brands" && !!segments[1];

  return (
    <nav className="flex flex-col bg-white min-h-screen min-w-[275px] shadow-md">
      <div className="h-[64px] bg-black/80">
        <Link
          href="/admin"
          className="p-4 flex flex-row items-center gap-2 text-white"
        >
          <Image
            alt="Cake Logo"
            src="/images/logo.svg"
            className="w-[66px] h-[19px] invert"
            height={100}
            width={100}
          />
          <span className="text-xs">admin</span>
          <span className="grow" />
          <UserButton afterSignOutUrl={"/"} />
        </Link>
      </div>
      <div className="grow flex flex-col">
        <nav className={nav.Nav}>
          <NavItem
            href={"/admin/brands"}
            title="Brands"
            icon={WalletIcon}
            activeSection={segments[0] === "brands"}
            activePage={segments.length === 1 && segments[0] === "brands"}
          >
            {isBrandDetail && (
              <>
                <NavItem
                  href={`/admin/brands/${segments[1]}`}
                  title={segments[1]}
                  icon={BrandIcon}
                  activeSection={isBrandDetail}
                  activePage={segments.length === 2}
                >
                  <NavItem
                    href={`/admin/brands/${segments[1]}/offers`}
                    title="Offers"
                    icon={OffersIcon}
                    activeSection={segments[2] === "offers"}
                    activePage={segments[2] === "offers"}
                  />
                  <NavItem
                    href={`/admin/brands/${segments[1]}/members`}
                    title="Members"
                    icon={MembersIcon}
                    activeSection={segments[2] === "members"}
                    activePage={segments[2] === "members"}
                  />
                  <NavItem
                    href={`/admin/brands/${segments[1]}/settings`}
                    title="Settings"
                    icon={SettingsIcon}
                    activeSection={segments[2] === "settings"}
                    activePage={segments[2] === "settings"}
                  />
                </NavItem>
              </>
            )}
          </NavItem>
          <NavItem
            href="/admin/members"
            title="Members"
            icon={UserIcon}
            activeSection={segments[0] === "members"}
            activePage={segments.length === 1 && segments[0] === "members"}
          ></NavItem>
          <NavItem
            href="/admin/settings"
            title="Settings"
            icon={SettingsIcon}
            activeSection={segments[0] === "settings"}
            activePage={segments.length === 1 && segments[0] === "settings"}
          ></NavItem>
        </nav>
      </div>
      <div className="p-4"></div>
    </nav>
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
