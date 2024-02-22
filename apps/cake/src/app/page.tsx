import classNames from "classnames";
import { PageView } from "@danklabs/cake/events";

export default function Page() {
  return (
    <>
      <PageView tags={[]} />
      <div className="w-full p-4 min-h-screen text-[#FDFDEA] flex flex-col items-center justify-center">
        <div className={classNames("flex flex-col items-center container")}>
          <h1 className="text-[5rem] tracking-[1.3rem] font-readex uppercase font-bold lg:text-[9.375rem] lg:tracking-[2.34375rem]">
            Cake
          </h1>
          <h3 className="font-lexend text-sm lg:text-[1.25rem] text-center">
            Shopping is about to get sweeter.
          </h3>
        </div>
      </div>
    </>
  );
}
