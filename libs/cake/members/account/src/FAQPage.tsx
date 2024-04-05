import { getPage } from "@danklabs/cake/services/admin-service";
import { RenderContent } from "@danklabs/cake/cms-content";

export async function FAQPage() {
  const page = await getPage("faq");

  return (
    <div>
      <RenderContent blocks={page.content} />
    </div>
  );
}
