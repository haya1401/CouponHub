import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default function Stores() {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    async function loadData() {
      // جلب المتاجر
      const storesSnapshot = await getDocs(collection(db, "stores"));
      const storesData = storesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // جلب الكوبونات
      const couponsSnapshot = await getDocs(collection(db, "coupons"));
      const coupons = couponsSnapshot.docs.map((doc) => doc.data());

      // حساب عدد الكوبونات لكل متجر
      const storesWithCount = storesData.map((store) => ({
        ...store,
        couponsCount: coupons.filter(
          (coupon) => coupon.store === store.name
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
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "40px",
        }}
      >
        🏪 جميع المتاجر
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
          gap: "25px",
        }}
      >
        {stores.map((store) => (
          <div
            key={store.id}
            style={{
              background: "#fff",
              padding: "25px",
              borderRadius: "16px",
              textAlign: "center",
              boxShadow: "0 8px 20px rgba(0,0,0,.08)",
            }}
          >
            {store.logo.startsWith("http") ? (
  <img
    src={store.logo}
    alt={store.name}
    style={{
      width: "70px",
      height: "70px",
      objectFit: "contain",
      marginBottom: "15px",
    }}
  />
) : (
  <div
    style={{
      fontSize: "50px",
      marginBottom: "15px",
    }}
  >
    {store.logo}
  </div>
)}
        

            <h2>{store.name}</h2>

            <p>{store.couponsCount} كوبون متوفر</p>

            <button
              style={{
                background: "#2563eb",
                color: "#fff",
                border: "none",
                padding: "12px 25px",
                borderRadius: "10px",
                cursor: "pointer",
              }}
            >
              عرض الكوبونات
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
