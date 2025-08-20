import {UserIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const authorType = defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  icon: UserIcon,
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'profile', title: 'Profile' },
  ],
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Name',
      description: 'Full name of the author',
      group: 'content',
      validation: (Rule) => Rule.required().min(2).error('Name is required'),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'name',
      },
      title: 'Slug',
      description: 'URL-friendly identifier generated from the name',
      group: 'content',
      validation: (Rule) => Rule.required().error('Slug is required'),
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Profile Image',
      description: 'Square image works best',
      group: 'profile',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'bio',
      type: 'array',
      title: 'Bio',
      description: 'Short biography shown on author pages',
      group: 'profile',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [{title: 'Normal', value: 'normal'}],
          lists: [],
        }),
      ],
    }),
  ],
  orderings: [
    {
      title: 'Name, A→Z',
      name: 'nameAsc',
      by: [{field: 'name', direction: 'asc'}],
    },
    {
      title: 'Name, Z→A',
      name: 'nameDesc',
      by: [{field: 'name', direction: 'desc'}],
    },
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
      slug: 'slug.current',
    },
    prepare({title, media, slug}) {
      return {
        title,
        media,
        subtitle: slug ? `/${slug}` : undefined,
      }
    },
  },
})
