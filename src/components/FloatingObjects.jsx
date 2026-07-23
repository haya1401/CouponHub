import "./FloatingObjects.css";

import coin from "../assets/hero/coin.webp";
import coupon from "../assets/hero/coupon.webp";
import bag from "../assets/hero/shopping-bag.webp";
import gift from "../assets/hero/gift.webp";

const coins = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  left: (i * 3.3) % 100,
  delay: -(i * 0.6),
  duration: 6 + (i % 5),
  size: 28 + (i % 4) * 10
}));

const coupons = Array.from({ length: 6 }, (_, i) => ({
  id: i,
  top: 12 + i * 12,
  delay: i * 3
}));

export default function FloatingObjects() {

  return (

    <div className="floating-wrapper">

      {coins.map((coinItem) => (

        <img
          key={coinItem.id}
          src={coin}
          alt=""
          className="coin-rain"
          style={{
            left: `${coinItem.left}%`,
            width: `${coinItem.size}px`,
            animationDelay: `${coinItem.delay}s`,
            animationDuration: `${coinItem.duration}s`
          }}
        />

      ))}

      {coupons.map((item) => (

        <img
          key={item.id}
          src={coupon}
          alt=""
          className="coupon-float"
          style={{
            top: `${item.top}%`,
            animationDelay: `${item.delay}s`
          }}
        />

      ))}

      <img
        src={bag}
        className="bag3d"
        alt=""
      />

      <img
        src={gift}
        className="gift3d"
        alt=""
      />

    </div>

  );

}
