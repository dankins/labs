export function Account({
  active,
  userId,
  userEmailAddress,
}: {
  active: boolean;
  userId?: string;
  userEmailAddress?: string;
}) {
  if (userId) {
    return <div>you are logged in: {userEmailAddress}</div>;
  }

  if (!active) {
    return <div>account (not active)</div>;
  }

  return <div>we need to create an account</div>;
}
