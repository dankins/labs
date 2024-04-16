import { ActionButton, Button } from "@danklabs/pattern-library/core";
import { startTikTokAuthorization } from "./actions";

export function AuthorizeButton({ slug }: { slug: string }) {
  return (
    <>
      <ActionButton action={startTikTokAuthorization.bind(undefined, slug)}>
        Connect TikTok Account
      </ActionButton>
    </>
  );
}
