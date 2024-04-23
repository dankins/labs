/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...index]]/page.tsx` route
 */

import { visionTool } from "@sanity/vision";
import { colorInput } from "@sanity/color-input";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId } from "./sanity/env";
import { schema } from "@danklabs/cake/cms";

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schema' folder
  schema,
  plugins: [
    structureTool({
      structure: (S, context) => {
        return S.list()
          .title("Content")
          .items([
            // Minimum required configuration
            orderableDocumentListDeskItem({
              type: "brand",
              title: "Brand",
              S,
              context,
            }),
            orderableDocumentListDeskItem({
              type: "content",
              title: "Content",
              S,
              context,
            }),
            orderableDocumentListDeskItem({
              type: "product",
              title: "Product",
              S,
              context,
            }),
            S.documentTypeListItem("faq"),
            S.documentTypeListItem("page"),
            S.documentTypeListItem("site"),

            // ... all other desk items
          ]);
      },
    }),
    // Vision is a tool that lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
    colorInput(),
  ],
});
