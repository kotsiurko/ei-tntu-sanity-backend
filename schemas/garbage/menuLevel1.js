import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'menuLevel1',
  type: 'document',
  title: 'Меню сайту. Пункти першого рівня',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Заголовок',
      validation: Rule => Rule.required()
    },

    {
      name: 'url',
      type: 'string',
      title: 'URL',
      validation: Rule => Rule.required()
    },

    {
      name: 'children',
      type: 'array',
      title: 'Пункти та підпункти',
      of: [
        {
          type: 'reference',
          to: [{ type: 'menuLevel2' }]
        }
      ]
    }
  ]
})