import { defineType, defineArrayMember } from "sanity";

export const pageBuilderType = defineType({
    name: "pageBuilder",
    type: "array",
    of: [
        defineArrayMember({ type: "hero" }),
        defineArrayMember({
            type: "ctaBlock",
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
        defineArrayMember({ type: "address" })

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