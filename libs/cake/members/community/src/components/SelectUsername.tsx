import {
  CheckIcon,
  FormAction,
  SubmitFormButton,
  TextInput,
} from "@danklabs/pattern-library/core";
import { updateUsernameAction } from "../actions";

export async function SelectUsername({
  currentUsername,
}: {
  currentUsername?: string;
}) {
  const defaultValue =
    currentUsername && currentUsername.startsWith("member-")
      ? undefined
      : currentUsername;
  return (
    <FormAction action={updateUsernameAction} cta={<CheckIcon />} inline>
      <TextInput
        label=""
        placeholder={"Select Username"}
        name="username"
        required
        minLength={3}
        maxLength={20}
        defaultValue={defaultValue}
      />
    </FormAction>
  );
}
