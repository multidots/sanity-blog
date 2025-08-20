import React from 'react';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import Link from 'next/link';

type ClientLogo = {
    _key: string;
    alt?: string;
    width?: number;
    height?: number;
    asset?: SanityImageSource;
    url?: string;
    openInNewTab?: boolean;
};
type ClientListProps = {
    title?: string;
    logos?: ClientLogo[];
   
};

export default function ClientList({
    title,
    logos = [],
}: ClientListProps) {
   


    return (
        <section id="customers" className="customers">
            <div className="container" >
                {title && <h2>{title}</h2>}
                <div className="customer-logos">
                    {logos.map((logo: ClientLogo) => (
                        <Link href={logo.url || ''} target={logo.openInNewTab ? '_blank' : '_self'} key={logo._key}>
                        <Image
                            key={logo._key}
                            alt={logo.alt || 'Client logo'}
                            width={logo.width || 182}
                            height={logo.height || 35}
                            src={urlFor(logo.asset as SanityImageSource).url()}
                            />
                        </Link>
                    ))}
                </div>
            </div>
        </section> 
    );
}