import { getPage } from "@danklabs/cake/services/admin-service";
import { RenderContent } from "@danklabs/cake/cms-content";

export default async function Page() {
  const page = await getPage("support");

  return (
    <div className="flex flex-row justify-center w-full">
      <div className="prose-dark">
        <RenderContent blocks={page.content} />
      </div>
    </div>
  );
}
