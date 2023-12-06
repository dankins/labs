import Link from "next/link";

export function SideNav() {
  return (
    <div className="px-3 flex flex-col gap-2">
      <Link href="/admin/brands">Brands</Link>
      <Link href="/admin/members">Members</Link>
    </div>
  );
}
