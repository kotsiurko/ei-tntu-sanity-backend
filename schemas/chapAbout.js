import { defineField, defineType } from 'sanity'
import { MdAccountBalance as icon } from 'react-icons/md'

export default defineType({
  name: 'about',
  title: 'Кафедра',
  type: 'document',
  icon,
  groups: [
    {
      name: 'content',
      title: 'Контент',
      default: true,
    },
    {
      name: 'serviceField',
      title: 'Службові поля',
    },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: "content",
    }),

    defineField({
      name: 'metaDescription',
      title: 'Мета-опис',
      type: 'string',
      group: "content",
      description: 'Цей опис необхідний для пошуковиків для кращого просування сайту. Коротко необхідно вказати про що дана сторінка',
      validation: Rule => Rule.required().max(180).error('Опис має бути не більшим 180-ти символів'),
    }),

    defineField({
      name: 'positionNumber',
      title: 'Порядковий номер',
      type: 'number',
      group: "serviceField",
    }),

    defineField({
      name: 'slug',
      title: 'Відносне посилання URL (slug)',
      type: 'slug',
      group: "serviceField",
      options: {
        source: 'title',
        maxLength: 100,
      },
    }),

    defineField({
      name: 'body',
      title: 'Структура',
      type: 'blockContent',
      group: "content",
    }),

    defineField({
      name: 'docURL',
      title: 'Посилання на електронний документ',
      group: "content",
      type: 'url',
      hidden: ({ document }) => document && document.slug && document.slug.current !== '/about/strategy',
    }),

    defineField({
      name: 'contacts',
      title: 'Контакти',
      group: "content",
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({
            name: 'location',
            title: 'Заголовок блоку',
            type: 'string',
          }),
          defineField({
            name: 'address',
            title: 'Адреса',
            type: 'blockContent',
          }),
          defineField({
            name: 'callUs',
            title: 'Телефонуйте',
            type: 'string',
          }),
          defineField({
            name: 'mailUs',
            title: 'Пишіть',
            type: 'blockContent',
          }),
          defineField({
            name: 'openHours',
            title: 'Ми відкриті',
            type: 'string',
          }),
          defineField({
            name: 'src',
            title: 'Вставити src карти',
            type: 'url',
          }),
        ],
      }],
      hidden: ({ document }) => document && document.slug && document.slug.current !== '/about/contacts',
    }),
  ],

  orderings: [
    {
      title: 'Порядковий номер | Зростання',
      name: 'publishedDateSorting',
      by: [
        { field: 'positionNumber', direction: 'asc' }
      ]
    },
    {
      title: 'Порядковий номер | Спадання',
      name: 'publishedDateSorting',
      by: [
        { field: 'positionNumber', direction: 'desc' }
      ]
    },
  ],

  preview: {
    select: {
      title: 'title',
      positionNumber: 'positionNumber',
      slug: 'slug',
    },
    prepare(selection) {
      const { title, positionNumber, slug } = selection;
      const sub = `${positionNumber} | ${slug.current}`;
      return {
        title: title,
        subtitle: sub,
      }
    },
  },
})
