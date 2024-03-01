import { Suspense } from "react";

export async function Favorites({ iam }: { iam: string }) {
  return (
    <Suspense>
      <Component iam={iam} />
    </Suspense>
  );
}
async function Component({ iam }: { iam: string }) {
  return <div>WIP</div>;
}
