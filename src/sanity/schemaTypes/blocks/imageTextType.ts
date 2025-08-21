import { defineType, defineField } from 'sanity'
import { ImageIcon } from '@sanity/icons'

export const imageTextSection = defineType({
    name: 'imageTextSection',
    title: 'Image & Text Block',
    type: 'object',
    icon: ImageIcon,
    groups: [
        {
            name: "content",
            title: "Content",
        },
        {
            name: "image",
            title: "Image",
        },
        {
            name: "button",
            title: "Button",
        },
        {
            name: "style",
            title: "Style",
        },
    ],
    fields: [
        defineField({
            name: 'title',
            type: 'string',
            title: 'Title',
            group: "content",
        }),
        defineField({
            name: 'description',
            type: 'array',
            of: [{ type: 'block' }],
            title: 'Description',
            group: "content",
        }),
        defineField({
            name: 'mainImage',
            type: 'image',
            title: 'Main Image',
            group: "image",
            options: {
                hotspot: true,
            },
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
        }),
        defineField({
            name: 'imagePosition',
            type: 'string',
            title: 'Main Image Position',
            group: "style",
            options: {
                list: [
                    { title: 'Left', value: 'left' },
                    { title: 'Right', value: 'right' },
                ],
                layout: 'radio',
            },
            initialValue: 'right',
        }),
        defineField({
            name: 'button',
            title: 'Button',
            group: "button",
            type: 'object',
            options: { collapsible: true, collapsed: true, columns: 2 },
            fields: [
                defineField({
                    name: 'text',
                    title: 'Button Text',
                    type: 'string',
                    validation: Rule => Rule.required()
                }),
                defineField({
                    name: 'link',
                    title: 'Link',
                    type: 'url',
                    validation: (Rule) =>
                        Rule.uri({
                            allowRelative: true,
                            scheme: ['https', 'http', 'mailto', 'tel'],
                        }).required(),
                    description: 'Can be relative (/about) or absolute (https://...)',
                }),
                defineField({
                    name: 'openInNewTab',
                    title: 'Open in new tab?',
                    type: 'boolean',
                    initialValue: false,
                }),
            ],
        }),
    ],
    preview: {
        select: {
            title: "title",
            subtitle: "description",
            media: "mainImage",
        },
        prepare({ title, subtitle, media }) {
            return {
                title: "Image Text Block",
                subtitle: title ?? subtitle ?? "Image Text Block",
                media: media ?? ImageIcon,
            };
        },
    },
})
