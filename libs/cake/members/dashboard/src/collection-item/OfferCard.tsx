"use client";

import {
  CakeCard,
  Currency,
  SecondaryButton,
} from "@danklabs/cake/pattern-library/core";
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
import { BaseCard } from "libs/cake/pattern-library/core/src/offers/BaseCard";
import dayjs from "dayjs";

export function OfferCard({
  offer,
  shopLinkTemplate,
}: {
  offer: MemberCollectionItemOffer;
  shopLinkTemplate?: string;
}) {
  // const [redeemMode, setRedeemMode] = useState(false);

  switch (offer.offerType) {
    case "voucher":
      return (
        <CakeCard
          shopLinkTemplate={shopLinkTemplate}
          code={offer.code!}
          amount={offer.offerValue}
          expiration={dayjs().add(1, "year").toDate()}
        />
      );
    default:
      return <BaseCard name={offer.name!} />;
  }
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
        <div className="w-72 overflow-hidden flex flex-col items-center justify-center">
          <div className="w-full h-auto">
            <Barcode
              value={`${offer.code}${offer.code}`}
              background="transparent"
              displayValue={false}
              width={2}
            />
          </div>
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
