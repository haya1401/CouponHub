import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { Link } from 'react-router-dom';

export default function Coupons() {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStoresAndCoupons() {
      try {
        const snapshot = await getDocs(collection(db, "coupons"));
        const allCoupons = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // تجميع المتاجر وتحديد بيانات كل متجر
        const storeMap = {};
        allCoupons.forEach((coupon) => {
          const name = coupon.store?.trim();
          if (name) {
            if (!storeMap[name]) {
              storeMap[name] = {
                name: name,
                count: 0,
                description: coupon.title || "أحدث الكوبونات والعروض الحصرية"
              };
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

    fetchStoresAndCoupons();
  }, []);

  return (
    <section style={{ maxWidth: '1200px', margin: '2rem auto', padding: '0 15px' }}>
      <h2 style={{
        textAlign: 'center',
        fontSize: '1.8rem',
        fontWeight: 'bold',
        marginBottom: '2rem'
      }}>
        🏪 جميع المتاجر
      </h2>

      {loading ? (
        <p style={{ textAlign: 'center' }}>جاري تحميل المتاجر...</p>
      ) : stores.length === 0 ? (
        <p style={{ textAlign: 'center' }}>لا توجد متاجر متاحة حالياً</p>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '20px'
        }}>
          {stores.map((store, index) => (
            <Link 
              to={`/store/${encodeURIComponent(store.name)}`} 
              key={index} 
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div style={{
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                padding: '24px 20px',
                border: '1px solid #e2e8f0',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                height: '100%'
              }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  backgroundColor: '#f1f5f9',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.8rem',
                  marginBottom: '12px'
                }}>
                  🛍️
                </div>

                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '8px', color: '#0f172a' }}>
                  {store.name}
                </h3>

                <p style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '16px', flexGrow: 1, lineHeight: '1.4' }}>
                  {store.description}
                </p>

                <span style={{
                  backgroundColor: '#eff6ff',
                  color: '#2563eb',
                  padding: '6px 16px',
                  borderRadius: '20px',
                  fontSize: '0.85rem',
                  fontWeight: '600'
                }}>
                  {store.count} {store.count > 2 ? 'كوبونات' : 'كوبون'}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
