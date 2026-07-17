const stores = [
  {
    name: "Amazon",
    coupons: 25,
    logo: "🛒"
  },
  {
    name: "Noon",
    coupons: 18,
    logo: "🟡"
  },
  {
    name: "SHEIN",
    coupons: 30,
    logo: "👗"
  },
  {
    name: "AliExpress",
    coupons: 40,
    logo: "📦"
  }
];

export default function Stores() {
  return (
    <section
      style={{
        padding: "60px 20px"
      }}
    >

      <h1
        style={{
          textAlign: "center",
          marginBottom: "40px"
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
            key={store.name}
            style={{
              background:"#fff",
              padding:"25px",
              borderRadius:"16px",
              textAlign:"center",
              boxShadow:"0 8px 20px rgba(0,0,0,.08)"
            }}
          >

            <div style={{fontSize:"45px"}}>
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
  );
}
