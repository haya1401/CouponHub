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
        maxWidth: "1100px",
        margin: "auto",
        padding: "60px 20px",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "40px",
        }}
      >
        🎟️ كوبونات {store}
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
          gap: "25px",
        }}
      >
        {coupons.map((coupon) => (
          <div
            key={coupon.id}
            style={{
              background: "#fff",
              borderRadius: "16px",
              padding: "25px",
              boxShadow: "0 8px 20px rgba(0,0,0,.08)",
            }}
          >
            <h2>{coupon.discount}</h2>

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
              onClick={() => copyCode(coupon.code)}
              style={{
                width: "100%",
                padding: "14px",
                border: "none",
                borderRadius: "10px",
                background: "#2563eb",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              📋 نسخ الكوبون
            </button>
          </div>
        ))}
      </div>

      {coupons.length === 0 && (
        <p
          style={{
            textAlign: "center",
            marginTop: "40px",
          }}
        >
          لا توجد كوبونات لهذا المتجر.
        </p>
      )}
    </section>
  );
}
