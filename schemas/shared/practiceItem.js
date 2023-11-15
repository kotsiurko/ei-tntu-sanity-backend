import { defineType } from "sanity";

export default defineType(
  {
        title: 'Практика',
        name: 'practiceItem',
        type: 'document',
        fields: [
          {
            title: "Курс навчання",
            name: 'practiceCourse',
            type: 'string',
            options: {
              list: [
                'I',
                'II',
                'III',
                'IV',
                'V',
                'VI'
              ], layout: 'radio', direction: 'horizontal'
            },
          },
          {
            title: "Форма навчання",
            name: 'practiceEduForm',
            type: 'string',
            options: {
              list: [
                'Денна',
                'Заочна',
                'Іноземці',
              ], layout: 'radio', direction: 'horizontal'
            },
          },
          {
            title: "Період",
            name: 'practicePeriod',
            type: 'string',
            description: 'Рекомендований формат введення дат: "10.07.23 – 23.07.23"'
          },
          {
            title: "Назва",
            name: 'practiceTitle',
            type: 'string'
          },
          {
            title: "Керівник",
            name: 'practiceSupervisor',
            type: 'string'
          },
          {
            title: "Посилання на курс в ATutor",
            name: 'practiceATLink',
            description: 'Посилання має мати такий вигляд: "https://dl.tntu.edu.ua/bounce.php?course=5396", де після частини "?course=" обов\'язково має бути ID курсу в ATutor',
            type: 'url'
          },
          {
            title: "Наказ",
            name: 'practiceDecree',
            type: 'url'
          },
        ],
        preview: {
          select: { title: 'practiceTitle', course: "practiceCourse", eduForm: 'practiceEduForm' },
          prepare(selection) {
            const { title, course, eduForm } = selection;
            return {
              title: title,
              subtitle: `${course} курс | Форма навчання: ${eduForm}`,
            }
          },
        },
})