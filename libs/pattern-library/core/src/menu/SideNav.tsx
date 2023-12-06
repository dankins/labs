export function SideNav({
  children,
  nav,
}: {
  children: React.ReactNode;
  nav: React.ReactNode;
}) {
  return (
    <div className="flex flex-col grow h-full md:flex-row md:items-stretch">
      <nav className="w-full md:w-64">{nav}</nav>
      {children}
    </div>
  );
}
