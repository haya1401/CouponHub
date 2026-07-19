const tabs = [
  {
    id: "coupons",
    title: "🏷️ الكوبونات",
  },
  {
    id: "stores",
    title: "🏪 المتاجر",
  },
  {
    id: "categories",
    title: "📂 التصنيفات",
  },
  {
    id: "stats",
    title: "📈 الإحصائيات",
  },
];

export default function Tabs({
  activeTab,
  setActiveTab,
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: "15px",
        flexWrap: "wrap",
        marginBottom: "35px",
      }}
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          style={{
            padding: "12px 22px",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: "bold",
            transition: ".3s",
            background:
              activeTab === tab.id
                ? "#2563eb"
                : "#e5e7eb",
            color:
              activeTab === tab.id
                ? "#fff"
                : "#111827",
          }}
        >
          {tab.title}
        </button>
      ))}
    </div>
  );
}
