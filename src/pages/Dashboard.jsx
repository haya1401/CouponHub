import { useState, useEffect } from "react";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default function Dashboard() {
  const [store, setStore] = useState("");
  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState("");
  const [coupons, setCoupons] = useState([]);

  async function loadCoupons() {
    try {
      const snapshot = await getDocs(collection(db, "coupons"));

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setCoupons(data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    loadCoupons();
  }, []);

  async function saveCoupon(e) {
    e.preventDefault();

    try {
      await addDoc(collection(db, "coupons"), {
        store,
        code,
        discount,
        active: true,
        createdAt: Date.now(),
      });

      alert("✅ تم إضافة الكوبون بنجاح");

      setStore("");
      setCode("");
      setDiscount("");

      // إعادة تحميل الكوبونات بعد الإضافة
      loadCoupons();
    } catch (err) {
      console.error(err);
      alert("❌ حدث خطأ أثناء إضافة الكوبون");
    }
  }

  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "40px auto",
        padding: "20px",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
        🎉 لوحة إدارة CouponHub
      </h1>

      <form onSubmit={saveCoupon}>
        <input
          type="text"
          placeholder="اسم المتجر"
          value={store}
          onChange={(e) => setStore(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
          }}
        />

        <input
          type="text"
          placeholder="كود الخصم"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
          }}
        />

        <input
          type="text"
          placeholder="قيمة الخصم (مثال: 20% OFF)"
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "20px",
          }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "14px",
            background: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          ➕ إضافة الكوبون
        </button>
      </form>

      <hr style={{ margin: "40px 0" }} />

      <h2>📋 جميع الكوبونات</h2>

      {coupons.length === 0 ? (
        <p>لا توجد كوبونات.</p>
      ) : (
        coupons.map((coupon) => (
          <div
            key={coupon.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "15px",
              marginTop: "15px",
            }}
          >
            <h3>{coupon.store}</h3>
            <p>
              <strong>الكود:</strong> {coupon.code}
            </p>
            <p>
              <strong>الخصم:</strong> {coupon.discount}
            </p>
          </div>
        ))
      )}
    </div>
  );
}
