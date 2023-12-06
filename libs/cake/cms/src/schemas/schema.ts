import { type SchemaTypeDefinition } from "sanity";

import site from "./site";
import brand from "./brand";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [site, brand],
};
