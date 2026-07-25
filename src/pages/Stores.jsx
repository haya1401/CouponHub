import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { Link } from 'react-router-dom';

export default function Stores() {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStores() {
      try {
        const snapshot = await getDocs(collection(db, "coupons"));
        const allCoupons = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        const storeMap = {};
        allCoupons.forEach((coupon) => {
          const name = coupon.store?.trim();
          if (name) {
            // البحث عن رابط الصورة بجميع الأسماء المحتملة داخل الكوبون
            const foundImage = coupon.image || coupon.logo || coupon.storeLogo || coupon.img || coupon.store_image || null;

            if (!storeMap[name]) {
              storeMap[name] = {
                name: name,
                count: 0,
                image: foundImage
              };
            } else if (!storeMap[name].image && foundImage) {
              storeMap[name].image = foundImage;
            }
            storeMap[name].count += 1;
          }
        });

        setStores(Object.values(storeMap));
      } catch (error) {
        console.error("Error fetching stores:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchStores();
  }, []);

  return (
    <section style={{ maxWidth: '1200px', margin: '2rem auto', padding: '0 15px' }}>
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '8px', color: '#1e293b' }}>
          🏪 جميع المتاجر وكوبونات الخصم
        </h2>
        <p style={{ color: '#64748b', fontSize: '0.95rem' }}>
          اكتشف أفضل المتاجر واحصل على أحدث أكواد الخصم والعروض عبر CouponHub.
        </p>
      </div>

      {loading ? (
        <p style={{ textAlign: 'center', color: '#64748b' }}>جاري تحميل المتاجر...</p>
      ) : stores.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#64748b' }}>لا توجد متاجر متاحة حالياً</p>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '20px'
        }}>
          {stores.map((store, index) => {
            // شعار بديل نظيف باسم المتجر إذا لم يوجد رابط صورة في الفايربيس
            const fallbackAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(store.name)}&background=f1f5f9&color=0f172a&size=128&bold=true`;
            const imageUrl = store.image || fallbackAvatar;

            return (
              <div 
                key={index} 
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '16px',
                  padding: '24px 20px',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.03)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center'
                }}
              >
                <div style={{ height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
                  <img 
                    src={imageUrl} 
                    alt={store.name} 
                    style={{ maxHeight: '100%', maxWidth: '140px', objectFit: 'contain' }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = fallbackAvatar;
                    }}
                  />
                </div>

                <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '6px', color: '#0f172a' }}>
                  كوبونات {store.name}
                </h3>

                <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '16px' }}>
                  {store.count} {store.count > 2 ? 'كوبونات متوفرة' : 'كوبون متوفر'}
                </p>

                <Link 
                  to={`/store/${encodeURIComponent(store.name)}`} 
                  style={{
                    backgroundColor: '#2563eb',
                    color: '#ffffff',
                    padding: '9px 20px',
                    borderRadius: '8px',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    textDecoration: 'none',
                    width: '100%',
                    display: 'block',
                    boxSizing: 'border-box'
                  }}
                >
                  عرض الكوبونات
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
