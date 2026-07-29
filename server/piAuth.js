// src/services/piAuth.js

export async function authenticatePiUser() {
  if (!window.Pi) {
    throw new Error("Pi SDK غير محمل.");
  }

  // تهيئة Pi SDK (يمكن استدعاؤها أكثر من مرة بدون مشكلة)
  window.Pi.init({
    version: "2.0",
    sandbox: false // غيّرها إلى true إذا كنت تستخدم Testnet
  });

  const scopes = ["username"];

  const auth = await window.Pi.authenticate(
    scopes,
    () => {
      // لا يوجد تعامل مع المدفوعات حالياً
    }
  );

  return auth;
}
