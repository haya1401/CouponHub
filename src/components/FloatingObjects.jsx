import "./FloatingObjects.css";

import coin from "../assets/hero/coin.webp";
import coupon from "../assets/hero/coupon.webp";
import bag from "../assets/hero/shopping-bag.webp";
import gift from "../assets/hero/gift.webp";

export default function FloatingObjects() {

  return (

    <div className="floating-wrapper">

      {/* العملات */}

      <img src={coin} className="float coin1" alt="" />
      <img src={coin} className="float coin2" alt="" />
      <img src={coin} className="float coin3" alt="" />
      <img src={coin} className="float coin4" alt="" />
      <img src={coin} className="float coin5" alt="" />

      {/* الكوبونات */}

      <img src={coupon} className="float coupon1" alt="" />
      <img src={coupon} className="float coupon2" alt="" />

      {/* الحقيبة */}

      <img src={bag} className="float bag1" alt="" />

      {/* الهدية */}

      <img src={gift} className="float gift1" alt="" />

    </div>

  );

}
