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
      name: 'teachingSubjectURL',
      title: 'ID дисципліни в системі Atutor',
      description: 'Якщо в ATutor є навчальний курс, то вставте посилання. Воно має мати такий вигляд: "https://dl.tntu.edu.ua/bounce.php?course=5396", де після частини "?course=" обов\'язково має бути ID курсу',
      type: 'url',
    }),
  ],
  preview: {
    select: {
      url: 'teachingSubjectURL',
      title: 'teachingSubjectName',
    },
    prepare(selection) {
      // визначаю індекс.з якого починається вираз "course="
      let courseId = 'немає';
      if (selection.url) {
        const courseIdIndex = selection.url.indexOf("course=");
        const courseIdStart = courseIdIndex + "course=".length;
        // вирізаю ID з лінку
        courseId = selection.url.slice(courseIdStart);
      }


      return {
        title: selection.title,
        subtitle: `ID дисципліни в ATutor: ${courseId}`,
      }
    },
  },
})
