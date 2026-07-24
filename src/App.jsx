import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Hero from "./components/Hero";
import StoreLogos from "./components/StoreLogos";
import FeaturedCoupons from "./components/FeaturedCoupons";
import Categories from "./components/Categories";

import Stores from "./pages/Stores";
import Coupons from "./pages/Coupons";
import StoreCoupons from "./pages/StoreCoupons";

import AdminLogin from "./pages/AdminLogin";
import Dashboard from "./pages/Dashboard";


export default function App() {


  // CouponHub main application routes


  return (

    <div className="app">


      <Header />


      <Routes>


        {/* الرئيسية */}

        <Route

          path="/"

          element={

            <>

              <Hero />

              <FeaturedCoupons />

              <StoreLogos />

              <Categories />

            </>

          }

        />



        {/* المتاجر */}

        <Route

          path="/stores"

          element={<Stores />}

        />



        {/* جميع الكوبونات */}

        <Route

          path="/coupons"

          element={<Coupons />}

        />



        {/* كوبونات متجر محدد */}

        <Route

          path="/coupons/:store"

          element={<StoreCoupons />}

        />



        {/* صفحة المتجر القديمة */}

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
