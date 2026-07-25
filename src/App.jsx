import React, { useEffect, useState } from 'react';
import { authenticatePiUser } from './services/piAuth';

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePiAuth = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await authenticatePiUser();
      setUser(data.user);
    } catch (err) {
      console.error(err);
      setError('فشل تسجيل الدخول عبر Pi Network');
    } finally {
      setLoading(false);
    }
  };

  // تشغيل المصادقة تلقائياً عند تحميل التطبيق
  useEffect(() => {
    handlePiAuth();
  }, []);

  return (
    <div className="app-container min-h-screen bg-gray-50 text-gray-800">
      <header className="flex justify-between items-center p-4 bg-white shadow-md">
        <h1 className="text-2xl font-bold text-blue-600">CouponHub</h1>
        
        <div className="auth-section">
          {user ? (
            <div className="flex items-center gap-2">
              <span className="font-semibold">أهلاً، {user.username}</span>
            </div>
          ) : (
            <button 
              onClick={handlePiAuth} 
              disabled={loading}
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition duration-200 disabled:opacity-50"
            >
              {loading ? 'جاري الاتصال بـ Pi...' : 'تسجيل الدخول بواسطة Pi'}
            </button>
          )}
        </div>
      </header>

      {error && (
        <div className="p-4 text-center text-red-600 bg-red-100 mt-4 rounded mx-auto max-w-md">
          {error}
        </div>
      )}

      <main className="p-6">
        <h2 className="text-xl font-semibold mb-4 text-center">أحدث كوبونات الخصم والعروض</h2>
      </main>
    </div>
  );
}
