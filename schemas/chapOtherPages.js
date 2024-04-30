import { defineField, defineType } from 'sanity'
import { MdSubscriptions as icon } from 'react-icons/md'

export default defineType({
  name: 'other',
  title: 'Інші сторінки',
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
      validation: Rule => Rule.required(),
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
      readOnly: true,
    }),

    defineField({
      name: 'slug',
      title: 'Відносне посилання URL (slug)',
      type: 'slug',
      group: "serviceField",
      readOnly: true,
      options: {
        source: 'title',
        maxLength: 100,
      },
    }),

    // ------------------------------
    // СТОРІНКА Герої не вмирають
    {
      title: 'Текст на сторінці',
      name: 'body',
      type: 'blockContent',
      group: "content",
      hidden: ({ document }) => document && document.slug && document.slug.current !== '/other/heroes',
    },

    {
      title: 'Загиблі герої',
      name: 'heroesList',
      type: 'array',
      group: "content",
      of: [
        {
          title: 'Особа',
          name: 'heroPerson',
          type: 'object',
          fields: [
            {
              title: "Посилання",
              name: 'customURL',
              type: 'slug',
              validation: Rule => Rule.required(),
            },
            {
              title: "Прізвище",
              name: 'heroName',
              type: 'string',
              validation: Rule => Rule.required(),
            },
            {
              title: "Ім'я та по батькові",
              name: 'heroSecondAndFatherName',
              type: 'string',
              validation: Rule => Rule.required(),
            },
            {
              title: "Фотографія",
              name: 'heroImage',
              type: 'image',
              options: { hotspot: true },
              validation: Rule => Rule.required(),
            },
            {
              title: "Роки життя",
              name: 'lifeYears',
              type: 'string',
              description: "Рекомендований формат запису '01.01.1909 — ✞ 15.10.1959'",
              validation: Rule => Rule.required(),
            },
            {
              title: "Підпис під іменем",
              name: 'secondaryText',
              type: 'string',
              description: "Це може бути текст 'Випускник 2008 року спеціальності `Електроенергетика, електротехніка та електромеханіка`' тощо",
              validation: Rule => Rule.required(),
            },
            {
              title: 'Основний текст',
              name: 'body',
              type: 'blockContent',
              validation: Rule => Rule.required(),
            },
            {
              title: 'Згадки в мережі',
              name: 'heroPublications',
              type: 'array',
              of: [
                {
                  title: 'Публікація',
                  name: 'heroPublication',
                  type: 'object',
                  fields: [
                    {
                      title: 'Заголовок',
                      name: 'heroPublTitle',
                      type: 'string',
                      validation: Rule => Rule.required(),
                    },
                    {
                      title: 'Короткий текст',
                      name: 'heroPublShortText',
                      type: 'text',
                      rows: 5,
                      validation: Rule => Rule.required().max(170),
                    },
                    {
                      title: 'Джерело',
                      name: 'heroPublSRC',
                      type: 'string',
                      description: 'Напр., "20minut.ua"',
                      validation: Rule => Rule.required(),
                    },
                    {
                      title: 'Посилання на публікацію',
                      name: 'heroPublURL',
                      type: 'url',
                      validation: Rule => Rule.required(),
                    },
                    {
                      title: "Скріншот публікації",
                      name: 'heroPublScreenshot',
                      type: 'image',
                      options: { hotspot: true },
                      description: 'Рекомендовано вставляти зображення розміром 1280х1024 пікселів або близько до них',
                      validation: Rule => Rule.required(),
                    }
                  ],

                  preview: {
                    select: {
                      title: 'heroPublTitle',
                      sub: 'heroPublSRC',
                      image: 'heroPublScreenshot'
                    },
                    prepare(selection) {
                      const { title, sub, image } = selection;
                      return {
                        title: title,
                        subtitle: sub,
                        media: image,
                      }
                    },
                  },
                }
              ]


            }
          ],

          preview: {
            select: {
              firstName: 'heroName',
              restName: 'heroSecondAndFatherName',
              sub: 'secondaryText',
              media: 'heroImage',
            },
            prepare(selection) {
              const { firstName, restName, sub, media } = selection;
              const name = `${firstName} ${restName}`;
              return {
                title: name,
                subtitle: sub,
                media: media,
              }
            },
          },
        }
      ],
      hidden: ({ document }) => document && document.slug && document.slug.current !== '/other/heroes',
    },

    // КІНЕЦЬ СТОРІНКИ Герої не вмирають
    // ------------------------------


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
