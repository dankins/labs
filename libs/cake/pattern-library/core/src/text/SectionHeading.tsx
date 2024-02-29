export function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mt-[13px] text-xs text-semibold tracking-widest uppercase font-heading leading-4 tracking-[1.76px] leading-[16px]">
      {children}
    </h3>
  );
}
