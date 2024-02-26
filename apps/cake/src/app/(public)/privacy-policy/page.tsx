import { getPage } from "@danklabs/cake/cms";
import { RenderContent } from "@danklabs/cake/cms-content";

export default async function Page() {
  const page = await getPage("privacy-policy");

  return (
    <div className="flex flex-row justify-center bg-white w-full">
      <div className="prose">
        <RenderContent blocks={page.content} />
      </div>
    </div>
  );
}
