import Image from 'next/image';

export default function AddressBlock({ address, phone, email, socialMedia }: { address: string, phone: string, email: string, socialMedia: { _key: string; url: string; icon: string; name: string }[] }) {
    return (
        <div className="contact-info">
            <div className="contact-info-left">
                <h3>Our Office</h3>
                {address && <p>{address}</p>}
                {email && <p>Email: {email}</p>}
                {phone && <p>Phone: {phone}</p>}
                <div className="form-social">
                    <span>Follow Us</span>
                    <ul>
                        {socialMedia && socialMedia.map((social) => (
                            <li key={social._key}>
                                <a href={social.url}>
                                    <Image src={social.icon} alt={social.name} /> 
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="map">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2822.7806761080233!2d-93.29138368446431!3d44.96844997909819!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x52b32b6ee2c87c91%3A0xc20dff2748d2bd92!2sWalker+Art+Center!5e0!3m2!1sen!2sus!4v1514524647889" width="900" height="450" frameBorder="0" style={{ border: 0 }} allowFullScreen />
            </div>
        </div>
    );
}