"use client";
import Barcode from "react-barcode";

import { PrimaryButton } from "../buttons";
import { Paragraph1 } from "../text";
import { BaseCard } from "./BaseCard";
import {
  Caption3,
  CloseIcon,
  GhostButton,
  SecondaryButton,
} from "@danklabs/pattern-library/core";
import { CopyButton } from "@danklabs/pattern-library/motion";
import { useState } from "react";

export function CakeCard({
  amount,
  expiration,
  code,
  shopLinkTemplate,
}: {
  amount: number;
  code: string;
  expiration?: Date;
  shopLinkTemplate?: string;
}) {
  const [mode, setMode] = useState<"view" | "terms" | "redeem">("view");
  if (mode === "view") {
    return (
      <BaseCard
        name={"Cake Card"}
        amount={amount}
        expiration={expiration}
        button={
          <SecondaryButton
            size="sm"
            className="p-5"
            onClick={() => setMode("redeem")}
          >
            Redeem
          </SecondaryButton>
        }
      />
    );
  } else if (mode === "redeem") {
    return (
      <BaseCard
        name={"Cake Card"}
        size="expanded"
        amount={amount}
        expiration={expiration}
        topButton={
          <GhostButton icon={<CloseIcon />} onClick={() => setMode("view")} />
        }
        button={
          <ExpandedContent code={code} shopLinkTemplate={shopLinkTemplate} />
        }
      />
    );
  }
}

function ExpandedContent({
  code,
  shopLinkTemplate,
}: {
  code: string;
  shopLinkTemplate?: string;
}) {
  return (
    <div>
      <div className="mt-6 flex flex-col gap-4 text-center">
        <p className="text-[16px] text-[#FEFEFD] font-light">
          Automatically apply your Cake Card value on your next purchase using
          the link below.
        </p>
        {shopLinkTemplate && shopLinkTemplate && (
          <PrimaryButton
            href={code && shopLinkTemplate.replace("{DISCOUNT_CODE}", code)}
            target="_blank"
          >
            Shop &amp; Apply
          </PrimaryButton>
        )}
      </div>
      <div className="mt-6 border-t border-t-[#545251]">
        <div className="w-72 overflow-hidden flex flex-col items-center justify-center">
          <div className="w-full h-auto mt-2">
            <Barcode
              value={code}
              background="#fff"
              displayValue={false}
              width={2}
            />
          </div>
        </div>

        <div className="flex flex-row items-center">
          <Caption3 className="grow">{code}</Caption3>
          <CopyButton as="ghost" text={code!}>
            Copy
          </CopyButton>
        </div>
      </div>
    </div>
  );
}
