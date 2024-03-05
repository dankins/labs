import { Menu } from "@danklabs/cake/members/account";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col md:flex-row px-4">
      <div className="hidden md:block md:w-[400px] md:mr-10">
        <Menu />
      </div>
      <div className="container">{children}</div>
    </div>
  );
}
