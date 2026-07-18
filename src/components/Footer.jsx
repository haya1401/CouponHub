export default function Footer() {
  return (
    <footer
      style={{
        background: "#0f172a",
        color: "#fff",
        padding: "50px 20px",
        marginTop: "80px",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
          gap: "30px",
        }}
      >
        <div>
          <h2>CouponHub</h2>
          <p>
            أفضل منصة للحصول على أحدث كوبونات الخصم والعروض الحصرية من أشهر
            المتاجر.
          </p>
        </div>

        <div>
          <h3>روابط</h3>
          <p>الرئيسية</p>
          <p>المتاجر</p>
          <p>الكوبونات</p>
          <p>التصنيفات</p>
        </div>

        <div>
          <h3>الدعم</h3>
          <p>اتصل بنا</p>
          <p>سياسة الخصوصية</p>
          <p>الشروط والأحكام</p>
        </div>
      </div>

      <hr
        style={{
          margin: "35px 0",
          borderColor: "#334155",
        }}
      />

      <p
        style={{
          textAlign: "center",
          color: "#94a3b8",
        }}
      >
        © 2026 CouponHub. All Rights Reserved.
      </p>
    </footer>
  );
}
