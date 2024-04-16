"use server";

import { brandAdmin } from "@danklabs/cake/services/admin-service";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function startTikTokAuthorization(slug: string) {
  console.log("startTikTokAuthorization", slug);
  const csrfState = Math.random().toString(36).substring(2);
  cookies().set({
    name: "tiktok-csrf-state",
    value: csrfState,
    httpOnly: true,
    path: "/",
    expires: 120 * 1000,
  });

  const link = brandAdmin.tiktok.getTikTokAuthorizeLink(slug, csrfState);

  redirect(link);
}
