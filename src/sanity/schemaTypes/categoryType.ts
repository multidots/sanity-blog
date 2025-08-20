import {TagIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const categoryType = defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  icon: TagIcon,
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'meta', title: 'Meta' },
  ],
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      description: 'Category name shown in filters and on posts',
      group: 'content',
      validation: (Rule) => Rule.required().min(2),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
      },
      title: 'Slug',
      description: 'URL-friendly identifier generated from the title',
      group: 'meta',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Description',
      group: 'content',
      rows: 3,
    }),
  ],
  orderings: [
    { title: 'Title A→Z', name: 'titleAsc', by: [{ field: 'title', direction: 'asc' }] },
    { title: 'Title Z→A', name: 'titleDesc', by: [{ field: 'title', direction: 'desc' }] },
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug.current',
    },
    prepare({title, slug}) {
      return { title, subtitle: slug ? `/${slug}` : undefined }
    }
  }
})
