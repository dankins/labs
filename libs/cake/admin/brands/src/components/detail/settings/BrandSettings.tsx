import { SectionHeading } from "@danklabs/cake/pattern-library/core";
import { ManageBrandAdmins } from "./ManageBrandAdmins";

export async function BrandSettings({ slug }: { slug: string }) {
  return (
    <div className="p-4 rounded-md shadow-md bg-white">
      <SectionHeading>Settings</SectionHeading>
      <ManageBrandAdmins slug={slug} />
    </div>
  );
}
