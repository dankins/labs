"use client";
import { defineField, defineType } from "sanity";
import {
  orderRankField,
  orderRankOrdering,
} from "@sanity/orderable-document-list";

const BrandType = defineType({
  name: "brand",
  title: "Brand",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
    }),
    defineField({
      name: "logo_square",
      title: "Logo - 1:1",
      type: "image",
    }),
    defineField({
      name: "logo",
      title: "Logo ",
      type: "image",
    }),
    defineField({
      // https://help.klaviyo.com/hc/en-us/articles/115005253088
      name: "website",
      title: "Website ",
      type: "string",
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
    }),
    defineField({
      name: "pass_logo",
      title: "Pass Logo",
      type: "image",
    }),
    defineField({
      name: "pass_background",
      title: "Pass Background Mobile",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "pass_background_desktop",
      title: "Pass Background Desktop",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "featured",
      type: "string",
      title: "Featured",
      options: {
        list: [{ title: "Featured", value: "featured" }],
      },
    }),
    defineField({
      name: "pass_color",
      title: "Pass Color",
      type: "color",
    }),
    orderRankField({
      type: "product",
      newItemPosition: "after",
    }),
  ],
  orderings: [orderRankOrdering],
  preview: {
    select: {
      title: "slug.current",
      media: "pass_logo",
    },
  },
});

export default BrandType;

export type Brand = (typeof BrandType)[];
