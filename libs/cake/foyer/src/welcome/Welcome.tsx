import { getPage } from "@danklabs/cake/services/admin-service";
import { ValueProp1 } from "./ValueProp1";
import { ValueProp2 } from "./ValueProp2";
import { ValueProp3 } from "./ValueProp3";
import { WelcomePanel } from "./WelcomePanel";
import { FoyerContainer } from "../FoyerContainer";
import { PrimaryButton } from "@danklabs/pattern-library/core";

export async function Welcome() {
  return (
    <FoyerContainer>
      <PrimaryButton href={`/invitation?step=checkout`}>Continue</PrimaryButton>
    </FoyerContainer>
  );
}
