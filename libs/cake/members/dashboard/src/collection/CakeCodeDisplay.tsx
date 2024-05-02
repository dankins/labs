"use client";

import {
  Caption3,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@danklabs/pattern-library/core";
import { CopyButton } from "@danklabs/pattern-library/motion";
import { useState } from "react";
import Barcode from "react-barcode";

export function CakeCodeDisplay({ code }: { code?: string }) {
  const [expanded, setExpanded] = useState(false);
  if (!code) {
    return;
  }
  return (
    <div className="border-t border-b p-3 my-3 text-primary/50">
      <div className="w-full" onClick={() => setExpanded(!expanded)}>
        <div className="flex flex-row">
          <Caption3>Use cake code in store</Caption3>
          <span className="grow"></span>
          {expanded ? <ChevronDownIcon /> : <ChevronRightIcon />}
        </div>
        {expanded && (
          <div className="mt-6 mt-6 border-t border-t-[#EAE9E9]">
            <div className="w-72 overflow-hidden flex flex-col items-center justify-center">
              <div className="w-full h-auto">
                <Barcode
                  value={`${code}${code}`}
                  background="transparent"
                  displayValue={false}
                  width={2}
                />
              </div>
            </div>

            <div
              className="flex flex-row items-center"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <Caption3 className="grow normal-case">{code}</Caption3>
              <CopyButton as="secondary" text={code!}>
                Copy
              </CopyButton>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
