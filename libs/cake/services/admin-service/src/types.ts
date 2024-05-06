export type { InstagramPost } from "./brands/instagram/getInstagramPosts";
import { members } from "./members";

export type MemberInvitation = Awaited<
  ReturnType<typeof members.member.invitations.getInvitations>
>[0];

export type Profile =
  | {
      relationship: "public";
      profile: {
        type: "member" | "brand";
        username: string;
      };
    }
  | {
      relationship: "followed";
      profile: {
        type: "member" | "brand";
        username: string;
      };
    }
  | {
      relationship: "connected";
      profile: {
        type: "member" | "brand";
        username: string;
      };
    }
  | {
      relationship: "you";
      profile: {
        type: "member" | "brand";
        username: string;
      };
    };
