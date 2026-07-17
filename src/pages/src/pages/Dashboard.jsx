export default function Dashboard() {
  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "40px auto",
        padding: "20px"
      }}
    >
      <h1 style={{ textAlign: "center" }}>
        🎉 لوحة إدارة CouponHub
      </h1>

      <div
        style={{
          marginTop: "40px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
          gap: "20px"
        }}
      >
        <div
          style={{
            background: "#fff",
            padding: "25px",
            borderRadius: "15px",
            boxShadow: "0 8px 20px rgba(0,0,0,.08)"
          }}
        >
          <h2>🏷️ الكوبونات</h2>
          <p>إضافة وتعديل وحذف الكوبونات.</p>
        </div>

        <div
          style={{
            background: "#fff",
            padding: "25px",
            borderRadius: "15px",
            boxShadow: "0 8px 20px rgba(0,0,0,.08)"
          }}
        >
          <h2>🏪 المتاجر</h2>
          <p>إدارة جميع المتاجر.</p>
        </div>

        <div
          style={{
            background: "#fff",
            padding: "25px",
            borderRadius: "15px",
            boxShadow: "0 8px 20px rgba(0,0,0,.08)"
          }}
        >
          <h2>📊 الإحصائيات</h2>
          <p>عدد الكوبونات والمتاجر والزوار.</p>
        </div>
      </div>
    </div>
  );
}
