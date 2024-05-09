import { Menu } from "@danklabs/cake/members/account";
import { MobileNavSpacer } from "@danklabs/cake/pattern-library/core";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex flex-col md:flex-row px-4 md:mt-[50px]">
        <div className="md:block md:w-[360px] md:mr-4">
          <Menu />
        </div>
        <div className="container">{children}</div>
      </div>
    </>
  );
}
