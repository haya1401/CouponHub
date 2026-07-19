import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";
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
        🏪 جميع المتاجر
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
          gap: "25px",
          maxWidth: "1100px",
          margin: "auto",
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
            <img
              src={store.logo}
              alt={store.name}
              onError={(e) => {
                e.target.src = "/logos/default.png";
              }}
              style={{
                width: "80px",
                height: "80px",
                objectFit: "contain",
                marginBottom: "15px",
              }}
            />

            <h2>{store.name}</h2>

            <p
              style={{
                color: "#666",
                marginTop: "10px",
              }}
            >
              {store.couponsCount} كوبون متوفر
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
