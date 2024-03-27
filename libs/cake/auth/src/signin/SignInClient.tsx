"use client";

import { useState } from "react";
import { StartSignIn } from "./StartSignIn";
import { ValidateCode } from "./ValidateCode";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { AlreadyLoggedIn } from "./AlreadyLoggedIn";

const EMAIL_ADDRESS_EXISTS = "form_identifier_exists";
type signinStates = "first_factor" | "email_sent_signin";

export type SignInClientProps = {
  startHeading?: React.ReactNode;
  startParagraph?: React.ReactNode;
  verifyCodeHeading?: React.ReactNode;
  verifyCodeParagraph?: React.ReactNode;
  redirectUrl?: string;
};

export function SignInClient(props: SignInClientProps) {
  const { isSignedIn } = useAuth();
  const router = useRouter();
  const [signinState, setSigninState] = useState<signinStates>("first_factor");

  function onStartSuccess(result: {
    method: "email";
    needsFirstFactor: boolean;
  }) {
    console.log("onFirstFactorSent");
    if (result.method === "email" && result.needsFirstFactor) {
      setSigninState("email_sent_signin");
    }
  }

  function onValidateCodeSuccess() {
    console.log("onValidateCodeSuccess");
    if (props.redirectUrl) {
      router.push(props.redirectUrl);
    }
  }

  if (isSignedIn && signinState !== "email_sent_signin") {
    return <AlreadyLoggedIn />;
  }

  switch (signinState) {
    case "first_factor":
      return (
        <StartSignIn
          onSuccess={onStartSuccess}
          heading={props.startHeading}
          paragraph={props.startParagraph}
        />
      );
    case "email_sent_signin":
      return (
        <ValidateCode
          onSuccess={onValidateCodeSuccess}
          heading={props.verifyCodeHeading}
          paragraph={props.verifyCodeParagraph}
        />
      );
    default:
      return <div>Invalid State</div>;
  }
}

// export function SignInClientOld() {
//   const { signOut } = useAuth();
//   const { isSignedIn, user, isLoaded: isUserLoaded } = useUser();
//   const [loading, setLoading] = useState(false);
//   const [signinState, setSigninState] = useState<signinStates>("initial");
//   const { isLoaded, signUp, setActive } = useSignUp();
//   const { signIn } = useSignIn();

//   async function handleSubmit() {
//     if (!signUp) {
//       throw new Error("signup not loaded");
//     }
//     setLoading(true);

//     console.log("about to create account", email, firstName, lastName);

//     // Check the sign up response to
//     // decide what to do next.
//     try {
//       const signUpResult = await signUp.create({
//         emailAddress: email,
//         firstName,
//         lastName,
//       });

//       if (signUpResult.status === "complete") {
//         console.log(signUpResult);
//         setActive({ session: signUpResult.createdSessionId });
//         setLoading(false);
//       }

//       console.log("signup result is", signUpResult);
//       if (signUpResult.status === "missing_requirements") {
//         const verificationResult =
//           await signUpResult.prepareEmailAddressVerification({
//             strategy: "email_code",
//           });
//         console.log("verification result is", verificationResult);
//         setSigninState("email_verification_sent");
//       }
//     } catch (err) {
//       const error = (err as any).errors[0];
//       if (error.code === EMAIL_ADDRESS_EXISTS) {
//         console.log("email address already exists");
//         await handleSignIn(email);
//       } else {
//         console.log("signup error", (err as any).errors, err);
//       }
//     }

//     setLoading(false);
//   }

//   async function sendFirstFactor(
//     result: Awaited<
//       ReturnType<NonNullable<ReturnType<typeof useSignIn>["signIn"]>["create"]>
//     >
//   ) {
//     // result.attemptFirstFactor({})
//     const firstFactor = result.supportedFirstFactors.find(
//       (s) => s.strategy === "email_code"
//     );
//     if (!firstFactor || firstFactor.strategy !== "email_code") {
//       throw new Error("email code not supported");
//     }

//     const firstFactorResult = await result.prepareFirstFactor(firstFactor);
//     console.log(
//       "firstFactorResult",
//       firstFactorResult.status,
//       firstFactorResult
//     );
//     firstFactorResult.status;
//     setSigninState("email_sent_signin");
//   }

//   async function handleSignIn(emailAddress: string) {
//     console.log("signing in", emailAddress);
//     if (!signIn || !setActive) {
//       throw new Error("signin not loaded");
//     }

//     try {
//       const result = await signIn.create({ identifier: emailAddress });
//       setActive({ session: result.createdSessionId });
//       console.log("result is", result.status, result.identifier, result);
//       if (result.status === "needs_first_factor") {
//         sendFirstFactor(result);
//       }
//     } catch (err) {
//       console.log("error with signin", (err as any).errors, err);
//       throw err;
//     }
//   }

//   async function handleCodeSubmit(code: string) {
//     if (!signUp || !signIn) {
//       throw new Error("signup not loaded");
//     }
//     setLoading(true);
//     if (signinState === "email_sent_signin") {
//       await handleSignInFirstFactor(code);
//     } else {
//       await handleSignUpVerifyEmail(code);
//     }
//     // onComplete();
//     setLoading(false);
//   }
//   async function handleSignInFirstFactor(code: string) {
//     if (!signIn || !setActive) {
//       throw new Error("signIn not loaded");
//     }

//     const result = await signIn.attemptFirstFactor({
//       strategy: "email_code",
//       code,
//     });
//     console.log("status", result.status, result);
//     await setActive({ session: result.createdSessionId });
//     // onComplete();
//   }
//   async function handleSignUpVerifyEmail(code: string) {
//     if (!signUp || !setActive) {
//       throw new Error("signIn not loaded");
//     }

//     const result = await signUp.attemptEmailAddressVerification({
//       // @ts-ignore - this is throwing an error but confirm it works
//       strategy: "email_code",
//       code,
//     });
//     console.log("status", result.status, result);
//     await setActive({ session: result.createdSessionId });
//   }

//   if (isSignedIn && signinState !== "email_sent_signin") {
//     return (
//       <div>
//         <p>
//           You are currently signed in as {user.emailAddresses[0].emailAddress}
//         </p>
//         <div className="flex flex-row justify-center gap-4 my-5">
//           <div>
//             <PrimaryButton onClick={onComplete}>Continue</PrimaryButton>
//           </div>
//           <div>
//             <SecondaryButton onClick={() => signOut()}>
//               Sign Out
//             </SecondaryButton>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (
//     signinState === "email_sent_signin" ||
//     signinState === "email_verification_sent"
//   ) {
//     return (
//       <form>
//         <h1 className="text-xl font-normal text-primary">
//           Create Cake Account
//         </h1>
//         <p>Check your inbox and paste in the 6 digit code.</p>
//         <div className="py-6">
//           <VerifyCode
//             name="code"
//             digits={6}
//             onCodeEntered={(code) => handleCodeSubmit(code)}
//           />
//         </div>
//       </form>
//     );
//   }

//   return (
//     <form action={handleSubmit}>
//       <h1 className="text-xl font-normal text-primary">Create Cake Account</h1>
//       <p>
//         Next we need to verify your email. We will send a 6 digit code to{" "}
//         <strong>{email}</strong>.
//       </p>

//       <PrimaryButton
//         className="mt-6 font-poppins"
//         type="submit"
//         disabled={!isLoaded || loading}
//       >
//         Send Verification Email
//       </PrimaryButton>
//     </form>
//   );
// }
