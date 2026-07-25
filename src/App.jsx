import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

// استبدال المكون القديم بالسلايدر المتحرك الجديد
import HeroSlider from "./components/HeroSlider";
import StoreLogos from "./components/StoreLogos";
import FeaturedCoupons from "./components/FeaturedCoupons";
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
        {/* الصفحة الرئيسية */}
        <Route
          path="/"
          element={
            <>
              {/* السلايدر المتحرك في الواجهة */}
              <HeroSlider />

              <FeaturedCoupons />

              <StoreLogos />

              <Categories />
            </>
          }
        />

        {/* صفحة جميع المتاجر */}
        <Route
          path="/stores"
          element={<Stores />}
        />

        {/* جميع الكوبونات */}
        <Route
          path="/coupons"
          element={<Coupons />}
        />

        {/* كوبونات متجر واحد */}
        <Route
          path="/store/:id"
          element={<StoreCoupons />}
        />

        {/* الإدارة */}
        <Route
          path="/admin"
          element={<AdminLogin />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />
      </Routes>

      <Footer />
    </div>
  );
}
