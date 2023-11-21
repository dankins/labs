import { type SchemaTypeDefinition } from "sanity";

import site from "./site";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [site],
};
