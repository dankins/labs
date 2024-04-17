import { brandAdmin } from "@danklabs/cake/services/admin-service";
import { Spinner } from "libs/pattern-library/core/src/icons/Spinner";
import { redirect } from "next/navigation";
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
  const state = searchParams["state"] as string;
  const [slug, csrf] = state.split("::");

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
  try {
    await brandAdmin.tiktok.updateTikTokAccessToken(slug, code);
  } catch (err) {
    console.error("error applying tiktok configuration", err);
    return (
      <div>
        <div>
          <h1>Error applying tiktok configuration</h1>
        </div>
      </div>
    );
  }

  redirect(`/brand-admin/${slug}/settings`);
}
