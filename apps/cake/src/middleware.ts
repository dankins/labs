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
  async afterAuth(auth, req, evt) {
    // Allow users visiting public routes to access them
    if (auth.isPublicRoute) {
      return NextResponse.next();
    }

    // Handle users who aren't authenticated
    if (!auth.userId) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }

    const user = await clerkClient.users.getUser(auth.userId);
    if (!user) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }
    // restrict admin routes
    if (
      req.nextUrl.pathname.startsWith("/admin") &&
      user.privateMetadata["role"] !== "admin"
    ) {
      const homeURL = new URL("/", req.url);
      return NextResponse.redirect(homeURL);
    }

    // Allow users visiting public routes to access them
    return NextResponse.next();
  },
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
