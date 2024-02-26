import { defineType } from "sanity";

export default defineType(
  {
    title: 'Практика',
    name: 'titleAndLinkList',
    type: 'object',
    fields: [
      {
        title: "Назва",
        name: 'title',
        type: 'string'
      },
      {
        title: "Посилання",
        name: 'link',
        description: 'Можна прикріплювати посилання на doc, docx та pdf',
        type: 'url',
        validation: (Rule) => Rule.required(),
      },
    ],
  })