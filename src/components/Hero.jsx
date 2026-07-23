import { useState } from "react";

import "./Hero.css";

import FloatingObjects from "./FloatingObjects";
import HeroEffects from "./HeroEffects";

export default function Hero() {

  const [mouse, setMouse] = useState({
    x: 0,
    y: 0,
  });

  function handleMouseMove(e) {

    const x =
      (e.clientX / window.innerWidth - 0.5) * 30;

    const y =
      (e.clientY / window.innerHeight - 0.5) * 30;

    setMouse({
      x,
      y,
    });

  }

  function scrollToCoupons() {

    const section =
      document.getElementById(
        "featured-coupons"
      );

    if (section) {

      section.scrollIntoView({

        behavior: "smooth",

      });

    }

  }

  return (

    <section

      className="hero reveal"

      onMouseMove={handleMouseMove}

    >

      {/* العملات المتساقطة */}

      <HeroEffects />

      {/* العناصر العائمة */}

      <FloatingObjects />

      <div className="hero-overlay"></div>

      <div
        className="hero-light hero-light-1"
        style={{
          transform: `translate(${mouse.x * 0.3}px, ${mouse.y * 0.3}px)`
        }}
      ></div>

      <div
        className="hero-light hero-light-2"
        style={{
          transform: `translate(${mouse.x * -0.3}px, ${mouse.y * -0.3}px)`
        }}
      ></div>

      <div className="hero-content">

        <span className="hero-badge">

          🔥 أكثر من 10000 كوبون خصم

        </span>

        <h1>

          وفر أكثر مع أفضل

          <br />

          كوبونات الخصم والعروض

        </h1>

        <p>

          اكتشف أحدث أكواد الخصم والعروض
          الحصرية من أشهر المتاجر
          العالمية.

        </p>

        <button

          className="hero-btn"

          onClick={scrollToCoupons}

        >

          🚀 استعرض أفضل الكوبونات

        </button>

        <div className="hero-stats">

          <div>

            <h2>500+</h2>

            <span>متجر</span>

          </div>

          <div>

            <h2>10000+</h2>

            <span>كوبون</span>

          </div>

          <div>

            <h2>24/7</h2>

            <span>تحديث يومي</span>

          </div>

        </div>

      </div>

    </section>

  );

}
