import React, { useEffect } from 'react';
import { PortableText } from '@portabletext/react';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import Link from 'next/link';

type ButtonProps = {
    text: string;
    link: string;
    openInNewTab?: boolean;
};

type ImageTextSectionProps = {
    title?: string;
    description?: import('@portabletext/types').PortableTextBlock[];
    mainImage?: {
        asset?: {
            _ref?: string;
            _type?: string;
        };
        alt?: string;
        width?: number;
        height?: number;
        [key: string]: unknown;
    };
    imagePosition?: 'left' | 'right';
    button?: ButtonProps; // Changed from buttons[] to single button
};
// add style for the button
const buttonStyle = {
    backgroundColor: '#000',
    color: '#fff',
    padding: '10px 20px',
    borderRadius: '5px',
    textDecoration: 'none',
    fontSize: '16px',
    fontWeight: 'bold',
    width: '50%',
}
const buttonStyleHover = {
    backgroundColor: '#fff',
    color: '#000',
    border: '1px solid #000',
}
const aboutGridStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    
}


export default function ImageTextSection({
    title,
    description,
    mainImage,
    imagePosition = 'right',
    button // Now accepts single button
}: ImageTextSectionProps) {

    return (
        <section className="about-intro">
            <div className="container">
                <div className="about-grid" style={{...aboutGridStyle, flexDirection: imagePosition === 'left' ? 'row-reverse' : 'row'}}>
                    <div className="about-text">
                        {title && <h1>{title}</h1>}
                        {description && (
                            <PortableText value={description} />
                        )}
                        {button && (
                            <div className="about-button" style={buttonStyle}>
                                <Link href={button.link} target={button.openInNewTab ? '_blank' : '_self'}>
                                    {button.text}
                                </Link>
                            </div>
                        )}
                    </div>
                    <div className="about-image">
                        {mainImage?.asset && (
                            <Image 
                                src={urlFor(mainImage).url()} 
                                alt={mainImage?.alt || 'Office'} 
                                width={mainImage?.width || 400} 
                                height={mainImage?.height || 400} 
                            />
                        )}
                    </div>
                    
                </div>
            </div>
        </section>
    );
}
