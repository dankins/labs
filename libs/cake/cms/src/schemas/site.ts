"use client";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "site",
  title: "Site",
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
      name: "membersOnlyText",
      title: "Members Only Text",
      type: "string",
    }),
  ],
  preview: {
    select: {
      title: "name",
      media: "image",
    },
  },
});
