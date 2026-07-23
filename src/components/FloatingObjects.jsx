import "./FloatingObjects.css";

import coin from "../assets/hero/coin.webp";
import coupon from "../assets/hero/coupon.webp";
import bag from "../assets/hero/shopping-bag.webp";
import gift from "../assets/hero/gift.webp";

export default function FloatingObjects() {

  const coins = Array.from({ length: 30 });

  const coupons = Array.from({ length: 8 });

  return (

    <div className="floating-wrapper">

      {coins.map((_, i) => (

        <img

          key={"coin" + i}

          src={coin}

          alt=""

          className="coin-rain"

          style={{

            left: `${Math.random() * 100}%`,

            animationDelay: `${Math.random() * 12}s`,

            animationDuration: `${10 + Math.random() * 8}s`,

            width: `${30 + Math.random() * 35}px`

          }}

        />

      ))}

      {coupons.map((_, i) => (

        <img

          key={"coupon" + i}

          src={coupon}

          alt=""

          className="coupon-float"

          style={{

            top: `${10 + Math.random() * 70}%`,

            animationDelay: `${i * 2}s`

          }}

        />

      ))}

      <img src={bag} className="bag3d" alt="" />

      <img src={gift} className="gift3d" alt="" />

    </div>

  );

}
