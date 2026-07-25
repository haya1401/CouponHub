import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { Link } from 'react-router-dom';

export default function Stores() {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);

  // خريطة المواقع الإلكترونية للوصول للشعار الأصلي بدقة
  const storeLogosMap = {
    'amazon': 'https://logo.clearbit.com/amazon.com',
    'aliexpress': 'https://logo.clearbit.com/aliexpress.com',
    'علي إكسبريس العالمية': 'https://logo.clearbit.com/aliexpress.com',
    'lg': 'https://logo.clearbit.com/lg.com',
    'samsung': 'https://logo.clearbit.com/samsung.com',
    'سامسونج': 'https://logo.clearbit.com/samsung.com',
    'huawei': 'https://logo.clearbit.com/huawei.com',
    'dkny': 'https://logo.clearbit.com/dkny.com',
    'mamas & papas': 'https://logo.clearbit.com/mamasandpapas.com',
    'ماماز اند باباز': 'https://logo.clearbit.com/mamasandpapas.com',
    'salla': 'https://logo.clearbit.com/salla.sa',
    'سكون': 'https://logo.clearbit.com/sakoon.sa',
    'مترو برازيل': 'https://logo.clearbit.com/metrobrazil.com',
    'عالم السيف': 'https://logo.clearbit.com/alsaifgallery.com',
    'طيران ناس': 'https://logo.clearbit.com/flynas.com'
  };

  useEffect(() => {
    async function fetchStores() {
      try {
        const snapshot = await getDocs(collection(db, "coupons"));
        const allCoupons = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        const storeMap = {};
        allCoupons.forEach((coupon) => {
          const name = coupon.store?.trim();
          if (name) {
            const logoUrl = coupon.storeLogo || coupon.logo || coupon.image || coupon.img || null;

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
        console.error("Error loading stores:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchStores();
  }, []);

  const getStoreLogo = (store) => {
    if (store.logo) return store.logo;

    const lowerName = store.name.toLowerCase().trim();
    if (storeLogosMap[lowerName]) {
      return storeLogosMap[lowerName];
    }

    if (/^[a-zA-Z0-9-.]+$/.test(lowerName)) {
      const cleanDomain = lowerName.includes('.') ? lowerName : `${lowerName}.com`;
      return `https://logo.clearbit.com/${cleanDomain}`;
    }

    // صورة متجر افتراضية بدلاً من الحرفين
    return "https://cdn-icons-png.flaticon.com/512/869/869636.png";
  };

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
            const displayLogo = getStoreLogo(store);
            const fallbackIcon = "https://cdn-icons-png.flaticon.com/512/869/869636.png";

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
                <div style={{
                  height: '70px',
                  width: '120px',
                  marginBottom: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <img 
                    src={displayLogo} 
                    alt={store.name} 
                    style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = fallbackIcon;
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
