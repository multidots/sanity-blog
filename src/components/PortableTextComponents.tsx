import React from 'react';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import TableBlock from './blocks/TableBlock';
import HighlightBlock from './blocks/HighlightBlock';

export const portableTextComponents = {
  types: {
    image: ({ value }: { value: { asset?: unknown; alt?: string; width?: number; height?: number; customClass?: string; caption?: string } }) => {
      if (!value?.asset) return null;
      return (
        <figure>
          <Image
            src={urlFor(value.asset).url()}
            alt={value.alt || ''}
            width={value.width || 800}
            height={value.height || 600}
            className={value.customClass || ''}
          />
          {value.caption && <figcaption className="image-caption">{value.caption}</figcaption>}
        </figure>
      );
    },
    table: ({ value }: { value: unknown }) => <TableBlock value={value as any} />,
    highlightBlock: ({ value }: { value: { highlightText?: string; bgColor?: string | { hex: string }; textColor?: string | { hex: string } } }) => {
      return <HighlightBlock 
        highlightText={value.highlightText} 
        bgColor={typeof value.bgColor === 'string' ? { hex: value.bgColor } : value.bgColor} 
        textColor={typeof value.textColor === 'string' ? { hex: value.textColor } : value.textColor} 
      />;
    },
  },
  marks: {
    link: ({ children, value }: { children: React.ReactNode; value?: { href?: string; target?: string } }) => {
      const { href, target } = value || {};
      return (
        <a
          href={href || '#'}
          target={target}
          rel={target === '_blank' ? 'noopener noreferrer' : undefined}
          className="portable-text-link"
        >
          {children}
        </a>
      );
    },
  },
};
