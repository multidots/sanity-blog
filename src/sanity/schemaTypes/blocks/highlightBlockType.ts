import { defineType, defineField } from 'sanity'
import { HighlightIcon } from '@sanity/icons'

// create highlight block type
export const highlightBlockType = defineType({
    name: 'highlightBlock',
    title: 'Highlight Block',
    type: 'object',
    icon: HighlightIcon,
    groups: [
        { name: 'content', title: 'Content', default: true },
        { name: 'style', title: 'Style' },
    ],
    fields: [
        defineField({
            name: 'highlightText',
            title: 'Highlight Text',
            type: 'array',
            of: [{ type: 'block' }],
            group: 'content',
        }),
        // bg color
        defineField({
            name: 'bgColor',
            title: 'Background Color',
            type: 'color',
            group: 'style',
        }),
        // text color
        defineField({
            name: 'textColor',
            title: 'Text Color',
            type: 'color',
            group: 'style',
        }),
    ],
    preview: {
        select: {
            title: 'highlightText',
        },
        prepare() {
            return {
                title: 'Highlight Block',
            };
        },
    },
})