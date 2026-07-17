const coupons = [
  {
    store: "Amazon",
    code: "SAVE20",
    discount: "20% OFF"
  },
  {
    store: "Noon",
    code: "NOON50",
    discount: "50 SAR OFF"
  },
  {
    store: "SHEIN",
    code: "SHEIN25",
    discount: "25% OFF"
  }
];

function copyCode(code) {
  navigator.clipboard.writeText(code);
  alert(`تم نسخ الكود: ${code}`);
}

export default function FeaturedCoupons() {
  return (
    <section
      style={{
        padding: "70px 20px",
        background: "#f8fafc"
      }}
    >
      <h2
        style={{
          textAlign: "center",
          marginBottom: "40px",
          fontSize: "34px"
        }}
      >
        ⭐ أفضل الكوبونات
      </h2>

      <div
        style={{
          maxWidth: "1100px",
          margin: "auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
          gap: "25px"
        }}
      >
        {coupons.map((coupon) => (
          <div
            key={coupon.code}
            style={{
              background: "#fff",
              borderRadius: "16px",
              padding: "25px",
              boxShadow: "0 8px 20px rgba(0,0,0,.08)"
            }}
          >
            <h3>{coupon.store}</h3>

            <h1
              style={{
                color: "#2563eb",
                margin: "20px 0"
              }}
            >
              {coupon.discount}
            </h1>

            <div
              style={{
                background: "#eef2ff",
                padding: "12px",
                borderRadius: "10px",
                textAlign: "center",
                fontWeight: "bold",
                letterSpacing: "2px"
              }}
            >
              {coupon.code}
            </div>

            <button
              onClick={() => copyCode(coupon.code)}
              style={{
                width: "100%",
                marginTop: "18px",
                padding: "14px",
                border: "none",
                borderRadius: "10px",
                background: "#2563eb",
                color: "#fff",
                cursor: "pointer",
                fontSize: "16px"
              }}
            >
              📋 نسخ الكوبون
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
