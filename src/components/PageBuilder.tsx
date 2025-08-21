/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import  HeroBlock  from "@/components/blocks/Hero";
import { client } from "@/sanity/lib/client";
import { createDataAttribute } from "next-sanity";
import { useOptimistic } from "next-sanity/hooks";
import CTABlock from "@/components/blocks/CTA";
import ClientList from "@/components/blocks/ClientList";
import ImageTextSection from "./blocks/ImageText";
import ServiceList from "./blocks/ServiceList";
import { TestimonialSlider } from "./blocks/TestimonialSlider";
import TeamList from "./blocks/TeamList";
import AddressBlock from "./blocks/addressBlock";
import HighlightBlock from "./blocks/HighlightBlock";
import TableBlock from "./blocks/TableBlock";

type PageBuilderProps = {
    content: any[];
    documentId: string;
    documentType: string;
};
type BlockType = "hero" | "ctaBlock" | "clientList" | "imageTextSection" | "services" | "testimonialSlider" | "team" | "address" | "highlightBlock" | "table" | string; // Extend with other block types as needed

const { projectId, dataset, stega } = client.config();
export const createDataAttributeConfig = {
    projectId,
    dataset,
    baseUrl: typeof stega.studioUrl === "string" ? stega.studioUrl : "",
};

export function PageBuilder({
    content,
    documentId,
    documentType,
}: PageBuilderProps) {
    const blocks = useOptimistic<
        any[] | undefined,
        { id: string; document?: { content?: any[]; [key: string]: any } }
    >(content, (state, action) => {
        if (action.id === documentId) {
            return (action?.document as { content?: any[] })?.content?.map(
                (block) => state?.find((s) => s._key === block?._key) || block
            );
        }
        return state;
    });

    if (!Array.isArray(blocks)) {
        return null;
    }

    return (
        <div
            data-sanity={createDataAttribute({
                ...createDataAttributeConfig,
                id: documentId,
                type: documentType,
                path: "content",
            }).toString()}
        >

            {blocks.map((block) => {
                const DragHandle = ({ children }: { children: React.ReactNode }) => (
                    <div
                        data-sanity={createDataAttribute({
                            ...createDataAttributeConfig,
                            id: documentId,
                            type: documentType,
                            path: `content[_key=="${block._key}"]`,
                        }).toString()}
                        className={block._type}
                    >
                        {children}
                    </div>
                );

                switch (block._type as BlockType) {
                    case "hero":
                        return (
                            <DragHandle key={block._key}>
                                <HeroBlock {...(block as React.ComponentProps<typeof HeroBlock>)} />
                            </DragHandle>
                        );
                    case "ctaBlock":
                        return (
                            <DragHandle key={block._key}>
                                <CTABlock {...(block as React.ComponentProps<typeof CTABlock>)} />
                            </DragHandle>
                        );
                    case "clientList":
                        return (
                            <DragHandle key={block._key}>
                                <ClientList {...(block as React.ComponentProps<typeof ClientList>)} />
                            </DragHandle>
                        );
                    case "imageTextSection":
                        return (
                            <DragHandle key={block._key}>
                                <ImageTextSection {...(block as React.ComponentProps<typeof ImageTextSection>)} />
                            </DragHandle>
                        );
                    case "services":
                        return (
                            <DragHandle key={block._key}>
                                <ServiceList {...(block as React.ComponentProps<typeof ServiceList>)} />    
                            </DragHandle>
                        );
                    case "testimonialSlider":
                        return (
                            <DragHandle key={block._key}>
                                <TestimonialSlider {...(block as React.ComponentProps<typeof TestimonialSlider>)} />
                            </DragHandle>
                        );
                    case "team":
                        return (
                            <DragHandle key={block._key}>
                                <TeamList {...(block as React.ComponentProps<typeof TeamList>)} />
                            </DragHandle>
                        );
                    case "address":
                        return (
                            <DragHandle key={block._key}>
                                <AddressBlock {...(block as React.ComponentProps<typeof AddressBlock>)} />
                            </DragHandle>
                        );
                    case "highlightBlock":
                        return (
                            <DragHandle key={block._key}>
                                <HighlightBlock {...(block as React.ComponentProps<typeof HighlightBlock>)} />
                            </DragHandle>
                        );
                    case "table":
                        return (
                            <DragHandle key={block._key}>
                                <TableBlock {...(block as React.ComponentProps<typeof TableBlock>)} />
                            </DragHandle>
                        );
                    default:
                        // This is a fallback for when we don't have a block type
                        return <div>Block not found</div>;
                }
            })}
        </div>
    );
}