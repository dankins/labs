import Link from "next/link";
import { LogoIcon } from "../logos";
import React from "react";

import styles from "./AppHeader.module.scss";
import { AppHeaderLink } from "./AppHeaderLink";
import { SignOut } from "./SignOut";
import { Heading4 } from "../text";

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
          <Link href="/collection" className={styles.logo}>
            <LogoIcon />
          </Link>
          {/** Hamburger */}
          <label className={styles.hamburger} htmlFor="side-menu">
            <span className={styles.hamburgerLine}></span>
          </label>
        </div>

        {/** Menu */}
        <nav className={styles.nav}>
          <div className={styles.menu}>
            <AppHeaderLink href={"/collection"}>Collection</AppHeaderLink>
            <AppHeaderLink href={"/brands"}>The Brands</AppHeaderLink>
            <AppHeaderLink href={"/community"}>Community</AppHeaderLink>
            <AppHeaderLink href={"/account"}>Account</AppHeaderLink>
            <SignOut className={styles.signOut}>Sign Out</SignOut>
          </div>
        </nav>
      </div>
    </header>
  );
}
