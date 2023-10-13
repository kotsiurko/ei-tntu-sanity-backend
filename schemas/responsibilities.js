import { defineField, defineType } from 'sanity'
import { MdDoneAll as icon } from 'react-icons/md'

export default defineType({
  name: 'responsibilities',
  title: "Обов'язки",
  type: 'document',
  icon,
  fields: [
    defineField({
      name: 'title',
      title: "Заголовок обов'язку",
      type: 'string',
      description: 'Напр., Діловодство чи Протоколи засідань кафедри',
    }),
    defineField({
      name: 'titleLink',
      title: "Якщо заголовок містить посилання",
      type: 'string',
      description: "Напр., 'https://tntu.edu.ua/?p=uk/structure/departments/ei/info'",
    }),
    defineField({
      name: 'person',
      title: 'Працівник',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'person' } }],
    }),
    defineField({
      name: 'simpleText',
      title: "Якщо поряд чи замість працівників треба вивести текст",
      type: 'string',
    }),
    defineField({
      name: 'published',
      title: 'Опубліковано',
      type: 'boolean',
      description: "Встановити на 'Опубліковано', якщо необхідно аби цей обов'язок виводився на сторінці",
    }),
    defineField({
      name: 'priority',
      title: "Пріоритет обов'язку",
      type: 'number',
      description: "Згідно зі значенням пріоритету визначається послідовність виведення обов'язків на сторінці",
    }),
  ],
  orderings: [
    {
      title: 'Priority ',
      name: 'priority',
      by: [
        { field: 'priority', direction: 'asc' }
      ]
    }
  ],
  preview: {
    select: {
      title: 'title',
      priority: 'priority',
    },
    prepare(responsibilities, viewOptions = {}) {
      const title = viewOptions.ordering && viewOptions.ordering.name === 'priority'
        ? `${responsibilities.title} (${responsibilities.priority})`
        : responsibilities.title

      return {
        title,
        subtitle: `Пріоритет: ${responsibilities.priority}`,
      }
    }
  },
})
