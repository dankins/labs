import { Suspense } from "react";

import { Button, Centered } from "@danklabs/pattern-library/core";
import { getSite } from "@danklabs/cake/cms";
export function Shh() {
  return (
    <Suspense>
      <Component />
    </Suspense>
  );
}

async function Component() {
  const site = await getSite();
  return (
    <Centered>
      <h1>Cake is an invite-only club for fashion lovers.</h1>
      <h2>{site.name}</h2>
    </Centered>
  );
}
