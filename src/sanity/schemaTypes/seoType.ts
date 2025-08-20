import { defineField, defineType } from "sanity";

export const seoType = defineType({
    name: "seo",
    title: "SEO",
    type: "object",
    groups: [
        { name: 'basic', title: 'Basic', default: true },
        { name: 'advanced', title: 'Advanced' },
    ],
    fields: [
        defineField({
            name: "title",
            description: "If provided, this will override the title field",
            type: "string",
            title: 'SEO Title',
            group: 'basic',
        }),
        defineField({
            name: "description",
            type: "text",
            title: 'Meta Description',
            rows: 3,
            group: 'basic',
        }),
        defineField({
            name: "image",
            type: "image",
            title: 'Social Share Image',
            options: { hotspot: true },
            group: 'basic'
        }),
        defineField({
            name: "noIndex",
            type: "boolean",
            title: 'Noindex',
            description: 'If checked, search engines will be discouraged from indexing this page',
            group: 'advanced',
        }),
    ],
});