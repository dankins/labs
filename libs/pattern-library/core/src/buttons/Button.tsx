export function Button({
  children,
}: { foo?: "foo" } & React.HTMLProps<HTMLButtonElement>) {
  return (
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      {children}
    </button>
  );
}
