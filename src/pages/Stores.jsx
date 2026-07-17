import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

import Header from "../components/Header";

export default function Stores() {

  const [stores, setStores] = useState([]);

  useEffect(() => {

    async function loadStores() {

      const querySnapshot = await getDocs(
        collection(db, "stores")
      );

      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setStores(data);

    }

    loadStores();

  }, []);


  return (
    <>
      <Header />

      <section
        style={{
          padding:"60px 20px"
        }}
      >

        <h1
          style={{
            textAlign:"center",
            marginBottom:"40px"
          }}
        >
          🏪 جميع المتاجر
        </h1>


        <div
          style={{
            display:"grid",
            gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",
            gap:"25px"
          }}
        >

          {stores.map((store)=>(

            <div
              key={store.id}
              style={{
                background:"#fff",
                padding:"25px",
                borderRadius:"16px",
                textAlign:"center",
                boxShadow:"0 8px 20px rgba(0,0,0,.08)"
              }}
            >

              <div
                style={{
                  fontSize:"45px"
                }}
              >
                {store.logo}
              </div>


              <h2>
                {store.name}
              </h2>


              <p>
                {store.coupons} كوبون متوفر
              </p>


              <button
                style={{
                  background:"#2563eb",
                  color:"#fff",
                  border:"none",
                  padding:"12px 25px",
                  borderRadius:"10px"
                }}
              >
                عرض الكوبونات
              </button>


            </div>

          ))}


        </div>

      </section>
    </>
  );
}
