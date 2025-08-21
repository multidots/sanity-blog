import { defineType } from "sanity";
import { SquareIcon } from '@sanity/icons'

export const tableType = defineType({
    name: 'table',
    title: 'Table Block',
    type: 'object',
    icon: SquareIcon,
    fields: [
        {
            name: 'rows',
            type: 'array',
            title: 'Table Rows',
            of: [
                {
                    type: 'object',
                    name: 'row',
                    title: 'Row',
                    fields: [
                        {
                            name: 'cells',
                            type: 'array',
                            title: 'Cells',
                            of: [
                                {
                                    type: 'object',
                                    name: 'cell',
                                    title: 'Cell',
                                    fields: [
                                        {
                                            name: 'content',
                                            type: 'array',
                                            title: 'Cell Content',
                                            of: [
                                                {
                                                    type: 'block',
                                                    styles: [
                                                        { title: 'Normal', value: 'normal' },
                                                        { title: 'Strong', value: 'strong' },
                                                        { title: 'Emphasis', value: 'em' },
                                                    ],
                                                    marks: {
                                                        decorators: [
                                                            { title: 'Strong', value: 'strong' },
                                                            { title: 'Emphasis', value: 'em' },
                                                        ],
                                                        annotations: [
                                                            {
                                                                title: 'URL',
                                                                name: 'link',
                                                                type: 'object',
                                                                fields: [
                                                                    {
                                                                        title: 'URL',
                                                                        name: 'href',
                                                                        type: 'url',
                                                                    },
                                                                ],
                                                            },
                                                        ],
                                                    },
                                                },
                                            ],
                                        },
                                        {
                                            name: 'isHeader',
                                            type: 'boolean',
                                            title: 'Is Header Cell',
                                            initialValue: false,
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                    preview: {
                        select: {
                            cells: 'cells',
                        },
                        prepare({ cells }) {
                            return {
                                title: 'Row',
                                subtitle: `${cells?.length} cells`,
                            };
                        },
                    },  
                },
            ], 
        },
        {
            name: 'caption',
            type: 'string',
            title: 'Table Caption',
        },
    ],
    preview: {
        select: {
            caption: 'caption',
            rows: 'rows',
        },
        prepare({  rows }) {
            const rowCount = rows?.length || 0;
            const cellCount = rows?.[0]?.cells?.length || 0;
            return {
                title: 'Table Block',
                subtitle: `${rowCount} rows × ${cellCount} columns`,
            };
        },
    },
});