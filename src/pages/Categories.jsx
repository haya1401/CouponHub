import { useEffect } from "react";
import Categories from "../components/Categories";

export default function CategoriesPage() {


  useEffect(() => {

    document.title =
      "تصنيفات كوبونات الخصم والعروض | CouponHub";


    const description =
      document.querySelector(
        'meta[name="description"]'
      );


    if (description) {

      description.setAttribute(
        "content",
        "تصفح تصنيفات كوبونات الخصم المختلفة مثل الإلكترونيات والأزياء والسفر واحصل على أفضل العروض عبر CouponHub."
      );

    }


  }, []);



  return (

    <div>

      <Categories />

    </div>

  );

}
