"use client";
import { useState } from "react";
import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import CommunityScreen from "./screens/CommunityScreen";
import QuestsScreen from "./screens/QuestsScreen";
import CalendarScreen from "./screens/CalendarScreen";
import { Tab } from "@/lib/data";

const NAV = [
  {
    id: "home" as Tab,
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path
          d="M3 9L11 3L19 9V19H14V14H8V19H3V9Z"
          fill={active ? "var(--text-primary)" : "none"}
          stroke={active ? "var(--text-primary)" : "var(--text-tertiary)"}
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
    ),
    label: "Home",
  },
  {
    id: "community" as Tab,
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path
          d="M11 3C6.582 3 3 6.134 3 10C3 12.387 4.332 14.49 6.5 15.75V19L9.5 17C10 17.083 10.496 17.083 11 17C15.418 17 19 13.866 19 10C19 6.134 15.418 3 11 3Z"
          fill={active ? "var(--text-primary)" : "none"}
          stroke={active ? "var(--text-primary)" : "var(--text-tertiary)"}
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
    ),
    label: "Community",
  },
  {
    id: "quests" as Tab,
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path
          d="M11 3L13.5 8.5H19L14.5 12L16.5 17.5L11 14L5.5 17.5L7.5 12L3 8.5H8.5L11 3Z"
          fill={active ? "var(--text-primary)" : "none"}
          stroke={active ? "var(--text-primary)" : "var(--text-tertiary)"}
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
    ),
    label: "Quests",
  },
  {
    id: "calendar" as Tab,
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect
          x="3"
          y="5"
          width="16"
          height="15"
          rx="2"
          fill={active ? "var(--text-primary)" : "none"}
          stroke={active ? "var(--text-primary)" : "var(--text-tertiary)"}
          strokeWidth="1.8"
        />
        <path
          d="M7 3V7M15 3V7M3 10H19"
          stroke={active ? "white" : "var(--text-tertiary)"}
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    ),
    label: "Calendar",
  },
];

export default function PhoneShell() {
  const [activeTab, setActiveTab] = useState<Tab>("home");

  return (
    <div
      style={{
        width: 375,
        height: 812,
        background: "var(--bg)",
        borderRadius: 44,
        overflow: "hidden",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        boxShadow:
          "0 30px 80px rgba(0,0,0,0.25), 0 0 0 1px rgba(0,0,0,0.08), inset 0 0 0 1px rgba(255,255,255,0.1)",
      }}
    >
      {/* Status bar */}
      <div
        style={{
          height: 44,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 20px",
          flexShrink: 0,
        }}
      >
        <span
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: "var(--text-primary)",
          }}
        >
          9:41
        </span>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <svg width="16" height="11" viewBox="0 0 16 11">
            <rect
              x="0"
              y="3"
              width="3"
              height="8"
              rx="1"
              fill="var(--text-primary)"
            />
            <rect
              x="4.5"
              y="2"
              width="3"
              height="9"
              rx="1"
              fill="var(--text-primary)"
            />
            <rect
              x="9"
              y="0"
              width="3"
              height="11"
              rx="1"
              fill="var(--text-primary)"
            />
            <rect
              x="13.5"
              y="0"
              width="2.5"
              height="11"
              rx="1"
              fill="var(--border)"
            />
          </svg>
          <svg width="14" height="11" viewBox="0 0 14 11">
            <path
              d="M7 2C9.5 2 11.7 3.1 13.2 4.8L14 4C12.3 2.1 9.8 1 7 1C4.2 1 1.7 2.1 0 4L0.8 4.8C2.3 3.1 4.5 2 7 2Z"
              fill="var(--text-primary)"
            />
            <path
              d="M7 5C8.5 5 9.8 5.6 10.8 6.6L11.6 5.8C10.3 4.7 8.8 4 7 4C5.2 4 3.7 4.7 2.4 5.8L3.2 6.6C4.2 5.6 5.5 5 7 5Z"
              fill="var(--text-primary)"
            />
            <circle cx="7" cy="9" r="1.5" fill="var(--text-primary)" />
          </svg>
          <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
            <div
              style={{
                width: 22,
                height: 11,
                border: "1.5px solid var(--text-primary)",
                borderRadius: 3,
                padding: "1.5px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: "80%",
                  height: "100%",
                  background: "var(--text-primary)",
                  borderRadius: 1.5,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Screens */}
      <div style={{ flex: 1, overflow: "hidden", position: "relative" }}>
        {NAV.map((item) => (
          <div
            key={item.id}
            style={{
              display: activeTab === item.id ? "flex" : "none",
              flexDirection: "column",
              height: "100%",
              position: "absolute",
              inset: 0,
            }}
          >
            {item.id === "home" && (
              <HomeScreen onTabChange={(t) => setActiveTab(t as Tab)} />
            )}
            {item.id === "community" && <CommunityScreen />}
            {item.id === "quests" && <QuestsScreen />}
            {item.id === "calendar" && <CalendarScreen />}
          </div>
        ))}

        {/* Profile — outside NAV loop, no nav tab */}
        <div
          style={{
            display: activeTab === "profile" ? "flex" : "none",
            flexDirection: "column",
            height: "100%",
            position: "absolute",
            inset: 0,
          }}
        >
          <ProfileScreen onBack={() => setActiveTab("home")} />
        </div>
      </div>

      {/* Bottom nav */}
      <div
        style={{
          height: 72,
          background: "var(--surface)",
          borderTop: "1px solid var(--border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          flexShrink: 0,
          padding: "0 4px",
        }}
      >
        {NAV.map((item) => {
          const active = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className="pressable"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 3,
                padding: "8px 10px",
                borderRadius: 16,
                background: active ? "var(--surface-2)" : "transparent",
              }}
            >
              {item.icon(active)}
              <span
                style={{
                  fontSize: 9,
                  fontWeight: 600,
                  color: active
                    ? "var(--text-primary)"
                    : "var(--text-tertiary)",
                  letterSpacing: "0.01em",
                }}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
