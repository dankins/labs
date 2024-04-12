"use client";

import { Currency, SecondaryButton } from "@danklabs/cake/pattern-library/core";
import { Caption3, Paragraph1 } from "@danklabs/pattern-library/core";
import { FaInfoCircle } from "react-icons/fa";
import type { MemberCollectionItemOffer } from "@danklabs/cake/services/admin-service";
import { useState } from "react";
import Barcode from "react-barcode";
import { CopyButton } from "@danklabs/pattern-library/motion";

export function OfferCard({ offer }: { offer: MemberCollectionItemOffer }) {
  const [redeemMode, setRedeemMode] = useState(false);

  if (redeemMode) {
  }
  return (
    <div className="lightSection bg-[#FEFEFD] p-2 rounded-lg flex flex-col items-center justify-center">
      <div className="flex flex-row w-full justify-end align-end">
        <FaInfoCircle className="text-[#9D9C9B]" />
      </div>
      <Currency className="text-dark" amount={offer.offerValue} size="5xl" />
      <Caption3 className="text-secondary uppercase">{offer.name}</Caption3>
      <Caption3 className="text-[#9D9C9B] uppercase">Valid FIXME</Caption3>
      {offer.status === "redeemed" && (
        <SecondaryButton className="text-black" disabled>
          Redeemed
        </SecondaryButton>
      )}

      {offer.status !== "redeemed" && redeemMode === true && (
        <Redemption offer={offer} />
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

function Redemption({ offer }: { offer: MemberCollectionItemOffer }) {
  return (
    <div>
      <Paragraph1>
        Automatically apply your Cake Card value on your next purchase using the
        link below.
      </Paragraph1>
      <div>
        <SecondaryButton href="#">Shop &amp; Apply</SecondaryButton>
      </div>
      <div>
        <Barcode
          value={offer.code!}
          background="transparent"
          displayValue={false}
        />
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
