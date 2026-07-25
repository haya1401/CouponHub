export async function authenticatePiUser() {
  if (typeof window === 'undefined' || !window.Pi) {
    throw new Error('Pi SDK غير متوفر أو لم يتم تحميله بعد');
  }

  // انتظار التهيئة الكاملة لـ Pi.init مع التعامل معها كـ Promise
  await window.Pi.init({ version: "2.0", sandbox: true });

  const scopes = ['username'];

  function onIncompletePaymentFound(payment) {
    console.warn('Incomplete payment found:', payment);
  }

  // تنفيذ عملية التسجيل عبر Pi SDK
  const authResult = await window.Pi.authenticate(scopes, onIncompletePaymentFound);

  // إرسال access token إلى الخادم للتحقق وإنشاء الجلسة
  const response = await fetch('/api/auth/pi', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ accessToken: authResult.accessToken })
  });

  if (!response.ok) {
    throw new Error('فشل التحقق من الجلسة في الخادم');
  }

  return await response.json();
}

