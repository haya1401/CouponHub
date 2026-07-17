import { useState } from "react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function login(e) {
    e.preventDefault();

    alert("سيتم ربط تسجيل الدخول بـ Firebase في الخطوة التالية");
  }

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "80px auto",
        padding: "30px",
        background: "#fff",
        borderRadius: "15px",
        boxShadow: "0 8px 20px rgba(0,0,0,.08)"
      }}
    >
      <h2 style={{ textAlign: "center" }}>
        🔐 تسجيل دخول الإدارة
      </h2>

      <form onSubmit={login}>
        <input
          type="email"
          placeholder="البريد الإلكتروني"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "20px"
          }}
        />

        <input
          type="password"
          placeholder="كلمة المرور"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "15px"
          }}
        />

        <button
          style={{
            width: "100%",
            marginTop: "20px",
            padding: "14px",
            background: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: "10px"
          }}
        >
          تسجيل الدخول
        </button>
      </form>
    </div>
  );
}
