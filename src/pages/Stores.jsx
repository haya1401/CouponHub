import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { Link } from 'react-router-dom';

export default function Stores() {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);

  // خريطة النطاقات الصريحة لضمان جلب الشعار الأصلي من النطاق المباشر
  const storeDomains = {
    'برفيوم كو': 'perfumeco.sa',
    'أفلام الألغاز': 'puzzlemovies.com',
    'سكون': 'sakoon.sa',
    'سمارت هب1': 'smarthub1.com',
    'سارت هب1': 'smarthub1.com',
    'مجوهرات الغنيم': 'alghoneim.com',
    'مجوهرا الغنيم': 'alghoneim.com',
    'huawei': 'huawei.com',
    'sukkarstore': 'sukkarstore.com',
    'زمرد ذهب و الماس': 'zomorod.sa',
    'زمرد ذهب و ألمس': 'zomorod.sa',
    'مترو برازيل': 'metrobrazil.com',
    'الشنيفي للمسكات والكوالين': 'alshneifi.com',
    'aliexpress': 'aliexpress.com',
    'علي إكسبريس العالمية': 'aliexpress.com',
    'ناتفيتا': 'natvita.sa',
    'ناتفِيتا': 'natvita.sa',
    'نون': 'noon.com',
    'dkny': 'dkny.com',
    'شنطتي': 'shentaty.com',
    'lg': 'lg.com',
    'amazon': 'amazon.com',
    'أمازون': 'amazon.com',
    'salla': 'salla.sa',
    'bshti': 'bshti.com',
    'سمو': 'samou.sa',
    'مصاغات الأربش للذهب': 'alarbashgold.com'
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

  // دالة ذكية لتوليد جلب الشعار بجميع المحاولات
  const getLogoUrl = (store) => {
    if (store.logo && store.logo.startsWith('http')) {
      return store.logo;
    }

    const cleanName = store.name.trim().toLowerCase();

    // 1. البحث في خريطة النطاقات المخصصة
    for (const [key, domain] of Object.entries(storeDomains)) {
      if (cleanName.includes(key.toLowerCase())) {
        return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
      }
    }

    // 2. إذا كان اسم المتجر بالإنجليزية
    if (/^[a-zA-Z0-9-.]+$/.test(cleanName)) {
      const domain = cleanName.includes('.') ? cleanName : `${cleanName}.com`;
      return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
    }

    // 3. بديل جذاب بالأحرف الملونة بدلاً من الأيقونة الموحدة
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(store.name)}&background=f1f5f9&color=1e293b&size=128&bold=true&font-size=0.4`;
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
            const logoUrl = getLogoUrl(store);

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
                  height: '75px',
                  width: '120px',
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
