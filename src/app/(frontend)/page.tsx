import type { Metadata } from "next";
import { PageBuilder } from "@/components/PageBuilder";
import { sanityFetch } from "@/sanity/lib/live";
import { HOME_PAGE_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";

type RouteProps = {
    params: Promise<{ slug: string }>;
};
const getPage = async (params: RouteProps["params"]) =>
    sanityFetch({
        query: HOME_PAGE_QUERY,
        params: await params,
    });
export async function generateMetadata({
    params,
}: RouteProps): Promise<Metadata> {
    const { data: page } = await getPage(params);

    if (!page) {
        return {}
    }

    const homePage = page?.homePage;

    if (!homePage) {
        return {};
    }

    const metadata: Metadata = {
        title: homePage.seo?.title || homePage.title,
        description: homePage.seo?.description,
    };

    metadata.openGraph = {
        images: {
            url: homePage.seo?.image
                ? urlFor(homePage.seo.image).width(1200).height(630).url()
                : `/api/og?id=${homePage._id}`,
            width: 1200,
            height: 630,
        },
    };

    if (homePage.seo?.noIndex) {
        metadata.robots = "noindex, nofollow";
    } else {
        metadata.robots = "index, follow";
    }

    return metadata;
}

export default async function Page({ params }: RouteProps) {
    const { data: page } = await getPage(params);
    const homePage = page?.homePage;

    // Find the ClientList block and extract logo URLs for preloading
    const clientListBlock = homePage?.content?.find(
        (block: any) => block && block._type === 'clientList'
    ) as { logos?: any[] } | undefined;

    const logoUrls = Array.isArray(clientListBlock?.logos)
        ? clientListBlock.logos
            .filter((logo: any) => logo.asset)
            .map((logo: any) => urlFor(logo).url())
            .filter(Boolean)
        : [];

    return homePage?.content ? (
        <>

            {/* Preload client logos */}
            {logoUrls.map((url, index) => (
                <link
                    key={`preload-${index}`}
                    rel="preload"
                    fetchPriority="high"
                    href={url}
                    as="image"
                    type="image/svg+xml"
                />
            ))}

            <PageBuilder
                documentId={homePage._id}
                documentType={homePage._type}
                content={homePage.content}
            />
        </>
    ) : null;
}