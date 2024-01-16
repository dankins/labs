"use client";
import { FaRegCopy } from "react-icons/fa";
import { useState, useEffect } from "react";

export function InvitationLink({ code }: { code: string }) {
  const [url, setURL] = useState<string>();
  useEffect(() => {
    let rtn;
    if (typeof window !== "undefined" && window.location.href) {
      rtn = new URL(window.location.href);
      setURL(`${rtn.protocol}//${rtn.host}/invitation?code=${code}`);
    }
  }, [code]);

  function copy() {
    navigator.clipboard.writeText(url || "");
    console.log("COPIED", url);
  }

  return (
    <div className="flex flex-row items-center gap-5">
      <span>{url}</span>
      <FaRegCopy onClick={copy} className="cursor-pointer" />
    </div>
  );
}
