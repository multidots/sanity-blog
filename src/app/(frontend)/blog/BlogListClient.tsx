'use client';

import { useEffect, useState } from 'react';
import { POSTS_QUERY, POSTS_COUNT_QUERY, SITE_SETTINGS_QUERY } from '@/sanity/lib/queries';
import { urlFor } from '@/sanity/lib/image';
import Image from 'next/image';
import Link from 'next/link';
import { client } from '@/sanity/lib/client';
import CTABlock from '@/components/blocks/CTA';
import { SiteSettings } from '@/sanity/types';
// import '@/app/css/BlogList.css';


type Post = {
    _id: string;
    title: string | null;
    slug: { current: string | null | undefined } | null;
    description: string | null;
    publishedAt: string | null;
    mainImage: {
        asset?: {
            _ref: string;
            _type: 'reference';
            _weak?: boolean;
        };
        alt?: string;
        _type: 'image';
    } | null;
    categories?: string[];
    author?: {
        _id: string;
        name?: string;
        slug: { current: string | null | undefined } | null;
        image?: {
            asset?: {
                _ref: string;
                _type: 'reference';
            };
            alt?: string;
        };
    } | null;
    _type: string;
};

type PostData = {
    _id: string;
    title: string | null;
    slug: { current: string | null | undefined } | null;
    description: string | null;
    publishedAt: string | null;
    mainImage: {
        asset?: {
            _ref: string;
            _type: 'reference';
            _weak?: boolean;
        };
        alt?: string;
        _type: 'image';
    } | null;
    categories?: string[];
    author?: {
        _id: string;
        name?: string;
        slug: { current: string | null | undefined } | null;
        image?: {
            asset?: {
                _ref: string;
                _type: 'reference';
            };
            alt?: string;
        };
    } | null;
    _type: string;
};

export default function BlogListClient() {
    const [postsPerPage, setPostsPerPage] = useState(6);
    const [currentPage, setCurrentPage] = useState(1);
    const [posts, setPosts] = useState<Post[]>([]);
    const [totalPosts, setTotalPosts] = useState(0);
    const [loading, setLoading] = useState(false);
    const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null);
    const totalPages = Math.ceil(totalPosts / postsPerPage);

    const getPaginationNumbers = () => {
        const delta = 2;
        const range: number[] = [];
        const rangeWithDots: (number | '...')[] = [];

        for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
            range.push(i);
        }

        if (currentPage - delta > 2) {
            rangeWithDots.push(1, '...');
        } else {
            rangeWithDots.push(1);
        }

        rangeWithDots.push(...range);

        if (currentPage + delta < totalPages - 1) {
            rangeWithDots.push('...', totalPages);
        } else {
            rangeWithDots.push(totalPages);
        }

        return rangeWithDots;
    };

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);

            const siteSettings = await client.fetch(SITE_SETTINGS_QUERY);
            setSiteSettings(siteSettings);
            const settingsPostsPerPage = siteSettings?.blogPostsPerPage || 6;
            setPostsPerPage(settingsPostsPerPage);

            const start = (currentPage - 1) * settingsPostsPerPage;
            const end = start + settingsPostsPerPage;

            const postCount = await client.fetch(POSTS_COUNT_QUERY);

            const fetchedPosts = await client.fetch(POSTS_QUERY, { start, end });
            const postsData: PostData[] = fetchedPosts.map((post: any) => ({
                _id: post._id,
                title: post.title,
                slug: post.slug ? { current: post.slug.current } : null,
                description: post.description,
                publishedAt: post.publishedAt,
                mainImage: post.mainImage,
                categories: post.categories ?? [],
                author: post.author ?? null,
                _type: post._type || 'post',
            } as PostData));
            setPosts(postsData);
            setTotalPosts(postCount);
            setLoading(false);
        };

        fetchPosts();
    }, [currentPage]);

    return (
        <>
            <section className="blog-listing section">
                <div className="container">
                    <h1 className="section-title">Latest Articles</h1>
                    {!loading && (
                    <div className="blog-grid">
                        {posts.map((post, index) => (
                            <article className="blog-card" key={index}>
                                {post.mainImage && (
                                    <div className="blog-card-image">
                                        <img src={urlFor(post.mainImage).url()} alt={post.title || ''} />
                                    </div>
                                )}
                                {post.title && (
                                    <div className="blog-content">
                                        <span className="blog-date">{post.publishedAt && new Date(post.publishedAt).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        })}</span>
                                        <h2><Link href={`/blog/${post.slug?.current ?? ''}`}>{post.title ?? 'Untitled'}</Link></h2>
                                        <p>{post.description ?? ''}</p>
                                        <Link href={`/blog/${post.slug?.current ?? ''}`} className="btn">Read More</Link>
                                    </div>
                                )}
                        </article>
                        ))}
                    </div>
                    )}
                </div>
                
                {!loading && totalPages > 1 && (
                    <div className="pagination">
                        <nav className="pagination-nav">
                            <button
                                disabled={currentPage <= 1}
                                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                                className={`pagination-button ${currentPage <= 1 ? 'pagination-button-disabled' : ''}`}
                            >
                                prev
                            </button>

                            {getPaginationNumbers().map((page, index) => (
                                page === '...'
                                    ? (
                                        <span key={`ellipsis-${index}`} className="pagination-ellipsis">...</span>
                                    )
                                    : (
                                        <button
                                            key={page}
                                            onClick={() => setCurrentPage(page as number)}
                                            className={`pagination-button ${currentPage === page ? 'pagination-button-active' : ''}`}
                                        >
                                            {page}
                                        </button>
                                    )
                            ))}

                            <button
                                disabled={currentPage >= totalPages}
                                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                                className={`pagination-button ${currentPage >= totalPages ? 'pagination-button-disabled' : ''}`}
                            >
                                next
                            </button>
                        </nav>
                    </div>
                )}
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


