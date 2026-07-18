export default function Contact() {
  return (
    <section
      style={{
        maxWidth: "700px",
        margin: "60px auto",
        padding: "30px",
        background: "#fff",
        borderRadius: "15px",
        boxShadow: "0 8px 20px rgba(0,0,0,.08)"
      }}
    >
      <h1>📞 اتصل بنا</h1>

      <p>يسعدنا استقبال استفساراتكم واقتراحاتكم.</p>

      <input
        type="text"
        placeholder="الاسم"
        style={{
          width: "100%",
          padding: "12px",
          margin: "10px 0"
        }}
      />

      <input
        type="email"
        placeholder="البريد الإلكتروني"
        style={{
          width: "100%",
          padding: "12px",
          margin: "10px 0"
        }}
      />

      <textarea
        rows="5"
        placeholder="اكتب رسالتك..."
        style={{
          width: "100%",
          padding: "12px",
          margin: "10px 0"
        }}
      />

      <button
        style={{
          background: "#2563eb",
          color: "#fff",
          border: "none",
          padding: "14px 30px",
          borderRadius: "10px",
          cursor: "pointer"
        }}
      >
        إرسال
      </button>
    </section>
  );
}
