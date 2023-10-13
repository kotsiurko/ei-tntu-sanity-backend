import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'page',
  type: 'document',
  title: 'Сторінки сайту',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
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
      name: 'newsItemBody',
      title: 'Вміст сторінки',
      type: 'blockContent',
    },

  ],

  preview: {
    select: {
      pageTitle: 'title',
    },
    prepare(selection) {
      // console.log('selection News:>> ', selection);
      const { pageTitle } = selection;
      // const datetime = moment(publishedDate).format("YYYY-MM-DD, HH:mm:ss");

      return {
        title: pageTitle,
        // subtitle: `Розділ: ${chapter}`,
      }
    },
  },
});