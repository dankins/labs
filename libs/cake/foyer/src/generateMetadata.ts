import { invitations } from "@danklabs/cake/services/admin-service";
import { Metadata } from "next";
import { URLSearchParams } from "url";
import { decodeI } from "./util/decodeI";

const defaultMetadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL!),
  title: `Cake Invite `,
  description: "Join Me on Cake!",
  openGraph: {
    images: [`/invitation/opengraph-image.png`],
  },
};

export async function generateMetadata(i?: string): Promise<Metadata> {
  if (!i) {
    return defaultMetadata;
  }

  try {
    const [code, personalCode] = decodeI(i as string);
    const invite = await invitations.getByCode.cached(code);
    if (!invite) {
      return defaultMetadata;
    }

    return {
      metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL!),
      title: `Velvet Rope`,
      description: `${invite.recipientName}, join me on Cake!`,
      openGraph: {
        images: [`/invitation/opengraph-image.png?i=${i}`],
      },
    };
  } catch (err) {
    console.log("error getting invite", err);
  }

  return defaultMetadata;
}
