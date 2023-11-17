"use client";

import { useEffect, useState } from "react";
import { useInterval } from "usehooks-ts";

import { ChatHistory } from "@danklabs/integrations/langchain";

export function ResponseLoader({
  refreshAction,
  lastMessage,
}: {
  refreshAction(latestId: string): Promise<void>;
  lastMessage?: ChatHistory["messages"][0];
}) {
  const waiting = lastMessage && lastMessage.sender === "user";
  useInterval(
    () => {
      if (lastMessage) {
        refreshAction(lastMessage.id);
      }
    },
    waiting ? 4000 : null
  );

  return waiting ? <span>generating response...</span> : <></>;
}
