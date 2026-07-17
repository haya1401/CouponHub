import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header
      style={{
        background: "#2563eb",
        color: "#fff",
        padding: "18px 0",
        boxShadow: "0 2px 10px rgba(0,0,0,.1)"
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <h2 style={{ fontWeight: "800" }}>
          CouponHub
        </h2>

        <nav
          style={{
            display: "flex",
            gap: "25px"
          }}
        >
          <Link to="/" style={{ color: "#fff", textDecoration: "none" }}>
            الرئيسية
          </Link>

          <Link to="/stores" style={{ color: "#fff", textDecoration: "none" }}>
            المتاجر
          </Link>

          <Link to="/coupons" style={{ color: "#fff", textDecoration: "none" }}>
            الكوبونات
          </Link>

          <Link to="/categories" style={{ color: "#fff", textDecoration: "none" }}>
            التصنيفات
          </Link>

          <Link to="/contact" style={{ color: "#fff", textDecoration: "none" }}>
            اتصل بنا
          </Link>
        </nav>
      </div>
    </header>
  );
}
