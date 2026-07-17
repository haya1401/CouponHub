import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";

function Home() {
  return (
    <div
      style={{
        fontFamily: "Cairo, sans-serif",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f8fafc"
      }}
    >
      <div style={{ textAlign: "center" }}>
        <h1 style={{ fontSize: "42px", color: "#2563eb" }}>
          CouponHub
        </h1>

        <p style={{ fontSize: "20px", color: "#555" }}>
          مرحبًا بك في منصة الكوبونات والخصومات
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
          ابدأ الآن
        </button>
      </div>
    </div>
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
