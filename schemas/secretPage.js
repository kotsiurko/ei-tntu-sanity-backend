import { defineField, defineType } from 'sanity'
import { MdNotInterested as icon } from 'react-icons/md'

export default defineType({
  name: 'secretPage',
  title: 'Секретна сторінка',
  type: 'document',
  icon,

  fields: [
    defineField({
      name: 'pageTitle',
      title: "Заголовок сторінки",
      readOnly: ({ document }) => document && document.pageTitle === 'Налаштування пароля',
      type: 'string',
    }),

    defineField({
      name: 'year',
      title: 'Рік',
      type: 'number',
      description: "Рік потрібно вказати для коректного сортування документів у лівій колонці",
      hidden: ({ document }) => document && document.pageTitle === 'Налаштування пароля',
    }),

    defineField({
      name: 'secretPagePass',
      title: "Пароль доступу до секретної сторінки",
      type: 'string',
      hidden: ({ document }) => document && document.pageTitle !== 'Налаштування пароля',
    }),

    defineField({
      name: 'docs',
      title: 'Документи',
      type: 'array',
      hidden: ({ document }) => document && document.pageTitle === 'Налаштування пароля',
      of: [
        {
          name: 'docItem',
          title: 'Пункт',
          type: 'document',
          fields: [
            {
              name: 'docTitle',
              title: 'Назва документу',
              type: 'string',
            },
            {
              name: 'docNumber',
              title: 'Номер документу',
              type: 'string',
            },
            {
              name: 'publishedDate',
              title: "Дата публікації (Опубліковано)",
              type: 'date',
              options: {
                dateFormat: 'YYYY-MM-DD',
                calendarTodayLabel: 'Today'
              }
            },
            {
              name: 'docForWhom',
              title: 'Для кого',
              type: 'string',
            },
            {
              title: 'Категорії документів:',
              name: 'docCats',
              type: 'string',
              options: {
                list: [
                  'по університету',
                  'з кадрових питань',
                  'по роботі ЕК',
                  'практика',
                  'різне',
                ],
              },
            },
            {
              name: 'docUrl',
              title: 'Посилання на документ',
              type: 'string',
            },
          ],

          preview: {
            select: {
              title: 'docTitle',
              publishedDate: 'publishedDate',
              docNumber: 'docNumber',
            },
            prepare(selection) {
              const { title, publishedDate, docNumber } = selection;

              return {
                title: `${title}`,
                // media: media,
                subtitle: `Опубліковано ${publishedDate} | № ${docNumber}`,
              }
            },
          },
        }

      ],

    }),
  ],

  orderings: [
    {
      title: 'Рік | Свіжіші документи вище',
      name: 'publishedDateSorting',
      by: [
        { field: 'year', direction: 'desc' }
      ]
    },
    {
      title: 'Рік | Старіші документи вище',
      name: 'publishedDateSorting',
      by: [
        { field: 'year', direction: 'asc' }
      ]
    },
  ],

  preview: {
    select: {
      title: "pageTitle",
    },
  },
})
