const stores = [
  {
    name: "Amazon",
    logo: "/logos/amazon.png",
  },
  {
    name: "Noon",
    logo: "/logos/noon.png",
  },
  {
    name: "SHEIN",
    logo: "/logos/shein.png",
  },
  {
    name: "AliExpress",
    logo: "/logos/aliexpress.png",
  },
];

export default function StoreLogos() {
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
        }}
      >
        🏪 أشهر المتاجر
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
          gap: "20px",
          maxWidth: "1000px",
          margin: "auto",
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
              boxShadow: "0 5px 15px rgba(0,0,0,.08)",
            }}
          >
            <img
              src={store.logo}
              alt={store.name}
              style={{
                width: "90px",
                height: "90px",
                objectFit: "contain",
                marginBottom: "15px",
              }}
            />

            <h3>{store.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}
