import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase";

export default function Dashboard() {
  const [store, setStore] = useState("");
  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState("");

  const [coupons, setCoupons] = useState([]);

  const [editingId, setEditingId] = useState(null);

  async function loadCoupons() {
    const snapshot = await getDocs(collection(db, "coupons"));

    const data = snapshot.docs
      .map((docItem) => ({
        id: docItem.id,
        ...docItem.data(),
      }))
      .sort((a, b) => b.createdAt - a.createdAt);

    setCoupons(data);
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
      if (editingId) {
        await updateDoc(doc(db, "coupons", editingId), {
          store,
          code,
          discount,
        });

        alert("✅ تم تحديث الكوبون");
      } else {
        await addDoc(collection(db, "coupons"), {
          store,
          code,
          discount,
          active: true,
          createdAt: Date.now(),
        });

        alert("✅ تم إضافة الكوبون");
      }

      setStore("");
      setCode("");
      setDiscount("");
      setEditingId(null);

      loadCoupons();
    } catch (err) {
      console.error(err);
      alert("حدث خطأ");
    }
  }

  function editCoupon(coupon) {
    setEditingId(coupon.id);
    setStore(coupon.store);
    setCode(coupon.code);
    setDiscount(coupon.discount);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function cancelEdit() {
    setEditingId(null);
    setStore("");
    setCode("");
    setDiscount("");
  }

  async function deleteCoupon(id) {
    if (!window.confirm("هل تريد حذف الكوبون؟")) return;

    await deleteDoc(doc(db, "coupons", id));

    loadCoupons();
  }

  return (
    <div
      style={{
        maxWidth: "900px",
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
          placeholder="قيمة الخصم"
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
            border: "none",
            borderRadius: "10px",
            background: editingId ? "#16a34a" : "#2563eb",
            color: "#fff",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          {editingId ? "💾 حفظ التعديلات" : "➕ إضافة الكوبون"}
        </button>

        {editingId && (
          <button
            type="button"
            onClick={cancelEdit}
            style={{
              width: "100%",
              marginTop: "10px",
              padding: "14px",
              border: "none",
              borderRadius: "10px",
              background: "#6b7280",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            ❌ إلغاء التعديل
          </button>
        )}
      </form>

      <hr style={{ margin: "40px 0" }} />

      <h2>📋 جميع الكوبونات</h2>
            {coupons.length === 0 ? (
        <p
          style={{
            textAlign: "center",
            marginTop: "30px",
          }}
        >
          لا توجد كوبونات حالياً.
        </p>
      ) : (
        coupons.map((coupon) => (
          <div
            key={coupon.id}
            style={{
              background: "#fff",
              padding: "20px",
              marginTop: "20px",
              borderRadius: "12px",
              boxShadow: "0 5px 15px rgba(0,0,0,.08)",
            }}
          >
            <h3
              style={{
                marginBottom: "15px",
              }}
            >
              🏪 {coupon.store}
            </h3>

            <p>
              <strong>الكود:</strong> {coupon.code}
            </p>

            <p>
              <strong>الخصم:</strong> {coupon.discount}
            </p>

            <div
              style={{
                display: "flex",
                gap: "10px",
                marginTop: "20px",
              }}
            >
              <button
                onClick={() => editCoupon(coupon)}
                style={{
                  flex: 1,
                  padding: "12px",
                  background: "#f59e0b",
                  color: "#fff",
                  border: "none",
                  borderRadius: "10px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                ✏️ تعديل
              </button>

              <button
                onClick={() => deleteCoupon(coupon.id)}
                style={{
                  flex: 1,
                  padding: "12px",
                  background: "#dc2626",
                  color: "#fff",
                  border: "none",
                  borderRadius: "10px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                🗑️ حذف
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
