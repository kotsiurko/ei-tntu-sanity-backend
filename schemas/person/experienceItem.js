import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'experienceItem',
  title: 'Досвід',
  type: 'object',
  fields: [
    defineField({
      name: 'place',
      title: 'Місце роботи',
      type: 'string',
      description: "Вказати лише повну назву закладу. УВАГА! Якщо в цьому пункті назва закладу така сама, як і в попередньому, то впевніться, щоб вони були ідентичні (найкраще - скопіюйте з попереднього пункту)",
    }),
    defineField({
      name: 'description',
      title: 'Період роботи та посада',
      type: 'string',
      description: "Рекомендований формат запису, напр.: '01.01.2013 – 30.12.2016 – асистент кафедри електричної інженерії'",
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
