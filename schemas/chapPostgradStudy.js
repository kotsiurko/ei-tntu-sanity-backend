import { defineField, defineType } from 'sanity'
import { MdSentimentVerySatisfied as icon } from 'react-icons/md'

export default defineType({
  name: 'postgraduate',
  title: 'Сторінки "Аспірантура"',
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
      hidden: ({ document }) => document && document.slug && document.slug.current === '/postgraduate/currently-studying-postgraduate-students',
    }),

    // Масив із аспірантами
    // досупний для заповнення лише на сторінці /postgraduate/currently-studying-postgraduate-students
    {
      title: 'Список аспірантів',
      name: 'postGraduateStudentArray',
      type: 'array',
      group: "content",
      of: [{
        title: 'Аспірант',
        name: 'postGraduateStudent',
        type: 'document',
        fields: [
          {
            title: "Прізвище, ім'я та по батькові",
            name: 'name',
            type: 'string'
          },
          {
            title: 'Фото',
            name: 'photo',
            type: 'image'
          },
          {
            name: 'body',
            title: 'Вміст сторінки',
            type: 'blockContent',
          }
        ]
      }],
      hidden: ({ document }) => document && document.slug && document.slug.current !== '/postgraduate/currently-studying-postgraduate-students',
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
