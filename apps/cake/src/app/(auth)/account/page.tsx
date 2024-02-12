import Link from "next/link";

export default function Page() {
  return (
    <div>
      <ul>
        <li>
          <Link href="/account/invites">Invites</Link>
        </li>
        <li>
          <Link href="/account/membership">Membership</Link>
        </li>
      </ul>
    </div>
  );
}
