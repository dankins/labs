import { NextRequest } from "next/server";

export function checkAuthorization(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env["CRON_SECRET"]}`) {
    throw new Error("authorization failed");
  }
}
