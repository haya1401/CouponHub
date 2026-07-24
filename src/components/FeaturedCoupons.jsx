import { useState } from "react";
import "./FeaturedCoupons.css";


const coupons = [

  {
    title:"خصم 50% على أول طلب",
    store:"متجر إلكتروني",
    code:"SAVE50"
  },

  {
    title:"خصم 30% على المنتجات",
    store:"متجر عالمي",
    code:"SALE30"
  },

  {
    title:"عرض خاص اليوم",
    store:"أفضل المتاجر",
    code:"DEAL2026"
  }

];


export default function FeaturedCoupons(){

  const [copied, setCopied] = useState("");


  function copyCode(code){

    navigator.clipboard.writeText(code);

    setCopied(code);

    setTimeout(()=>{

      setCopied("");

    },2000);

  }


  return (

    <section
      id="featured-coupons"
      className="featured-coupons"
    >

      <div className="container">


        <h2 className="featured-title">

          🔥 كوبونات مميزة

        </h2>



        <div className="coupon-grid">


          {coupons.map((coupon,index)=>(

            <div
              className="coupon-card"
              key={index}
            >


              <h3>
                {coupon.title}
              </h3>


              <p>
                {coupon.store}
              </p>


              <button
                onClick={()=>copyCode(coupon.code)}
              >

                {copied === coupon.code
                  ? "✅ تم النسخ"
                  : coupon.code
                }

              </button>


            </div>

          ))}


        </div>


      </div>


    </section>

  );

}
