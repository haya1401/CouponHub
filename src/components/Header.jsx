import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header
      style={{
        background: "#ffffff",
        color: "#111827",
        padding: "18px 0",
        boxShadow: "0 2px 10px rgba(0,0,0,.08)",
        position: "relative",
        zIndex: 20
      }}
    >

      <div
        className="container"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "15px"
        }}
      >

        <h2
          style={{
            fontWeight: "800",
            color: "#2563eb",
            margin: 0
          }}
        >
          CouponHub
        </h2>


        <nav
          style={{
            display: "flex",
            gap: "25px",
            flexWrap: "wrap"
          }}
        >

          <Link to="/" style={linkStyle}>
            الرئيسية
          </Link>

          <Link to="/stores" style={linkStyle}>
            المتاجر
          </Link>

          <Link to="/coupons" style={linkStyle}>
            الكوبونات
          </Link>

          <Link to="/categories" style={linkStyle}>
            التصنيفات
          </Link>

          <Link to="/contact" style={linkStyle}>
            اتصل بنا
          </Link>

        </nav>

      </div>

    </header>
  );
}


const linkStyle = {

  color:"#374151",

  textDecoration:"none",

  fontWeight:"600",

  transition:"0.3s"

};
