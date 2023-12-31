import { v4 as uuidv4 } from "uuid";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

import { Button, Centered } from "@danklabs/pattern-library/core";
import { CHATID_COOKIE_NAME } from "./constants";

export function StartChat() {
  const welcomeMessage = `
    Wow, you're a cheeky one, aren't ya? Do you just go around pressing "Do Not Press" buttons everywhere you go?
    No worries - I'm glad you're here. Allow myself to introduce... myself. I'm DankBot. Your friendly neighborhood AI.
    I would love to have a conversation with you, but I just want to make you aware that our chat history will be recorded.
    If you're cool with that, let's get started! 
  `;

  async function startChat() {
    "use server";
    const chatId = uuidv4();
    cookies().set({
      name: CHATID_COOKIE_NAME,
      value: chatId,
    });

    revalidatePath("/");

    console.log("set chat id", chatId);
  }
  return (
    <Centered>
      <form
        className="flex flex-col p-5 bg-white gap-5 container max-w-[600px] justify-center"
        action={startChat}
      >
        <div>
          <span>{welcomeMessage}</span>
        </div>
        <Button type="submit">Get Jiggy With It</Button>
      </form>
    </Centered>
  );
}
