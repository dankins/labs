import { BrandStatus } from "./BrandStatus";
import { ManageBrandManagers } from "./ManageBrandManagers";

export async function BrandSettings({ slug }: { slug: string }) {
  return (
    <div className="p-4 flex flex-col gap-8">
      <BrandStatus slug={slug} />
      <ManageBrandManagers slug={slug} />
    </div>
  );
}
