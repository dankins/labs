import { LogoIcon } from "@danklabs/cake/pattern-library/core";
import React from "react";

export function FoyerContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-6 flex flex-col items-center">
      <LogoIcon className="self-start h-[36px] w-auto" />
      {children}
    </div>
  );
}
