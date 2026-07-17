import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";

function Home() {
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
            أفضل موقع للحصول على أحدث الكوبونات والخصومات.
          </p>

          <button
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
            استعرض الكوبونات
          </button>
        </div>
      </div>
    </>
  );
}
            

function NotFound() {
  return (
    <h2 style={{ textAlign: "center", marginTop: "100px" }}>
      404 - الصفحة غير موجودة
    </h2>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
