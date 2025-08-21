import React from 'react';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import Link from 'next/link';

type HeaderProps = {
    logo?: { asset?: unknown; alt?: string; url?: string; openInNewTab?: boolean; width?: number; height?: number } | null;
    siteTitle?: string | null;
    menuItems?: Array<{
        title?: string | null;
        url?: string | null;
        openInNewTab?: boolean | null;
    }> | null;
};

export default function Header({ logo, siteTitle, menuItems }: HeaderProps) {
    const normalizeHref = (url?: string | null) => {
        if (!url) return '#';
        const lower = url.toLowerCase();
        if (lower.startsWith('http://') || lower.startsWith('https://') || lower.startsWith('mailto:') || lower.startsWith('tel:')) {
            return url;
        }
        return url.startsWith('/') ? url : `/${url}`;
    };
    return (
        <header className="header">
            <div className="container">
                {logo && (
                    <div className="logo">
                        <Link href={normalizeHref(logo.url)} target={logo.openInNewTab ? '_blank' : '_self'}>
                            <Image src={urlFor(logo).url()}
                                alt={siteTitle || 'Logo'}
                                width={logo.width || 180}
                                height={logo.height || 40} />
                        </Link>
                    </div>
                )}
                <nav>
                    {menuItems?.map((item) => (
                        <Link href={normalizeHref(item.url)}
                            target={item.openInNewTab ? '_blank' : '_self'}
                            key={item.title}>
                            {item.title}
                        </Link>
                    ))}
                </nav>
            </div>
        </header>
    );
}