// create an address block with the following fields:
// title
// address
// phone
// email
// social media
// link to social media
// google map

import { defineField, defineType } from "sanity";
import { PinIcon } from '@sanity/icons'

export const addressType = defineType({
    name: 'address',
    title: 'Address',
    type: 'object',
    icon: PinIcon,
    groups: [
        { name: 'content', title: 'Content', default: true },
        { name: 'contact', title: 'Contact' },
    ],
    fields: [
        defineField({
            name: 'title',
            type: 'string',
            title: 'Title',
            group: 'content',
        }),
        defineField({
            name: 'address',
            type: 'string',
            title: 'Address',
            group: 'content',
        }),
        defineField({   
            name: 'phone',
            type: 'string',
            title: 'Phone',
            group: 'contact',
        }),
        defineField({
            name: 'email',
            type: 'string',
            title: 'Email',
            group: 'contact',
        }),
        // defineField({   
        //     name: 'socialMedia',
        //     type: 'array',
        //     title: 'Social Media',
        //     of: [{ type: 'reference', to: [{ type: 'socialMedia' }] }],
        //     options: {
        //         layout: 'grid',
        //     },
        // }),
        // defineField({
        //     name: 'googleMap',
        //     type: 'latLong',
        //     title: 'Google Map',
        // }),
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'address'
        },
        prepare({ title, subtitle }) {
            return {
                title: title || 'Address Block',
                subtitle
            }
        }
    }
});