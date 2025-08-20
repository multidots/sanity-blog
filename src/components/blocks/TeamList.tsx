import React, { useEffect } from 'react';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';

type TeamItem = {
    _key: string;
    name: string;
    role: string;
    icon?: {
        asset: {
            _ref?: string;
            _type?: string;
        };
        alt?: string;
        width?: number;
        height?: number;
        bgColor?: {
            hex: string;
        };
    };
};

type TeamListProps = {
    title?: string;
    team?: TeamItem[];
};

export default function TeamList({
    title,
    team = []
}: TeamListProps) {

    return (
        <section className="team">
            <div className="container">
                {title && <h2>{title}</h2>}
                <div className="team-grid">
                    {team && team.map((member: TeamItem) => (
                        <div className="team-member" key={member._key} style={{ backgroundColor: member.icon?.bgColor?.hex }}>
                            {member.icon && <Image src={urlFor(member.icon).url()}
                                alt={member.icon.alt || member.name}
                                width={member.icon.width || 100}
                                height={member.icon.height || 100} />}
                            {member.name && <h3>{member.name}</h3>}
                            {member.role && <p>{member.role}</p>}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}