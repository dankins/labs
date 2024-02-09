import classNames from "classnames";
import { Readex_Pro } from "next/font/google";

const readex = Readex_Pro({
  subsets: ["latin"],
  display: "block",
  variable: "--font-readex",
});

export default function Page() {
  return (
    <div className="w-full h-full p-4 min-h-screen bg-[#FFF6DA] text-[#F7B605] flex flex-col items-center justify-center">
      <div
        className={classNames(
          readex.variable,
          "flex flex-col items-center container"
        )}
      >
        <span
          style={{ backgroundSize: "100% 100%" }}
          className={classNames(
            readex.variable,
            "text-[30vw] xl:text-[400px] text-transparent uppercase tracking-tighter leading-tight font-bold",
            `bg-center bg-clip-text bg-[url('/images/homepage/background.jpg')]`
          )}
        >
          Cake
        </span>
        <h1 className="font-fancy text-xl capitalize text-center">
          Shopping is about to get a lot sweeter.
        </h1>
      </div>
    </div>
  );
}
