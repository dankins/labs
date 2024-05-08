import { LogoIcon } from "@danklabs/cake/pattern-library/core";
import classNames from "classnames";
import React from "react";

export function FoyerContainer({
  children,
  dark,
  displayLogo = true,
}: {
  children: React.ReactNode;
  dark?: boolean;
  displayLogo?: boolean;
}) {
  const className = classNames(
    "w-full h-full min-h-screen p-6 flex flex-col items-center",
    dark && "darkSection bg-[#3A262A] text-neutral-content"
  );
  return (
    <div className={className}>
      {displayLogo && <LogoIcon className="w-[100px] h-[28px] self-start" />}
      <div className="container max-w-[450px] flex flex-col items-center">
        {children}
      </div>
    </div>
  );
}
