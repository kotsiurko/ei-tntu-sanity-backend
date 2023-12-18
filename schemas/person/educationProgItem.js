import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'educationProgItem',
  title: 'Картка освітньої програми',
  type: 'object',
  fields: [
    defineField({
      name: 'edProgTitle',
      title: 'Назва освітньої програми',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'edProgURL',
      title: 'Посилання на освітню програму',
      description: "Завантажте документ в форматі pdf або docx",
      type: 'url',
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'edProgReviewsList',
      title: 'Рецензії на програму',
      type: 'array',
      of: [
        {
          name: 'edProgReviewItem',
          title: 'Рецензія на програму',
          type: 'object',
          fields: [
            defineField({
              name: 'edProgReviewTitle',
              title: 'Назва рецензії',
              type: 'string',
            }),
            defineField({
              name: 'edProgReviewURL',
              title: 'Посилання на програму',
              type: 'url',
              description: "Завантажте документ в форматі pdf або docx"
            }),
          ],
        }
      ]
    }),
  ],
  preview: {
    select: {
      title: 'edProgTitle',
    },
    prepare(selection) {
      return {
        title: selection.title,
      }
    },
  },
})
