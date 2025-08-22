import type { Metadata } from "next";
import { PageBuilder } from "@/components/PageBuilder";
import { sanityFetch } from "@/sanity/lib/live";
import { CONTACT_FORM_QUERY, CONTACT_FORM_SETTINGS_QUERY, PAGE_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { client } from "@/sanity/lib/client";
import { ContactFormWrapper } from "@/components/ContactFormWrapper";

type RouteProps = {
    params: Promise<{ slug: string }>;
};

const getPage = async (params: RouteProps["params"]) =>
    sanityFetch({
        query: PAGE_QUERY,
        params: await params,
    });

export async function generateMetadata({
    params,
}: RouteProps): Promise<Metadata> {
    const { data: page } = await getPage(params);

    if (!page) {
        return {}
    }

    if (!page) {
        return {};
    }

    const metadata: Metadata = {
        title: page.seo?.title || page.title,
        description: page.seo?.description,
    };

    metadata.openGraph = {
        images: {
            url: page.seo?.image
                ? urlFor(page.seo.image).width(1200).height(630).url()
                : `/api/og?id=${page._id}`,
            width: 1200,
            height: 630,
        },
    };

    if (page.seo?.noIndex) {
        metadata.robots = "noindex, nofollow";
    } else {
        metadata.robots = "index, follow";
    }

    return metadata;
}

export default async function Page({ params }: RouteProps) {
    const { data: page } = await getPage(params);
    const formId = page?.contactForm?._ref;
    const formData = formId ? await getContactForm(formId) : null;

    if (!page) {
        return null;
    }
    return page?.content ? (
        <div className="main">
            {formId &&
                <section className="contact-page-main">
                    <div className="container">
                        {formData && <ContactFormWrapper formData={formData} />}
                    </div>
                </section>
            }
            <PageBuilder
                documentId={page._id}
                documentType={page._type}
                content={page.content}
            />
        </div>
    ) : null;
}
async function getContactForm(formId: string) {
    try {
        const [formData, formSettings] = await Promise.all([
            client.fetch(CONTACT_FORM_QUERY, { formId }),
            client.fetch(CONTACT_FORM_SETTINGS_QUERY),
        ]);

        return { ...formData, settings: formSettings };
    } catch (error) {
        console.error("Error fetching contact form:", error);
        throw error;
    }
}