import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <>
      <Header />

      <div
        style={{
          fontFamily: "Cairo, sans-serif",
          minHeight: "calc(100vh - 80px)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#f8fafc"
        }}
      >
        <div style={{ textAlign: "center" }}>
          <h1 style={{ fontSize: "48px", color: "#2563eb" }}>
            CouponHub
          </h1>

          <p
            style={{
              marginTop: "15px",
              fontSize: "20px",
              color: "#666"
            }}
          >
            مرحبًا بك في منصة الكوبونات والخصومات
          </p>

          <button
            onClick={() => navigate("/coupons")}
            style={{
              marginTop: "25px",
              padding: "14px 35px",
              background: "#2563eb",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "18px"
            }}
          >
            ابدأ الآن
          </button>
        </div>
      </div>
    </>
  );
}
