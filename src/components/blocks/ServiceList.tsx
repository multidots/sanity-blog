// @ts-nocheck
import React, { useEffect } from 'react';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';

type ServiceItem = {
    _key: string;
    title: string;
    text: string;
    bgColor?: {
        hex: string;
    };
};

type ServiceListProps = {
    title?: string;
    services?: ServiceItem[];
};

export default function ServiceList({
    title,
    services = []
}: ServiceListProps) {

    return (
        <section id="services" className="services">
            <div className="container">
                {title && <h2>{title}</h2>}
                <div className="service-grid">
                    { services && services.map((service: ServiceItem) => (
                        <div className="service-card"
                            key={service._key}
                            style={{ backgroundColor: service.bgColor?.hex }}
                        >
                            {service.title && <h3>{service.title}</h3>}
                            {service.text && <p>{service.text}</p>}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}