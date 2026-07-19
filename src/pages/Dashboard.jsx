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

const tabs = [
  {
    id: "coupons",
    title: "🏷️ الكوبونات",
  },
  {
    id: "stores",
    title: "🏪 المتاجر",
  },
  {
    id: "categories",
    title: "📂 التصنيفات",
  },
  {
    id: "stats",
    title: "📈 الإحصائيات",
  },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("coupons");

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
      .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));

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
          store: store.trim(),
          code: code.trim(),
          discount: discount.trim(),
        });

        alert("✅ تم تحديث الكوبون");
      } else {
        await addDoc(collection(db, "coupons"), {
          store: store.trim(),
          code: code.trim(),
          discount: discount.trim(),
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
        maxWidth: "950px",
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

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "15px",
          flexWrap: "wrap",
          marginBottom: "35px",
        }}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: "12px 22px",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              fontWeight: "bold",
              background:
                activeTab === tab.id ? "#2563eb" : "#e5e7eb",
              color:
                activeTab === tab.id ? "#fff" : "#111827",
            }}
          >
            {tab.title}
          </button>
        ))}
      </div>

      {activeTab === "coupons" && (
        <>
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
              {editingId
                ? "💾 حفظ التعديلات"
                : "➕ إضافة الكوبون"}
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
                <h3 style={{ marginBottom: "15px" }}>
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
        </>
      )}

      {activeTab === "stores" && (
        <div
          style={{
            background: "#fff",
            borderRadius: "12px",
            padding: "40px",
            textAlign: "center",
            boxShadow: "0 5px 15px rgba(0,0,0,.08)",
          }}
        >
          <h2>🏪 إدارة المتاجر</h2>

          <p style={{ color: "#666" }}>
            قريباً ستتمكن من إضافة وتعديل وحذف المتاجر من هنا.
          </p>
        </div>
      )}

      {activeTab === "categories" && (
        <div
          style={{
            background: "#fff",
            borderRadius: "12px",
            padding: "40px",
            textAlign: "center",
            boxShadow: "0 5px 15px rgba(0,0,0,.08)",
          }}
        >
          <h2>📂 إدارة التصنيفات</h2>

          <p style={{ color: "#666" }}>
            قريباً ستتمكن من إدارة جميع التصنيفات.
          </p>
        </div>
      )}

      {activeTab === "stats" && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
            gap: "20px",
          }}
        >
          <div
            style={{
              background: "#2563eb",
              color: "#fff",
              borderRadius: "12px",
              padding: "25px",
              textAlign: "center",
            }}
          >
            <h3>🎟️ الكوبونات</h3>

            <h1>{coupons.length}</h1>
          </div>

          <div
            style={{
              background: "#16a34a",
              color: "#fff",
              borderRadius: "12px",
              padding: "25px",
              textAlign: "center",
            }}
          >
            <h3>✅ النشطة</h3>

            <h1>
              {
                coupons.filter((coupon) => coupon.active)
                  .length
              }
            </h1>
          </div>

          <div
            style={{
              background: "#f59e0b",
              color: "#fff",
              borderRadius: "12px",
              padding: "25px",
              textAlign: "center",
            }}
          >
            <h3>🏪 المتاجر</h3>

            <h1>
              {
                new Set(
                  coupons.map((coupon) => coupon.store)
                ).size
              }
            </h1>
          </div>

          <div
            style={{
              background: "#7c3aed",
              color: "#fff",
              borderRadius: "12px",
              padding: "25px",
              textAlign: "center",
            }}
          >
            <h3>📈 إجمالي البيانات</h3>

            <h1>{coupons.length}</h1>
          </div>
        </div>
      )}
    </div>
  );
}
