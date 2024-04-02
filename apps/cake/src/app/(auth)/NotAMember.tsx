import {
  Centered,
  Heading3,
  PageContent,
} from "@danklabs/pattern-library/core";

export function NotAMember() {
  return (
    <PageContent>
      <Centered>
        <Heading3>Only active members may access this page.</Heading3>
      </Centered>
    </PageContent>
  );
}
