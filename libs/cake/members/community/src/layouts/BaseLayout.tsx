import { SelectUsernameBanner } from "../components/SelectUsernameBanner";

export async function BaseLayout({ children }: { children?: React.ReactNode }) {
  return (
    <div className="p-4">
      <SelectUsernameBanner />
      {children}
    </div>
  );
}
