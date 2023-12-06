"use client";
import { defineField, defineType } from "sanity";

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
  ],
  preview: {
    select: {
      title: "name",
      media: "image",
    },
  },
});

export default BrandType;

export type Brand = (typeof BrandType)[];
