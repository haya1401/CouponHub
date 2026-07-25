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

  // دالة فتح رابط الأفلييت الفورية + نسخ الكود
  function handleCouponClick(e, code, couponObj) {
    e.stopPropagation();
    e.preventDefault();

    // معرفة رابط الأفلييت الصحيح بغض النظر عن اسمه في Firebase
    const targetUrl = couponObj.affiliate || couponObj.affiliateUrl || couponObj.link || couponObj.url;

    if (!targetUrl) {
      alert("عذراً، لم يتم إضافة رابط الأفلييت لهذا الكوبون بعد!");
      return;
    }

    // 1. فتح رابط الأفلييت فوراً لتجاوز مانع النوافذ المنبثقة (Pop-up Blocker)
    window.open(targetUrl, "_blank", "noopener,noreferrer");

    // 2. نسخ كود الخصم في الخلفية تلقائياً
    if (code) {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(code).catch(() => {});
      }
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

              {/* زر الكوبون */}
              <button
                onClick={(e) =>
                  handleCouponClick(e, coupon.code, coupon)
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
