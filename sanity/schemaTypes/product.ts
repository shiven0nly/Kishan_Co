export const productType = {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'sowingGuide',
      title: 'How to Sow',
      type: 'text',
    },
    {
      name: 'weatherConditions',
      title: 'Optimum Weather Conditions',
      type: 'text',
    },
    {
      name: 'harvestingGuide',
      title: 'When to Cut/Harvest',
      type: 'text',
    },
    {
      name: 'benefits',
      title: 'Benefits of Buying from Us',
      type: 'text',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
    },
  ],
};
