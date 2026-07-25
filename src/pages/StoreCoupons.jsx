import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import "./StoreCoupons.css";

export default function StoreCoupons() {
  const { id } = useParams();
  const [coupons, setCoupons] = useState([]);

  useEffect(() => {
    async function loadCoupons() {
      try {
        const snapshot = await getDocs(collection(db, "coupons"));

        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const storeName = decodeURIComponent(id).trim();

        const filtered = data.filter(
          (coupon) => coupon.store?.trim() === storeName
        );

        setCoupons(filtered);

        document.title = `كوبونات ${storeName} | CouponHub`;
      } catch (error) {
        console.error("Loading store coupons error:", error);
      }
    }

    if (id) {
      loadCoupons();
    }
  }, [id]);

  // دالة فتح رابط الأفلييت ونسخ كود الخصم
  function handleCouponClick(e, code, link) {
    // 1. منع حدوث أي انتقال داخلي بصفحات الموقع عند الضغط على الزر
    e.stopPropagation();
    e.preventDefault();

    // 2. نسخ كود الخصم تلقائياً إذا كان موجوداً
    if (code) {
      navigator.clipboard.writeText(code).catch((err) => {
        console.error("فشل نسخ الكود:", err);
      });
    }

    // 3. فتح رابط الأفلييت في تبويب جديد فقط
    if (link) {
      window.open(link, "_blank", "noopener,noreferrer");
    } else {
      alert("لا يوجد رابط أفلييت لهذا الكوبون");
    }
  }

  const storeName = decodeURIComponent(id || "");

  return (
    <section className="store-coupons">
      <div className="container">
        <h1>🔥 كوبونات {storeName}</h1>

        <div className="coupon-grid">
          {coupons.map((coupon) => (
            <div className="coupon-card" key={coupon.id}>
              <h3>{coupon.title}</h3>
              <p>{coupon.store}</p>
              <strong>{coupon.discount}</strong>

              {/* زر الكوبون التفاعلي */}
              <button
                onClick={(e) =>
                  handleCouponClick(e, coupon.code, coupon.affiliate)
                }
              >
                🚀 استخدم الكوبون
              </button>

              <small>كود الخصم: {coupon.code}</small>
            </div>
          ))}
        </div>

        {coupons.length === 0 && <p>لا توجد كوبونات لهذا المتجر حالياً</p>}
      </div>
    </section>
  );
}
