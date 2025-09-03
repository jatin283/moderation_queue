import React from "react";
import "./Tabs.css";

export default function Tabs({ active, onChange, counts }) {
  const tabs = ["pending", "approved", "rejected"];
  return (
    <div className="tabs">
      {tabs.map((t) => (
        <button
          key={t}
          className={active === t ? "tab active" : "tab"}
          onClick={() => onChange(t)}
        >
          {t[0].toUpperCase() + t.slice(1)} ({counts[t] || 0})
        </button>
      ))}
    </div>
  );
}
