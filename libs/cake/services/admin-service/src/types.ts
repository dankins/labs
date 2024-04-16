export type { InstagramPost } from "./brands/instagram/getInstagramPosts";
import { members } from "./members";

export type MemberInvitation = Awaited<
  ReturnType<typeof members.member.invitations.getInvitations>
>[0];
