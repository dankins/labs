import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  // TODO(dankins): remove /admin from public routes
  publicRoutes: ["/", "/invitation", "/api/webhooks(.*)", "/studio"],
  apiRoutes: [],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
