export function LogoSpace({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center aspect-[1/1] w-full h-full">
      {children}
    </div>
  );
}
