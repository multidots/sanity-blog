'use client';
import { urlFor } from '@/sanity/lib/image';
import Link from 'next/link';

type ButtonProps = {
    text: string;
    link: string; 
    openInNewTab?: boolean;
};

type CtaBlockProps = {
    heading?: string;
    subheading?: string;
    button?: ButtonProps;
    backgroundColor?: string | { hex: string };
    textColor?: string | { hex: string };
    backgroundImage?: { asset?: unknown; alt?: string } | null;
    backgroundType?: 'image' | 'color';
};

export default function CTABlock({
    heading,
    subheading,
    button,
    backgroundColor,
    textColor,
    backgroundImage,
    backgroundType,
}: CtaBlockProps) {


    return (
        <section id="contact" className="footer-cta"
            style={{
                backgroundImage: backgroundType === 'image' && backgroundImage?.asset ? `url(${urlFor(backgroundImage).width(1920).url()})` : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundColor: backgroundType === 'color' ? (typeof backgroundColor === 'string' ? backgroundColor : backgroundColor?.hex) : 'none',
            }}>
            <div className="container" >
                {heading && <h2 style={{ color: typeof textColor === 'string' ? textColor : textColor?.hex }}>{heading}</h2>}
                {subheading && <p style={{ color: typeof textColor === 'string' ? textColor : textColor?.hex }}>{subheading}</p>}
                {button && (
                    <Link href={button.link} target={button.openInNewTab ? '_blank' : '_self'}>
                        <button>{button.text}</button>
                    </Link>
                )}
            </div>
        </section>
    );
}
