import { defineField, defineType } from "sanity";
import { UsersIcon } from '@sanity/icons'

export const teamType = defineType({
    name: "team",
    title: "Team Block",
    type: "object",
    icon: UsersIcon,
    groups: [
        { name: 'content', title: 'Content', default: true },
        { name: 'list', title: 'Team Members' },
    ],
    fields: [
        defineField({
            name: "title",
            title: "Title",
            type: "string",
            group: 'content',
        }),
        defineField({
            name: "team",
            type: "array",
            group: 'list',
            of: [
                defineField({
                    name: "teamMember",
                    type: "object",
                    groups: [
                        { name: 'content', title: 'Content', default: true },
                        { name: 'media', title: 'Media' },
                        { name: 'style', title: 'Style' },
                    ],
                    fields: [
                        defineField({
                            name: "name",
                            type: "string",
                            validation: Rule => Rule.required(),
                            group: 'content',
                        }),
                        defineField({
                            name: "role",
                            type: "string",
                            validation: Rule => Rule.required(),
                            group: 'content',
                        }),
                        defineField({
                            name: "icon",
                            type: "image",
                            options: { hotspot: true },
                            group: 'media',
                            fields: [
                                {
                                    name: 'alt',
                                    title: 'Alt Text',
                                    type: 'string',
                                    validation: Rule => Rule.required()
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
                            ],
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
                            title: "name",
                            subtitle: 'role',
                            media: "icon"
                        },
                        prepare({ title, subtitle, media }) {
                            return {
                                title: title || "Untitled Team Member",
                                subtitle,
                                media: media
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
            team: "team"
        },
        prepare({ title, team }) {
            const teamCount = team?.length || 0;
            return {
                title: title || "Team Block",
                subtitle: `${teamCount} team members`
            };
        },
    },
});