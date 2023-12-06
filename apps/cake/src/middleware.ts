import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  // TODO(dankins): remove /admin from public routes
  publicRoutes: ["/", "/invitation"],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
