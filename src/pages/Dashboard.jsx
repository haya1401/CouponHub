import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase";

export default function Dashboard() {
  const [store, setStore] = useState("");
  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState("");
  const [coupons, setCoupons] = useState([]);

  async function loadCoupons() {
    try {
      const snapshot = await getDocs(collection(db, "coupons"));

      const data = snapshot.docs.map((docItem) => ({
        id: docItem.id,
        ...docItem.data(),
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

    if (!store.trim() || !code.trim() || !discount.trim()) {
      alert("يرجى تعبئة جميع الحقول");
      return;
    }

    try {
      await addDoc(collection(db, "coupons"), {
        store: store.trim(),
        code: code.trim(),
        discount: discount.trim(),
        active: true,
        createdAt: Date.now(),
      });

      alert("✅ تم إضافة الكوبون بنجاح");

      setStore("");
      setCode("");
      setDiscount("");

      loadCoupons();
    } catch (err) {
      console.error(err);
      alert("❌ حدث خطأ أثناء إضافة الكوبون");
    }
  }

  async function deleteCoupon(id) {
    const ok = window.confirm("هل تريد حذف هذا الكوبون؟");

    if (!ok) return;

    try {
      await deleteDoc(doc(db, "coupons", id));

      alert("🗑️ تم حذف الكوبون");

      loadCoupons();
    } catch (err) {
      console.error(err);
      alert("❌ فشل حذف الكوبون");
    }
  }

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "40px auto",
        padding: "20px",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "30px",
        }}
      >
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
            borderRadius: "8px",
            border: "1px solid #ddd",
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
            borderRadius: "8px",
            border: "1px solid #ddd",
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
            borderRadius: "8px",
            border: "1px solid #ddd",
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
              borderRadius: "12px",
              padding: "18px",
              marginTop: "18px",
              background: "#fff",
              boxShadow: "0 5px 15px rgba(0,0,0,.05)",
            }}
          >
            <h3>{coupon.store}</h3>

            <p>
              <strong>الكود:</strong> {coupon.code}
            </p>

            <p>
              <strong>الخصم:</strong> {coupon.discount}
            </p>

            <p
              style={{
                color: "#777",
                fontSize: "12px",
              }}
            >
              ID: {coupon.id}
            </p>

            <button
              onClick={() => deleteCoupon(coupon.id)}
              style={{
                width: "100%",
                marginTop: "15px",
                padding: "12px",
                background: "#dc2626",
                color: "#fff",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
                fontSize: "15px",
              }}
            >
              🗑️ حذف الكوبون
            </button>
          </div>
        ))
      )}
    </div>
  );
}
