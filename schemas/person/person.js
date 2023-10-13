import { defineField, defineType } from 'sanity'
import { MdPerson as icon } from 'react-icons/md'

export default defineType({
  name: 'person',
  title: 'Працівники',
  type: 'document',
  icon,
  fields: [

    defineField({
      name: 'firstName',
      title: "Прізвище",
      type: 'string',
      description: "Введіть прізвище",
    }),

    defineField({
      name: 'secondName',
      title: "Ім'я",
      type: 'string',
      description: "Введіть ім'я",
    }),

    defineField({
      name: 'fatherName',
      title: "По батькові",
      type: 'string',
      description: "Введіть ім'я по батькові",
    }),

    defineField({
      name: 'weight',
      title: "Вага посади",
      type: 'number',
      description: 'Службове поле для впорядкованого відображення працівників на сторінці. Як сформувати - https://docs.google.com/spreadsheets/d/1-JnXn06rz5dKPnhyvNcqLwkpdFM9p6MZ989cWkzZe8Q/edit?usp=sharing',
    }),

    defineField({
      name: 'slug',
      title: 'Транслітероване відносне посилання',
      type: 'slug',
      options: {
        source: 'firstName',
        maxLength: 100,
      },
      description: 'Натисніть GENERATE і посилання автоматично сформується на основі прізвища. При потребі, ви можете його відредагувати',
    }),

    defineField({
      name: 'mainPhoto',
      title: 'Головне зображення',
      type: 'image',
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
      description: "Для економії місця можна згорнути поле. Співвідношення сторін фото має бути 3х4, і розміром не менше як 640х850px",
    }),


    defineField({
      name: 'sciDegree',
      title: "Науковий ступінь",
      type: 'string',
      options: { list: ['к.т.н.', 'доктор наук / ph.D', 'д.т.н.', 'Немає'], layout: 'radio', direction: 'horizontal' },
    }),

    defineField({
      name: 'acadStatus',
      title: "Вчене звання",
      type: 'string',
      options: { list: ['доцент', 'професор', 'Немає'], layout: 'radio', direction: 'horizontal' },
    }),

    defineField({
      name: 'position',
      title: "Посада",
      type: 'object',
      fields: [
        { name: 'long', type: 'string', title: 'Повністю' },
        { name: 'short', type: 'string', title: 'Скорочено', description: 'Відображається на сторінці колективу, в картці працівника', },
      ],
      options: {
        collapsible: true,
        collapsed: true,
      },
      description: 'Розгорніть, щоб заповнити чи переглянути поля',
    }),

    defineField({
      name: 'edGuarantee',
      title: "Гарант освітньої програми",
      type: 'array',
      of: [{ type: 'text', rows: 2, }],
      description: "Натисніть Add Item, щоб додати освітню програму",
    }),

    defineField({
      title: 'Посилання на соцмережі',
      name: 'socials',
      type: 'object',
      description: "Розгорніть, щоб побачити усі доступні для заповнення поля",
      fields: [
        { name: 'tntuNTB', type: 'string', title: 'Науково-технічна бібліотека ТНТУ' },
        { name: 'googleScholar', type: 'string', title: 'Google Scholar' },
        { name: 'scopus', type: 'string', title: 'Scopus' },
        { name: 'orcid', type: 'string', title: 'ORCID' },
        { name: 'rgsn', type: 'string', title: 'ResearchGate SN' },
        { name: 'rIDtr', type: 'string', title: 'ResearcherID TR' },
        { name: 'fb', type: 'string', title: 'Facebook' },
        { name: 'li', type: 'string', title: 'LinkedIn' },
        // { name: 'risc', type: 'string', title: 'РИНЦ Science Index' },
        { name: 'iCi', type: 'string', title: 'Index Copernicus International' },
      ],
      options: { collapsible: true, collapsed: true },
    }),

    defineField({
      name: 'education',
      title: 'Освіта',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {
            name: 'university',
            type: 'string',
            title: 'Навчальний заклад',
            description: "Рекомендований формат запису: 'Тернопільський національний технічний університет імені Івана Пулюя, 2007-2011'",
          },
          {
            name: 'description',
            type: 'blockContent',
            title: 'Опис здобутих освітніх чи наукових ступенів'
          },
        ],
      }],
      description: "Введіть перелік завершених навчальних закладів та здобутих ступенів",
    }),

    // defineField({
    //   name: 'sciDegreeAwarding',
    //   title: 'Присудження наукового ступеня',
    //   type: 'array',
    //   of: [{ type: 'text', rows: 2, }],
    // }),

    // defineField({
    //   name: 'acadStatusAwarding',
    //   title: 'Присудження наукового звання',
    //   type: 'array',
    //   of: [{ type: 'text', rows: 2, }],
    // }),

    defineField({
      name: 'achievements',
      title: 'Професійні здобутки',
      type: 'blockContent',
    }),

    defineField({
      name: 'experience',
      title: 'Досвід роботи',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {
            name: 'jobPlace',
            type: 'string',
            title: 'Місце роботи',
            description: "Вказати лише повну назву закладу",
          },
          {
            name: 'jobPosition',
            type: 'string',
            title: 'Період роботи та посада',
            description: "Рекомендований формат запису, напр.: '01.01.2013 – 30.12.2016 - асистент кафедри електричної інженерії'",
          },
        ],
      }],
      description: "Введіть попередні місця роботи",
    }),

    // defineField({
    //   name: 'sciWork',
    //   title: 'Наукова робота',
    //   type: 'blockContent',
    // }),

    defineField({
      name: 'sciInterests',
      title: 'Наукові інтереси',
      type: 'array',
      of: [{ type: 'text', rows: 2, }],
    }),

    defineField({
      name: 'publications',
      title: 'Публікації',
      type: 'blockContent',
    }),

    defineField({
      name: 'inventions',
      title: 'Винахідництво та раціоналізаторство',
      type: 'blockContent',
    }),

    defineField({
      name: 'sciProjects',
      title: 'Наукові теми та проєкти',
      type: 'array',
      of: [{ type: 'text', rows: 2, }],
      description: "Рекомендований формат запису: 'ДІ 180-11 «Удосконалення управління навчально-науково-виробничими системами в умовах суспільних та інституційних трансформацій»'",
    }),

    // defineField({
    //   name: 'cathedralResonsibilities',
    //   title: "Загальнокафедральні обов'язки",
    //   type: 'array',
    //   of: [{ type: 'reference', to: [{ type: 'responsibilities' }] }],
    //   description: "Натисніть Add Item та оберіть зі випадаючого списку. Із повним списком обов'язків можна ознайомитись на сторінці /responsibilities",
    // }),

    // defineField({
    //   name: 'otherResonsibilities',
    //   title: "Інші обов'язки",
    //   type: 'array',
    //   of: [{ type: 'text', rows: 2, }],
    //   description: "Натисніть Add Item та запишіть закріплені за працівником обов'язки. Кожен обов'язок виносіть в окремий item",
    // }),

    defineField({
      name: 'reviewing',
      title: 'Рецензування',
      type: 'blockContent',
    }),

    defineField({
      name: 'reviewedDissertations',
      title: 'Рецензовані дисертаційні роботи',
      type: 'blockContent',
    }),

    defineField({
      name: 'languages',
      title: "Мови",
      type: 'array',
      of: [{ type: 'string' }],
      description: "Вкажіть мови, якими володіє працівник, напр.: 'українська'",
    }),

    defineField({
      name: 'internship',
      title: "Стажування",
      type: 'array',
      of: [{
        type: 'string',
      }],
      description: "Рекомендований формат запису: 'ВАТ «Тернопільобленерго». Період 17 жовтня 2017 р. - 17 листопада  2017 р.",
    }),

    defineField({
      name: 'certificates',
      title: 'Сертифікати',
      type: 'array',
      of: [{ type: 'text', rows: 2, }],
    }),

    defineField({
      name: 'awards',
      title: "Нагороди та відзнаки",
      type: 'array',
      of: [{ type: 'string' }],
    }),

    defineField({
      name: 'teachingSubjectList',
      title: 'Навчальні дисципліни',
      type: 'array',
      of: [{ type: 'teachingSubjectItem' }],
      description: "Введіть назву дисципліни, а також її ID в системі ATutor",
    }),

    defineField({
      title: 'Колишній працівник',
      name: 'formerEmployeeBool',
      type: 'boolean',
      options: {
        layout: 'checkbox',
      },
    }),

    defineField({
      title: 'Завершив працювати...',
      name: 'whenFinishedWorking',
      type: 'text',
      rows: 4,
      hidden: ({ document }) => document && document.formerEmployeeBool !== true,
    }),

    defineField({
      name: 'imageGallery',
      title: 'Фотогалерея',
      type: 'array',
      description: "Тут будуть рекомендації щодо розмірів фотографії та її пропорцій",
      of: [{
        type: 'image',
        options: {
          hotspot: true,
        },
        fields: [
          {
            name: 'caption',
            type: 'string',
            title: 'Підпис до зображення',
          },
        ],
        preview: {
          select: { title: 'caption', media: 'asset', subtitle: 'attribution' },
          prepare(selection) {
            const { title, media, subtitle } = selection;
            return {
              title: title,
              media: media,
              subtitle: subtitle,
            }
          },
        },
      }],
    }),



    // ============================
    // Пункти зі старої структури
    // ============================

    // defineField({
    //   name: 'bio',
    //   title: 'Біографія',
    //   type: 'blockContent',
    // }),

    // defineField({
    //   name: 'contacts',
    //   title: "Контакти",
    //   type: 'string',
    //   description: "Введіть контактні дані (здебільшого, це email)",
    // }),

    // ============================

  ],

  preview: {
    select: {
      firstName: 'firstName',
      secondName: 'secondName',
      fatherName: 'fatherName',
      media: 'mainPhoto',
      position: 'position',
      weight: 'weight',
      sciDegree: 'sciDegree',
      acadStatus: 'acadStatus'
    },
    prepare(selection) {
      console.log('selection Person:>> ', selection);
      const { firstName, secondName, fatherName, media, position, weight, sciDegree, acadStatus } = selection;
      const sub = acadStatus.toLowerCase() === position.short.toLowerCase()
        ? `${weight} / ${sciDegree}, ${position.short}`
        : `${weight} / ${sciDegree}, ${acadStatus}, ${position.short}`
      return {
        title: `${firstName} ${secondName} ${fatherName}`,
        media: media,
        subtitle: sub,
      }
    },
  },
})
