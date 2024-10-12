import { defineField, defineType } from 'sanity'
import { MdSettingsInputAntenna as icon } from 'react-icons/md'

export default defineType({
  name: 'science',
  title: 'Наука',
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
        'Цей опис необхідний для пошуковиків для кращого просування сайту. Коротко необхідно вказати про що дана сторінка',
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
      title: 'Текстовий вміст сторінки',
      type: 'blockContent',
      group: 'content',
      hidden: ({ document }) =>
        document &&
        document.slug &&
        document.slug.current === '/science/main-scientific-publications',
    }),

    // ==========================================
    // Сторінка Наукова діяльність студентів
    defineField({
      name: 'sciStudActiv',
      title: 'Наукова діяльність студентів',
      type: 'array',
      group: 'content',
      of: [
        {
          title: 'Список',
          name: 'sciStudActivList',
          type: 'document',
          fields: [
            {
              title: 'Назва конференції/зьірника',
              name: 'sciStudActivItemTitle',
              type: 'string',
            },
            {
              name: 'itemPhoto',
              title: 'Зображення збірника',
              type: 'image',
              // options: {
              //   hotspot: true,
              //   collapsible: true,
              //   collapsed: false,
              // },
              // description:
              //   'Співвідношення сторін фото має бути 3х4, і розміром не менше як 640х850px',
            },
            {
              name: 'itemUrl',
              title: 'Посилання на збірник',
              type: 'url',
            },
          ],
        },
      ],
      hidden: ({ document }) =>
        document &&
        document.slug &&
        document.slug.current !== '/science/students-scientific-activity',
    }),
    // ==========================================

    // ==========================================
    // Сторінка Головні наукові публікації
    defineField({
      name: 'sciPublTypes',
      title: 'Публікації',
      type: 'array',
      group: 'content',
      of: [
        {
          title: 'Публікації за типом',
          name: 'sciType',
          type: 'document',
          fields: [
            {
              title: 'Тип публікації',
              name: 'sciPublType',
              type: 'string',
            },
            {
              name: 'publBody',
              title: 'Вміст, список публікацій',
              type: 'blockContent',
            },
          ],
        },
      ],
      hidden: ({ document }) =>
        document &&
        document.slug &&
        document.slug.current !== '/science/main-scientific-publications',
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
      console.log('selection Person:>> ', selection)
      const { title, positionNumber, slug } = selection
      const sub = `${positionNumber} | ${slug.current}`
      return {
        title: title,
        // media: media,
        subtitle: sub,
      }
    },
  },
})
