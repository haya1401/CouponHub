import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  collection,
  getDocs,
} from "firebase/firestore";

import { db } from "../firebase";



// نسخ الكود وفتح رابط الأفلييت
async function copyCode(code, affiliate) {

  console.log("الكود:", code);
  console.log("رابط الأفلييت:", affiliate);

  // افتح الرابط مباشرة
  if (
    affiliate &&
    affiliate.startsWith("http")
  ) {
    window.open(
      affiliate,
      "_blank",
      "noopener,noreferrer"
    );
  }

  // حاول نسخ الكود
  try {

    if (
      navigator.clipboard &&
      window.isSecureContext
    ) {

      await navigator.clipboard.writeText(code);

    } else {

      const textarea =
        document.createElement("textarea");

      textarea.value = code;

      textarea.style.position = "fixed";
      textarea.style.opacity = "0";

      document.body.appendChild(textarea);

      textarea.focus();
      textarea.select();

      document.execCommand("copy");

      document.body.removeChild(textarea);

    }

    alert(`✅ تم نسخ الكود: ${code}`);

  } catch (err) {

    console.error("خطأ النسخ:", err);

    alert(`📋 انسخ الكود يدوياً:\n${code}`);

  }

}




export default function StoreCoupons() {

  const { store } = useParams();

  const [coupons, setCoupons] = useState([]);




  useEffect(() => {

    document.title =
      `كوبونات خصم ${store} | CouponHub`;



    async function loadCoupons() {

      const snapshot =
        await getDocs(
          collection(db, "coupons")
        );

      const data =
        snapshot.docs.map((doc) => ({

          id: doc.id,

          ...doc.data(),

          affiliate:
            doc.data().affiliate || ""

        }));


      const filtered =
        data.filter((coupon) =>

          (coupon.store || "")
            .trim()
            .toLowerCase() ===

          (store || "")
            .trim()
            .toLowerCase()

        );


      console.log(
        "كوبونات المتجر:",
        filtered
      );

      setCoupons(filtered);

    }

    loadCoupons();

  }, [store]);






  return (

    <section

      style={{

        maxWidth: "1100px",

        margin: "auto",

        padding: "60px 20px",

      }}

    >

      <h1

        style={{

          textAlign: "center",

          marginBottom: "20px",

        }}

      >

        🎟️ كوبونات خصم {store}

      </h1>



      <p

        style={{

          textAlign: "center",

          color: "#555",

          marginBottom: "40px",

        }}

      >

        استخدم أحدث أكواد الخصم والعروض الخاصة بـ {store}
        واحصل على أفضل التخفيضات عبر CouponHub.

      </p>





      <div

        style={{

          display: "grid",

          gridTemplateColumns:
            "repeat(auto-fit,minmax(280px,1fr))",

          gap: "25px",

        }}

      >

        {

          coupons.map((coupon) => (

            <div

              key={coupon.id}

              style={{

                background: "#fff",

                borderRadius: "16px",

                padding: "25px",

                boxShadow:
                  "0 8px 20px rgba(0,0,0,.08)",

              }}

            >

              <h2>

                {
                  coupon.title ||
                  `خصم ${coupon.discount}`
                }

              </h2>


              <p>

                خصم: {coupon.discount}

              </p>



              <div

                style={{

                  background: "#eef2ff",

                  padding: "12px",

                  borderRadius: "10px",

                  textAlign: "center",

                  fontWeight: "bold",

                  margin: "20px 0",

                }}

              >

                {coupon.code}

              </div>




              <button

                onClick={() =>
                  copyCode(
                    coupon.code,
                    coupon.affiliate
                  )
                }

                style={{

                  width: "100%",

                  padding: "14px",

                  border: "none",

                  borderRadius: "10px",

                  background: "#2563eb",

                  color: "#fff",

                  cursor: "pointer",

                  fontSize: "16px",

                }}

              >

                📋 نسخ كود الخصم

              </button>




              {

                coupon.affiliate && (

                  <p

                    style={{

                      marginTop: "10px",

                      textAlign: "center",

                      fontSize: "12px",

                      color: "#16a34a"

                    }}

                  >

                    🔗 رابط أفلييت متوفر

                  </p>

                )

              }


            </div>

          ))

        }

      </div>




      {

        coupons.length === 0 && (

          <p

            style={{

              textAlign: "center",

              marginTop: "40px"

            }}

          >

            لا توجد كوبونات متاحة لهذا المتجر حالياً.

          </p>

        )

      }

    </section>

  );

}
