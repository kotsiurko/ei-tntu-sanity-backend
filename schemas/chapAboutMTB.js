import { defineField, defineType } from 'sanity'
import { MdAccountBalance as icon } from 'react-icons/md'

export default defineType({
  name: 'about-mtb',
  title: 'Кафедра/Матеріально-технічна база',
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
      group: 'content',
    }),

    defineField({
      name: 'metaDescription',
      title: 'Мета-опис',
      type: 'string',
      group: 'content',
      description:
        'Цей опис необхідний для пошуковиків для кращого просування сайту. Тут коротко необхідно вказати про що сторінка',
      validation: (Rule) =>
        Rule.required().max(180).error('Опис має бути не більшим 180-ти символів'),
    }),

    defineField({
      name: 'positionNumber',
      title: 'Порядковий номер',
      type: 'number',
      group: 'serviceField',
    }),

    defineField({
      name: 'slug',
      title: 'Відносне посилання URL (slug)',
      type: 'slug',
      group: 'serviceField',
      options: {
        source: 'title',
        maxLength: 100,
      },
    }),

    defineField({
      name: 'body',
      title: 'Структура',
      type: 'blockContent',
      group: 'content',
    }),

    // Сторінка
    // /about/material-and-technical-base/educational-labs
    // Навчальні лабораторії
    defineField({
      name: 'labsList',
      title: 'Список лабораторій',
      group: 'content',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'labNumber',
              title: 'Номер',
              type: 'string',
            }),
            defineField({
              name: 'labTitle',
              title: 'Назва лабораторії (аудиторії)',
              type: 'string',
            }),
            defineField({
              name: 'labArea',
              title: 'Площа, кв. м',
              type: 'number',
            }),
            defineField({
              name: 'labSittingPlaces',
              title: 'Кількість місць',
              type: 'number',
            }),
            defineField({
              name: 'labChief',
              title: 'Відповідальна особа',
              type: 'string',
            }),
            defineField({
              name: 'labChiefUrl',
              description: 'https://tntu.org.ua/',
              title: 'Посилання на сторінку відповідальної особи',
              type: 'url',
            }),
            defineField({
              name: 'labDisciplines',
              title: 'Закріплені дисципліни',
              type: 'array',
              of: [{ type: 'teachingSubjectItem' }],
              description: 'Введіть назву дисципліни, а також її ID в системі ATutor',
            }),
            defineField({
              name: 'lab3DTour',
              title: 'Посилання на 3D тур',
              type: 'url',
            }),
            defineField({
              name: 'labGallery',
              title: 'Фотогалерея',
              type: 'array',
              // description: 'Тут будуть рекомендації щодо розмірів фотографії та її пропорцій',
              of: [
                {
                  type: 'image',
                  options: {
                    hotspot: true,
                  },
                  fields: [
                    {
                      name: 'caption',
                      type: 'string',
                      title: 'Підпис до зображення',
                    },
                  ],
                  preview: {
                    select: { title: 'caption', media: 'asset', subtitle: 'attribution' },
                    prepare(selection) {
                      const { title, media, subtitle } = selection
                      return {
                        title: title,
                        media: media,
                        subtitle: subtitle,
                      }
                    },
                  },
                },
              ],
            }),
          ],

          preview: {
            select: {
              title: 'labTitle',
              sub: 'labNumber',
            },
            prepare(selection) {
              const { title, sub } = selection
              return {
                title: title,
                subtitle: sub,
              }
            },
          },
        },
      ],
      hidden: ({ document }) =>
        document &&
        document.slug &&
        document.slug.current !== '/about/material-and-technical-base/educational-labs',
    }),
  ],

  orderings: [
    {
      title: 'Порядковий номер | Зростання',
      name: 'publishedDateSorting',
      by: [{ field: 'positionNumber', direction: 'asc' }],
    },
    {
      title: 'Порядковий номер | Спадання',
      name: 'publishedDateSorting',
      by: [{ field: 'positionNumber', direction: 'desc' }],
    },
  ],

  preview: {
    select: {
      title: 'title',
      positionNumber: 'positionNumber',
      slug: 'slug',
    },
    prepare(selection) {
      const { title, positionNumber, slug } = selection
      const sub = `${positionNumber} | ${slug.current}`
      return {
        title: title,
        subtitle: sub,
      }
    },
  },
})
