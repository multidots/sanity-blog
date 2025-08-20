import React from 'react';


import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import Link from 'next/link';
import { urlFor } from '@/sanity/lib/image';
import Image from 'next/image';

type SocialLink = {
    _key: string;
    url?: string;
    icon?: {
        asset: {
            _ref: string;
        };
        alt?: string;
        width?: number;
        height?: number;
    };
    openInNewTab?: boolean;
};

type FooterProps = {
    footerTitle?: string | null;
    footerDescription?: string | null;
    copyrrightText?: string | null;
    footermenuItems?: Array<{ _key: string; url?: string; title?: string; newTab?: boolean }>;
    socialLinks?: SocialLink[];
};
export default function Footer({ footer }: { footer: FooterProps }) {

    return (
        <>
            <footer>
                <div className="container">
                    <div className="footer-inner">
                        <div className="footer-left">
                            {footer.footerTitle && <h3>{footer.footerTitle}</h3>}
                            {footer.footerDescription && <p>{footer.footerDescription}</p>}
                        </div>
                        <div className="footer-right">
                            <nav>
                                {footer.footermenuItems?.map((item) => (
                                    <Link href={item.url || ''} target={item.newTab ? '_blank' : '_self'} key={item.title}>
                                        {item.title}
                                    </Link>
                                ))}
                            </nav>
                            <div className="footer-social">
                                {footer.socialLinks && footer.socialLinks.length > 0 && (
                                    <>
                                        <span>Follow Us</span>
                                        <ul> 
                                            {footer.socialLinks.map((link) => (
                                                <li key={link._key}>
                                                    <Link href={link.url || ''} target={link.openInNewTab ? '_blank' : '_self'}>
                                                        <Image src={urlFor(link.icon?.asset?._ref as SanityImageSource).url() || ''} alt={link.icon?.alt || 'Social Icon'} width={20} height={20} />
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </>
                                )}
                            </div>
                        </div>
                        <p className="copyrights-text">{footer.copyrrightText}</p>
                    </div>
                </div>
            </footer>
        </>
    );
}