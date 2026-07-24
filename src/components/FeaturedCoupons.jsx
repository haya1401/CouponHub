// import "./FeaturedCoupons.css";


const coupons = [

  {
    title:"خصم 50% على أول طلب",
    store:"Amazon",
    code:"SAVE50",
    link:"https://YOUR-AFFILIATE-LINK-1"
  },

  {
    title:"خصم 30% على المنتجات",
    store:"Noon",
    code:"SALE30",
    link:"https://YOUR-AFFILIATE-LINK-2"
  },

  {
    title:"عرض خاص اليوم",
    store:"SHEIN",
    code:"DEAL2026",
    link:"https://YOUR-AFFILIATE-LINK-3"
  }

];



export default function FeaturedCoupons(){


  function openCoupon(coupon){

    navigator.clipboard.writeText(coupon.code);

    window.open(
      coupon.link,
      "_blank"
    );

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
                onClick={() => openCoupon(coupon)}
              >

                {coupon.code}

              </button>


            </div>

          ))}


        </div>


      </div>


    </section>

  );

}
