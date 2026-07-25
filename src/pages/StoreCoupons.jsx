import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

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

        const storeName = decodeURIComponent(id || "").trim();
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

  function handleCouponAction(e, code, targetUrl) {
    if (code && navigator.clipboard) {
      navigator.clipboard.writeText(code).catch(() => {});
    }

    if (!targetUrl) {
      e.preventDefault();
      alert("⚠️ عذراً، لا يوجد رابط أفلييت مضاف لهذا الكوبون!");
    }
  }

  const storeName = decodeURIComponent(id || "");

  return (
    <section className="store-coupons">
      <div className="container">
        <h1>🔥 كوبونات {storeName}</h1>

        <div className="coupon-grid">
          {coupons.map((coupon) => {
            const affiliateLink =
              coupon.affiliate ||
              coupon.affiliateUrl ||
              coupon.link ||
              coupon.url ||
              "";

            return (
              <div className="coupon-card" key={coupon.id}>
                <h3>{coupon.title}</h3>
                <p>{coupon.store}</p>
                <strong>{coupon.discount}</strong>

                <a
                  href={affiliateLink || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="coupon-btn-link"
                  style={{ textDecoration: "none", display: "block" }}
                  onClick={(e) =>
                    handleCouponAction(e, coupon.code, affiliateLink)
                  }
                >
                  <button type="button" style={{ width: "100%", cursor: "pointer" }}>
                    🚀 استخدم الكوبون
                  </button>
                </a>

                <small>كود الخصم: {coupon.code}</small>
              </div>
            );
          })}
        </div>

        {coupons.length === 0 && <p>لا توجد كوبونات لهذا المتجر حالياً</p>}
      </div>
    </section>
  );
}
