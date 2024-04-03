import { type SchemaTypeDefinition } from "sanity";
import { structureTool, StructureBuilder } from "sanity/structure";
import site from "./site";
import brand from "./brand";
import content from "./content";
import page from "./page";
import faq from "./faq";
import orderRank from "./orderRank";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [site, brand, content, page, faq, orderRank],
};
