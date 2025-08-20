// /schemas/sections/clientList.ts
import { defineType, defineField } from 'sanity'
import { ImagesIcon } from '@sanity/icons'

export const clientList = defineType({
    name: 'clientList',
    title: 'Client List',
    type: 'object',
    icon: ImagesIcon,
    groups: [
        {
            name: "content",
            title: "Content",
        },
        {
            name: "style",
            title: "Style",
        },
    ],
    fields: [
        defineField({
            name: "title",
            type: "string",
            title: "Title",
            group: "content",
        }),
        defineField({
            name: 'logos',
            title: 'Logos',
            group: "content",
            type: 'array',
            of: [
                defineField({
                    name: 'logo',
                    type: 'image',
                    options: { hotspot: true },
                    fields: [
                        {
                            name: 'alt',
                            title: 'Alt Text',
                            type: 'string',
                        },
                        {
                            name: 'width',
                            title: 'Image Width',
                            type: 'number',
                        },
                        {
                            name: 'height',
                            title: 'Image Height',
                            type: 'number',
                        },
                        {
                            name: 'url',
                            title: 'URL',
                            type: 'url',
                            validation: Rule => Rule.uri({ scheme: ['http', 'https'] })
                        },
                        {
                            name: 'openInNewTab',
                            title: 'Open in New Tab',
                            type: 'boolean',
                            initialValue: false,
                        }

                    ],
                }),
            ],
            
        }),
    ],
    preview: {
        select: {
            title: 'title',
            logos: 'logos'
        },
        prepare({ title, logos }) {
            const count = logos?.length || 0
            return {
                title: title || 'Client List Block',
                subtitle: count ? `${count} client logos` : 'Client Logos',
            }
        },
    },
})
