import Link from "next/link";
import { LogoIcon } from "../logos";
import React from "react";
import classNames from "classnames";
import { HamburgerIcon } from "@danklabs/pattern-library/core";

import styles from "./AppHeader.module.scss";
import { AppHeaderLink } from "./AppHeaderLink";
import { SignOut } from "./SignOut";

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
            <SignOut />
          </div>
        </nav>
      </div>
    </header>
  );
}
