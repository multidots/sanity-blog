import Image from 'next/image';
import { Address } from '@/sanity/types';
import { urlFor } from '@/sanity/lib/image';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

export default function AddressBlock({ address, phone, email, socialLinks, googleMap }: Address) {
    return (
        <div className="contact-info" style={{ marginTop: '100px' }}>
            <div className="contact-info-left">
                <h3>Our Office</h3>
                {address && <p>{address}</p>}
                {email && <p>Email: {email}</p>}
                {phone && <p>Phone: {phone}</p>}
                <div className="form-social">
                    <span>Follow Us</span>
                    <ul>
                        {socialLinks && socialLinks.map((social) => (
                            <li key={social._key} style={{ display: 'inline-block', marginRight: '10px' }}>
                                <a href={social.url}>
                                    <Image src={urlFor(social.icon as SanityImageSource).url() || ''}
                                        alt={social.icon?.alt || ''}
                                        width={24}
                                        height={24}
                                        className="social-icon"
                                    />
                                </a>
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
    );
}