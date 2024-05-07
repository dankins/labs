export function decodeI(i: string): [string, string, string] {
  const iDecoded = atob(i);
  const res = iDecoded.split("|");
  const inviteCode = res[0];
  const requiredCode = res[1];
  const sponsor = res[2];

  return [inviteCode, requiredCode, sponsor];
}
