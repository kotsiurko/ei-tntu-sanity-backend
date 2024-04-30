import { defineType } from "sanity";

export default defineType(
  {
    title: 'Якийсь айтем',
    name: 'imageTextItems',
    type: 'object',
    fields: [
      {
        title: "Заголовок",
        name: 'title',
        type: 'string'
      },
      {
        title: "Опис",
        name: 'body',
        type: 'text',
        rows: 5,
      },
      {
        title: "Підпис",
        name: 'afterTitle',
        type: 'string',
      },
      {
        name: 'picture',
        title: 'Зображення',
        type: 'image',
        options: {
          hotspot: true,
          collapsible: true,
          collapsed: false,
        },
        // description: "Співвідношення сторін фото має бути 3х4, і розміром не менше як 640х850px",
      },
    ],
  })