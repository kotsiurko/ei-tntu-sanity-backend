import { defineField, defineType } from 'sanity'
import { MdPerson as icon } from 'react-icons/md'
import moment from 'moment/moment';

export default defineType({
  name: 'newsList',
  title: 'Список новин',
  type: 'document',
  icon,
  fields: [
    {
      name: 'yearAndMonth',
      title: "Рік та місяць",
      type: 'string',
      description: 'Введіть рік та місяць в форматі "2023-12"',
    },

    defineField({
      name: 'news',
      title: 'Новини',
      type: 'array',
      of: [
        {
          name: 'newsItem',
          title: 'Новина',
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

            // Цей об'єкт не робив через definedField, так як на останньому валідація глючить
            {
              name: 'newsTitle',
              title: "Заголовок",
              type: 'string',
              validation: Rule => Rule.required().max(55).error('Допис має бути не більшим 55-ти символів'),
              group: 'content',
            },

            {
              title: 'Slug',
              name: 'slug',
              type: 'slug',
              group: 'content',
              options: {
                source: 'newsTitle',
                maxLength: 200, // will be ignored if slugify is set
                slugify: input => input
                  .toLowerCase()
                  .replace(/\s+/g, '-')
                  .slice(0, 200)
              }
            },

            // defineField({
            //   name: 'slug',
            //   title: 'Транслітероване відносне посилання',
            //   type: 'slug',
            //   options: {
            //     source: 'newsTitle',
            //     maxLength: 100,
            //   },
            //   description: 'Натисніть GENERATE і посилання автоматично сформується на основі заголовка. При потребі, ви можете його відредагувати',
            //   group: 'content',
            // }),

            defineField({
              name: 'url',
              title: 'Транслітероване відносне посилання',
              type: 'string',
              options: {
                source: 'newsTitle',
                maxLength: 100,
              },
              // description: 'Натисніть GENERATE і посилання автоматично сформується на основі заголовка. При потребі, ви можете його відредагувати',
              group: 'content',
            }),

            defineField({
              name: 'mainPhoto',
              title: 'Головне зображення',
              type: 'image',
              options: {
                hotspot: true,
                collapsible: true,
                collapsed: true,
              },
              fields: [
                {
                  name: 'caption',
                  type: 'string',
                  title: 'Підпис до зображення',
                },
                {
                  name: 'attribution',
                  type: 'string',
                  title: 'Альтерантивний текст (для атрибута alt)',
                }
              ],
              description: "Розгорніть, щоб побачити головне зображення. Також тут будуть рекомендації щодо розмірів фотографії та її пропорцій",
              group: 'content',
            }),


            defineField({
              name: 'publishedDate',
              title: "Дата публікації (Опубліковано)",
              type: 'datetime',
              options: {
                dateFormat: 'YYYY-MM-DD',
                timeFormat: 'HH:mm',
                timeStep: 15,
                calendarTodayLabel: 'Today'
              },
              group: 'content',
            }),

            // Цей об'єкт не робив через definedField, так як на останньому валідація глючить
            {
              name: 'newsItemBodyShort',
              title: 'Тіло публікації. Варіант для попереднього перегляду',
              type: 'text',
              rows: 4,
              description: 'Перші кілька речень тіла публікації, які відображатимуться на сторінці з переліком усіх новин. Можна скопіювати перші 170 символів із блоку нижче та доставити трикрапки',
              validation: Rule => Rule.required().max(175).error('Допис має бути не більшим 175-ти символів'),
              group: 'content',
            },

            defineField({
              name: 'newsItemBody',
              title: 'Тіло публікації',
              type: 'blockContent',
              group: 'content',
            }),

            // ------------------------------------------------------------
            // Службові поля
            {
              title: 'Додати в "Про кафедру / Матеріально-технічна база / Семінари"',
              name: 'seninarsBool',
              type: 'boolean',
              group: 'serviceField',
              options: {
                layout: 'checkbox',
              },
            },
            {
              title: 'Додати в "Про кафедру / Матеріально-технічна база / Розробки студентів"',
              name: 'studentsDevsBool',
              type: 'boolean',
              group: 'serviceField',
              options: {
                layout: 'checkbox',
              },
            },
            {
              title: 'Додати в "Спеціальності / Наші стейкхолдери / Комунікації зі стейкхолдерами"',
              name: 'communicWithSHBool',
              type: 'boolean',
              group: 'serviceField',
              options: {
                layout: 'checkbox',
              },
            },
            {
              title: 'Додати в "Спеціальності / Практико-орієнтована освіта"',
              name: 'practiceOrientedEducationBool',
              type: 'boolean',
              group: 'serviceField',
              options: {
                layout: 'checkbox',
              },
            },
            {
              title: 'Додати в "Спеціальності / Тематичні екскурсії"',
              name: 'thematicExcursionsBool',
              type: 'boolean',
              group: 'serviceField',
              options: {
                layout: 'checkbox',
              },
            },
            {
              title: 'Додати в "Спеціальності / Неформальна освіта"',
              name: 'nonFormalEducationBool',
              type: 'boolean',
              group: 'serviceField',
              options: {
                layout: 'checkbox',
              },
            },
            {
              title: 'Додати в "Спеціальності / Дуальна освіта"',
              name: 'dualEducationBool',
              type: 'boolean',
              group: 'serviceField',
              options: {
                layout: 'checkbox',
              },
            },
            {
              title: 'Додати в "Спеціальності / Психологічна підтримка студентів"',
              name: 'studentsPsychologicalSupportBool',
              type: 'boolean',
              group: 'serviceField',
              options: {
                layout: 'checkbox',
              },
            },
            {
              title: 'Додати в "Магістру / Академічна доброчесність"',
              name: 'masterAcademicHonestyBool',
              type: 'boolean',
              group: 'serviceField',
              options: {
                layout: 'checkbox',
              },
            },
            {
              title: 'Додати в "Бакалавру / Академічна доброчесність"',
              name: 'bachelorAcademicHonestyBool',
              type: 'boolean',
              group: 'serviceField',
              options: {
                layout: 'checkbox',
              },
            },
            {
              title: 'Додати в "Магістру / Освітньо-професійні програми / Зустрічі"',
              name: 'masterEppMeetingsBool',
              type: 'boolean',
              group: 'serviceField',
              options: {
                layout: 'checkbox',
              },
            },
            {
              title: 'Додати в "Бакалавру / Освітньо-професійні програми / Зустрічі"',
              name: 'bachelorEppMeetingsBool',
              type: 'boolean',
              group: 'serviceField',
              options: {
                layout: 'checkbox',
              },
            },
            {
              title: 'Додати в "Абітурієнту / Співпраця зі школами"',
              name: 'schoolsCooperationBool',
              type: 'boolean',
              group: 'serviceField',
              options: {
                layout: 'checkbox',
              },
            },
            {
              title: 'Додати в "Абітурієнту / Студентські олімпіади"',
              name: 'studentOlympiadsBool',
              type: 'boolean',
              group: 'serviceField',
              options: {
                layout: 'checkbox',
              },
            },
            {
              title: 'Додати в "Наука / Конференція “Світлотехніка й електроенергетика” / Новини розділу"',
              name: 'conferenceLEandPEBool',
              type: 'boolean',
              group: 'serviceField',
              options: {
                layout: 'checkbox',
              },
            },
            // -----------------------------------------------------
            // Міжнародна діяльність
            {
              title: 'Додати в "Міжнародна діяльність / Академічна мобільність викладачів та студентів',
              name: 'academicMobilityBool',
              type: 'boolean',
              group: 'serviceField',
              options: {
                layout: 'checkbox',
              },
            },
            {
              title: 'Додати в "Міжнародна діяльність / Міжнародна практика студентів',
              name: 'intPractOfStudentsBool',
              type: 'boolean',
              group: 'serviceField',
              options: {
                layout: 'checkbox',
              },
            },
            {
              title: 'Додати в "Міжнародна діяльність / Міжнародне стажування',
              name: 'intInternshipBool',
              type: 'boolean',
              group: 'serviceField',
              options: {
                layout: 'checkbox',
              },
            },
            {
              title: 'Додати в "Міжнародна діяльність / Заходи, конференції, форуми',
              name: 'eventsConferencesForumsBool',
              type: 'boolean',
              group: 'serviceField',
              options: {
                layout: 'checkbox',
              },
            },
            {
              title: 'Додати в "Міжнародна діяльність / Міжнародні програми, тренінги, проєкти',
              name: 'programsTrainingsProjectsBool',
              type: 'boolean',
              group: 'serviceField',
              options: {
                layout: 'checkbox',
              },
            },
            // -----------------------------------------------------

            // -----------------------------------------------------
            // Виховна діяльність
            {
              title: 'Додати в "Виховна діяльність / Спортивне життя',
              name: 'eaSportLifeBool',
              type: 'boolean',
              group: 'serviceField',
              options: {
                layout: 'checkbox',
              },
            },

            {
              title: 'Додати в "Виховна діяльність / Екскурсії',
              name: 'eaExcursionsBool',
              type: 'boolean',
              group: 'serviceField',
              options: {
                layout: 'checkbox',
              },
            },

            {
              title: 'Додати в "Виховна діяльність / Дні факультету',
              name: 'eaFacultyDaysBool',
              type: 'boolean',
              group: 'serviceField',
              options: {
                layout: 'checkbox',
              },
            },
            // ----------------------------------------------------

            // =====================================================

          ],

          orderings: [
            {
              title: 'Опубліковано | Свіжіші вище',
              name: 'publishedDateSorting',
              by: [
                { field: 'publishedDate', direction: 'desc' }
              ]
            },
            {
              title: 'Опубліковано | Старіші вище',
              name: 'publishedDateSorting',
              by: [
                { field: 'publishedDate', direction: 'asc' }
              ]
            },
          ],

          preview: {
            select: {
              newsTitle: 'newsTitle',
              publishedDate: 'publishedDate',
              media: 'mainPhoto',
            },
            prepare(selection) {
              // console.log('selection News:>> ', selection);
              const { newsTitle, media, publishedDate } = selection;
              const datetime = moment(publishedDate).format("YYYY-MM-DD, HH:mm:ss");

              return {
                title: newsTitle,
                media: media,
                subtitle: `Опубліковано: ${datetime}`,
              }
            },
          },
        }
      ],
    }),
  ],

  orderings: [
    {
      title: 'Період публікації | Свіжіші вище',
      name: 'yearAndMonthSorting',
      by: [
        { field: 'yearAndMonth', direction: 'desc' }
      ]
    },
    {
      title: 'Період публікації | Старіші вище',
      name: 'yearAndMonthSorting',
      by: [
        { field: 'yearAndMonth', direction: 'asc' }
      ]
    },
  ],

  preview: {
    select: {
      period: 'yearAndMonth',
      publishedDate: 'publishedDate',
      media: 'mainPhoto',
    },
    prepare(selection) {
      // console.log('publishedDate:>> ', selection.publishedDate);
      const { period, media, publishedDate } = selection;
      console.log('publishedDate:>> ', publishedDate);
      // const datetime = moment(publishedDate).format("YYYY-MM-DD, HH:mm:ss");

      return {
        title: period,
        media: media,
        // subtitle: `Опубліковано: ${datetime}`,
      }
    },
  },
})
