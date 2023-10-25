import { defineField, defineType } from 'sanity'
import { MdSentimentNeutral as icon } from 'react-icons/md'

export default defineType({
  name: 'bachelor',
  title: 'Бакалавру',
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
      title: 'Посилання на документ',
      name: 'docURL',
      type: 'string',
      group: "content",
      hidden: ({ document }) => document && document.slug && document.slug.current !== '/bachelor/сonsultations',
    },


    // РОЗКЛАД ДЗВІНКІВ
    // Тривалість пари
    {
      title: 'РОЗКЛАД ДЗВІНКІВ. Тривалість пари, в хв',
      name: 'lessonDuration',
      type: 'number',
      group: "content",
      hidden: ({ document }) => document && document.slug && document.slug.current !== '/bachelor/schedules-of-educational-process',
    },
    // Масив із годинами початку пар
    {
      title: 'РОЗКЛАД ДЗВІНКІВ. Початок кожної пари',
      name: 'callSchedule',
      type: 'array',
      group: "content",
      of: [{
        type: 'datetime',
        options: {
          timeStep: 5,
          timeFormat: 'HH:mm',
        },
      }],
      description: "Дату можна не обирати, лише вказати правильний час початку кожної пари",
      hidden: ({ document }) => document && document.slug && document.slug.current !== '/bachelor/schedules-of-educational-process',
    },

    // {
    //   title: 'Розклад дзвінків',
    //   name: 'callSchedule',
    //   type: 'datetime',
    //   group: "content",
    //   options: {
    //     timeStep: 5,
    //     timeFormat: 'HH:mm',
    //   },
    //   hidden: ({ document }) => document && document.slug && document.slug.current !== '/bachelor/schedules-of-educational-process',
    // },

    {
      title: 'Відмітити, якщо заповнюєте сторінку "Академічна доброчесність"',
      name: 'academicHonesty',
      type: 'boolean',
      options: {
        layout: 'checkbox',
      },
      group: "serviceField",
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
        subtitle: sub,
      }
    },
  },
})
