import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

export default function Stats() {
  const [coupons, setCoupons] = useState([]);
  const [stores, setStores] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function loadData() {
      const couponsSnapshot = await getDocs(collection(db, "coupons"));
      const storesSnapshot = await getDocs(collection(db, "stores"));
      const categoriesSnapshot = await getDocs(
        collection(db, "categories")
      );

      setCoupons(couponsSnapshot.docs.map((doc) => doc.data()));
      setStores(storesSnapshot.docs.map((doc) => doc.data()));
      setCategories(categoriesSnapshot.docs.map((doc) => doc.data()));
    }

    loadData();
  }, []);

  const cards = [
    {
      title: "🎟️ الكوبونات",
      value: coupons.length,
      color: "#2563eb",
    },
    {
      title: "🏪 المتاجر",
      value: stores.length,
      color: "#16a34a",
    },
    {
      title: "📂 التصنيفات",
      value: categories.length,
      color: "#f59e0b",
    },
    {
      title: "✅ الكوبونات النشطة",
      value: coupons.filter((c) => c.active).length,
      color: "#7c3aed",
    },
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
        gap: "20px",
      }}
    >
      {cards.map((card) => (
        <div
          key={card.title}
          style={{
            background: card.color,
            color: "#fff",
            padding: "25px",
            borderRadius: "15px",
            textAlign: "center",
            boxShadow: "0 10px 20px rgba(0,0,0,.1)",
          }}
        >
          <h3>{card.title}</h3>

          <h1
            style={{
              fontSize: "40px",
              marginTop: "15px",
            }}
          >
            {card.value}
          </h1>
        </div>
      ))}
    </div>
  );
}
