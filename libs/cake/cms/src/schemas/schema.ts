import { type SchemaTypeDefinition } from "sanity";

import site from "./site";
import brand from "./brand";
import content from "./content";
import page from "./page";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [site, brand, content, page],
};
