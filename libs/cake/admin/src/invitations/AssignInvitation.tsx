import { FormAction, TextInput } from "@danklabs/pattern-library/core";
import { assignInvitationAction } from "./actions";

export async function AssignInvitation({
  invitation,
}: {
  invitation: { id: string; code: string | null };
}) {
  return (
    <div>
      <FormAction
        action={assignInvitationAction.bind(undefined, invitation.id)}
        cta={"Assign"}
        inline
      >
        <input type="hidden" name="code" value={invitation.code || ""} />
        <TextInput name="name" placeholder="Name of Recipient" required />
      </FormAction>
    </div>
  );
}
