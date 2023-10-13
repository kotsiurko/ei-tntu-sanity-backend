import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'pageBlockGroup',
  type: 'document',
  title: 'Розділ сайту',
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
      title: 'Посилання url',
      validation: Rule => Rule.required()
    },

    {
      name: 'pages',
      type: 'array',
      title: 'Масив сторінок',
      of: [
        {
          type: 'reference',
          to: [{ type: 'page' }]
        }
      ]
    }
  ]
})