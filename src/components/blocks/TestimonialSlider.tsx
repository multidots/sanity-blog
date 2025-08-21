
import { useState, useEffect } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

type TestimonialSliderType = {
    title: string;
    testimonials: { _key: string; name?: string; role?: string; testimonial?: string; quote?: string; author?: string; backgroundColor?: { hex: string }; image?: { asset?: unknown; alt?: string } }[];
}

export function TestimonialSlider({ title, testimonials }: TestimonialSliderType) {
    const [windowWidth, setWindowWidth] = useState(0);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        
        // Set initial width
        setWindowWidth(window.innerWidth);
        
        // Add event listener
        window.addEventListener('resize', handleResize);
        
        // Cleanup
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Determine slides to show based on window width
    const getSlidesToShow = () => {
        if (windowWidth <= 768) return 1;
        return 2;
    };
    const settings = {
        dots: true,
        infinite: true,
        speed: 600,
        slidesToShow: getSlidesToShow(),
        slidesToScroll: 1,
        arrows: false,
        autoplay: false,
        autoplaySpeed: 3000,
        draggable: true,
    }

    // Don't render until we have window width (prevents SSR mismatch and ensures correct responsive behavior)
    if (windowWidth === 0) {
        return (
            <section id="testimonials" className="testimonials">
                <div className="container">
                    {title && <h2>{title}</h2>}
                    <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        Loading testimonials...
                    </div>
                </div>
            </section>
        );
    }

    return (
        <>
            <section id="testimonials" className="testimonials">
                <div className="container">
                    {title && <h2>{title}</h2>}
                    <Slider key={windowWidth} {...settings}>
                        {testimonials?.map((t) => (
                            <div key={t._key} className="testimonial-grid">
                                <div className="testimonial" style={{ backgroundColor: t.backgroundColor?.hex }}>
                                    <p>{t.quote}</p>
                                    <span>- {t.author}</span>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </section>
        </>
    )
}