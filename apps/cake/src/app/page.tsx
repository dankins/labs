import classNames from "classnames";
import { AnimatedText } from "@danklabs/pattern-library/motion";
import { Tagline } from "./Tagline";

export default function Page() {
  return (
    <div className="w-full p-4 min-h-screen text-[#FDFDEA] flex flex-col items-center justify-center">
      <div className={classNames("flex flex-col items-center container")}>
        <h1 className="text-[9.375rem] font-readex uppercase tracking-normal font-bold tracking-[2.34375rem]">
          Cake
        </h1>
        <h3 className="font-lexend text-[1.25rem] text-center">
          Shopping is about to get sweeter.
        </h3>
        {/* <AnimatedText
          el="span"
          text="Cake"
          className={classNames(
            "text-[30vw] font-readex xl:text-[400px] text-transparent uppercase tracking-normal font-bold",
            `bg-center bg-clip-text bg-[url('/images/homepage/background.jpg')]`
          )}
          letterDelay={0.4}
          style={{ backgroundSize: "107% auto" }}
        />
        <Tagline /> */}
      </div>
    </div>
  );
}
