import classNames from "classnames";
import { AnimatedText } from "@danklabs/pattern-library/motion";
import { Tagline } from "./Tagline";

export default function Page() {
  return (
    <div className="w-full p-4 min-h-screen text-[#FDFDEA] flex flex-col items-center justify-center">
      <div className={classNames("flex flex-col items-center container")}>
        <h1 className="text-[9.375rem] font-readex uppercase font-bold tracking-[2.34375rem]">
          Cake
        </h1>
        <h3 className="font-lexend text-[1.25rem] text-center">
          Shopping is about to get sweeter.
        </h3>
      </div>
    </div>
  );
}
