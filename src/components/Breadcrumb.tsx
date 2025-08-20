import React from 'react';
import Link from 'next/link';

interface BreadcrumbProps {
  title: string;
  category?: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ title, category }) => {

  return (
    <div className='mdinc-post-sharer-tags' aria-label="Breadcrumb">
      <div className='mdinc-post-breadcrumb'>
        <p>
          <span className='icon'>
            <Link href="/">
              <img src="/artical-home-icon.svg" alt="Home" width={16} height={17} />
            </Link>
          </span>
          <span className='separator'></span>
          <span>
            <Link href="/blog">
              Blog
            </Link>
          </span>
          <span className='separator'></span>
          <span aria-current="page">
            {title}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Breadcrumb;
