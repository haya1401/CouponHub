import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

async function copyCode(code, affiliate) {

  try {

    await navigator.clipboard.writeText(code);

  } catch (error) {

    console.error(error);

  }

  alert("✅ تم نسخ الكود: " + code);

  if (!affiliate) {

    alert("❌ لا يوجد رابط أفلييت لهذا الكوبون");

    return;

  }

  alert("🔗 سيتم فتح الرابط:\n" + affiliate);

  window.open(affiliate, "_blank");

}

export default function FeaturedCoupons() {

  const [coupons, setCoupons] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {

    async function loadCoupons() {

      const querySnapshot = await getDocs(
        collection(db, "coupons")
      );

      const data = [];

      querySnapshot.forEach((doc) => {

        data.push({
          id: doc.id,
          ...doc.data(),
        });

      });

     console.log("أول كوبون بالتفصيل:", data[0]);
console.log("جميع الكوبونات:", data); 

      setCoupons(data);

    }

    loadCoupons();

  }, []);

  const filteredCoupons = coupons.filter((coupon) =>
    (coupon.store || "").toLowerCase().includes(search.toLowerCase())
  );

  return (

    <section
      id="featured-coupons"
      style={{
        padding: "70px 20px",
        background: "#f8fafc",
      }}
    >

      <h2
        style={{
          textAlign: "center",
          marginBottom: "25px",
          fontSize: "34px",
        }}
      >
        ⭐ أفضل الكوبونات
      </h2>

      <div
        style={{
          maxWidth: "500px",
          margin: "0 auto 40px",
        }}
      >

        <input
          type="text"
          placeholder="🔍 ابحث باسم المتجر..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "100%",
            padding: "15px",
            borderRadius: "12px",
            border: "1px solid #ddd",
            fontSize: "16px",
            outline: "none",
          }}
        />

      </div>

      <div
        style={{
          maxWidth: "1100px",
          margin: "auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
          gap: "25px",
        }}
      >

        {filteredCoupons.map((coupon) => (

          <div
            key={coupon.id}
            style={{
              background: "#fff",
              borderRadius: "16px",
              padding: "25px",
              boxShadow: "0 8px 20px rgba(0,0,0,.08)",
            }}
          >

            <h3>{coupon.store}</h3>

            <h1
              style={{
                color: "#2563eb",
                margin: "20px 0",
              }}
            >
              {coupon.discount}
            </h1>

            <div
              style={{
                background: "#eef2ff",
                padding: "12px",
                borderRadius: "10px",
                textAlign: "center",
                fontWeight: "bold",
                letterSpacing: "2px",
              }}
            >
              {coupon.code}
            </div>

            <button
              onClick={() => copyCode(coupon.code, coupon.affiliate)}
              style={{
                width: "100%",
                marginTop: "18px",
                padding: "14px",
                border: "none",
                borderRadius: "10px",
                background: "#2563eb",
                color: "#fff",
                cursor: "pointer",
                fontSize: "16px",
              }}
            >
              📋 نسخ الكوبون
            </button>

          </div>

        ))}

      </div>

      {filteredCoupons.length === 0 && (

        <p
          style={{
            textAlign: "center",
            marginTop: "40px",
            color: "#666",
          }}
        >
          لا توجد كوبونات مطابقة للبحث.
        </p>

      )}

    </section>

  );

}
