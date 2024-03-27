import { invitations } from "@danklabs/cake/services/admin-service";
import { Metadata } from "next";

export async function generateMetadata(inviteCode?: string): Promise<Metadata> {
  if (!inviteCode) {
    return {
      title: `Cake Invite `,
      description: "Join Me on Cake!",
      openGraph: {
        images: [`/invitation/opengraph-image`],
      },
    };
  }
  const invite = await invitations.getByCode.cached(inviteCode);
  if (!invite) {
    return {
      title: `Cake Invite`,
      description: "Join Me on Cake!",
      openGraph: {
        images: [`/invitation/opengraph-image`],
      },
    };
  }

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL!),
    title: `Cake Invitation`,
    description: `${invite.recipientName}, join me on Cake!`,
    openGraph: {
      images: [
        `https://dank.ngrok.app/invitation/opengraph-image?code=${inviteCode}`,
      ],
    },
  };
}
