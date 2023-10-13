import { defineField, defineType } from 'sanity'
import { MdPerson as icon } from 'react-icons/md'
import moment from 'moment/moment';

export default defineType({
  name: 'news',
  title: 'Новини (усі)',
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

    {
      name: 'newsTitle',
      title: "Заголовок",
      type: 'string',
      validation: Rule => Rule.required().max(82).error('Допис має бути не більшим 82-ти символів'),
      group: 'content',
    },

    {
      name: 'metaDescription',
      title: 'Мета-опис',
      type: 'string',
      group: "content",
      description: 'Цей опис необхідний для пошуковиків для кращого просування сайту. Це має бути розширений заголовок',
      validation: Rule => Rule.required().max(180).error('Опис має бути не більшим 180-ти символів'),
    },

    {
      name: 'slug',
      title: 'Транслітероване відносне посилання',
      type: 'slug',
      validation: Rule => Rule.required(),
      options: {
        source: 'newsTitle',
        maxLength: 100,
      },
      description: 'Натисніть GENERATE і посилання автоматично сформується на основі заголовка. При потребі, ви можете його відредагувати',
      group: 'content',
    },

    {
      name: 'mainPhoto',
      title: 'Головне зображення',
      type: 'image',
      validation: Rule => Rule.required(),
      options: {
        hotspot: true,
        collapsible: true,
        collapsed: false,
      },
      fields: [
        {
          name: 'caption',
          type: 'string',
          title: 'Підпис до зображення',
        },
      ],
      description: "Розгорніть, щоб побачити головне зображення. Також тут будуть рекомендації щодо розмірів фотографії та її пропорцій",
      group: 'content',
    },


    defineField({
      name: 'publishedDate',
      title: "Дата публікації (Опубліковано)",
      type: 'datetime',
      validation: Rule => Rule.required(),
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
      description: 'Перші кілька речень тіла публікації, які відображатимуться на сторінці з переліком усіх новин. Можна скопіювати перші кілька фраз із блоку нижче та доставити трикрапки. При цьому довжина фрази має бути більша за 115 символів, але менша за 140',
      required: true,
      validation: Rule => Rule.required().min(115).max(140).error('Допис має бути більшим за 115 символів і менше 140-ка'),
      group: 'content',
    },

    defineField({
      name: 'newsItemBody',
      title: 'Тіло публікації',
      type: 'blockContent',
      group: 'content',
      validation: Rule => Rule.required(),
    }),

    // ------------------------------------------------------------
    // Службові поля
    {
      title: 'Новина виводиться в загальний список новин за замовчуванням',
      name: 'allNewsBool',
      type: 'boolean',
      group: 'serviceField',
      initialValue: true,
      options: {
        layout: 'checkbox',
      },
    },
    {
      title: 'Додати в "Про кафедру / Матеріально-технічна база / Семінари"',
      name: 'seninarsBool',
      type: 'boolean',
      group: 'serviceField',
      initialValue: false,
      options: {
        layout: 'checkbox',
      },
    },
    {
      title: 'Додати в "Про кафедру / Матеріально-технічна база / Розробки студентів"',
      name: 'studentsDevsBool',
      type: 'boolean',
      group: 'serviceField',
      initialValue: false,
      options: {
        layout: 'checkbox',
      },
    },
    {
      title: 'Додати в "Спеціальності / Наші стейкхолдери / Комунікації зі стейкхолдерами"',
      name: 'communicWithSHBool',
      type: 'boolean',
      group: 'serviceField',
      initialValue: false,
      options: {
        layout: 'checkbox',
      },
    },
    {
      title: 'Додати в "Спеціальності / Практико-орієнтована освіта"',
      name: 'practiceOrientedEducationBool',
      type: 'boolean',
      group: 'serviceField',
      initialValue: false,
      options: {
        layout: 'checkbox',
      },
    },
    {
      title: 'Додати в "Спеціальності / Тематичні екскурсії"',
      name: 'thematicExcursionsBool',
      type: 'boolean',
      group: 'serviceField',
      initialValue: false,
      options: {
        layout: 'checkbox',
      },
    },
    {
      title: 'Додати в "Спеціальності / Неформальна освіта"',
      name: 'nonFormalEducationBool',
      type: 'boolean',
      group: 'serviceField',
      initialValue: false,
      options: {
        layout: 'checkbox',
      },
    },
    {
      title: 'Додати в "Спеціальності / Дуальна освіта"',
      name: 'dualEducationBool',
      type: 'boolean',
      group: 'serviceField',
      initialValue: false,
      options: {
        layout: 'checkbox',
      },
    },
    {
      title: 'Додати в "Спеціальності / Психологічна підтримка студентів"',
      name: 'studentsPsychologicalSupportBool',
      type: 'boolean',
      group: 'serviceField',
      initialValue: false,
      options: {
        layout: 'checkbox',
      },
    },
    {
      title: 'Додати в "Магістру / Академічна доброчесність"',
      name: 'masterAcademicHonestyBool',
      type: 'boolean',
      group: 'serviceField',
      initialValue: false,
      options: {
        layout: 'checkbox',
      },
    },
    {
      title: 'Додати в "Бакалавру / Академічна доброчесність"',
      name: 'bachelorAcademicHonestyBool',
      type: 'boolean',
      group: 'serviceField',
      initialValue: false,
      options: {
        layout: 'checkbox',
      },
    },
    {
      title: 'Додати в "Магістру / Освітньо-професійні програми / Зустрічі"',
      name: 'masterEppMeetingsBool',
      type: 'boolean',
      group: 'serviceField',
      initialValue: false,
      options: {
        layout: 'checkbox',
      },
    },
    {
      title: 'Додати в "Бакалавру / Освітньо-професійні програми / Зустрічі"',
      name: 'bachelorEppMeetingsBool',
      type: 'boolean',
      group: 'serviceField',
      initialValue: false,
      options: {
        layout: 'checkbox',
      },
    },
    {
      title: 'Додати в "Абітурієнту / Новини для абітурієнта"',
      name: 'newsForEntrantsBool',
      type: 'boolean',
      group: 'serviceField',
      initialValue: false,
      options: {
        layout: 'checkbox',
      },
    },
    {
      title: 'Додати в "Абітурієнту / Співпраця зі школами"',
      name: 'schoolsCooperationBool',
      type: 'boolean',
      group: 'serviceField',
      initialValue: false,
      options: {
        layout: 'checkbox',
      },
    },
    {
      title: 'Додати в "Абітурієнту / Студентські олімпіади"',
      name: 'studentOlympiadsBool',
      type: 'boolean',
      group: 'serviceField',
      initialValue: false,
      options: {
        layout: 'checkbox',
      },
    },
    {
      title: 'Додати в "Наука / Конференція “Світлотехніка й електроенергетика” / Новини розділу"',
      name: 'conferenceLEandPEBool',
      type: 'boolean',
      group: 'serviceField',
      initialValue: false,
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
      initialValue: false,
      options: {
        layout: 'checkbox',
      },
    },
    {
      title: 'Додати в "Міжнародна діяльність / Міжнародна практика студентів',
      name: 'intPractOfStudentsBool',
      type: 'boolean',
      group: 'serviceField',
      initialValue: false,
      options: {
        layout: 'checkbox',
      },
    },
    {
      title: 'Додати в "Міжнародна діяльність / Міжнародне стажування',
      name: 'intInternshipBool',
      type: 'boolean',
      group: 'serviceField',
      initialValue: false,
      options: {
        layout: 'checkbox',
      },
    },
    {
      title: 'Додати в "Міжнародна діяльність / Заходи, конференції, форуми',
      name: 'eventsConferencesForumsBool',
      type: 'boolean',
      group: 'serviceField',
      initialValue: false,
      options: {
        layout: 'checkbox',
      },
    },
    {
      title: 'Додати в "Міжнародна діяльність / Міжнародні програми, тренінги, проєкти',
      name: 'programsTrainingsProjectsBool',
      type: 'boolean',
      group: 'serviceField',
      initialValue: false,
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
      initialValue: false,
      options: {
        layout: 'checkbox',
      },
    },

    {
      title: 'Додати в "Виховна діяльність / Екскурсії',
      name: 'eaExcursionsBool',
      type: 'boolean',
      group: 'serviceField',
      initialValue: false,
      options: {
        layout: 'checkbox',
      },
    },

    {
      title: 'Додати в "Виховна діяльність / Дні факультету',
      name: 'eaFacultyDaysBool',
      type: 'boolean',
      group: 'serviceField',
      initialValue: false,
      options: {
        layout: 'checkbox',
      },
    },
    // ----------------------------------------------------

    // =====================================================

  ],

  // hidden: ({ currentUser }) => {
  //   return currentUser?.email !== "kotsiurko@gmail.com" || "kozakateryna@gmail.com"
  //     || "sermuk@gmail.com"
  // },

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
      const { newsTitle, media, publishedDate } = selection;
      const datetime = moment(publishedDate).format("YYYY-MM-DD, HH:mm:ss");

      return {
        title: newsTitle,
        media: media,
        subtitle: `Опубліковано: ${datetime}`,
      }
    },
  },
})
