import { LogoIcon, SecondaryButton } from "@danklabs/cake/pattern-library/core";
import classNames from "classnames";
import React from "react";

export function FoyerContainer({
  children,
  dark,
  displayLogo = true,
  checkoutShortcut = true,
}: {
  children: React.ReactNode;
  dark?: boolean;
  displayLogo?: boolean;
  checkoutShortcut?: boolean;
}) {
  const className = classNames(
    "w-full h-full min-h-screen p-6 flex flex-col items-center",
    dark && "darkSection bg-neutral text-neutral-content"
  );
  return (
    <div className={className}>
      {displayLogo && (
        <div className="w-full mb-6 flex flex-row items-center">
          <LogoIcon className="w-[100px] h-[28px] self-start fill-dark" />
          {checkoutShortcut && (
            <>
              <span className="grow"></span>
              <SecondaryButton
                size="sm"
                background="white"
                className="self-end"
                href="/invitation?step=checkout"
              >
                Accept Invite
              </SecondaryButton>
            </>
          )}
        </div>
      )}
      <div className="container max-w-[450px] flex flex-col items-center">
        {children}
      </div>
    </div>
  );
}
