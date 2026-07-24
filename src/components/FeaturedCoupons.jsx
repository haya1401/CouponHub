import "./FeaturedCoupons.css";


const coupons = [

  {
    title:"خصم 50% على أول طلب",
    store:"Amazon",
    code:"SAVE50",
    link:"ضع رابط أفلييت Amazon هنا"
  },

  {
    title:"خصم 30% على المنتجات",
    store:"Noon",
    code:"SALE30",
    link:"ضع رابط أفلييت Noon هنا"
  },

  {
    title:"خصم 20% على الأزياء",
    store:"SHEIN",
    code:"SHEIN20",
    link:"ضع رابط أفلييت SHEIN هنا"
  },

  {
    title:"خصم على الإلكترونيات",
    store:"AliExpress",
    code:"ALI20",
    link:"ضع رابط أفلييت AliExpress هنا"
  },

  {
    title:"خصم خاص اليوم",
    store:"Temu",
    code:"TEMU15",
    link:"ضع رابط أفلييت Temu هنا"
  },

  {
    title:"خصم الفنادق والسفر",
    store:"Booking",
    code:"BOOK25",
    link:"ضع رابط أفلييت Booking هنا"
  },

  {
    title:"خصم الرحلات",
    store:"Expedia",
    code:"TRAVEL20",
    link:"ضع رابط أفلييت Expedia هنا"
  },

  {
    title:"خصم المنتجات",
    store:"eBay",
    code:"EBAY10",
    link:"ضع رابط أفلييت eBay هنا"
  },

  {
    title:"خصم الأحذية والملابس",
    store:"Nike",
    code:"NIKE15",
    link:"ضع رابط أفلييت Nike هنا"
  },

  {
    title:"خصم الملابس الرياضية",
    store:"Adidas",
    code:"ADIDAS20",
    link:"ضع رابط أفلييت Adidas هنا"
  },

  {
    title:"خصم الأجهزة",
    store:"Samsung",
    code:"SAM10",
    link:"ضع رابط أفلييت Samsung هنا"
  },

  {
    title:"خصم الكمبيوترات",
    store:"Lenovo",
    code:"LENOVO15",
    link:"ضع رابط أفلييت Lenovo هنا"
  },

  {
    title:"خصم الاستضافة",
    store:"Hostinger",
    code:"HOST50",
    link:"ضع رابط أفلييت Hostinger هنا"
  },

  {
    title:"خصم التصميم",
    store:"Canva",
    code:"CANVA20",
    link:"ضع رابط أفلييت Canva هنا"
  },

  {
    title:"خصم الدورات",
    store:"Udemy",
    code:"UDEMY30",
    link:"ضع رابط أفلييت Udemy هنا"
  }

];



export default function FeaturedCoupons(){


  function openCoupon(link){

    if(link && !link.includes("ضع رابط")){

      window.open(
        link,
        "_blank"
      );

    }else{

      alert("لم يتم إضافة رابط الأفلييت لهذا المتجر بعد");

    }

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
                🚀 استخدم الكوبون
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
