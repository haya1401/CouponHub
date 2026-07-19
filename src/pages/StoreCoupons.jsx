import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import { db } from "../firebase";


function copyCode(code) {

  navigator.clipboard.writeText(code);

  alert(`تم نسخ الكود: ${code}`);

}



export default function StoreCoupons() {


  const { store } = useParams();

  const [coupons, setCoupons] = useState([]);



  useEffect(() => {


    document.title =
      `كوبونات خصم ${store} | CouponHub`;



    const description =
      document.querySelector(
        'meta[name="description"]'
      );


    if (description) {

      description.setAttribute(
        "content",
        `احصل على أحدث كوبونات خصم ${store} وأكواد التخفيض والعروض الحصرية عبر CouponHub.`
      );

    }



    async function loadCoupons() {


      const q = query(

        collection(db, "coupons"),

        where("store", "==", store)

      );



      const snapshot = await getDocs(q);



      setCoupons(

        snapshot.docs.map((doc) => ({

          id: doc.id,

          ...doc.data(),

        }))

      );


    }



    loadCoupons();



  }, [store]);





  return (

    <section

      style={{

        maxWidth:"1100px",

        margin:"auto",

        padding:"60px 20px",

      }}

    >



      <h1

        style={{

          textAlign:"center",

          marginBottom:"20px",

        }}

      >

        🎟️ كوبونات خصم {store}

      </h1>



      <p

        style={{

          textAlign:"center",

          color:"#555",

          marginBottom:"40px",

        }}

      >

        استخدم أحدث أكواد الخصم والعروض الخاصة بـ {store}
        واحصل على أفضل التخفيضات عبر CouponHub.

      </p>





      <div

        style={{

          display:"grid",

          gridTemplateColumns:
          "repeat(auto-fit,minmax(280px,1fr))",

          gap:"25px",

        }}

      >




        {coupons.map((coupon) => (


          <div

            key={coupon.id}

            style={{

              background:"#fff",

              borderRadius:"16px",

              padding:"25px",

              boxShadow:
              "0 8px 20px rgba(0,0,0,.08)",

            }}

          >



            <h2>

              {coupon.title || 
              `خصم ${coupon.discount}`}

            </h2>



            <p>

              خصم:
              {" "}
              {coupon.discount}

            </p>





            <div

              style={{

                background:"#eef2ff",

                padding:"12px",

                borderRadius:"10px",

                textAlign:"center",

                fontWeight:"bold",

                margin:"20px 0",

              }}

            >

              {coupon.code}

            </div>





            <button

              onClick={() =>
                copyCode(coupon.code)
              }

              style={{

                width:"100%",

                padding:"14px",

                border:"none",

                borderRadius:"10px",

                background:"#2563eb",

                color:"#fff",

                cursor:"pointer",

              }}

            >

              📋 نسخ كود الخصم

            </button>



          </div>


        ))}



      </div>





      {coupons.length === 0 && (

        <p

          style={{

            textAlign:"center",

            marginTop:"40px",

          }}

        >

          لا توجد كوبونات متاحة لهذا المتجر حالياً.

        </p>

      )}



    </section>

  );

}
