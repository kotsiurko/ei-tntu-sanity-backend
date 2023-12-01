import { defineField, defineType } from 'sanity'
import { MdAccountBalance as icon } from 'react-icons/md'

export default defineType({
  name: 'person',
  title: 'Кафедра/Колектив',
  type: 'document',
  icon,
  groups: [
    {
      name: 'bio',
      title: 'Особиста інфо',
      default: true,
    },
    {
      name: 'serviceField',
      title: 'Службові поля',
    },
  ],

  fieldsets: [
    {
      name: 'keyfiguresFieldset',
      title: 'ПІП працівника',
      options: {
        columns: 3,
      }
    }
  ],

  fields: [

    defineField({
      name: 'firstName',
      title: "Прізвище",
      type: 'string',
      group: 'bio',
      fieldset: "keyfiguresFieldset"
    }),

    defineField({
      name: 'secondName',
      title: "Ім'я",
      type: 'string',
      group: 'bio',
      fieldset: "keyfiguresFieldset"
    }),

    defineField({
      name: 'fatherName',
      title: "По батькові",
      type: 'string',
      group: 'bio',
      fieldset: "keyfiguresFieldset"
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
      // fields: [
      //   {
      //     name: 'caption',
      //     type: 'string',
      //     title: 'Підпис до зображення',
      //   },
      // ],
      description: "Співвідношення сторін фото має бути 3х4, і розміром не менше як 640х850px",
      group: 'bio',
    }),


    defineField({
      name: 'sciDegree',
      title: "Науковий ступінь",
      type: 'string',
      options: { list: ['к.т.н.', 'доктор філософії / ph.D', 'д.т.н.', 'Немає'], layout: 'radio', direction: 'horizontal' },
      group: 'bio',
    }),

    defineField({
      name: 'acadStatus',
      title: "Вчене звання",
      type: 'string',
      options: { list: ['доцент', 'професор', 'Немає'], layout: 'radio', direction: 'horizontal' },
      group: 'bio',
    }),

    defineField({
      name: 'position',
      title: "Посада",
      type: 'string',
      options: {
        list: [
          'завідувач кафедрою',
          'заступник завідувача кафедрою',
          'професор',
          'доцент',
          'старший викладач',
          'викладач',
          'асистент',
          'провідний інженер',
          'інженер 2-ї категорії',
          'інженер 1-ї категорії',
          'лаборант',
        ], layout: 'radio', direction: 'horizontal'
      },
      // type: 'object',
      // fields: [
      //   { name: 'long', type: 'string', title: 'Повністю' },
      //   { name: 'short', type: 'string', title: 'Скорочено', description: 'Відображається на сторінці колективу, в картці працівника', },
      // ],
      // options: {
      //   collapsible: true,
      //   collapsed: true,
      // },
      // description: 'Розгорніть, щоб заповнити чи переглянути поля',
      group: 'bio',
    }),

    defineField({
      name: 'edGuarantee',
      title: "Гарант освітньої програми",
      type: 'array',
      // of: [{ type: 'text', rows: 2, }],
      of: [{ type: 'educationProgItem' }],
      description: "Натисніть Add Item, щоб додати освітню програму",
      group: 'bio',
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
      group: 'bio',
    }),


    defineField({
      name: 'education',
      title: 'Освіта',
      type: 'array',
      of: [{ type: 'educationItem' }],
      group: 'bio',
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
      group: 'bio',
    }),

    defineField({
      name: 'experience',
      title: 'Досвід роботи',
      type: 'array',
      of: [{ type: 'experienceItem' }],
      description: "Введіть місце попередньої роботи",
      group: 'bio',
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
      group: 'bio',
    }),

    defineField({
      name: 'publications',
      title: 'Публікації',
      type: 'blockContent',
      group: 'bio',
    }),

    defineField({
      name: 'inventions',
      title: 'Винахідництво та раціоналізаторство',
      type: 'blockContent',
      group: 'bio',
    }),

    defineField({
      name: 'sciProjects',
      title: 'Наукові теми та проєкти',
      type: 'array',
      of: [{ type: 'text', rows: 2, }],
      description: "Рекомендований формат запису: 'ДІ 180-11 «Удосконалення управління навчально-науково-виробничими системами в умовах суспільних та інституційних трансформацій»'",
      group: 'bio',
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
      group: 'bio',
    }),

    defineField({
      name: 'reviewedDissertations',
      title: 'Рецензовані дисертаційні роботи',
      type: 'blockContent',
      group: 'bio',
    }),

    defineField({
      name: 'languages',
      title: "Мови",
      type: 'array',
      of: [{ type: 'string' }],
      description: "Вкажіть мови, якими володіє працівник, напр.: 'українська'",
      group: 'bio',
    }),

    defineField({
      name: 'internship',
      title: "Стажування",
      type: 'array',
      of: [{
        type: 'string',
      }],
      description: "Рекомендований формат запису: 'ВАТ «Тернопільобленерго». Період 17 жовтня 2017 р. - 17 листопада  2017 р.",
      group: 'bio',
    }),

    defineField({
      name: 'certificates',
      title: 'Сертифікати',
      type: 'array',
      of: [{ type: 'text', rows: 2, }],
      group: 'bio',
    }),

    defineField({
      name: 'awards',
      title: "Нагороди та відзнаки",
      type: 'array',
      of: [{ type: 'string' }],
      group: 'bio',
    }),

    defineField({
      name: 'teachingSubjectList',
      title: 'Навчальні дисципліни',
      type: 'array',
      of: [{ type: 'teachingSubjectItem' }],
      description: "Введіть назву дисципліни, а також її ID в системі ATutor",
      group: 'bio',
    }),

    defineField({
      title: 'Колишній працівник',
      name: 'formerEmployeeBool',
      type: 'boolean',
      options: {
        layout: 'checkbox',
      },
      group: 'bio',
    }),

    defineField({
      title: 'Завершив працювати...',
      name: 'whenFinishedWorking',
      type: 'text',
      rows: 4,
      hidden: ({ document }) => document && document.formerEmployeeBool !== true,
      group: 'bio',
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
      group: 'bio',
    }),

    defineField({
      name: 'weight',
      title: "Вага посади",
      type: 'number',
      description: 'Службове поле для впорядкованого відображення працівників на сторінці. Як сформувати - https://docs.google.com/spreadsheets/d/1-JnXn06rz5dKPnhyvNcqLwkpdFM9p6MZ989cWkzZe8Q/edit?usp=sharing',
      group: 'serviceField',

    }),

    defineField({
      name: 'slug',
      title: 'Транслітероване відносне посилання',
      type: 'slug',
      options: {
        // source: 'firstName',
        source: (doc, context) => `${doc.firstName}-${doc.secondName}`,
        maxLength: 100,
      },
      description: 'Натисніть GENERATE і посилання автоматично сформується на основі прізвища та імені. При потребі, ви можете його відредагувати',
      group: 'serviceField',
    }),

    defineField({
      name: 'toShowOnMainPage',
      title: 'Додати працівника на головну сторінку в секцію "ВИКЛАДАЧІ"',
      type: 'boolean',
      description: 'Якщо відмітете чекбокс, то викладач відображатиметься на головній сторінці',
      group: 'serviceField',
    }),

    defineField({
      name: 'personSlogan',
      title: 'Слоган',
      type: 'blockContent',
      description: 'Відображається під підписом викладача на головній сторінці',
      hidden: ({ document }) => document && document.toShowOnMainPage !== true,
      group: 'serviceField',
    }),

    // defineField({
    //   name: 'personSlogan2',
    //   title: 'Слоган',
    //   type: 'blockContent',
    //   description: 'Відображається під підписом викладача на головній сторінці',
    //   hidden: ({ document }) => document && document.toShowOnMainPage !== true,
    // }),



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
      const { firstName, secondName, fatherName, media, position, weight, sciDegree, acadStatus } = selection;
      const credentials = () => {
        if (sciDegree === "Немає" || acadStatus === "Немає") {
          return position;
        } else if (acadStatus.toLowerCase() === position.toLowerCase()) {
          return `${sciDegree}, ${position}`
        } else {
          return `${sciDegree}, ${acadStatus}, ${position}`
        }
      }
      return {
        title: `${firstName} ${secondName} ${fatherName}`,
        media: media,
        subtitle: `${weight} / ${credentials()}`,
      }
    },
  },
})
