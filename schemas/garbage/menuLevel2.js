import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'menuLevel2',
  type: 'document',
  title: 'Меню сайту. Пункти другого рівня',
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
      of: [{
        name: 'menuLevel3',
        type: 'string',
        title: 'Пункти та підпункти',
      }]
    }
  ]
})