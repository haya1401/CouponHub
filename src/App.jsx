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


function Home(){

  return (
    <>
      <Hero />
      <StoreLogos />
      <FeaturedCoupons />
      <Categories />
    </>
  );

}


export default function App(){

  return (

    <div className="app">

      <Header />

      <main>

        <Routes>

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/stores"
            element={<Stores />}
          />

          <Route
            path="/coupons"
            element={<Coupons />}
          />

          <Route
            path="/store/:id"
            element={<StoreCoupons />}
          />

        </Routes>

      </main>

      <Footer />

    </div>

  );

}
