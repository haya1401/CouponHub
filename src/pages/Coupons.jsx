import { useEffect } from "react";
import FeaturedCoupons from "../components/FeaturedCoupons";

export default function Coupons() {


  useEffect(() => {

    document.title =
      "أحدث كوبونات الخصم والعروض | CouponHub";


    const description =
      document.querySelector(
        'meta[name="description"]'
      );


    if (description) {

      description.setAttribute(
        "content",
        "تصفح أحدث كوبونات الخصم وأكواد التخفيض والعروض الحصرية من أشهر المتاجر عبر CouponHub."
      );

    }


  }, []);



  return (

    <div>

      <FeaturedCoupons />

    </div>

  );

}
