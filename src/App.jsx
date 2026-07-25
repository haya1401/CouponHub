import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

// المكونات الرئيسية للواجهة
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
        {/* الصفحة الرئيسية تحتوي على السلايدر، المتاجر بشعاراتها، والتصنيفات */}
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

        <Route path="/stores" element={<Stores />} />
        <Route path="/coupons" element={<Coupons />} />
        <Route path="/store/:id" element={<StoreCoupons />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>

      <Footer />
    </div>
  );
}
