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


    // Блок ХТО МИ Є
    {
      title: 'Верхній текст',
      name: 'whoWeArePrimary',
      type: 'text',
      group: "content",
      hidden: ({ document }) => document && document.title !== 'Хто ми є',
    },
    {
      title: 'Нижній текст',
      name: 'whoWeAreSecondary',
      type: 'text',
      group: "content",
      hidden: ({ document }) => document && document.title !== 'Хто ми є',
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
      hidden: ({ document }) => document && document.title !== 'Хто ми є',
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
      hidden: ({ document }) => document && document.title !== 'Хто ми є',
    },
    // Кінець опису ХТО МИ Є

    // Блок НАШІ ЦІННОСТІ
    {
      name: 'valuesMainTitle',
      title: 'Головний девіз',
      type: 'string',
      group: "content",
      hidden: ({ document }) => document && document.title !== 'Наші цінності',
    },
    {
      title: 'Список цінностей',
      name: 'valuesList',
      type: 'array',
      group: "content",
      of: [{
        title: 'Опис картки',
        name: 'valueItem',
        type: 'document',
        group: "content",
        fields: [
          {
            title: "Заголовок",
            name: 'valueTitle',
            type: 'string'
          },
          {
            name: 'valueDescription',
            title: 'Опис',
            type: 'text'
          },
          {
            title: 'Картинка',
            name: 'valueImage',
            type: 'image',
            description: 'Зображення повинно бути розміром 640 на 480 пікселів, формату png та з білим або прозорим фоном',
            fields: [
              {
                name: 'caption',
                type: 'string',
                title: 'Підпис до зображення',
              },
            ],
          },
        ]
      }],
      hidden: ({ document }) => document && document.title !== 'Наші цінності',
    },
    // Кінець опису НАШІ ЦІННОСТІ

    // Блок БУКЛЕТИ
    {
      title: 'Картки буклетів',
      name: 'bookletsList',
      type: 'array',
      group: "content",
      of: [
        {
          title: 'Опис картки',
          name: 'bookletItem',
          type: 'document',
          group: "content",
          fields: [
            {
              title: 'Заголовок',
              name: 'title',
              type: 'string',
            },
            {
              title: 'Картки',
              name: 'bookletsInnerList',
              type: 'array',
              description: 'Увага! Усі прикріплені зображення повинні бути з однаковими співвідношеннями сторін',
              of: [
                {
                  title: 'Опис картки',
                  name: 'bookletInnerItem',
                  type: 'document',
                  group: "content",
                  fields: [
                    {
                      title: 'Заголовок буклета',
                      name: 'bookletInnerTitle',
                      type: 'string',
                      description: 'Заголовок лише відображається тут, в адмінці (на сайті не відображається)'
                    },
                    {
                      title: 'Посилання на буклет',
                      name: 'bookletURL',
                      type: 'url',
                    },
                    {
                      title: 'Прев\'ю буклета',
                      name: 'bookletPreview',
                      type: 'image',
                      fields: [{
                        name: 'caption',
                        type: 'string',
                        title: 'Підпис до зображення',
                        description: 'Можна продублювати із заголовка'
                      }],
                    }
                  ]
                }

              ]
            }
          ]
        }
      ],
      hidden: ({ document }) => document && document.title !== 'Буклети',
    },
    // Кінець опису БУКЛЕТИ

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
            name: 'faQuestion',
            type: 'string'
          },
          {
            name: 'faAnswer',
            title: 'Відповідь',
            type: 'blockContent',
          },
        ]
      }],
      hidden: ({ document }) => document && document.title !== 'Часті питання',
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
      // slug: 'slug',
    },
    prepare(selection) {
      const { title, positionNumber } = selection;
      const sub = `Порядковість блоків: ${positionNumber}`;
      return {
        title: title,
        subtitle: sub,
      }
    },
  },
})
