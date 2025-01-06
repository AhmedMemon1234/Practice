import { defineType, defineField, defineArrayMember } from "sanity";

export const post = defineType({
  name: 'post',
  type: 'document',
  title: 'Post',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Post Title',
      description: 'Title Of The Post',
      validation: Rule => Rule.required(),
    }),

    // slug field
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'image',
      type: 'image',
      title: 'Image',
    }),

    // Add price field
    defineField({
      name: 'price',
      type: 'number', // Type for price is number
      title: 'Price',
      description: 'Price of the product',
      validation: Rule => Rule.required().min(0), // Ensure the price is a non-negative value
    }),
  ],
});
