'use client';

import React, { useState, useEffect, useRef } from 'react';
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

export default function Header({ logo, menuItems }: HeaderProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const hamburgerRef = useRef<HTMLDivElement>(null);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                menuRef.current && 
                !menuRef.current.contains(event.target as Node) &&
                hamburgerRef.current && 
                !hamburgerRef.current.contains(event.target as Node)
            ) {
                setIsMenuOpen(false);
            }
        };

        // Close menu on escape key
        const handleEscapeKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setIsMenuOpen(false);
            }
        };

        if (isMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('keydown', handleEscapeKey);
            // Prevent body scroll when menu is open
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscapeKey);
            document.body.style.overflow = 'unset';
        };
    }, [isMenuOpen]);

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
                                alt={logo.alt || 'Logo'}
                                width={logo.width || 180}
                                height={logo.height || 40} />
                        </Link>
                    </div>
                )}
                {menuItems && (
                    <nav 
                        ref={menuRef} 
                        className={`nav-menu ${isMenuOpen ? 'nav-open' : ''}`}
                        aria-label="Main navigation"
                        aria-hidden={!isMenuOpen}
                    >
                        {menuItems?.map((item) => (
                            <Link 
                                href={normalizeHref(item.url)}
                                target={item.openInNewTab ? '_blank' : '_self'}
                                key={item.title}
                                onClick={closeMenu}
                                tabIndex={isMenuOpen ? 0 : -1}
                            >
                                {item.title}
                            </Link>
                        ))}
                    </nav>
                )}
                <div 
                    ref={hamburgerRef}
                    className={`hamburger-menu ${isMenuOpen ? 'active' : ''}`}
                    onClick={toggleMenu}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            toggleMenu();
                        }
                    }}
                    aria-label="Toggle mobile menu"
                    aria-expanded={isMenuOpen}
                    aria-controls="main-navigation"
                >
                    <span className="hamburger-line"></span>
                    <span className="hamburger-line"></span>
                    <span className="hamburger-line"></span>
                </div>
            </div>
            {/* Mobile menu backdrop */}
            {isMenuOpen && (
                <div 
                    className="mobile-menu-backdrop"
                    onClick={closeMenu}
                    aria-hidden="true"
                />
            )}
        </header>
    );
}