import "./FeaturedCoupons.css";


const coupons = [
  {
    title:"خصم 50% على أول طلب",
    store:"Amazon",
    code:"SAVE50",
    link:"ضع رابط أفلييت أمازون هنا"
  },

  {
    title:"خصم 30% على المنتجات",
    store:"Noon",
    code:"SALE30",
    link:"ضع رابط أفلييت نون هنا"
  },

  {
    title:"عرض خاص اليوم",
    store:"SHEIN",
    code:"DEAL2026",
    link:"ضع رابط أفلييت شي إن هنا"
  }
];


export default function FeaturedCoupons(){


  function openCoupon(link){

    window.open(
      link,
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
          🔥 جميع الكوبونات
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
                onClick={() => openCoupon(coupon.link)}
              >

                استخدم الكوبون

              </button>


              <small>
                كود الخصم: {coupon.code}
              </small>


            </div>

          ))}


        </div>


      </div>


    </section>

  );

}
