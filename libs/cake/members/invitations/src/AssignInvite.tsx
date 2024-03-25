import {
  Paragraph1,
  PrimaryButton,
  TextInput,
  UserIcon,
} from "@danklabs/pattern-library/core";
import { MotionDiv } from "@danklabs/pattern-library/motion";
import { assignInviteAction } from "./actions";

export async function AssignInvite({ invitationId }: { invitationId: string }) {
  return (
    <MotionDiv exit={{ translateX: "-100vw", transition: { duration: 0.2 } }}>
      <form
        action={assignInviteAction.bind(undefined, invitationId)}
        className="p-4"
      >
        <Paragraph1>
          Love Cake? Invite others to join you, and share the love.
        </Paragraph1>
        <div></div>
        <div className="my-3 w-full">
          <TextInput
            icon={<UserIcon />}
            label="Name for Invite"
            name="name"
            placeholder="Your friend's name"
          />
        </div>
        <div className="grow"></div>
        <div>
          <PrimaryButton type="submit" loading={false}>
            Create Invitation
          </PrimaryButton>
        </div>
      </form>
    </MotionDiv>
  );
}
