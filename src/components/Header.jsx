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
        <nav>
  <Link to="/">الرئيسية</Link>

  <Link to="/stores">المتاجر</Link>

  <Link to="/coupons">الكوبونات</Link>

  <Link to="/categories">التصنيفات</Link>

  <Link to="/contact">اتصل بنا</Link>
</nav>  
        
      </div>
    </header>
  );
}
