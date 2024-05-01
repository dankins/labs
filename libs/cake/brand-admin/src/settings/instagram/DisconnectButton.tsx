import { brandAdmin } from "@danklabs/cake/services/admin-service";
import { ActionButton, FormState } from "@danklabs/pattern-library/core";

export async function DisconnectButton({ slug }: { slug: string }) {
  async function action(): Promise<FormState> {
    "use server";
    await brandAdmin.instagram.disconnectInstagram(slug);

    return { status: "success", message: "Disconnected" };
  }
  return <ActionButton action={action}>Disconnect</ActionButton>;
}
