import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";

export default function Stores() {

  const [stores, setStores] = useState([]);


  useEffect(() => {

    document.title =
      "أفضل المتاجر مع كوبونات الخصم | CouponHub";


    const description =
      document.querySelector('meta[name="description"]');


    if (description) {
      description.setAttribute(
        "content",
        "تصفح أشهر المتاجر واحصل على أحدث كوبونات الخصم والعروض الحصرية عبر CouponHub."
      );
    }


    async function loadData() {

      const storesSnapshot =
        await getDocs(collection(db, "stores"));


      const storesData =
        storesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));


      const couponsSnapshot =
        await getDocs(collection(db, "coupons"));


      const coupons =
        couponsSnapshot.docs.map((doc) => doc.data());



      const storesWithCount =
        storesData.map((store) => ({

          ...store,

          couponsCount:
            coupons.filter(
              (coupon) =>
                coupon.store === store.name
            ).length,

        }));


      setStores(storesWithCount);

    }


    loadData();

  }, []);



  return (

    <section
      style={{
        padding: "60px 20px",
        background: "#f8fafc",
        minHeight: "100vh",
      }}
    >

      <h1
        style={{
          textAlign: "center",
          marginBottom: "40px",
          fontSize: "36px",
        }}
      >
        🏪 جميع المتاجر وكوبونات الخصم
      </h1>



      <p
        style={{
          textAlign: "center",
          marginBottom: "35px",
          color: "#555",
        }}
      >
        اكتشف أفضل المتاجر واحصل على أحدث أكواد الخصم والعروض عبر CouponHub.
      </p>



      <div
        style={{
          display:
            "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",
          gap: "25px",
          maxWidth: "1100px",
          margin: "auto",
        }}
      >


        {stores.map((store) => (

          <div
            key={store.id}
            style={{
              background:"#fff",
              padding:"25px",
              borderRadius:"16px",
              textAlign:"center",
              boxShadow:
              "0 8px 20px rgba(0,0,0,.08)",
            }}
          >


            <img
              src={store.logo}
              alt={`كوبونات ${store.name}`}
              onError={(e)=>{
                e.target.src="/logos/default.png";
              }}
              style={{
                width:"80px",
                height:"80px",
                objectFit:"contain",
                marginBottom:"15px",
              }}
            />



            <h2>
              كوبونات {store.name}
            </h2>


            <p
              style={{
                color:"#666",
                marginTop:"10px",
                marginBottom:"20px",
              }}
            >
              {store.couponsCount} كوبون متوفر
            </p>



            <Link
              to={`/coupons/${store.name}`}
              style={{
                display:"inline-block",
                background:"#2563eb",
                color:"#fff",
                padding:"12px 25px",
                borderRadius:"10px",
                textDecoration:"none",
                fontWeight:"bold",
              }}
            >
              عرض الكوبونات
            </Link>


          </div>

        ))}


      </div>

    </section>

  );

}
