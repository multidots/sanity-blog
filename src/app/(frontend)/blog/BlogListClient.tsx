'use client';

import { useEffect, useState } from 'react';
import { POSTS_QUERY, POSTS_COUNT_QUERY, SITE_SETTINGS_QUERY } from '@/sanity/lib/queries';
import { urlFor } from '@/sanity/lib/image';
import Link from 'next/link';
import { client } from '@/sanity/lib/client';
import CTABlock from '@/components/blocks/CTA';
import { SiteSettings } from '@/sanity/types';
import Image from 'next/image';

type Post = {
    _id: string;
    title: string | null;
    slug: { current: string | null | undefined } | null;
    description?: string | null;
    publishedAt: string | null;
    mainImage: {
        asset?: {
            _ref: string;
            _type: 'reference';
            _weak?: boolean;
        };
        alt?: string;
        width?: number;
        height?: number;
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
    description?: string | null;
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
    const [initialLoading, setInitialLoading] = useState(true);
    const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null);
    const [siteSettingsLoaded, setSiteSettingsLoaded] = useState(false);
    const totalPages = Math.ceil(totalPosts / postsPerPage);

    const scrollToTop = () => {
        const blogSection = document.querySelector('.blog-listing');
        if (blogSection) {
            blogSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

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

    // Load site settings only once on initial load
    useEffect(() => {
        const fetchSiteSettings = async () => {
            if (!siteSettingsLoaded) {
                const settings = await client.fetch(SITE_SETTINGS_QUERY);
                setSiteSettings(settings as SiteSettings);
                setPostsPerPage(settings?.blogPostsPerPage || 6);
                setSiteSettingsLoaded(true);
            }
        };

        fetchSiteSettings();
    }, [siteSettingsLoaded]);

    // Fetch posts when page changes or settings are loaded
    useEffect(() => {
        const fetchPosts = async () => {
            if (!siteSettingsLoaded) return;

            setLoading(true);
            
            const currentPostsPerPage = siteSettings?.blogPostsPerPage || postsPerPage;
            const start = (currentPage - 1) * currentPostsPerPage;
            const end = start + currentPostsPerPage;

            try {
                // Parallelize post count and posts fetching
                const [postCount, fetchedPosts] = await Promise.all([
                    client.fetch(POSTS_COUNT_QUERY),
                    client.fetch(POSTS_QUERY, { start, end })
                ]);

                const postsData: PostData[] = fetchedPosts.map((post) => ({
                    _id: post._id,
                    title: post.title,
                    slug: post.slug ? { current: post.slug.current } : null,
                    description: undefined, // This field is not in POSTS_QUERY, keeping undefined
                    publishedAt: post.publishedAt,
                    mainImage: post.mainImage,
                    categories: post.categories ?? [],
                    author: post.author ?? null,
                    _type: post._type,
                } as PostData));

                setPosts(postsData);
                setTotalPosts(postCount);
            } catch (error) {
                console.error('Error fetching posts:', error);
            } finally {
                setLoading(false);
                setInitialLoading(false);
            }
        };

        fetchPosts();
    }, [currentPage, siteSettingsLoaded, siteSettings?.blogPostsPerPage, postsPerPage]);

    return (
        <main>
            <section className="blog-listing section">
                <div className="container">
                    <h1 className="section-title">Latest Articles</h1>
                    {initialLoading ? (
                        <div className="loading-spinner" style={{ textAlign: 'center', padding: '2rem' }}>
                            Loading articles...
                        </div>
                    ) : (
                        <div className={`blog-grid ${loading ? 'loading' : ''}`} style={{ position: 'relative' }}>
                            {loading && !initialLoading && (
                                <div style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    backgroundColor: 'rgba(255, 255, 255, 0.7)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    zIndex: 10,
                                    fontSize: '1rem',
                                    fontWeight: '500'
                                }}>
                                    Loading...
                                </div>
                            )}
                            {posts.map((post, index) => (
                                <article className="blog-card" key={index} style={{ opacity: loading && !initialLoading ? 0.6 : 1 }}>
                                    {post.mainImage && (
                                        <div className="blog-card-image">
                                            <Image
                                                src={urlFor(post.mainImage).url()}
                                                alt={post.title || ''}
                                                width={500}
                                                height={500}
                                            />
                                        </div>
                                    )}
                                    {post.title && (
                                        <div className="blog-content">
                                            <span className="blog-date"> {post.author && (
                                                <span className="blog-author">By {post.author.name}</span>
                                            )} | {post.publishedAt && new Date(post.publishedAt).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                            })} | {post.categories && post.categories.length > 0 && (
                                                <span className="blog-categories">
                                                    {post.categories.map((category) => (
                                                        <span key={category}> | {category}</span>
                                                    ))}
                                                </span>
                                            )}</span>
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
                
                {!initialLoading && totalPages > 1 && (
                    <div className="pagination">
                        <nav className="pagination-nav">
                            <button
                                disabled={currentPage <= 1}
                                onClick={() => {
                                    setCurrentPage((p) => Math.max(p - 1, 1));
                                    scrollToTop();
                                }}
                                className={`pagination-button pagination-arrow prev ${currentPage <= 1 ? 'pagination-button-disabled' : ''}`}
                            >
                            </button>

                            {getPaginationNumbers().map((page, index) => (
                                page === '...'
                                    ? (
                                        <span key={`ellipsis-${index}`} className="pagination-ellipsis">...</span>
                                    )
                                    : (
                                        <button
                                            key={page}
                                            onClick={() => {
                                                setCurrentPage(page as number);
                                                scrollToTop();
                                            }}
                                            className={`pagination-button ${currentPage === page ? 'pagination-button-active' : ''}`}
                                        >
                                            {page}
                                        </button>
                                    )
                            ))}

                            <button
                                disabled={currentPage >= totalPages}
                                onClick={() => {
                                    setCurrentPage((p) => Math.min(p + 1, totalPages));
                                    scrollToTop();
                                }}
                                className={`pagination-button pagination-arrow next ${currentPage >= totalPages ? 'pagination-button-disabled' : ''}`}
                            >
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
        </main>
    );
}


