export function PageWithNavbar({
  navbar,
  children,
}: {
  navbar: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <>
      {navbar}
      <section>{children}</section>
    </>
  );
}
