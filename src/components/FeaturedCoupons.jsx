import "./FeaturedCoupons.css";


const coupons = [

  {
    title:"خصم 50% على أول طلب",
    store:"Amazon",
    code:"SAVE50",
    link:"https://www.amazon.com"
  },

  {
    title:"خصم 30% على المنتجات",
    store:"Noon",
    code:"SALE30",
    link:"https://www.noon.com"
  },

  {
    title:"خصم 20% على الأزياء",
    store:"SHEIN",
    code:"SHEIN20",
    link:"https://www.shein.com"
  },

  {
    title:"خصم على الإلكترونيات",
    store:"AliExpress",
    code:"ALI20",
    link:"https://www.aliexpress.com"
  },

  {
    title:"خصم خاص اليوم",
    store:"Temu",
    code:"TEMU15",
    link:"https://www.temu.com"
  },

  {
    title:"خصم الفنادق والسفر",
    store:"Booking",
    code:"BOOK25",
    link:"https://www.booking.com"
  },

  {
    title:"خصم الرحلات",
    store:"Expedia",
    code:"TRAVEL20",
    link:"https://www.expedia.com"
  },

  {
    title:"خصم المنتجات",
    store:"eBay",
    code:"EBAY10",
    link:"https://www.ebay.com"
  },

  {
    title:"خصم الأحذية والملابس",
    store:"Nike",
    code:"NIKE15",
    link:"https://www.nike.com"
  },

  {
    title:"خصم الملابس الرياضية",
    store:"Adidas",
    code:"ADIDAS20",
    link:"https://www.adidas.com"
  },

  {
    title:"خصم الأجهزة",
    store:"Samsung",
    code:"SAM10",
    link:"https://www.samsung.com"
  },

  {
    title:"خصم الكمبيوترات",
    store:"Lenovo",
    code:"LENOVO15",
    link:"https://www.lenovo.com"
  },

  {
    title:"خصم الاستضافة",
    store:"Hostinger",
    code:"HOST50",
    link:"https://www.hostinger.com"
  },

  {
    title:"خصم التصميم",
    store:"Canva",
    code:"CANVA20",
    link:"https://www.canva.com"
  },

  {
    title:"خصم الدورات",
    store:"Udemy",
    code:"UDEMY30",
    link:"https://www.udemy.com"
  }

];



export default function FeaturedCoupons(){


  function openCoupon(link){

    window.open(
      link,
      "_blank",
      "noopener,noreferrer"
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
