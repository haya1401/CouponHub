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
            // جلب صورة المتجر/الشعار من الحقول المحتملة في قاعدة البيانات
            const logoUrl = coupon.logo || coupon.storeLogo || coupon.image || coupon.img || null;

            if (!storeMap[name]) {
              storeMap[name] = {
                name: name,
                count: 0,
                logo: logoUrl
              };
            } else if (!storeMap[name].logo && logoUrl) {
              storeMap[name].logo = logoUrl;
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
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '20px'
        }}>
          {stores.map((store, index) => {
            // صورة بديلة بحروف المتجر في حال عدم وجود شعار
            const fallbackAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(store.name)}&background=f1f5f9&color=334155&size=128&bold=true`;

            return (
              <div 
                key={index} 
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '16px',
                  padding: '20px',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.03)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center'
                }}
              >
                {/* حاوية الشعار المربعة مثل الصورة تماماً */}
                <div style={{
                  width: '100px',
                  height: '60px',
                  marginBottom: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <img 
                    src={store.logo || fallbackAvatar} 
                    alt={store.name} 
                    style={{ 
                      maxWidth: '100%', 
                      maxHeight: '100%', 
                      objectFit: 'contain' 
                    }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = fallbackAvatar;
                    }}
                  />
                </div>

                <h3 style={{ fontSize: '1.15rem', fontWeight: 'bold', marginBottom: '6px', color: '#0f172a' }}>
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
