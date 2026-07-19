export default function Hero() {

  function scrollToCoupons() {

    const section = document.getElementById("featured-coupons");

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

  }

  return (
    <section
      style={{
        textAlign: "center",
        padding: "80px 20px",
        background: "#f8fafc",
      }}
    >
      <h1>أفضل الكوبونات والخصومات</h1>

      <p>
        وفر المال مع أحدث العروض من أشهر المتاجر.
      </p>

      <button
        onClick={scrollToCoupons}
        style={{
          padding: "12px 30px",
          background: "#2563eb",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        ابدأ الآن
      </button>
    </section>
  );
}
