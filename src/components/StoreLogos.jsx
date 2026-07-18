import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default function StoreLogos() {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    async function loadStores() {
      const querySnapshot = await getDocs(collection(db, "stores"));

      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setStores(data);
    }

    loadStores();
  }, []);

  return (
    <section
      style={{
        padding: "60px 20px",
        background: "#fff",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          marginBottom: "40px",
          fontSize: "34px",
        }}
      >
        🏪 أشهر المتاجر
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
          gap: "20px",
          maxWidth: "1100px",
          margin: "auto",
        }}
      >
        {stores.map((store) => (
          <div
            key={store.id}
            style={{
              background: "#fff",
              borderRadius: "15px",
              padding: "20px",
              textAlign: "center",
              boxShadow: "0 5px 15px rgba(0,0,0,.08)",
            }}
          >
            {store.logo?.startsWith("http") ? (
              <img
                src={store.logo}
                alt={store.name}
                style={{
                  width: "70px",
                  height: "70px",
                  objectFit: "contain",
                  marginBottom: "15px",
                }}
              />
            ) : (
              <div style={{ fontSize: "45px" }}>
                {store.logo}
              </div>
            )}

            <h3>{store.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}
