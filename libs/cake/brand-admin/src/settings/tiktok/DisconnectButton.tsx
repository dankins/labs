import { brandAdmin } from "@danklabs/cake/services/admin-service";
import {
  ActionButton,
  Button,
  FormState,
} from "@danklabs/pattern-library/core";

export async function DisconnectButton({ slug }: { slug: string }) {
  async function action(): Promise<FormState> {
    "use server";
    await brandAdmin.tiktok.disconnect(slug);
    return { status: "success", message: "Disconnected" };
  }
  return <ActionButton action={action}>Disconnect</ActionButton>;
}
