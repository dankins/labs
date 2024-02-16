import Link from "next/link";
import { LogoIcon } from "../logos";
import React from "react";
import classNames from "classnames";
import { HamburgerIcon } from "@danklabs/pattern-library/core";

import styles from "./AppHeader.module.scss";
import { AppHeaderLink } from "./AppHeaderLink";

export function AppHeader({
  authComponent,
}: {
  authComponent?: React.ReactNode;
}) {
  return (
    <header className={styles.AppHeader}>
      <input className={styles.sideMenu} type="checkbox" id="side-menu" />
      <div>
        {/** container */}
        <div className={styles.navContainer}>
          {/** LOGO */}
          <Link href="/" className={styles.logo}>
            <LogoIcon />
            <span>Cake</span>
          </Link>
          {/** Hamburger */}
          <label className={styles.hamburger} htmlFor="side-menu">
            <span className={styles.hamburgerLine}></span>
          </label>
        </div>

        {/** Menu */}
        <nav className={styles.nav}>
          <div className={styles.menu}>
            <AppHeaderLink href={"/passport"}>Collection</AppHeaderLink>
            <AppHeaderLink href={"/brands"}>The Brands</AppHeaderLink>
            <AppHeaderLink href={"/stories"}>Cake Stories</AppHeaderLink>
            <AppHeaderLink href={"/account"}>Account</AppHeaderLink>
            <AppHeaderLink href={"/account"} className={styles.signOut}>
              Sign Out
            </AppHeaderLink>
          </div>
        </nav>
      </div>
    </header>
  );
}

function NavLink({
  children,
  href,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const classes = classNames(
    // "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
    // "block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
    "block py-2 px-3 text-neutral-content rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0"
  );
  return (
    <li>
      <Link href={href} className={classes} aria-current="page">
        {children}
      </Link>
    </li>
  );
}
