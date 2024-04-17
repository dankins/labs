import Link from "next/link";
import { IconBaseProps } from "react-icons/lib";
import Image from "next/image";
import nav from "./AdminNav.module.scss";
import { NavLink } from "./NavLink";
import { UserSection } from "./UserSection";

export function AdminNav({
  subheading,
  children,
  switcher,
}: {
  subheading: string;
  children?: React.ReactNode;
  switcher?: React.ReactNode;
}) {
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
          <span className="text-sm text-secondary uppercase">{subheading}</span>
        </Link>
      </div>
      {switcher}
      <div className="grow flex flex-col">
        <nav className={nav.Nav}>{children}</nav>
      </div>
      <UserSection />
    </nav>
  );
}

export function NavItem({
  title,
  href,
  icon: Icon,
  match,
  children,
}: {
  title: string;
  href: string;
  icon: React.FC<IconBaseProps>;
  match: string[];
  children?: React.ReactNode;
}) {
  return (
    <>
      <NavLink
        href={href}
        match={match}
        linkInner={
          <>
            <Icon /> {title}
          </>
        }
      >
        {children ? <div>{children}</div> : undefined}
      </NavLink>
    </>
  );
}
