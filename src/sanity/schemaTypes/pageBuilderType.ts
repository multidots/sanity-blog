import { defineType, defineArrayMember } from "sanity";

export const pageBuilderType = defineType({
    name: "pageBuilder",
    type: "array",
    of: [
        defineArrayMember({ type: "hero" }),
        defineArrayMember({
            type: "ctaBlock",
            title: "Call to Action Block",
            description: "A block for call to action content",
        }),
        defineArrayMember({
            type: "imageTextSection"
        }),
        defineArrayMember({
            type: "clientList"
        }),
        defineArrayMember({
            type: "services"
        }),
        defineArrayMember({ type: "testimonialSlider" }),
        defineArrayMember({ type: "team" }),
        defineArrayMember({ type: "address" }),
        defineArrayMember({ type: "highlightBlock" }),
        defineArrayMember({ type: "table" }),

    ],
    options: {
        insertMenu: {
            views: [
                {
                    name: "grid",
                    previewImageUrl: (schemaType) => `/block-previews/${schemaType}.png`,
                },
            ],
        },
    },
});