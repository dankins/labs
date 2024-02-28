import { getPage } from "@danklabs/cake/cms";
import { RenderContent } from "@danklabs/cake/cms-content";

export default async function Page() {
  const page = await getPage("privacy-policy");

  return (
    <div className="flex flex-row justify-center w-full">
      <div className="prose-dark">
        <RenderContent blocks={page.content} />
      </div>
    </div>
  );
}
