import { getPage } from "@danklabs/cake/cms";
import { RenderContent } from "@danklabs/cake/cms-content";

export async function FAQPage() {
  const page = await getPage("faq");

  return (
    <div>
      <RenderContent blocks={page.content} />
    </div>
  );
}
