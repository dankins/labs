export function AdminPageHeader({ children }: { children?: React.ReactNode }) {
  return (
    <div className="h-[120px] flex flex-row items-center p-4">{children}</div>
  );
}
