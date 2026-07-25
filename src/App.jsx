import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

// السلايدر المتحرك في الواجهة
import HeroSlider from "./components/HeroSlider";
import Categories from "./components/Categories";

import Stores from "./pages/Stores";
import Coupons from "./pages/Coupons";
import StoreCoupons from "./pages/StoreCoupons";

import AdminLogin from "./pages/AdminLogin";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <div className="app">
      <Header />

      <Routes>
        {/* الصفحة الرئيسية - تحتوي على السلايدر والمتاجر والتصنيفات */}
        <Route
          path="/"
          element={
            <>
              <HeroSlider />
              <Stores />
              <Categories />
            </>
          }
        />

        {/* صفحة جميع المتاجر */}
        <Route
          path="/stores"
          element={<Stores />}
        />

        {/* صفحة جميع الكوبونات */}
        <Route
          path="/coupons"
          element={<Coupons />}
        />

        {/* صفحة كوبونات متجر واحد */}
        <Route
          path="/store/:id"
          element={<StoreCoupons />}
        />

        {/* صفحة تسجيل دخول الأدمن */}
        <Route
          path="/admin"
          element={<AdminLogin />}
        />

        {/* لوحة التحكم */}
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />
      </Routes>

      <Footer />
    </div>
  );
}
