import { brandAdmin } from "@danklabs/cake/services/admin-service";
import { Spinner } from "libs/pattern-library/core/src/icons/Spinner";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export async function InstagramCallbackPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  if (!searchParams["code"]) {
    return <div>error: no code</div>;
  }
  if (!searchParams["state"]) {
    return <div>error: no brand slug</div>;
  }
  const code = searchParams["code"] as string;
  const slug = searchParams["state"] as string;

  return (
    <Suspense fallback={<Loading slug={slug} />}>
      <Component slug={slug} code={code} />
    </Suspense>
  );
}

function Loading({ slug }: { slug: string }) {
  return (
    <div>
      <div>
        <h1>Completing Authorization for {slug}</h1>
        <div>
          <Spinner />
        </div>
      </div>
    </div>
  );
}

async function Component({ slug, code }: { slug: string; code: string }) {
  // Exchange the code for a token
  const request = {
    client_id: process.env["INSTAGRAM_APP_ID"]!,
    client_secret: process.env["INSTAGRAM_APP_SECRET"]!,
    grant_type: "authorization_code",
    redirect_uri: brandAdmin.instagram.getInstagramRedirectUrl(),
    code,
  };
  console.log("requesting oauth token", request);
  const response = await fetch("https://api.instagram.com/oauth/access_token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams(request),
  });

  const data = await response.json();

  await brandAdmin.instagram.updateInstagramConfig(
    slug,
    data.access_token,
    data.user_id
  );

  // Redirect or inform the user of a successful authentication
  return redirect(`/brand-admin/${slug}/settings`);
}
