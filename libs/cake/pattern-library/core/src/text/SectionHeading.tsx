export function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-xs text-semibold tracking-widest uppercase font-heading leading-4">
      {children}
    </h3>
  );
}
