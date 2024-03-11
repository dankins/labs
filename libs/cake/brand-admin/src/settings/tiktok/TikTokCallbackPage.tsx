import {
  updateInstagramConfig,
  getTikTokRedirectUrl,
} from "@danklabs/cake/services/admin-service";
import { Spinner } from "libs/pattern-library/core/src/icons/Spinner";
import { Suspense } from "react";

export async function TikTokCallbackPage({
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
    client_key: process.env["TIKTOK_CLIENT_KEY"]!,
    client_secret: process.env["TIKTOK_APP_SECRET"]!,
    grant_type: "authorization_code",
    redirect_uri: getTikTokRedirectUrl(),
    code,
  };
  console.log("requesting oauth token", request);
  const response = await fetch("https://open.tiktokapis.com/v2/oauth/token/", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams(request),
  });

  const data = await response.json();

  // Here you should handle the response, save the token, etc.
  console.log(data);

  data.access_token;

  await updateInstagramConfig(slug, data.access_token, data.user_id);

  // Redirect or inform the user of a successful authentication
  return (
    <div>
      <div>
        <h1>Authorization Successful</h1>
      </div>
    </div>
  );
}

// const { code } = req.query;

// if (!code) {
//   return res.status(400).send('Code is required');
// }

// try {
//   // Exchange the code for a token
//   const response = await fetch('https://api.instagram.com/oauth/access_token', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded',
//     },
//     body: new URLSearchParams({
//       client_id: 'YOUR_CLIENT_ID',
//       client_secret: 'YOUR_CLIENT_SECRET',
//       grant_type: 'authorization_code',
//       redirect_uri: 'http://localhost:3000/auth/instagram/callback',
//       code,
//     }),
//   });

//   const data = await response.json();

//   // Here you should handle the response, save the token, etc.
//   console.log(data);

//   // Redirect or inform the user of a successful authentication
//   res.redirect('/success-page');
// } catch (error) {
//   console.error(error);
//   res.status(500).send('Authentication failed');
// }
