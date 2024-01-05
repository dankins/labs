"use client";
import { FaRegCopy } from "react-icons/fa";

export function CopyIcon({ text }: { text: string }) {
  function copy() {
    navigator.clipboard.writeText(text || "");
    // TODO(dankins): pop toast
  }
  return <FaRegCopy onClick={copy} className="cursor-pointer" />;
}
