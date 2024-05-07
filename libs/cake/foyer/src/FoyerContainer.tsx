import { LogoIcon } from "@danklabs/cake/pattern-library/core";
import classNames from "classnames";
import React from "react";

export function FoyerContainer({
  children,
  dark,
}: {
  children: React.ReactNode;
  dark?: boolean;
}) {
  const className = classNames(
    "w-full h-full min-h-screen p-6 flex flex-col items-center",
    dark && "darkSection bg-neutral text-neutral-content"
  );
  return <div className={className}>{children}</div>;
}
