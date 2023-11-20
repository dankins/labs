"use client";
import { SubmitButton } from "./SubmitButton";
import { DankBot } from "./DankBot";
import { revalidatePath } from "next/cache";
import { useRef } from "react";

export function ChatInput({
  chatId,
  sendMessageAction,
}: {
  chatId: string;
  sendMessageAction(formData: FormData): Promise<void>;
}) {
  const messageRef = useRef<HTMLInputElement>(null);
  async function action(formData: FormData) {
    await sendMessageAction(formData);
    if (messageRef.current) {
      messageRef.current.value = "";
    }
  }
  return (
    <form
      action={action}
      className="flex flex-row gap-3 p-5 bg-white mb-10 border-top "
    >
      <input
        ref={messageRef}
        type="text"
        name="message"
        className="flex-grow border border-primary p-3"
      />
      <SubmitButton />
    </form>
  );
}
