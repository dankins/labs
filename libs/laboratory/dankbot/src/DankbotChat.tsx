import { Suspense } from "react";
import { cookies } from "next/headers";
import { ChatInput } from "./ChatInput";

import { StartChat } from "./StartChat";
import { CHATID_COOKIE_NAME } from "./constants";
import { DankBot } from "./DankBot";
import { ChatMessage } from "./ChatMessage";
import { ResponseLoader } from "./ResponseLoader";
import { refreshAction } from "./actions";
import { ChatHeader } from "./ChatHeader";

export async function DankbotChat() {
  return (
    <Suspense fallback={<Loading />}>
      {/* @ts-ignore */}
      <Component />
    </Suspense>
  );
}

function Loading() {
  return <div>loading...</div>;
}

async function Component() {
  const cookieStore = cookies();
  const chatIdCookie = cookieStore.get(CHATID_COOKIE_NAME);

  if (!chatIdCookie) {
    return <StartChat />;
  }
  const chatId = chatIdCookie.value;

  const history = await DankBot.loadChatHistory(chatId);
  const boundRefreshAction = refreshAction.bind(null, chatId);

  return (
    <div className="h-full flex flex-col">
      <ChatHeader />
      <div className="flex-grow overflow-y-scroll max-h-[70vh] p-5 flex flex-col gap-5 bg-white">
        {history.messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        <ResponseLoader
          refreshAction={boundRefreshAction}
          lastMessage={
            history.messages.length > 0
              ? history.messages[history.messages.length - 1]
              : undefined
          }
        />
      </div>
      <ChatInput chatId={chatId} />
    </div>
  );
}
