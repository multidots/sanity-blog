import React from 'react';
import Link from 'next/link';
import { urlFor } from '@/sanity/lib/image';

type HeroBlockProps = {
  title: string;
  subtitle: string;
  bgImage: {
    asset: {
      _ref: string;
    };
  };
  backgroundColor: {
    hex: string;
  };
  textColor: {
    hex: string;
  };
  alignment: string;
  backgroundType: string;
  button: {
    text: string;
    link: string;
    openInNewTab: boolean;
  };
}

export default function HeroBlock({
  title,
  subtitle,
  bgImage,
  backgroundColor,
  textColor,
  alignment,
  backgroundType,
  button,
}: HeroBlockProps) {


  const bgColor = typeof backgroundColor === 'string'
    ? backgroundColor
    : backgroundColor?.hex;

  const txtColor = typeof textColor === 'string'
    ? textColor
    : textColor?.hex;


  const bgImageStyle = backgroundType === 'image' ? { background: `url(${urlFor(bgImage).url()}) no-repeat center center/cover` } : { backgroundColor: bgColor }

  const combinedStyle: React.CSSProperties = { textAlign: (alignment || 'center') as 'left' | 'right' | 'center' }

  return (
    <section className="hero" style={{ ...bgImageStyle, ...combinedStyle }}>
      <div className="container">
        {title && <h1 style={{ color: txtColor }}>{title}</h1>}
        {subtitle && <p style={{ color: txtColor }}>{subtitle}</p>}
        {button && <Link href={button.link} target={button.openInNewTab ? '_blank' : '_self'}>
          <button>
            {button.text}
          </button>
        </Link>
        }
      </div>
    </section>
  );
}