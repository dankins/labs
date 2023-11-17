import { SubmitButton } from "./SubmitButton";
import { DankBot } from "./DankBot";
import { revalidatePath } from "next/cache";

export function ChatInput({ chatId }: { chatId: string }) {
  async function sendMessage(formData: FormData) {
    "use server";

    const message = formData.get("message");
    if (message === null) {
      console.error("no message sent");
      return;
    }

    const result = await DankBot.sendMessage(chatId, message.toString());
    console.log("result", {
      message: message.toString(),
      result,
    });
    revalidatePath("/");
  }

  return (
    <form action={sendMessage} className="flex flex-row gap-3 p-5">
      <input
        type="text"
        name="message"
        className="flex-grow border border-red-200"
      />
      <SubmitButton />
    </form>
  );
}
