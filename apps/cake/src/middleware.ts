import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/sign-in",
    "/invitation(.*)",
    "/api/invitations(.*)",
    "/api/webhooks(.*)",
    "/studio",
    "/terms-and-conditions",
    "/privacy-policy",
  ],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
