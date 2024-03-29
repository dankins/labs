import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware((auth, req) => {});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};

// export default authMiddleware({
//   publicRoutes: [
//     "/",
//     "/sign-in",
//     "/invitation(.*)",
//     "/api/invitations(.*)",
//     "/api/webhooks(.*)",
//     "/studio",
//     "/terms-and-conditions",
//     "/privacy-policy",
//   ],
// });

// export const config = {
//   matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
// };
