import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { Link } from 'react-router-dom';
import './StoreLogos.css';

export default function StoreLogos() {
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
            if (!storeMap[name]) {
              storeMap[name] = {
                name: name,
                count: 0,
                logo: coupon.logo || coupon.image || coupon.storeLogo || ''
              };
            }
            storeMap[name].count += 1;
          }
        });

        setStores(Object.values(storeMap));
      } catch (error) {
        console.error("Error fetching store logos:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchStores();
  }, []);

  if (loading) return <p style={{ textAlign: 'center' }}>جاري التحميل...</p>;

  return (
    <div className="stores-grid">
      {stores.map((store, index) => (
        <div key={index} className="store-card">
          <div className="logo-container">
            {store.logo ? (
              <img src={store.logo} alt={store.name} />
            ) : (
              <span>🏪</span>
            )}
          </div>
          <h3>كوبونات {store.name}</h3>
          <p>{store.count} كوبون متوفر</p>
          <Link to={`/store/${encodeURIComponent(store.name)}`} className="btn-store">
            عرض الكوبونات
          </Link>
        </div>
      ))}
    </div>
  );
}
