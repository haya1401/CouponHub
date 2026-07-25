import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { Link } from 'react-router-dom';

export default function Stores() {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);

  // خريطة الشعارات الأصلية والموثوقة للمتاجر
  const originalLogos = {
    'lg': 'https://logo.clearbit.com/lg.com',
    'sukkarstore': 'https://logo.clearbit.com/sukkarstore.com',
    'ناتفيتا': 'https://logo.clearbit.com/natvita.sa',
    'ناتفِيتا': 'https://logo.clearbit.com/natvita.sa',
    'سكون': 'https://cdn.salla.sa/Forma/logo.png', // رابط مباشر
    'مترو برازيل': 'https://logo.clearbit.com/metrobrazil.com',
    'bshti': 'https://logo.clearbit.com/bshti.com',
    'بشتي': 'https://logo.clearbit.com/bshti.com',
    'سمو': 'https://ui-avatars.com/api/?name=سمو&background=0284c7&color=ffffff&bold=true&size=128',
    'الشنيفي للمسكات والكوالين': 'https://ui-avatars.com/api/?name=الشنيفي&background=1e293b&color=ffffff&bold=true&size=128',
    'برفيوم كو': 'https://logo.clearbit.com/perfumeco.sa',
    'مصاغات الأربش للذهب': 'https://ui-avatars.com/api/?name=الأربش&background=d97706&color=ffffff&bold=true&size=128',
    'salla': 'https://logo.clearbit.com/salla.sa',
    'سلة': 'https://logo.clearbit.com/salla.sa',
    'amazon': 'https://logo.clearbit.com/amazon.com',
    'أمازون': 'https://logo.clearbit.com/amazon.com',
    'علي إكسبريس العالمية': 'https://logo.clearbit.com/aliexpress.com',
    'aliexpress': 'https://logo.clearbit.com/aliexpress.com',
    'الزامل للصناعة والتجارة والنقل': 'https://logo.clearbit.com/zamil.com'
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
    // 1. استخدام اللوجو المباشر من قاعدة البيانات إن وجد
    if (store.logo && store.logo.startsWith('http')) {
      return store.logo;
    }

    const cleanName = store.name.trim().toLowerCase();

    // 2. البحث في خريطة الشعارات
    for (const [key, value] of Object.entries(originalLogos)) {
      if (cleanName.includes(key.toLowerCase())) {
        return value;
      }
    }

    // 3. النطاقات الإنجليزية
    if (/^[a-zA-Z0-9-.]+$/.test(cleanName)) {
      const domain = cleanName.includes('.') ? cleanName : `${cleanName}.com`;
      return `https://logo.clearbit.com/${domain}`;
    }

    // 4. رمز أنيق ومخصص بحروف اسم المتجر عند عدم وجود صورة
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(store.name)}&background=f1f5f9&color=2563eb&bold=true&size=128`;
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
            const logoUrl = getStoreLogo(store);

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
                  height: '80px',
                  width: '130px',
                  marginBottom: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <img 
                    src={logoUrl} 
                    alt={store.name} 
                    style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain', borderRadius: '8px' }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(store.name)}&background=f1f5f9&color=2563eb&bold=true`;
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
