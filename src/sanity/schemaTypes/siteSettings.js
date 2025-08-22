const siteSettings = {
    name: 'siteSettings',
    title: 'Site Settings',
    type: 'document',
    __experimental_actions: ['update', 'publish'], // Prevents creation and deletion
    groups: [
        { name: 'generalSettings', title: 'General', default: true },
        { name: 'headerSettings', title: 'Header' },
        { name: 'footerSettings', title: 'Footer' },
        { name: 'pageSettings', title: 'Pages' },
        { name: 'blogSettings', title: 'Blog' },
    ],
    fields: [
        {
            name: 'siteTitle',
            title: 'Site Title',
            type: 'string',
            group: 'generalSettings',
            validation: Rule => Rule.required()
        },
        {
            name: 'logo',
            title: 'Site Logo',
            type: 'image',
            options: { hotspot: true },
            group: 'headerSettings',
            validation: Rule => Rule.required(),
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
                    type: 'number'
                },
                {
                    name: 'height',
                    title: 'Image Height',
                    type: 'number'
                },
                {
                    name: 'url',
                    title: 'URL',
                    type: 'url',
                    validation: (Rule) =>
                        Rule.uri({
                            allowRelative: true,
                            scheme: ['https', 'http', 'mailto', 'tel'],
                        }).required(),
                    description: 'Can be relative (/about) or absolute (https://...)',
                },
            ]
        },
        {
            name: 'menuItems',
            title: 'Menu Items',
            group: 'headerSettings',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'title', title: 'Title', type: 'string' },
                        {
                            name: 'url', title: 'URL', type: 'url',
                            validation: (Rule) =>
                                Rule.uri({
                                    allowRelative: true,
                                    scheme: ['https', 'http', 'mailto', 'tel'],
                                }).required(),
                            description: 'Can be relative (/about) or absolute (https://...)',
                        },
                        {
                            name: 'openInNewTab',
                            title: 'Open in New Tab',
                            type: 'boolean',
                            initialValue: false
                        },
                    ],
                },
            ],
        },
        // Footer Settings
        {
            name: 'footer',
            title: 'Footer Settings',
            type: 'object',
            group: 'footerSettings',
            options: { collapsible: true, collapsed: false },
            fields: [
                {
                    name: 'footerTitle',
                    title: 'Footer Title',
                    type: 'string',
                },
                {
                    name: 'footerDescription',
                    title: 'Footer Description',
                    type: 'text',
                },
                // Footer Menu
                {
                    name: 'footermenuItems',
                    title: 'Footer Menu Items',
                    type: 'array',
                    validation: Rule => Rule.max(10),
                    of: [
                        {
                            type: 'object',
                            fields: [
                                {
                                    name: 'title',
                                    title: 'Title',
                                    type: 'string',
                                    validation: Rule => Rule.required().max(30)
                                },
                                {
                                    name: 'url',
                                    title: 'URL',
                                    type: 'url',
                                    validation: (Rule) =>
                                        Rule.uri({
                                            allowRelative: true,
                                            scheme: ['https', 'http', 'mailto', 'tel'],
                                        }).required(),
                                    description: 'Can be relative (/about) or absolute (https://...)',
                                },
                                {
                                    name: 'newTab',
                                    title: 'Open in New Tab',
                                    type: 'boolean'
                                }
                            ],
                            preview: {
                                select: {
                                    title: 'title',
                                    url: 'url'
                                },
                                prepare({ title, url }) {
                                    return {
                                        title: title,
                                        subtitle: url
                                    }
                                }
                            }
                        },
                    ],
                },

                // Copyright
                {
                    name: 'copyrrightText',
                    title: 'Copyright Text',
                    type: 'string',
                    validation: Rule => Rule.max(100)
                },

                // Social Links
                {
                    name: 'socialLinks',
                    title: 'Social Links',
                    type: 'array',
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
                }
            ]
        },

        // Page Settings
        {
            name: "homePage",
            title: "Home Page Reference",
            type: "reference",
            to: [{ type: "page" }],
            group: 'pageSettings',
            validation: Rule => Rule.required()
        },

        // Blog Settings
        {
            name: "blogPostsPerPage",
            title: "Blog Posts Per Page",
            type: "number",
            group: 'blogSettings',
            description: "Number of blog posts to display per page",
            initialValue: 6,
            validation: Rule => Rule.required().min(1).max(20)
        },
        {
            name: "blogPageCTA",
            title: "Blog Page CTA",
            type: "ctaBlock",
            group: 'blogSettings',
        }
    ]
}

export default siteSettings;