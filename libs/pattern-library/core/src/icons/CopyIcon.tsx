"use client";
import { FaRegCopy } from "react-icons/fa";
import { CopyIcon } from "./customIcons";

export function CopyIconWithText({ text }: { text: string }) {
  function copy() {
    navigator.clipboard.writeText(text || "");
    // TODO(dankins): pop toast
  }
  return <CopyIcon onClick={copy} />;
}
