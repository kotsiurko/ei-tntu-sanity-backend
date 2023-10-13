export default {
  name: 'newsTemp',
  title: 'News',
  type: 'document',
  fields: [
    // Ваші поля для новин
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'All', value: 'all' },
          { title: 'Sport', value: 'sport' },
          { title: 'Politics', value: 'politics' },
          // Додайте інші категорії
        ],
      },
    },
    // Додайте інші поля
  ],
  orderings: [
    {
      title: 'Release Date, New',
      name: 'releaseDateDesc',
      by: [{ field: 'releaseDate', direction: 'desc' }],
    },
    {
      title: 'Release Date, Old',
      name: 'releaseDateAsc',
      by: [{ field: 'releaseDate', direction: 'asc' }],
    },
    {
      title: 'Popularity',
      name: 'popularityDesc',
      by: [{ field: 'popularity', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category',
    },
    prepare({ title, category }) {
      return {
        title: title,
        subtitle: category,
      };
    },
  },
};