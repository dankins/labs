export function FullPage({ children }: { children: React.ReactNode }) {
  return (
    <section className="min-h-screen min-w-screen flex flex-row justify-center">
      <div className="container">{children}</div>
    </section>
  );
}
