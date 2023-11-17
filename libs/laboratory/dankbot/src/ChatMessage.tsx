import { ChatMessageType } from "@danklabs/integrations/langchain";
import Avatar from "boring-avatars";
import classNames from "classnames";
import Image from "next/image";

export function ChatMessage({ message }: { message: ChatMessageType }) {
  return (
    <div
      className={classNames(
        "flex flex-row gap-3 align-top p-2 rounded",
        message.sender === "user" && "flex-row-reverse",
        message.sender === "user" ? "bg-red-100" : "bg-blue-100"
      )}
    >
      <div>
        <Avatar
          size={40}
          name={message.sender}
          variant="marble"
          colors={
            message.sender === "ai"
              ? ["#1D3461", "#1F487E", "#376996", "#6290C8", "#829CBC"]
              : ["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]
          }
        />
      </div>
      <div className="whitespace-pre-wrap">{message.message}</div>
    </div>
  );
}
