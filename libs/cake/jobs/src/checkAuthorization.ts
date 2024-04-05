import { NextRequest } from "next/server";

export function checkAuthorization(request: NextRequest) {
  if (process.env.NODE_ENV !== "production") {
    return;
  }
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env["CRON_SECRET"]}`) {
    throw new Error("authorization failed");
  }
}
