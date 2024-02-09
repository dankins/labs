import classNames from "classnames";
import { Readex_Pro } from "next/font/google";

const readex = Readex_Pro({
  subsets: ["latin"],
  display: "block",
  variable: "--font-readex",
});

export default function Page() {
  return (
    <div className="w-full h-full min-h-screen bg-[#FFF6DA] text-[#FFE48F] flex flex-col items-center justify-center">
      <div
        className={classNames(
          readex.variable,
          "flex flex-col items-center container"
        )}
      >
        <span
          className={classNames(
            "text-readex text-[30vw] xl:text-[400px] text-transparent uppercase tracking-widest font-bold",
            `bg-cover bg-clip-text bg-[url('/images/homepage/background.jpg')]`
          )}
        >
          Cake
        </span>
        <h1 className="text-readex text-3xl capitalize">How sweet it is.</h1>
      </div>
    </div>
  );
}
