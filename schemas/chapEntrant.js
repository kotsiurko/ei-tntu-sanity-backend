import { defineField, defineType } from 'sanity'
import { MdSentimentVerySatisfied as icon } from 'react-icons/md'

export default defineType({
  name: 'entrant',
  title: 'Сторінки "Абітурієнту"',
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

    {
      title: 'Співпраця зі школами',
      name: 'schoolsCooperation',
      type: 'string',
      description: "Службове поле",
      group: "serviceField",
      readOnly: true,
      hidden: ({ document }) => document && document.slug && document.slug.current !== '/entrant/schools-cooperation',
    },

    {
      title: 'Студентські олімпіади',
      name: 'studentOlympiads',
      type: 'string',
      description: "Службове поле",
      group: "serviceField",
      readOnly: true,
      hidden: ({ document }) => document && document.slug && document.slug.current !== '/entrant/student-olympiads',
    },

    // Масив із відзнаками
    // доступний для заповнення лише на сторінці /entrant/students-honors
    {
      title: 'Відзнаки',
      name: 'studentsHonors',
      type: 'array',
      group: "content",
      of: [{
        title: 'Відзнака',
        name: 'honorItem',
        type: 'document',
        fields: [
          {
            title: "Рік",
            name: 'year',
            type: 'string'
          },
          {
            title: "Список відзнак за рік",
            name: 'honorsPerYear',
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
      hidden: ({ document }) => document && document.slug && document.slug.current !== '/entrant/students-honors',
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
      console.log('selection Person:>> ', selection);
      const { title, positionNumber, slug } = selection;
      const sub = `${positionNumber} | ${slug.current}`;
      return {
        title: title,
        // media: media,
        subtitle: sub,
      }
    },
  },
})
