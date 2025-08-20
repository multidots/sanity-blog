import { DocumentIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const pageType = defineType({
    name: "page",
    title: "Page",
    type: "document",
    icon: DocumentIcon,
    groups: [
        {
            name: "content",
            title: "Content",
        },
        {
            name: "seo",
            title: "SEO",
        },
        {
            name: "meta",
            title: "Meta",
        },
        
    ],
    fields: [
        defineField({
            name: "title",
            type: "string",
            title: "Title",
            description: "The title of the page. This will be used as the main heading and for SEO.",
            group: "content",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "slug",
            type: "slug",
            options: {
                source: "title",
            },
            title: "Slug",
            description: "The URL slug for this page. It will be generated from the title but can be customized.",
            group: "meta",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "content",
            type: "pageBuilder",
            group: "content",
        }),
        defineField({
            name: "seo",
            type: "seo",
            description: "SEO settings for this page. If not provided, the title and description will be used.",
            options: {
                collapsible: true,
                collapsed: true,
            },
            group: "seo",
        }),
    ],
    preview: {
        select: {
            title: "title",
            subtitle: "slug.current",
        },
    },
});