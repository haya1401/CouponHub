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

  return (

    <div className="app">


      <Routes>


        {/* صفحات الموقع */}

        <Route
          path="/"
          element={
            <>
              <Header />

              <Hero />

              <StoreLogos />

              <FeaturedCoupons />

              <Categories />

              <Footer />
            </>
          }
        />


        <Route
          path="/stores"
          element={
            <>
              <Header />
              <Stores />
              <Footer />
            </>
          }
        />


        <Route
          path="/coupons"
          element={
            <>
              <Header />
              <Coupons />
              <Footer />
            </>
          }
        />


        <Route
          path="/store/:id"
          element={
            <>
              <Header />
              <StoreCoupons />
              <Footer />
            </>
          }
        />


        {/* لوحة الإدارة */}

        <Route
          path="/admin"
          element={
            <AdminLogin />
          }
        />


        <Route
          path="/dashboard"
          element={
            <Dashboard />
          }
        />


      </Routes>


    </div>

  );

}
