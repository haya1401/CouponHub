import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Hero from "./components/Hero";

import Stores from "./pages/Stores";
import Coupons from "./pages/Coupons";
import StoreCoupons from "./pages/StoreCoupons";


export default function App(){

return (

<div className="app">

<Header />

<Routes>

<Route
path="/"
element={
<>
<Hero />
</>
}
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


<Footer />

</div>

);

}
