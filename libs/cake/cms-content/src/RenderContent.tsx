import { PortableText } from "@portabletext/react";
import { FAQ } from "./FAQ";
import { ContentImageComponent } from "./ContentImage";

const components = {
  types: {
    image: ContentImageComponent,
    faq: FAQ,
  },
};

export function RenderContent({ blocks }: { blocks: any[] }) {
  return <PortableText value={blocks} components={components} />;
}
