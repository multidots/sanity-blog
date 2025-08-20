import React from 'react';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import TableBlock from './blocks/TableBlock';
import HighlightBlock from './blocks/HighlightBlock';

export const portableTextComponents = {
  types: {
    image: ({ value }: any) => {
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
    table: ({ value }: any) => <TableBlock value={value} />,
    highlightBlock: ({ value }: any) => {
      return <HighlightBlock highlightText={value.highlightText} bgColor={value.bgColor} textColor={value.textColor} />;
    },
  },
  marks: {
    link: ({ children, value }: any) => {
      const { href, target } = value;
      return (
        <a
          href={href}
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
