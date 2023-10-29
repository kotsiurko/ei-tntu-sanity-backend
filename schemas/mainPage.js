import { defineField, defineType } from 'sanity'
import { MdAnnouncement as icon } from 'react-icons/md'

export default defineType({
  name: 'mainPage',
  title: 'Головна сторінка',
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
      title: 'Назва',
      type: 'string',
      group: "content",
      // ! РОЗКОМЕНТУВАТИ, коли завершу створення блоків в адмінці !
      // readOnly: true,
    }),

    defineField({
      name: 'positionNumber',
      title: 'Порядковий номер',
      type: 'number',
      group: "serviceField",
    }),

    // defineField({
    //   name: 'slug',
    //   title: 'Посилання на блок',
    //   type: 'slug',
    //   group: "serviceField",
    //   // ! РОЗКОМЕНТУВАТИ, коли завершу створення блоків в адмінці !
    //   // readOnly: true,
    //   options: {
    //     source: 'title',
    //     maxLength: 100,
    //   },
    // }),

    // Блок ХТО МИ Є
    {
      title: 'Верхній текст',
      name: 'whoWeArePrimary',
      type: 'text',
      group: "content",
      hidden: ({ document }) => document && document.slug && document.slug.current !== 'whoWeAre',
    },
    {
      title: 'Нижній текст',
      name: 'whoWeAreSecondary',
      type: 'text',
      group: "content",
      hidden: ({ document }) => document && document.slug && document.slug.current !== 'whoWeAre',
    },
    {
      title: 'Загальне фото',
      name: 'whoWeArePhoto',
      type: 'image',
      fields: [
        {
          name: 'caption',
          type: 'string',
          title: 'Підпис до зображення',
        },
      ],
      group: "content",
      hidden: ({ document }) => document && document.slug && document.slug.current !== 'whoWeAre',
    },
    {
      title: 'Лічильники',
      name: 'whoWeAreCounter',
      type: 'array',
      group: "content",
      of: [{
        title: 'Лічильник із текстом',
        name: 'counterItem',
        type: 'document',
        fields: [
          {
            title: "Текст над числом",
            name: 'counterItemPrimary',
            type: 'string'
          },
          {
            title: "Число",
            name: 'counterItemNumber',
            type: 'number'
          },
          {
            title: "Текст під числом",
            name: 'counterItemSecondary',
            type: 'string'
          },
        ]
      }],
      hidden: ({ document }) => document && document.slug && document.slug.current !== 'whoWeAre',
    },
    // Кінець опису ХТО МИ Є

    // Блок ЧАСТІ ПИТАННЯ
    {
      title: 'Список запитань',
      name: 'faqList',
      type: 'array',
      group: "content",
      of: [{
        title: 'Запитання-відповідь',
        name: 'faqItem',
        type: 'document',
        fields: [
          {
            title: "Запитання",
            name: 'faQustion',
            type: 'string'
          },
          {
            name: 'faAnswer',
            title: 'Відповідь',
            type: 'blockContent',
          },
        ]
      }],
      hidden: ({ document }) => document && document.slug && document.slug.current !== 'faq',
    },
    // Кінець опису Посилання на НАВЧАЛЬНІ ПЛАНИ
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
