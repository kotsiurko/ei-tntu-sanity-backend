import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'teachingSubjectItem',
  title: 'Дисципліна',
  type: 'object',
  fields: [
    defineField({
      name: 'teachingSubjectName',
      title: 'Назва дисципліни',
      type: 'string',
    }),
    defineField({
      name: 'teachingSubjectId',
      title: 'ID дисципліни в системі Atutor',
      type: 'number',
    }),
  ],
  preview: {
    select: {
      id: 'teachingSubjectId',
      title: 'teachingSubjectName',
    },
    prepare(selection) {
      return {
        title: selection.title,
        subtitle: `ID дисципліни в ATutor: ${selection.id}`,
      }
    },
  },
})
