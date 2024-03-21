import { SectionHeading } from "@danklabs/cake/pattern-library/core";
import {
  cachedGetBrandDetail,
  getBrand,
} from "@danklabs/cake/services/admin-service";

export async function ManageBrandManagers({ slug }: { slug: string }) {
  const brand = await cachedGetBrandDetail(slug);
  return (
    <div className="px-4 py-2 rounded-md shadow-md bg-white">
      <SectionHeading>Brand Managers</SectionHeading>
      {brand.db.admins.length === 0 ? (
        <div>No Brand admins</div>
      ) : (
        <div>{brand.db.admins.map((x) => x.email).join(",")}</div>
      )}
    </div>
  );
}
