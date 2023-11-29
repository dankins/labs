import { Suspense } from "react";

import { Button, Centered } from "@danklabs/pattern-library/core";
import { getSite } from "@danklabs/cake/cms";
import { InstallPWAButton } from "./InstallPWAButton";
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
      <h2>{site.name}</h2>
      <p>{site.membersOnlyText}</p>
      <InstallPWAButton />
    </Centered>
  );
}
