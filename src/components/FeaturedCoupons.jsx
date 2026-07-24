import { useEffect, useState } from "react";
import "./FeaturedCoupons.css";

import {
  collection,
  getDocs
} from "firebase/firestore";

import { db } from "../firebase";


export default function FeaturedCoupons(){


  const [coupons,setCoupons] = useState([]);



  async function loadCoupons(){


    const snapshot = await getDocs(
      collection(db,"coupons")
    );


    const data = snapshot.docs.map(doc=>({

      id:doc.id,

      ...doc.data()

    }));


    setCoupons(data);


  }



  useEffect(()=>{

    loadCoupons();

  },[]);




  function openCoupon(coupon){


    const link =
      coupon.affiliate ||
      coupon.link ||
      "";



    const cleanLink = link.trim();



    console.log(
      "Affiliate URL:",
      cleanLink
    );



    if(!cleanLink){


      alert(
        "لا يوجد رابط أفلييت لهذا الكوبون"
      );


      return;

    }



    window.open(

      cleanLink,

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


        {

          coupons.map((coupon)=>(


            <div

              className="coupon-card"

              key={coupon.id}

            >


              <h3>

                {coupon.title}

              </h3>



              <p>

                {coupon.store}

              </p>



              <strong>

                {coupon.discount}

              </strong>



              <button

                onClick={() => openCoupon(coupon)}

              >

                🚀 استخدم الكوبون

              </button>



              <small>

                كود الخصم: {coupon.code}

              </small>



            </div>


          ))

        }


        </div>


      </div>


    </section>

  );

}
