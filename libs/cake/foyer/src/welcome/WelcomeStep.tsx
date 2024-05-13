import { getPage } from "@danklabs/cake/services/admin-service";
import { WelcomeStepClient } from "./WelcomeStepClient";

export async function WelcomeStep() {
  const page = await getPage("foyer");
  if (!page || !page.video) {
    throw new Error("Page not found or no video");
  }

  return <WelcomeStepClient playbackId={page.video.asset.playbackId} />;
}
