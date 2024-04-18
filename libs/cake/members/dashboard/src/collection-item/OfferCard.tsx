"use client";

import { Currency, SecondaryButton } from "@danklabs/cake/pattern-library/core";
import {
  CancelIcon,
  Caption3,
  GhostButton,
  Paragraph1,
  PrimaryButton,
} from "@danklabs/pattern-library/core";
import { FaInfoCircle } from "react-icons/fa";
import type { MemberCollectionItemOffer } from "@danklabs/cake/services/admin-service";
import { useState } from "react";
import Barcode from "react-barcode";
import { CopyButton } from "@danklabs/pattern-library/motion";
import classNames from "classnames";

export function OfferCard({
  offer,
  shopLinkTemplate,
}: {
  offer: MemberCollectionItemOffer;
  shopLinkTemplate?: string;
}) {
  const [redeemMode, setRedeemMode] = useState(false);

  return (
    <div
      className={classNames(
        "lightSection bg-[#FEFEFD] p-2 rounded-lg flex flex-col items-center justify-center",
        !redeemMode && "aspect-[293/178]"
      )}
    >
      <div className="flex flex-row w-full justify-end align-end">
        {redeemMode && (
          <GhostButton
            icon={<CancelIcon />}
            onClick={() => setRedeemMode(false)}
          />
        )}
      </div>
      <Currency className="text-dark" amount={offer.offerValue} size="5xl" />
      <Caption3 className="text-secondary uppercase">{offer.name}</Caption3>
      <Caption3 className="text-[#9D9C9B] uppercase text-xs">
        Valid until 4/20
      </Caption3>
      {offer.status === "redeemed" && (
        <SecondaryButton className="text-black" disabled>
          Redeemed
        </SecondaryButton>
      )}

      {offer.status !== "redeemed" && redeemMode === true && (
        <Redemption offer={offer} shopLinkTemplate={shopLinkTemplate} />
      )}

      {offer.status !== "redeemed" && redeemMode === false && (
        <SecondaryButton
          className="text-black"
          onClick={() => setRedeemMode(true)}
        >
          Redeem
        </SecondaryButton>
      )}
    </div>
  );
}

function Redemption({
  offer,
  shopLinkTemplate,
}: {
  offer: MemberCollectionItemOffer;
  shopLinkTemplate?: string;
}) {
  return (
    <div>
      <div className="mt-6 mx-10 flex flex-col gap-4 text-center">
        <Paragraph1>
          Automatically apply your Cake Card value on your next purchase using
          the link below.
        </Paragraph1>
        {shopLinkTemplate && shopLinkTemplate && (
          <PrimaryButton
            href={
              offer.code &&
              shopLinkTemplate.replace("{DISCOUNT_CODE}", offer.code)
            }
            target="_blank"
          >
            Shop &amp; Apply
          </PrimaryButton>
        )}
      </div>
      <div className="mt-6 mt-6 border-t border-t-[#EAE9E9]">
        <div className="w-full flex flex-col items-center justify-center overflow-x-hidden">
          {/* <Barcode
            value={offer.code!}
            background="transparent"
            displayValue={false}
            width={2}
          /> */}
        </div>
        <div className="flex flex-row items-center">
          <Caption3 className="grow">{offer.code}</Caption3>
          <CopyButton as="secondary" text={offer.code!}>
            Copy
          </CopyButton>
        </div>
      </div>
    </div>
  );
}
