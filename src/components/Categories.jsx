import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";

import { db } from "../firebase";
import "./Categories.css";

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
    <section className="categories-section">

      <h2 className="categories-title">
        📂 تصفح حسب التصنيف
      </h2>

      <div className="categories-grid">

        {categories.map((item) => (
          <div
            key={item.id}
            className="category-card"
          >
            <div className="category-icon">
              {item.icon}
            </div>

            <h3>{item.name}</h3>

            <button className="category-btn">
              عرض الكوبونات
            </button>
          </div>
        ))}

      </div>

      {categories.length === 0 && (
        <p className="empty-category">
          لا توجد تصنيفات حالياً
        </p>
      )}

    </section>
  );
}
