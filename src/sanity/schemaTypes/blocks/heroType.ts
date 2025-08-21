import { defineField, defineType } from "sanity";
import { TextIcon } from "@sanity/icons";

export const heroType = defineType({
    name: "hero",
    title: "Hero Block",
    type: "object",
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
            description: "Title for the Hero section",
            group: "content",
        }),
        defineField({
            name: "subtitle",
            type: "string",
            title: "Subtitle",
            description: "Subtitle for the Hero section",
            group: "content",
        }),
        //button
       defineField({
        name: 'button',
        title: 'Button',
        type: 'object',
        group: "content",
        options: { collapsible: true, collapsed: true, columns: 2 },
        fields: [
            defineField({
                name: 'text',
                title: 'Text',
                type: 'string',
            }),
            defineField({
                name: 'link',
                title: 'Link',
                type: 'string',
            }),
            defineField({
                name: 'openInNewTab',
                title: 'Open in New Tab',
                type: 'boolean',
            }),
        ],
       }),
        defineField({
            name: 'backgroundType',
            title: 'Background Type',
            type: 'string',
            options: {
                list: ['image', 'color'],
            },
            group: "style",
        }),
        defineField({
            name: "bgImage",
            type: "image",
            title: 'Background Image',
            description: 'Image for the Hero section',
            group: 'content',
            hidden: ({ parent }) => parent?.backgroundType !== 'image',
        }),
        // add background color
        defineField({
            name: 'backgroundColor',
            title: 'Background Color',
            type: 'color',
            description: 'Choose a background color for the Hero',
            group: "style",
            hidden: ({ parent }) => parent?.backgroundType !== 'color',
        }),
        // text color
        defineField({
            name: 'textColor',
            title: 'Text Color',
            type: 'color',
            description: 'Choose a text color for the Hero',
            group: "style",
        }),
        //alignment
        defineField({
            name: "alignment",
            type: "string",
            title: "Alignment",
            description: "Choose the alignment of the text in the Hero section",
            options: {
                list: ["left", "center", "right"],            
                layout: "radio",                        
            },
            initialValue: "center",
            group: "style",
        }),
    ],
    icon: TextIcon,
    preview: {
        select: {
            title: "title",
            subtitle: "subtitle",
            media: "bgImage",   
        },
        prepare({ title, subtitle, media }) {
            return {
                title: "Hero Block",
                subtitle: title ?? subtitle ?? "Hero Block",   
                media: media ?? TextIcon,
            };
        },
    },
});