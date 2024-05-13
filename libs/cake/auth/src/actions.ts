"use server";

import { members } from "@danklabs/cake/services/admin-service";
import { redirect } from "next/navigation";

export async function onSignupSuccess(
  newUserData: Parameters<typeof members.member.create>[1],
  mode: "already-authenticated" | "signup" | "signin",
  iam: string
) {
  await members.member.getOrCreateByIAM(iam, newUserData);
  redirect("/invitation?step=post-checkout");
}

// import { Clerk } from "@clerk/clerk-js";
// import { clerkClient } from "@clerk/nextjs/dist/types/server";

// import { FormState, validateFormData } from "@danklabs/utils";
// import { z } from "zod";
// import { zfd } from "zod-form-data";

// type StartState = {
//   status: "start";
//   mode: "signup" | "signin";
//   error?: string;
// };

// type ErrorState = { status: "error"; error: string };

// export type AuthState = StartState | ErrorState;

// export async function authenticateAction(
//   prevState: AuthState,
//   formData: FormData
// ): Promise<AuthState> {
//   if (prevState.status === "start") {
//     return handleEmailSubmit(prevState, formData);
//   }

//   return { status: "error", error: "not implemented" };
// }

// async function handleEmailSubmit(
//   prevState: StartState,
//   formData: FormData
// ): Promise<AuthState> {
//   console.log("starting sign in");

//   if (prevState.mode === "signup") {
//     let email, firstName, lastName: string;
//     try {
//       const data = validateFormData(
//         formData,
//         zfd.formData({
//           email: zfd.text(z.string().email()),
//           firstName: zfd.text(),
//           lastName: zfd.text(),
//         })
//       );
//       email = data.email;
//       firstName = data.firstName;
//       lastName = data.lastName;
//     } catch (error) {
//       return { ...prevState, error: "error validating email" };
//     }
//     return await startSignUp(email, firstName, lastName);
//   } else {
//     const data = validateFormData(
//       formData,
//       zfd.formData({
//         email: zfd.text(),
//       })
//     );
//     return await startSignIn(data.email);
//   }
// }

// async function startSignUp(
//   email: string,
//   firstName: string,
//   lastName: string
// ): Promise<AuthState> {
//   console.log("start signup", { email, firstName, lastName });
//   const clerk = new Clerk(process.env["NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY"]!);
//   // await clerk.load();
//   console.log(
//     "loaded clerk signup",
//     { email, firstName, lastName },
//     typeof clerk.client
//   );

//   const signUpResult = await clerk.client?.signUp.create({
//     emailAddress: email,
//     firstName,
//     lastName,
//   });
//   console.log("signup result is", signUpResult);
//   if (!signUpResult) {
//     return { status: "error", error: "no result" };
//   }

//   if (signUpResult.status === "complete") {
//     return {
//       status: "complete",
//       createdSessionId: signUpResult.createdSessionId!,
//     };
//   }

//   console.log("signup result is", signUpResult);
//   if (signUpResult.status === "missing_requirements") {
//     const verificationResult =
//       await signUpResult.prepareEmailAddressVerification({
//         strategy: "email_code",
//       });
//     console.log("verification result is", verificationResult);
//     return {
//       status: "email_verification_sent",
//     };
//   }

//   //   if (result.status === "email_verification_sent") {
//   //     setVerifyEmail(true);
//   //   } else if (result.status === "error") {
//   //     console.log("authentication error", result.error);
//   //     if (result.error === ERROR_EMAIL_EXISTS) {
//   //       setOverrideMode("signin");
//   //       return startSignIn(email);
//   //     } else setError("Error logging in");
//   //   } else if (result.status === "account_not_found") {
//   //     setError("Account not found");
//   //   }

//   return { status: "start", mode: "signup", error: "not implemented" };
// }

// async function startSignIn(email: string): Promise<AuthState> {
//   return { status: "start", mode: "signin", error: "not implemented" };
// }
