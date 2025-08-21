import { defineType, defineField } from 'sanity'
import { BlockContentIcon } from '@sanity/icons'

export const ctaBlockType = defineType({
    name: 'ctaBlock',
    title: 'CTA Block',
    description: 'A block for call to action content',
    icon: BlockContentIcon,
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
    type: 'object',
    fields: [
        defineField({
            name: 'heading',
            title: 'Heading',
            type: 'string',
            description: 'Main heading for the CTA',
            group: "content",
        }),
        defineField({
            name: 'subheading',
            title: 'Subheading',
            type: 'text',
            description: 'Optional subheading text',
            rows: 3,
            group: "content",
        }),
        defineField({
            name: 'button',
            title: 'Button',
            group: "content",
            type: 'object',
            options: { collapsible: true, collapsed: false },
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
        // choose between background image or background color
        defineField({
            name: 'backgroundType',
            title: 'Background Type',
            type: 'string',
            options: {
                list: ['image', 'color'],
            },
            initialValue: 'color',
            group: "style",
        }),
        defineField({
            name: 'backgroundImage',
            title: 'Background Image',
            type: 'image',
            description: 'Optional background image for the CTA',
            hidden: ({ parent }) => parent?.backgroundType !== 'image',
            group: "style",
        }),
        defineField({
            name: 'backgroundColor',
            title: 'Background Color',
            type: 'color',
            description: 'Choose a background color for the CTA',
            hidden: ({ parent }) => parent?.backgroundType !== 'color',
            group: "style",
            options: {
                disableAlpha: true,
            },
            
        }),
        defineField({
            name: 'textColor',
            title: 'Text Color',
            type: 'color',
            description: 'Choose a text color that contrasts with the background',
            group: "style",
        }),
    ],
    preview: {
        select: {
            heading: 'heading',
            subheading: 'subheading',
            media: 'image',
        },
        prepare({ heading, subheading, media }) {
            return {
                title: heading || 'CTA Block',
                subtitle: subheading || 'No subheading',
                media,
            }
        },
    },
})

