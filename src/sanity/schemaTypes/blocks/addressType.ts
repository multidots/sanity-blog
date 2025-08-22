import { defineField, defineType } from "sanity";
import { PinIcon } from '@sanity/icons'

export const addressType = defineType({
    name: 'address',
    title: 'Address Block',
    type: 'object',
    icon: PinIcon,
    groups: [
        { name: 'content', title: 'Content', default: true },
        { name: 'contact', title: 'Contact' },
    ],
    fields: [
        defineField({
            name: 'title',
            type: 'string',
            title: 'Title',
            group: 'content',
        }),
        defineField({
            name: 'address',
            type: 'string',
            title: 'Address',
            group: 'content',
        }),
        defineField({
            name: 'phone',
            type: 'string',
            title: 'Phone',
            group: 'contact',
        }),
        defineField({
            name: 'email',
            type: 'string',
            title: 'Email',
            group: 'contact',
        }),
        defineField({
            name: 'googleMap',
            type: 'geopoint',
            title: 'Google Map',
            group: 'contact',
            validation: (Rule) => Rule.required().error('Google Map is required'),
        }),
        defineField({
            name: 'socialLinks',
            title: 'Social Links',
            type: 'array',
            group: 'contact',
            validation: Rule => Rule.max(5),
            of: [
                {
                    type: 'object',
                    fields: [
                        {
                            name: 'icon',
                            title: 'Platform Icon',
                            type: 'image',
                            options: { hotspot: true },
                            validation: Rule => Rule.required(),
                            fields: [
                                {
                                    name: 'alt',
                                    type: 'string',
                                    title: 'Alternative Text',
                                },
                                {
                                    name: 'width',
                                    title: 'Image Width',
                                    type: 'number'
                                },
                                {
                                    name: 'height',
                                    title: 'Image Height',
                                    type: 'number'
                                },
                            ]
                        },
                        {
                            name: 'url',
                            title: 'URL',
                            type: 'url',
                            validation: Rule => Rule.required().uri({ scheme: ['http', 'https'] })
                        },
                        {
                            name: 'newTab',
                            title: 'Open in New Tab',
                            type: 'boolean'
                        }
                    ],
                    preview: {
                        select: {
                            url: 'url'
                        },
                        prepare({ url }) {
                            return {
                                title: url
                            }
                        }
                    }
                },
            ],
        }),

    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'address'
        },
        prepare({ title, subtitle }) {
            return {
                title: title || 'Address Block',
                subtitle
            }
        }
    }
});