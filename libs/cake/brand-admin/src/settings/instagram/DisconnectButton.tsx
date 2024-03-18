import { disconnectInstagram } from "@danklabs/cake/services/admin-service";
import { ActionButton, Button } from "@danklabs/pattern-library/core";

export async function DisconnectButton({ slug }: { slug: string }) {
  async function action() {
    "use server";
    return disconnectInstagram(slug);
  }
  return <ActionButton action={action}>Disconnect</ActionButton>;
}
