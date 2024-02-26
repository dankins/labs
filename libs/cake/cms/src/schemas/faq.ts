import { defineType } from "sanity";

const FAQ = defineType({
  name: "faq",
  title: "FAQ",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "questions",
      title: "Questions",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "question",
              title: "Question",
              type: "string",
            },
            {
              name: "answer",
              title: "Answer",
              type: "array",
              of: [
                {
                  type: "block",
                },
              ],
            },
          ],
          preview: {
            select: {
              title: "question",
              subtitle: "answer",
            },
            prepare(selection) {
              const { title, subtitle } = selection;
              return {
                title: title,
                subtitle: subtitle[0].children?.[0].text,
              };
            },
          },
        },
      ],
    },
  ],
});

export default FAQ;

export type FAQType = (typeof FAQ)[];
