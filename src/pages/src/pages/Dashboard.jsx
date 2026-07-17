import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function Dashboard() {
  const [store, setStore] = useState("");
  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState("");

  async function saveCoupon(e) {
    e.preventDefault();

    try {
      await addDoc(collection(db, "coupons"), {
        store,
        code,
        discount,
        active: true,
        createdAt: Date.now()
      });

      alert("✅ تم إضافة الكوبون");

      setStore("");
      setCode("");
      setDiscount("");
    } catch (err) {
      alert("❌ حدث خطأ");
      console.log(err);
    }
  }

  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "40px auto",
        padding: "20px"
      }}
    >
      <h1>🎉 لوحة إدارة CouponHub</h1>

      <form onSubmit={saveCoupon}>
        <input
          placeholder="اسم المتجر"
          value={store}
          onChange={(e) => setStore(e.target.value)}
          style={{ width: "100%", padding: 12, marginTop: 15 }}
        />

        <input
          placeholder="كود الخصم"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          style={{ width: "100%", padding: 12, marginTop: 15 }}
        />

        <input
          placeholder="قيمة الخصم"
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
          style={{ width: "100%", padding: 12, marginTop: 15 }}
        />

        <button
          type="submit"
          style={{
            marginTop: 20,
            width: "100%",
            padding: 14,
            border: "none",
            background: "#2563eb",
            color: "#fff",
            borderRadius: 10
          }}
        >
          ➕ إضافة الكوبون
        </button>
      </form>
    </div>
  );
}
