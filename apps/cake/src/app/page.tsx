import classNames from "classnames";
import { auth } from "@clerk/nextjs/server";
import { PageView } from "@danklabs/cake/events";
import { Heading3, LogoLarge } from "@danklabs/cake/pattern-library/core";
import Link from "next/link";
import {
  PrimaryButton,
  RightArrow,
  SecondaryButton,
} from "@danklabs/pattern-library/core";

export default function Page() {
  const { userId: iam } = auth();
  return (
    <div className="min-h-screen flex flex-col">
      <PageView tags={[]} />
      <div className="p-4 flex flex-row justify-end items-center text-neutral-content/70"></div>
      <div className="w-full p-4 grow text-dark flex flex-col items-center justify-center">
        <div
          className={classNames("flex flex-col items-center gap-6 container")}
        >
          <div className="max-w-[570px] w-full">
            <LogoLarge className="w-full fill-dark" />
          </div>
          <Heading3>Shopping is about to get sweeter.</Heading3>
          <div className="mt-[40px]">
            {!!iam ? (
              <PrimaryButton
                href={`/collection`}
                icon={<RightArrow />}
                iconPosition="right"
              >
                Continue to Collection
              </PrimaryButton>
            ) : (
              <PrimaryButton href={`/sign-in`}>Member Sign In</PrimaryButton>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
