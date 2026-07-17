const stores = [
  {
    name: "Amazon",
    logo: "🛒"
  },
  {
    name: "Noon",
    logo: "🟡"
  },
  {
    name: "SHEIN",
    logo: "👗"
  },
  {
    name: "AliExpress",
    logo: "📦"
  }
];

export default function StoreLogos() {
  return (
    <section
      style={{
        padding: "60px 20px",
        background: "#fff"
      }}
    >
      <h2
        style={{
          textAlign: "center",
          marginBottom: "40px"
        }}
      >
        🏪 أشهر المتاجر
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(180px,1fr))",
          gap: "20px",
          maxWidth: "1000px",
          margin: "auto"
        }}
      >
        {stores.map((store) => (
          <div
            key={store.name}
            style={{
              background: "#fff",
              borderRadius: "15px",
              padding: "20px",
              textAlign: "center",
              boxShadow:
                "0 5px 15px rgba(0,0,0,.08)"
            }}
          >
            <div style={{ fontSize: "45px" }}>
              {store.logo}
            </div>

            <h3>{store.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}
