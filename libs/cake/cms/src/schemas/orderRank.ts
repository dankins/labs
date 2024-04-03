import { defineType } from "sanity";
import {
  orderRankField,
  orderRankOrdering,
} from "@sanity/orderable-document-list";

export default defineType({
  name: "category",
  title: "Category",
  type: "document",
  // Optional: The plugin also exports a set of 'orderings' for use in other Document Lists
  // https://www.sanity.io/docs/sort-orders
  orderings: [orderRankOrdering],
  fields: [
    // Minimum required configuration
    orderRankField({ type: "category" }),

    // ...all other fields
  ],
});
