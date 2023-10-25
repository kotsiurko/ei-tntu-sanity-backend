import { defineField, defineType } from 'sanity'
import { MdAccountBalance as icon } from 'react-icons/md'
// import moment from 'moment/moment';

export default defineType({
  name: 'newsList',
  title: 'Кафедра/Новини (груповані)',
  type: 'document',
  icon,
  fields: [

    defineField({
      name: 'title',
      title: "Група новин за певний період",
      type: 'string',
      description: 'Напр., новини за квітень 2023 року',
    }),

    defineField({
      name: 'newsArr',
      title: 'Масив новин',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'news' } }],
    }),
  ],

  // hidden: ({ currentUser }) => {
  //   return currentUser?.email !== "kotsiurko@gmail.com" || "kozakateryna@gmail.com"
  //     || "sermuk@gmail.com"
  // },

  orderings: [
    {
      title: 'Період публікації | Свіжіші вище',
      name: 'title',
      by: [
        { field: 'title', direction: 'desc' }
      ]
    },
    {
      title: 'Період публікації | Старіші вище',
      name: 'title',
      by: [
        { field: 'title', direction: 'asc' }
      ]
    },
  ],

  preview: {
    select: {
      title: 'title',
    },
    prepare(selection) {
      // console.log('publishedDate:>> ', selection.publishedDate);
      const { title } = selection;
      // console.log('publishedDate:>> ', publishedDate);
      // const datetime = moment(publishedDate).format("YYYY-MM-DD, HH:mm:ss");

      return {
        title: title,
        // media: media,
        // subtitle: `Опубліковано: ${datetime}`,
      }
    },
  },
})
