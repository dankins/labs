"use client";
import { defineField, defineType } from "sanity";
import {
  orderRankField,
  orderRankOrdering,
} from "@sanity/orderable-document-list";

const ContentType = defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({
      name: "brand",
      title: "Brand",
      type: "reference",
      to: [{ type: "brand" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "image",
      title: "Hero Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "pdpLink",
      title: "Link to PDP",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "productId",
      title: "Product ID",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
    }),
    orderRankField({
      type: "product",
      newItemPosition: "after",
    }),
  ],
  orderings: [orderRankOrdering],
  preview: {
    select: {
      title: "name",
      media: "image",
    },
  },
});

export default ContentType;

export type Content = (typeof ContentType)[];
