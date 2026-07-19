import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../firebase";

export default function StoreManager() {
  const [stores, setStores] = useState([]);

  const [name, setName] = useState("");
  const [logo, setLogo] = useState("");

  const [editingId, setEditingId] = useState(null);

  async function loadStores() {
    const snapshot = await getDocs(collection(db, "stores"));

    setStores(
      snapshot.docs.map((docItem) => ({
        id: docItem.id,
        ...docItem.data(),
      }))
    );
  }

  useEffect(() => {
    loadStores();
  }, []);

  async function saveStore(e) {
    e.preventDefault();

    if (!name.trim() || !logo.trim()) {
      alert("يرجى تعبئة جميع الحقول");
      return;
    }

    try {
      if (editingId) {
        await updateDoc(doc(db, "stores", editingId), {
          name: name.trim(),
          logo: logo.trim(),
        });

        alert("✅ تم تحديث المتجر");
      } else {
        await addDoc(collection(db, "stores"), {
          name: name.trim(),
          logo: logo.trim(),
        });

        alert("✅ تم إضافة المتجر");
      }

      setName("");
      setLogo("");
      setEditingId(null);

      loadStores();
    } catch (err) {
      console.error(err);
      alert("حدث خطأ");
    }
  }

  function editStore(store) {
    setEditingId(store.id);
    setName(store.name);
    setLogo(store.logo);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function cancelEdit() {
    setEditingId(null);
    setName("");
    setLogo("");
  }

  async function deleteStore(id) {
    if (!window.confirm("هل تريد حذف المتجر؟")) return;

    await deleteDoc(doc(db, "stores", id));

    loadStores();
  }

    return (
    <div>
      <form
        onSubmit={saveStore}
        style={{
          background: "#fff",
          padding: "25px",
          borderRadius: "12px",
          boxShadow: "0 5px 15px rgba(0,0,0,.08)",
        }}
      >
        <input
          type="text"
          placeholder="اسم المتجر"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
          }}
        />

        <input
          type="text"
          placeholder="رابط الشعار (/logos/amazon.png)"
          value={logo}
          onChange={(e) => setLogo(e.target.value)}
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
          {editingId ? "💾 حفظ التعديلات" : "➕ إضافة متجر"}
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

      <h2>🏪 جميع المتاجر</h2>

      {stores.length === 0 ? (
        <p style={{ textAlign: "center" }}>
          لا توجد متاجر.
        </p>
      ) : (
        stores.map((store) => (
          <div
            key={store.id}
            style={{
              background: "#fff",
              marginTop: "20px",
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "0 5px 15px rgba(0,0,0,.08)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "15px",
              }}
            >
              <img
                src={store.logo}
                alt={store.name}
                onError={(e) => {
                  e.target.src = "/logos/default.png";
                }}
                style={{
                  width: "60px",
                  height: "60px",
                  objectFit: "contain",
                }}
              />

              <div>
                <h3>{store.name}</h3>

                <p
                  style={{
                    color: "#666",
                    fontSize: "14px",
                  }}
                >
                  {store.logo}
                </p>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                gap: "10px",
                marginTop: "20px",
              }}
            >
              <button
                onClick={() => editStore(store)}
                style={{
                  flex: 1,
                  padding: "12px",
                  background: "#f59e0b",
                  color: "#fff",
                  border: "none",
                  borderRadius: "10px",
                  cursor: "pointer",
                }}
              >
                ✏️ تعديل
              </button>

              <button
                onClick={() => deleteStore(store.id)}
                style={{
                  flex: 1,
                  padding: "12px",
                  background: "#dc2626",
                  color: "#fff",
                  border: "none",
                  borderRadius: "10px",
                  cursor: "pointer",
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
