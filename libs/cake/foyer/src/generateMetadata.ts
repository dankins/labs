import { invitations } from "@danklabs/cake/services/admin-service";
import { Metadata } from "next";

export async function generateMetadata(inviteCode?: string): Promise<Metadata> {
  if (!inviteCode) {
    return {
      metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL!),
      title: `Cake Invite `,
      description: "Join Me on Cake!",
      openGraph: {
        images: [`/invitation/opengraph-imag.png`],
      },
    };
  }
  const invite = await invitations.getByCode.cached(inviteCode);
  if (!invite) {
    return {
      metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL!),
      title: `Cake Invite`,
      description: "Join Me on Cake!",
      openGraph: {
        images: [`/invitation/opengraph-image.png`],
      },
    };
  }

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL!),
    title: `Cake Invitation`,
    description: `${invite.recipientName}, join me on Cake!`,
    openGraph: {
      images: [`/invitation/opengraph-image.png?code=${inviteCode}`],
    },
  };
}
