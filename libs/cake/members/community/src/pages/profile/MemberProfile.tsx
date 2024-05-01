import {
  ActionButton,
  Heading4,
  LeftArrow,
  SecondaryButton,
} from "@danklabs/pattern-library/core";
import Link from "next/link";
import { addConnectionAction } from "../../actions";
import { Profile } from "@danklabs/cake/services/admin-service";

export async function MemberProfile({
  profile: profileInput,
}: {
  profile: Profile;
}) {
  const { profile, relationship } = profileInput;
  return (
    <div className="p-4">
      <div></div>
      <Link
        href="/community"
        className="mb-3 flex flex-row items-center gap-1 text-xs text-neutral-content/70 font-supreme"
      >
        <LeftArrow />
        <span className="">Back</span>
      </Link>
      <div className="flex flex-row">
        <Heading4 className="grow">{profile.username}</Heading4>
        {relationship === "you" && (
          <SecondaryButton size="sm" disabled>
            You
          </SecondaryButton>
        )}
        {relationship === "public" && (
          <ActionButton
            size="sm"
            action={addConnectionAction.bind(undefined, profile.username)}
          >
            Connect
          </ActionButton>
        )}
        {relationship === "followed" && (
          <ActionButton
            size="sm"
            action={addConnectionAction.bind(undefined, profile.username)}
            disabled
          >
            Request Sent
          </ActionButton>
        )}
        {relationship === "connected" && <div>Connected</div>}
      </div>
    </div>
  );
}
