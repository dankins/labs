import { Centered, PageContent } from "@danklabs/pattern-library/core";
import { AnimatedLogo } from "./AnimatedLogo";

export default async function Page() {
  return (
    <PageContent>
      <Centered>
        <AnimatedLogo height={400} width={400} />
      </Centered>
    </PageContent>
  );
}
