import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Hero from "./components/Hero";
import StoreLogos from "./components/StoreLogos";
import FeaturedCoupons from "./components/FeaturedCoupons";

import Stores from "./pages/Stores";

function Home() {
  return (
    <>
      <Hero />
      <FeaturedCoupons />
      <StoreLogos />
    </>
  );
}

export default function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stores" element={<Stores />} />
      </Routes>
    </>
  );
}
