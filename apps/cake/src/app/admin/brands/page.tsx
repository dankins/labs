import { Centered, PageContent } from "@danklabs/pattern-library/core";
import { BrandList } from "@danklabs/cake/admin/brands";

export default function () {
  return (
    <PageContent>
      <Centered>
        <BrandList />
      </Centered>
    </PageContent>
  );
}
