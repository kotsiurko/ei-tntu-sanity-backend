import { defineField, defineType } from 'sanity'
import { MdBuild as icon } from 'react-icons/md'

export default defineType({
  name: 'intresting',
  title: 'Сторінки "Це цікаво"',
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

    // Фотоархів
    {
      title: 'Фотоархів',
      name: 'photoarchive',
      type: 'array',
      group: "content",
      of: [{
        name: 'photoCollection',
        type: 'document',
        fields: [
          {
            title: "Період",
            name: 'period',
            type: 'string'
          },
          {
            title: "Фотографії",
            name: 'periodPhotos',
            type: 'array',
            of: [
              {
                title: 'Фото',
                name: 'photo',
                type: 'image',
                fields: [
                  {
                    name: 'caption',
                    type: 'string',
                    title: 'Підпис до зображення',
                  },
                ],
              },
            ]
          },
        ]
      }],
      hidden: ({ document }) => document && document.slug && document.slug.current !== '/intresting/photoarchive',
    },

    // Публікації в пресі
    {
      title: 'Публікації в пресі',
      name: 'pressPublications',
      type: 'array',
      group: "content",
      of: [{
        name: 'photoCollection',
        type: 'document',
        fields: [
          {
            title: "Заголовок (та для якого ресурсу публікація)",
            name: 'publTitle',
            type: 'string'
          },
          {
            title: "Автори",
            name: 'publAuthors',
            type: 'string'
          },
          {
            title: "Опубліковано в пресі",
            name: 'publDate',
            type: 'datetime'
          },
          {
            title: "Посилання",
            name: 'publUrl',
            type: 'string'
          },
          {
            title: 'Скрін публікації',
            name: 'publScreen',
            type: 'image',
            options: {
              hotspot: true,
              collapsible: true,
              collapsed: false,
            },
            fields: [
              {
                name: 'caption',
                type: 'string',
                title: 'Підпис до зображення',
              },
            ],
            description: "Розгорніть, щоб побачити головне зображення. Також тут будуть рекомендації щодо розмірів фотографії та її пропорцій",
          }
        ]
      }],
      hidden: ({ document }) => document && document.slug && document.slug.current !== '/intresting/press-publications',
    },

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
