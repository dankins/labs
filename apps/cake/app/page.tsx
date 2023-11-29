import { PageContent } from "@danklabs/pattern-library/core";
import { Shh } from "./Shh";

export const revalidate = 1; // revalidate at every 60 seconds

export default async function Page() {
  return (
    <PageContent>
      <Shh />
    </PageContent>
  );
}
