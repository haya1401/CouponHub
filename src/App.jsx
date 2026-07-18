import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Hero from "./components/Hero";
import StoreLogos from "./components/StoreLogos";
import FeaturedCoupons from "./components/FeaturedCoupons";
import Categories from "./components/Categories";
import Coupons from "./pages/Coupons";
import CategoriesPage from "./pages/Categories";
import Contact from "./pages/Contact";
import Stores from "./pages/Stores";
import AdminLogin from "./pages/AdminLogin";
import Dashboard from "./pages/Dashboard";

function Home() {
  return (
    <>
      <Hero />
      
      
      <Categories />
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
  <Route path="/coupons" element={<Coupons />} />
  <Route path="/categories" element={<CategoriesPage />} />
  <Route path="/contact" element={<Contact />} />
  <Route path="/admin" element={<AdminLogin />} />
  <Route path="/dashboard" element={<Dashboard />} />
</Routes>
  
    
    </>
  );
}
