import { defineType, defineField, defineArrayMember } from 'sanity'
import { StarIcon } from '@sanity/icons'

export const testimonialSlider = defineType({
    name: 'testimonialSlider',
    title: 'Testimonial Slider Block',
    type: 'object',
    icon: StarIcon,
    groups: [
        { name: 'content', title: 'Content', default: true },
        { name: 'list', title: 'Testimonials' },
    ],
    fields: [
        defineField({
            name: 'title',
            title: 'Slider Title',
            type: 'string',
            group: 'content',
        }),
        defineField({
            name: 'testimonials',
            title: 'Testimonials',
            type: 'array',
            group: 'list',
            of: [
                defineArrayMember({
                    type: 'object',
                    name: 'testimonial',
                    groups: [
                        { name: 'content', title: 'Content', default: true },
                    ],
                    fields: [
                        defineField({ name: 'quote', type: 'text', title: 'Quote', rows: 3, group: 'content' }),
                        defineField({ name: 'author', type: 'string', title: 'Author Name', group: 'content' }),
                    ]
                }),
            ],
        }),
    ],
    preview: {
        select: {
            title: 'title',
            list: 'testimonials'
        },
        prepare({ title, list }) {
            const count = list?.length || 0
            return {
                title: title || 'Testimonial Slider Block',
                subtitle: count ? `${count} testimonials` : 'Testimonials Block',
            }
        },
    },
})
