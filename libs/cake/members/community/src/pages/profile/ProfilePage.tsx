import { auth } from "@clerk/nextjs/server";
import { members } from "@danklabs/cake/services/admin-service";
import { MemberProfile } from "./MemberProfile";
import { BrandProfile } from "./BrandProfile";

export async function ProfilePage({
  params,
  searchParams,
}: {
  params: { username: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { userId: iam } = auth().protect();
  if (!params.username) {
    throw new Error("username is required");
  }
  const profile = await members.community.getProfile(iam, params.username);
  console.log("Profile page load", iam, params.username, profile.relationship);

  if (profile.profile.type === "member") {
    return <MemberProfile profile={profile} />;
  } else if (profile.profile.type === "brand") {
    return <BrandProfile profile={profile} />;
  }
}
