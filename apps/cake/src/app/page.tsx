import classNames from "classnames";
import { AnimatedText } from "@danklabs/pattern-library/motion";
import { Tagline } from "./Tagline";

export default function Page() {
  return (
    <div className="w-full p-4 min-h-screen bg-[#FFF6DA] text-[#F7B605] flex flex-col items-center justify-center">
      <div className={classNames("flex flex-col items-center container")}>
        <AnimatedText
          el="span"
          text="Cake"
          className={classNames(
            "text-[30vw] font-readex xl:text-[400px] text-transparent uppercase tracking-normal font-bold",
            `bg-center bg-clip-text bg-[url('/images/homepage/background.jpg')]`
          )}
          letterDelay={0.4}
          style={{ backgroundSize: "106% auto" }}
        />
        <Tagline />
      </div>
    </div>
  );
}
