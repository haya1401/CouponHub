import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

const heroSlides = [
  {
    id: 1,
    title: "خصومات تصل إلى 50% على الإلكترونيات",
    subtitle: "أحدث كوبونات الخصم لمتاجر الأجهزة والذكاء الاصطناعي",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=1200&q=80",
    buttonText: "تصفح العروض",
    link: "#deals"
  },
  {
    id: 2,
    title: "أقوى أشكال وتشكيلات الأزياء",
    subtitle: "وفّر على مشترياتك من أشهر الماركات العالمية",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80",
    buttonText: "احصل على الكوبون",
    link: "#fashion"
  }
];

export default function HeroSlider() {
  return (
    <div style={{ width: '100%', marginBottom: '2rem' }}>
      <Swiper
        spaceBetween={30}
        effect={'fade'}
        centeredSlides={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        style={{ borderRadius: '16px', overflow: 'hidden' }}
      >
        {heroSlides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div style={{
              position: 'relative',
              height: '350px',
              backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.6)), url(${slide.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              color: '#fff',
              textAlign: 'center',
              padding: '0 20px'
            }}>
              <h1 style={{ fontSize: '1.8rem', marginBottom: '10px', fontWeight: 'bold' }}>
                {slide.title}
              </h1>
              <p style={{ fontSize: '1rem', marginBottom: '20px', opacity: 0.9 }}>
                {slide.subtitle}
              </p>
              <a 
                href={slide.link} 
                style={{
                  backgroundColor: '#4F46E5',
                  color: '#fff',
                  padding: '10px 24px',
                  borderRadius: '30px',
                  textDecoration: 'none',
                  fontWeight: 'bold'
                }}
              >
                {slide.buttonText}
              </a>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
