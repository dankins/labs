export function Button({
  children,
}: { foo?: "foo" } & React.HTMLProps<HTMLButtonElement>) {
  return (
    <button className="bg-primary hover:bg-primary-700 text-primary-content font-bold py-2 px-4 rounded">
      {children}
    </button>
  );
}
