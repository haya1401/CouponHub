import { Link } from "react-router-dom";

const stores = [
  {
    name: "Amazon",
    logo: "🛒",
    slug: "amazon",
  },
  {
    name: "Noon",
    logo: "🟡",
    slug: "noon",
  },
  {
    name: "SHEIN",
    logo: "👗",
    slug: "shein",
  },
  {
    name: "AliExpress",
    logo: "📦",
    slug: "aliexpress",
  },
];

export default function StoreLogos() {
  return (
    <section
      style={{
        padding: "70px 20px",
        background: "#ffffff",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          fontSize: "34px",
          marginBottom: "40px",
        }}
      >
        🏪 أشهر المتاجر
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
          gap: "25px",
          maxWidth: "1100px",
          margin: "auto",
        }}
      >
        {stores.map((store) => (
          <div
            key={store.slug}
            style={{
              background: "#fff",
              borderRadius: "18px",
              padding: "30px",
              textAlign: "center",
              boxShadow: "0 8px 20px rgba(0,0,0,.08)",
              transition: ".3s",
            }}
          >
            <div
              style={{
                fontSize: "55px",
                marginBottom: "15px",
              }}
            >
              {store.logo}
            </div>

            <h3
              style={{
                marginBottom: "20px",
                fontSize: "22px",
              }}
            >
              {store.name}
            </h3>

            <Link
              to="/stores"
              style={{
                display: "inline-block",
                background: "#2563eb",
                color: "#fff",
                padding: "12px 24px",
                borderRadius: "10px",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              عرض الكوبونات
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
