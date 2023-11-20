import { LogoSVG } from "./LogoSVG";

export function Nav() {
  return (
    <div className="flex flex-row p-3 text-white items-center gap-3 mr-5">
      <LogoSVG height={40} width={40} className={"inline-block"} />
      <a className="text-3xl lowercase" href="/">
        Dank Labs
      </a>
      <span className="grow"></span>
      <ul className="text-xl">
        <li>
          <a href="/dankbot">DankBot</a>
        </li>
      </ul>
    </div>
  );
}
