import classNames from "classnames";
import { PageView } from "@danklabs/cake/events";
import { Logo } from "@danklabs/cake/pattern-library/core";

export default function Page() {
  return (
    <div>
      <PageView tags={[]} />
      <div className="w-full p-4 min-h-screen text-dark flex flex-col items-center justify-center">
        <div className={classNames("flex flex-col items-center container")}>
          <div className="p-6 max-w-[570px] w-full">
            <Logo className="w-full" />
          </div>
          <h3 className="font-lexend text-sm lg:text-[1.25rem] text-center">
            Shopping is about to get sweeter.
          </h3>
        </div>
      </div>
    </div>
  );
}
