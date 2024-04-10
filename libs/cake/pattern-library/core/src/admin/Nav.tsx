"use client";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { IconBaseProps } from "react-icons/lib";
import { useSelectedLayoutSegments } from "next/navigation";
import classNames from "classnames";
import Image from "next/image";

import { WalletIcon } from "@danklabs/cake/pattern-library/core";
import {
  BrandIcon,
  MembersIcon,
  OffersIcon,
  SettingsIcon,
  TicketIcon,
  UserIcon,
} from "@danklabs/pattern-library/core";
import nav from "./AdminNav.module.scss";

export function AdminNav({ children }: { children?: React.ReactNode }) {
  const segments = useSelectedLayoutSegments();

  return (
    <nav className="flex flex-col min-h-screen bg-[#f3ece6] min-w-[275px]">
      <div className="h-[100px]">
        <Link href="/admin" className="p-4 flex flex-col gap-2 text-white">
          <Image
            alt="Cake Logo"
            src="/images/logo.svg"
            className="w-[132px] h-[38px]"
            height={100}
            width={100}
          />
          <span className="text-sm text-secondary uppercase">admin</span>
        </Link>
      </div>
      <div className="grow flex flex-col">
        <nav className={nav.Nav}>{children}</nav>
      </div>
      <div className="p-4">
        <UserButton afterSignOutUrl={"/"} />
      </div>
    </nav>
  );
}

export function NavItem({
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
