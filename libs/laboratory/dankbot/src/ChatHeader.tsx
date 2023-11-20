import { AiFillSetting } from "react-icons/ai";
export function ChatHeader() {
  return (
    <div className="bg-primary p-5 rounded-t text-white flex flex-row">
      <span className="grow">DankBot</span>
      <AiFillSetting />
    </div>
  );
}
