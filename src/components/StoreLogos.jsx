const stores = [
  { name: "Amazon", logo: "https://logo.clearbit.com/amazon.com" },
  { name: "Noon", logo: "https://logo.clearbit.com/noon.com" },
  { name: "SHEIN", logo: "https://logo.clearbit.com/shein.com" },
  { name: "AliExpress", logo: "https://logo.clearbit.com/aliexpress.com" },
  { name: "Temu", logo: "https://logo.clearbit.com/temu.com" },
  { name: "Nike", logo: "https://logo.clearbit.com/nike.com" }
];

export default function StoreLogos() {
  return (
    <section
      style={{
        padding: "60px 20px",
        background: "#ffffff"
      }}
    >
      <h2
        style={{
          textAlign: "center",
          fontSize: "32px",
          marginBottom: "40px"
        }}
      >
        أشهر المتاجر
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))",
          gap: "20px",
          maxWidth: "1100px",
          margin: "auto"
        }}
      >
        {stores.map((store) => (
          <div
            key={store.name}
            style={{
              background: "#fff",
              border: "1px solid #eee",
              borderRadius: "15px",
              padding: "20px",
              textAlign: "center",
              boxShadow: "0 4px 10px rgba(0,0,0,.05)"
            }}
          >
            <img
              src={store.logo}
              alt={store.name}
              style={{
                width: "70px",
                height: "70px",
                objectFit: "contain"
              }}
            />

            <h3>{store.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}
