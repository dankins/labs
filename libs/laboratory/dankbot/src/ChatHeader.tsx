import { DropdownMenu } from "@danklabs/pattern-library/core";
import { AiFillSetting } from "react-icons/ai";
export function ChatHeader() {
  return (
    <div className="bg-primary p-5 rounded-t text-white flex flex-row">
      <span className="grow">DankBot</span>
      <DropdownMenu>
        <label>
          <AiFillSetting />
        </label>
        {/* <ul>
          <li>Foo</li>
          <li>Bar</li>
          <li>Baz</li>
        </ul> */}
      </DropdownMenu>
    </div>
  );
}
