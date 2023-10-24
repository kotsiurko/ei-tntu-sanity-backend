import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'educationItem',
  title: 'Освіта',
  type: 'object',
  fields: [
    defineField({
      name: 'place',
      title: 'Навчальний заклад',
      type: 'string',
      description: "Рекомендований формат запису: 'Тернопільський національний технічний університет імені Івана Пулюя'",
    }),
    defineField({
      name: 'description',
      title: 'Період навчання та опис здобутих освітніх чи наукових ступенів',
      type: 'text',
      description: "Рекомендований формат запису, напр.: '2001 – 2005 - бакалаврат, диплом бакалавра комп’ютерних наук'",
    }),
  ],
  preview: {
    select: {
      position: 'place',
      title: 'description',
    },
    prepare(selection) {
      return {
        title: selection.title,
        subtitle: selection.position,
      }
    },
  },
})
