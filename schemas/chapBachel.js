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
    }),

    // ==============================================
    // СТОРІНКА НАВЧАЛЬНІ ПЛАНИ
    defineField({
      name: 'eduPlansList',
      title: 'Список Навчальних планів',
      group: 'content',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'eduPlanTitle',
              title: 'Заголовок навчального плану',
              type: 'string',
            }),
            defineField({
              name: 'eduPlanURL',
              description: 'Скопіювати URL документу з медіа галереї (вкладка MEDIA)',
              title: 'Посилання на навчальний план',
              type: 'url',
            }),
          ],
        },
      ],
      hidden: ({ document }) =>
        document && document.slug && document.slug.current !== '/bachelor/educational-plans',
    }),
    // ==============================================

    // ==========================================
    // Сторінка МЕТОДИЧНІ РЕКОМЕНДАЦІЇ ДО КУРСОВИХ ПРОЕКТІВ
    defineField({
      name: 'blankList',
      title: 'Методичні рекомендації до курсових проєктів',
      group: 'content',
      type: 'array',
      of: [{ type: 'titleAndLinkList' }],
      hidden: ({ document }) =>
        document &&
        document.slug &&
        document.slug.current !== '/bachelor/methodological-recommendations-for-courseworks',
    }),
    // ==========================================

    // ==============================================
    // СТОРІНКА КОНСУЛЬТАЦІЇ
    defineField({
      title: 'Посилання на документ',
      name: 'docURL',
      type: 'url',
      description:
        'Відображатиметься на сторінці в спеціальному переглядачі. Доступні формати pdf та docx',
      group: 'content',
      hidden: ({ document }) =>
        document && document.slug && document.slug.current !== '/bachelor/consultations',
    }),
    // ==============================================

    // ==========================================
    // Сторінка ВИКОНАННЯ КВАЛІФІКАЦІЙНИХ РОБІТ БАКАЛАВРІВ
    defineField({
      name: 'docsForBachThesisList',
      title: 'Необхідні документи для виконання кваліфікаційних робіт бакалавра',
      group: 'content',
      type: 'array',
      of: [{ type: 'titleAndLinkList' }],
      hidden: ({ document }) =>
        document &&
        document.slug &&
        document.slug.current !== '/bachelor/performance-of-qualification-works-of-bachelors',
    }),
    // ==========================================

    // ==============================================
    // СТОРІНКА "ГРАФІКИ НАВЧАЛЬНОГО ПРОЦЕСУ"
    // РОЗКЛАД ДЗВІНКІВ
    // Тривалість пари
    defineField({
      title: 'РОЗКЛАД ДЗВІНКІВ. Тривалість пари, в хв',
      name: 'lessonDuration',
      type: 'number',
      group: 'content',
      hidden: ({ document }) =>
        document &&
        document.slug &&
        document.slug.current !== '/bachelor/schedules-of-educational-process',
    }),
    // Масив із годинами початку пар
    defineField({
      title: 'РОЗКЛАД ДЗВІНКІВ. Початок кожної пари',
      name: 'callSchedule',
      type: 'array',
      group: 'content',
      of: [
        {
          type: 'datetime',
          options: {
            timeStep: 5,
            timeFormat: 'HH:mm',
          },
        },
      ],
      description:
        'У випадаючому вікні слід обирати лише час, на дату можна не зважати. Дату можна залишити будь-якою, вона на сайті не відображатиметься. Відображається лише час',
      hidden: ({ document }) =>
        document &&
        document.slug &&
        document.slug.current !== '/bachelor/schedules-of-educational-process',
    }),

    // блок ГРАФІК НАВЧАЛЬНИХ ТИЖНІВ
    // Рядок із зазначення періоду навчання/ семестру
    defineField({
      name: 'semesterPeriod',
      title: 'ГРАФІК НАВЧАЛЬНИХ ТИЖНІВ. Період навчання',
      type: 'string',
      group: 'content',
      description:
        'Текст відображається під заголовком і зазначає період для якого генерується графік. напр.: "Осінній семестр 2023-2024 навчального року"',
      hidden: ({ document }) =>
        document &&
        document.slug &&
        document.slug.current !== '/bachelor/schedules-of-educational-process',
    }),

    defineField({
      name: 'weeksAmount',
      title: 'ГРАФІК НАВЧАЛЬНИХ ТИЖНІВ. Кількість навчальних тижнів',
      type: 'number',
      group: 'content',
      description: 'Для осіннього семестру може бути 14 тижнів, для весняного - 18 тощо',
      hidden: ({ document }) =>
        document &&
        document.slug &&
        document.slug.current !== '/bachelor/schedules-of-educational-process',
    }),

    defineField({
      name: 'semesterStarts',
      title: 'ГРАФІК НАВЧАЛЬНИХ ТИЖНІВ. Дата початку семестру',
      type: 'date',
      group: 'content',
      description:
        'Зверніть увагу, що неділя у випадаючому календарі - початок тижня, тому уважно обирайте понеділок - Mon. Таблиця генеруватиметься автоматично, відштовхуючись від цієї дати',
      hidden: ({ document }) =>
        document &&
        document.slug &&
        document.slug.current !== '/bachelor/schedules-of-educational-process',
    }),

    {
      title: 'ГРАФІКИ ОСВІТНЬОГО ПРОЦЕСУ',
      name: 'eduPlanList',
      type: 'array',
      group: 'content',
      of: [
        {
          title: 'Графік',
          name: 'eduPlanItem',
          type: 'document',
          fields: [
            {
              title: 'Назва графіку',
              name: 'eduPlanTitle',
              type: 'string',
            },
            {
              title: 'Посилання',
              name: 'eduPlanURL',
              description:
                'Відображатиметься на сторінці в спеціальному переглядачі. Доступні формати pdf та docx',
              type: 'url',
            },
          ],
        },
      ],
      hidden: ({ document }) =>
        document &&
        document.slug &&
        document.slug.current !== '/bachelor/schedules-of-educational-process',
    },
    // Кінець опису сторінки "ГРАФІКИ НАВЧАЛЬНОГО ПРОЦЕСУ"
    // ==============================================

    // ==============================================
    //
    // Сторінка ПРАКТИКИ
    //
    // ==============================================
    {
      title: 'Список практик',
      name: 'bachPracticesList',
      type: 'array',
      group: 'content',
      description:
        'Порядок відображення практик можна змінювати вручну переміщенням елементів поміж собою. Для зручності, розміщуйте І курс (денники, заочники, іноземці). дальше ІІ курс і так далі...',
      of: [{ type: 'practiceItem' }],
      hidden: ({ document }) =>
        document && document.slug && document.slug.current !== '/bachelor/practices',
    },
    // Кінець сторінки ПРАКТИКИ
    // ======================================

    {
      title: 'Відмітити, якщо заповнюєте сторінку "Академічна доброчесність"',
      name: 'academicHonesty',
      type: 'boolean',
      options: {
        layout: 'checkbox',
      },
      group: 'serviceField',
    },
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
        subtitle: sub,
      }
    },
  },
})
