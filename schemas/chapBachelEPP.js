import { defineField, defineType } from 'sanity'
import { MdSentimentVerySatisfied as icon } from 'react-icons/md'

export default defineType({
  name: 'bachelor-epp',
  title: 'Бакалавру / Освітньо-професійні програми',
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
      title: 'Текстовий вміст сторінки',
      type: 'blockContent',
      group: "content",
      readOnly: ({ document }) => document && document.slug && document.slug.current === '/bachelor/educational-and-professional-programs/strategy',
    }),

    defineField({
      name: 'remark',
      title: 'Увага! Вказівка для редакторів!',
      type: 'text',
      group: "content",
      readOnly: true,
      rows: 8,
      hidden: ({ document }) => document && document.slug && document.slug.current === '/bachelor/educational-and-professional-programs/strategy',
    }),

    // defineField({
    //   name: 'personReferences',
    //   title: 'Гарант ОПП',
    //   type: 'array',
    //   group: "content",
    //   of: [{ type: 'reference', to: { type: 'person' } }],
    //   hidden: ({ document }) => document && document.slug && document.slug.current !== '/bachelor/educational-and-professional-programs/programs-and-guarantor',
    // }),

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
