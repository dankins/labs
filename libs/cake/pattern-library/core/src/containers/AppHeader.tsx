import Link from "next/link";
import { LogoIcon } from "../logos";
import React from "react";
import classNames from "classnames";
import { HamburgerIcon } from "@danklabs/pattern-library/core";

export function AppHeader({
  authComponent,
}: {
  authComponent?: React.ReactNode;
}) {
  return (
    <nav className="border-gray-200 dark:bg-gray-900">
      <div className="flex flex-wrap items-center gap-8 mx-auto p-4">
        <Link
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <LogoIcon />
          <span className="self-center text-3xl font-light whitespace-nowrap">
            Cake
          </span>
        </Link>
        <span className="grow md:hidden"></span>
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {authComponent}
          <button
            data-collapse-toggle="navbar-user"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-user"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <HamburgerIcon className="text-neutral-content text-xl" />
          </button>
        </div>
        <div
          className="grow items-start justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-user"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg  md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:text-neutral-content ">
            <NavLink href={"/passport"}>Passport</NavLink>
            <NavLink href={"/stories"}>Stories</NavLink>
            <NavLink href={"/brands"}>Brands</NavLink>
          </ul>
        </div>
      </div>
    </nav>
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
