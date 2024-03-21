import {
  UserButton,
  authMiddleware,
  clerkClient,
  currentUser,
  redirectToSignIn,
} from "@clerk/nextjs";
import { NextResponse } from "next/server";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/sign-in",
    "/invitation",
    "/api/webhooks(.*)",
    "/studio",
    "/terms-and-conditions",
    "/privacy-policy",
  ],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
