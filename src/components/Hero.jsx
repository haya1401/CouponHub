import "./Hero.css";

import {
  coin,
  coupon,
  gift,
  shoppingBag
} from "../assets/heroAssets";

export default function Hero() {

  function scrollToCoupons() {

    const section =
      document.getElementById(
        "featured-coupons"
      );

    if (section) {

      section.scrollIntoView({
        behavior: "smooth"
      });

    }

  }

  return (

    <section className="hero">

      <div className="hero-overlay"></div>

      <div className="hero-light hero-light-1"></div>
      <div className="hero-light hero-light-2"></div>

<img
src={coin}
className="floating coin"
alt="gold coin"
/>


<img
src={coupon}
className="floating coupon"
alt="coupon"
/>


<img
src={gift}
className="floating gift"
alt="gift"
/>


<img
src={shoppingBag}
className="floating bag"
alt="shopping bag"
/>

      <div className="floating sale">
        70%
      </div>

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
          العالمية والمحلية.

        </p>

        <button
          className="hero-btn"
          onClick={scrollToCoupons}
        >

          🚀 استعرض أفضل الكوبونات

        </button>

        <div className="hero-stats">

          <div>

            <h2>
              500+
            </h2>

            <span>
              متجر
            </span>

          </div>

          <div>

            <h2>
              10000+
            </h2>

            <span>
              كوبون
            </span>

          </div>

          <div>

            <h2>
              24/7
            </h2>

            <span>
              تحديث يومي
            </span>

          </div>

        </div>

      </div>

    </section>

  );

}
