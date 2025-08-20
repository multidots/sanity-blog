
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

type TestimonialSliderType = {
    title: string;
    testimonials: { _key: string; name?: string; role?: string; testimonial?: string; quote?: string; author?: string; backgroundColor?: { hex: string }; image?: { asset?: unknown; alt?: string } }[];
}

export function TestimonialSlider({ title, testimonials }: TestimonialSliderType) {
    const settings = {
        dots: true,
        infinite: true,
        speed: 600,
        slidesToShow: 2,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 3000,
        draggable: true,
        gap: 20,
        responsive: [
            {
              breakpoint: 767,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
              }
            }
        ]
    }

    return (
        <>
            <section id="testimonials" className="testimonials">
                <div className="container">
                    {title && <h2>{title}</h2>}
                    <Slider {...settings}>
                        {testimonials?.map((t) => (
                            <div key={t._key} className="testimonial-grid">
                                <div className="testimonial" style={{ backgroundColor: t.backgroundColor?.hex }}>
                                    {t.quote}
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