import Link from "next/link";

import { getPage } from "@danklabs/cake/services/admin-service";
import {
  TextInput,
  Heading3,
  LockIcon,
  FormAction,
} from "@danklabs/pattern-library/core";
import { submitPersonalAccessCodeAction } from "../actions";
import { FoyerContainer } from "../FoyerContainer";
import { LogoIcon, LogoLarge } from "@danklabs/cake/pattern-library/core";
import { CartCookie } from "@danklabs/cake/payments";

export async function AuthenticateInvite({
  i,
  cart,
}: {
  i?: string;
  cart?: CartCookie;
}) {
  return (
    <FoyerContainer dark displayLogo={false}>
      <FormAction
        cta="Authenticate"
        className="flex flex-col gap-4 items-center justify-center"
        action={submitPersonalAccessCodeAction.bind(undefined, i)}
      >
        <LogoIcon className="w-[200px] h-[56px] fill-white text-white h-full w-full" />
        <Heading3>Authenticate Invite (1/2)</Heading3>
        <TextInput
          name="accessCode"
          label="Personal Access Code"
          icon={<LockIcon className="fill-white" />}
          inputSize="lg"
          placeholder="Personal Access Code"
          defaultValue={!i ? cart?.accessCode : undefined}
          required
        />
      </FormAction>
    </FoyerContainer>
  );
}
