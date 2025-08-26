import { client } from '@/sanity/lib/client';
import { SINGLE_POST_QUERY, SITE_SETTINGS_QUERY } from '@/sanity/lib/queries';
import { urlFor } from '@/sanity/lib/image';
import { PortableText } from 'next-sanity';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Metadata } from 'next';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import CTABlock from '@/components/blocks/CTA';
import { portableTextComponents } from '@/components/PortableTextComponents';

type Props = {
    params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = await client.fetch(SINGLE_POST_QUERY, { slug });

    if (!post) {
        return {};
    }
    const title = post?.seo?.title || post?.title || '';
    const description = post?.seo?.description || '';
    const imageSource: SanityImageSource | undefined = (post?.seo?.image || post?.mainImage) as SanityImageSource | undefined;
    const ogImageUrl = imageSource ? urlFor(imageSource).url() : undefined;
    const categories = Array.isArray(post?.categories)
        ? post.categories.map((c: { title?: string | null }) => c?.title).filter(Boolean) as string[]
        : [];

    const noIndex = post?.seo?.noIndex === true;

    return {
        title,
        description,
        robots: {
            index: !noIndex,
            follow: !noIndex,
        },
        alternates: {
            canonical: `/blog/${slug}`,
        },
        openGraph: {
            title,
            description,
            type: 'article',
            url: `/blog/${slug}`,
            publishedTime: post?.publishedAt || undefined,
            images: ogImageUrl ? [
                {
                    url: ogImageUrl,
                    alt: title,
                },
            ] : undefined,
            tags: categories.length ? categories : undefined,
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: ogImageUrl ? [ogImageUrl] : undefined,
        },
        keywords: categories.length ? categories : undefined,
    };
}

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params;
    const [post, siteSettings] = await Promise.all([
        client.fetch(SINGLE_POST_QUERY, { slug }),
        client.fetch(SITE_SETTINGS_QUERY)
    ]);

    if (!post) notFound();

    // const firstCategory = post.categories && post.categories.length > 0 ? post.categories[0] : null;

    return (
        <>
        <section className="blog-detail section">
            <div className="container">
                <div className="blog-detail-top-section">
                    {post.mainImage && (
                        <div className="blog-detail-feature-image">
                                <Image
                                    src={urlFor(post.mainImage).url()}
                                    alt={post.title || ''}
                                    className="blog-main-img"
                                    width={1200}
                                    height={800}
                                />
                        </div>
                    )}
                    {post.title && (
                        <h1 className="blog-title">{post.title}</h1>
                    )}
                    {post.author && (
                        <p className="blog-meta">By <strong>{post.author.name}</strong> | {post.publishedAt && new Date(post.publishedAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        })} | {post.categories && post.categories.length > 0 && (
                            <span className="blog-categories">
                                {post.categories.map((category: {title: string | null}) => (
                                    <span key={category.title || ''}> | {category.title}</span>
                                ))}
                            </span>
                        )}</p>
                        )}
                </div>
                <div className="blog-detail-content">
                    {post.body && (
                        <PortableText value={post.body} components={portableTextComponents} />
                    )}
                </div>
            </div>
        </section>
        <CTABlock
                heading={siteSettings?.blogPageCTA?.heading || undefined}
                subheading={siteSettings?.blogPageCTA?.subheading || undefined}
                button={siteSettings?.blogPageCTA?.button?.text && siteSettings?.blogPageCTA?.button?.link ? {
                    text: siteSettings.blogPageCTA.button.text,
                    link: siteSettings.blogPageCTA.button.link,
                    openInNewTab: siteSettings.blogPageCTA.button.openInNewTab || false
                } : undefined}
                backgroundType={siteSettings?.blogPageCTA?.backgroundType || 'color'}
                backgroundImage={siteSettings?.blogPageCTA?.backgroundImage}
                backgroundColor={siteSettings?.blogPageCTA?.backgroundColor?.hex ? { hex: siteSettings.blogPageCTA.backgroundColor.hex } : undefined}
                textColor={siteSettings?.blogPageCTA?.textColor?.hex ? { hex: siteSettings.blogPageCTA.textColor.hex } : undefined}
            />
        </>
    );
}
