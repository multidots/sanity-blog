import Image from 'next/image';
import { Address } from '@/sanity/types';
import { urlFor } from '@/sanity/lib/image';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import Link from 'next/link';

export default function AddressBlock({ address, phone, email, socialLinks, googleMap }: Address) {
    return (
        <section className="contact-info-main">
            <div className="container">
                <div className="contact-info">
                    <div className="contact-info-left">
                        <h2>Our Office</h2>
                        {address && <p>{address}</p>}
                        {email && <p><Link href={`mailto:${email}`} target="_self">Email: {email}</Link></p>}
                        {phone && <p><Link href={`tel:${phone}`} target="_self">Phone: {phone}</Link></p>}
                        <div className="form-social">
                            <span>Follow Us</span>
                            <ul>
                                {socialLinks && socialLinks.map((social) => (
                                    <li key={social._key} style={{ display: 'inline-block', marginRight: '10px' }}>
                                        <Link href={social.url || ''} target={social.newTab ? '_blank' : '_self'}>
                                            <Image src={urlFor(social.icon as SanityImageSource).url() || ''}
                                                alt={social.icon?.alt || ''}
                                                width={24}
                                                height={24}
                                                className="social-icon"
                                            />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="map">
                        {googleMap && ( 
                        <iframe
                            width="100%"
                            height="400"
                            style={{ border: 0 }}
                                src={`https://www.google.com/maps?q=${googleMap.lat},${googleMap.lng}&hl=es;z=14&output=embed`}
                            />
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}