"use client";
import { FaRegCopy } from "react-icons/fa";
import { useState, useEffect } from "react";
import { Button } from "@danklabs/pattern-library/core";

export function InvitationLink({
  domain,
  code,
  sendInvitationEmail,
}: {
  domain: string;
  code: string;
  sendInvitationEmail(
    memberName: string,
    sendToEmail: string,
    inviteLink: string,
    inviterMessage: string
  ): Promise<void>;
}) {
  const url = `${domain}/invitation?code=${code}`;

  function copy() {
    navigator.clipboard.writeText(url || "");
    console.log("COPIED", url);
  }

  async function handleSendClick() {
    const message =
      "This was the thing I was telling you about - check it out!!";
    sendInvitationEmail("Dan", "dan@alphaminer.com", url!, message);
  }

  return (
    <div className="flex flex-row items-center gap-5">
      <span>{url}</span>
      <FaRegCopy onClick={copy} className="cursor-pointer" />
      <Button onClick={handleSendClick}>Email</Button>
    </div>
  );
}
