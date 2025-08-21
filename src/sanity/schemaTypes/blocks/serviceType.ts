import { defineField, defineType } from "sanity";
import { TaskIcon } from '@sanity/icons'

export const serviceType = defineType({
    name: "services",
    title: "Services Block",
    type: "object",
    icon: TaskIcon,
    groups: [
        { name: 'content', title: 'Content', default: true },
        { name: 'list', title: 'Services' },
    ],
    fields: [
        defineField({
            name: "title",
            title: "Title",
            type: "string",
            group: 'content',
        }),
        defineField({
            name: "services",
            type: "array",
            group: 'list',
            of: [
                defineField({
                    name: "service",
                    type: "object",
                    groups: [
                        { name: 'content', title: 'Content', default: true },
                        { name: 'style', title: 'Style' },
                    ],
                    fields: [
                        defineField({
                            name: "title",
                            type: "string",
                            validation: Rule => Rule.required(),
                            group: 'content',
                        }),
                        defineField({
                            name: "text",
                            type: "text",
                            rows: 3,
                            validation: Rule => Rule.required(),
                            group: 'content',
                        }),
                        defineField({
                            name: "bgColor",
                            type: "color",
                            options: {
                                disableAlpha: true,
                            },
                            group: 'style',
                        }),
                    ],
                    preview: {
                        select: {
                            title: "title",
                        },
                        prepare({ title }) {
                            return {
                                title: title || "Untitled Service",
                            };
                        },
                    }
                }),
            ],
            validation: Rule => Rule.min(1)
        }),
    ],
    preview: {
        select: {
            title: "title",
            layout: "layout",
            services: "services"
        },
        prepare({ title, services }) {
            const serviceCount = services?.length || 0;
            return {
                title: title || "Services Block",
                subtitle: `${serviceCount} services`
            };
        },
    },
});