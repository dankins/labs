"use client";
import { useState } from "react";
import {
  Button,
  PhoneIcon,
  PrimaryButton,
  SecondaryButton,
  UserIcon,
} from "@danklabs/pattern-library/core";
import { TextInput } from "@danklabs/pattern-library/core";
import { useFormStatus } from "react-dom";

export type Profile = {
  firstName: string | null;
  lastName: string | null;
  email: string;
  phone: string | null;
};

export function ProfileToggle({
  profile,
  action,
}: {
  profile: Profile;
  action(formData: FormData): Promise<void>;
}) {
  const [readOnly, setReadOnly] = useState(true);
  return (
    <div>
      <ProfileEdit
        readOnly={readOnly}
        profile={profile}
        toggle={() => {
          console.log("toggle", readOnly);
          setReadOnly(!readOnly);
        }}
        action={action}
      />
    </div>
  );
}

export function ProfileEdit({
  action,
  profile,
  toggle,
  readOnly,
}: {
  profile: Profile;
  readOnly: boolean;
  toggle(): void;
  action(formData: FormData): Promise<void>;
}) {
  async function onSubmit(formData: FormData) {
    await action(formData);
    toggle();
  }
  return (
    <form action={onSubmit} className="flex flex-col gap-4">
      <ProfileForm profile={profile} toggle={toggle} readOnly={readOnly} />
    </form>
  );
}

function ProfileForm({
  profile,
  readOnly,
  toggle,
}: {
  profile: Profile;
  readOnly: boolean;

  toggle(): void;
}) {
  const { pending } = useFormStatus();
  return (
    <>
      <div className="mt-5 flex flex-row gap-3">
        <TextInput
          icon={<UserIcon />}
          name="firstName"
          label="First Name"
          defaultValue={profile.firstName ? profile.firstName : undefined}
          required
          disabled={pending || readOnly}
        />
        <TextInput
          icon={<UserIcon />}
          name="lastName"
          label="Last Name"
          defaultValue={profile.lastName ? profile.lastName : undefined}
          required
          disabled={pending || readOnly}
        />
      </div>
      <TextInput
        icon={<PhoneIcon />}
        name="phone"
        label="Phone Number"
        defaultValue={profile.phone ? profile.phone : undefined}
        disabled={pending || readOnly}
        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
        placeholder="123-456-7890"
      />
      <div className="flex flex-row gap-4">
        {readOnly && (
          <PrimaryButton type="button" onClick={toggle}>
            Edit
          </PrimaryButton>
        )}
        {!readOnly && pending && <Button loading>Save</Button>}
        {!readOnly && !pending && (
          <>
            <PrimaryButton type="submit">Save</PrimaryButton>
            <SecondaryButton onClick={toggle}>Cancel</SecondaryButton>
          </>
        )}
      </div>
    </>
  );
}
