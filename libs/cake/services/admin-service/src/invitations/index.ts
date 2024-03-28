import { assignInvite } from "./assignInvite";
import { cancelInvite } from "./cancelInvite";
import { emailInvite } from "./emailInvite";
import { getInvitation } from "./getInvitation";
import { getByCode } from "./getByCode";
import { getMemberInvitations } from "./getMemberInvitations";
import { create } from "./create";
import { incrementRedemptions } from "./incrementRedemptions";

export const invitations = {
  assignInvite,
  cancelInvite,
  emailInvite,
  getMemberInvitations,
  getInvitation,
  create,
  incrementRedemptions,
  getByCode,
};
