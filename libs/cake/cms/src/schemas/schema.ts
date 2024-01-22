import { type SchemaTypeDefinition } from "sanity";

import site from "./site";
import brand from "./brand";
import content from "./content";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [site, brand, content],
};
