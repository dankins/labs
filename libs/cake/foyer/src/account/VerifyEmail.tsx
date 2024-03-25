import {
  Button,
  EmailIcon,
  PrimaryButton,
  TextInput,
  UserIcon,
} from "@danklabs/pattern-library/core";
import { LinkToStepButton } from "../LinkToStepButton";

export function VerifyEmail({ email }: { email: string }) {
  return (
    <div className="w-full">
      <div>
        <h1 className="text-xl font-normal text-primary">Verify your email</h1>
        <p>Tell us a bit about yourself</p>
      </div>
      <div className="mt-8">
        <PrimaryButton>Send Verification Email</PrimaryButton>
      </div>
    </div>
  );
}
