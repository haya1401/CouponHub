import { useState } from "react";

import Tabs from "../components/dashboard/Tabs";
import CouponManager from "../components/dashboard/CouponManager";
import StoreManager from "../components/dashboard/StoreManager";
import CategoryManager from "../components/dashboard/CategoryManager";
import Stats from "../components/dashboard/Stats";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("coupons");

  return (
    <div
      style={{
        maxWidth: "1000px",
        margin: "40px auto",
        padding: "20px",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "30px",
        }}
      >
        🎉 لوحة إدارة CouponHub
      </h1>

      <Tabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {activeTab === "coupons" && <CouponManager />}

      {activeTab === "stores" && <StoreManager />}

      {activeTab === "categories" && <CategoryManager />}

      {activeTab === "stats" && <Stats />}
    </div>
  );
}
