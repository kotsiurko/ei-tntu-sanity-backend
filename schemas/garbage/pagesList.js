import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'pageList',
  type: 'document',
  title: 'Карта сайту',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      description: "Тут показані розділи та впорядковуються розділи сайту",
      validation: Rule => Rule.required()
    },

    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    },

    {
      name: 'blocks',
      type: 'array',
      title: 'Розділ сайту',
      of: [
        {
          type: 'reference',
          to: [{ type: 'pageBlockGroup' }]
        }
      ]
    }
  ]
});