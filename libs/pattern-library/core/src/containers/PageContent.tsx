export function PageContent({ children }: { children: React.ReactNode }) {
  return (
    <main className="grow flex flex-row justify-center">
      <div className="container">{children}</div>
    </main>
  );
}
