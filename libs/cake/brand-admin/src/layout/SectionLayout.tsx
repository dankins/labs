import { NavPanel } from "./NavPanel";

export async function SectionLayout({
  slug,
  children,
}: {
  slug: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex flex-row">
      <NavPanel slug={slug} />
      <div className="px-4 grow">{children}</div>
    </div>
  );
}
