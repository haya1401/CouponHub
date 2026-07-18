import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function loadCategories() {
      const snapshot = await getDocs(collection(db, "categories"));

      setCategories(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    }

    loadCategories();
  }, []);

  return (
    <section style={{ padding: "60px 20px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "30px" }}>
        📂 تصفح حسب التصنيف
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
          gap: "20px",
          maxWidth: "1100px",
          margin: "auto",
        }}
      >
        {categories.map((item) => (
          <div
            key={item.id}
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "15px",
              textAlign: "center",
              boxShadow: "0 5px 12px rgba(0,0,0,.08)",
            }}
          >
            <div style={{ fontSize: "35px" }}>{item.icon}</div>
            <h3>{item.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}
