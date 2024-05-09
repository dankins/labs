import { getPage } from "@danklabs/cake/services/admin-service";
import {
  TextInput,
  Heading3,
  LockIcon,
  FormAction,
} from "@danklabs/pattern-library/core";
import { verifyOwnershipAction } from "../actions";
import { FoyerContainer } from "../FoyerContainer";
import { LogoIcon, LogoLarge } from "@danklabs/cake/pattern-library/core";
import { CartCookie } from "@danklabs/cake/payments";

export async function VerifyOwnership({
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
        action={verifyOwnershipAction.bind(undefined, i)}
      >
        <LogoIcon className="w-[200px] h-[56px] fill-white text-white h-full w-full" />
        <Heading3>Verify Invite Ownership (2/2)</Heading3>
        <TextInput
          name="sponsor"
          label="Sponsor First Name"
          icon={<LockIcon className="fill-white" />}
          inputSize="lg"
          placeholder="Sponsor first name"
          defaultValue={!i ? cart?.sponsor : undefined}
          required
        />
      </FormAction>
    </FoyerContainer>
  );
}
