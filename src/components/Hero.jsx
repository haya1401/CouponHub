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
    subtitle: "أحدث كوبونات الخصم لمتاجر الأجهزة والتكنولوجيا",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=1200&q=80",
    buttonText: "تصفح العروض",
    link: "/coupons" // يوجه لصفحة الكوبونات والعروض
  },
  {
    id: 2,
    title: "أقوى أشكال وتشكيلات الأزياء",
    subtitle: "وفّر على مشترياتك من أشهر الماركات العالمية",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80",
    buttonText: "احصل على الكوبون",
    link: "/stores" // يوجه لصفحة المتاجر
  }
];

export default function Hero() {
  return (
    <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto 2rem auto', padding: '0 15px' }}>
      <Swiper
        spaceBetween={30}
        effect={'fade'}
        centeredSlides={true}
        preventClicks={false} // لضمان الاستجابة الفورية للنقر
        preventClicksPropagation={false}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        style={{ borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
      >
        {heroSlides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div style={{
              position: 'relative',
              height: '320px',
              backgroundImage: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.65)), url(${slide.image})`,
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
              <p style={{ fontSize: '1rem', marginBottom: '20px', opacity: 0.9, maxWidth: '600px' }}>
                {slide.subtitle}
              </p>
              
              <a 
                href={slide.link} 
                style={{
                  backgroundColor: '#2563eb',
                  color: '#fff',
                  padding: '12px 28px',
                  borderRadius: '30px',
                  textDecoration: 'none',
                  fontWeight: 'bold',
                  boxShadow: '0 4px 14px rgba(37, 99, 235, 0.4)',
                  zIndex: 10,
                  cursor: 'pointer'
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
