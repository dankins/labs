import { EveryDayCron, checkAuthorization } from "@danklabs/cake/jobs";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    checkAuthorization(request);
    await EveryDayCron();
    return Response.json({ success: true });
  } catch (err) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }
}
