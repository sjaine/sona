"use client";
import { useState } from "react";
import Mascot from "../ui/Mascot";
import LevelBadge from "../ui/LevelBadge";
import Avatar from "../ui/Avatar";
import { CURRENT_USER, TEAM_MEMBERS } from "@/lib/data";

type ProfileView = "main" | "edit" | "bio";

export default function ProfileScreen({ onBack }: { onBack: () => void }) {
  const [view, setView] = useState<ProfileView>("main");
  const [user, setUser] = useState(CURRENT_USER);
  const [editForm, setEditForm] = useState({
    name: user.name,
    birthday: "March 19, 2003",
    role: user.role,
    team: user.team,
    bio: user.bio,
    openToMentorship: user.openToMentorship,
  });

  if (view === "edit") {
    return (
      <div className="flex flex-col h-full">
        <div
          className="flex items-center gap-3 px-4 pt-4 pb-3 flex-shrink-0"
          style={{ borderBottom: "1px solid var(--border)" }}
        >
          <button onClick={() => setView("main")} className="text-lg pressable">
            ←
          </button>
          <span
            className="text-base font-bold"
            style={{ color: "var(--text-primary)" }}
          >
            Edit profile
          </span>
        </div>
        <div className="flex-1 overflow-y-auto scrollbar-hide px-4 py-4">
          {/* Mascot with edit overlay */}
          <div className="flex justify-center mb-5 relative">
            <div className="relative">
              <Mascot size={80} />
              <div
                className="absolute bottom-0 right-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                style={{
                  background: "var(--surface-2)",
                  border: "1.5px solid var(--border)",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                >
                  <g fill="none" fill-rule="evenodd">
                    <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
                    <path
                      fill="#8A8A8A"
                      d="M20.131 3.16a3 3 0 0 0-4.242 0l-.707.708l4.95 4.95l.706-.707a3 3 0 0 0 0-4.243l-.707-.707Zm-1.414 7.072l-4.95-4.95l-9.09 9.091a1.5 1.5 0 0 0-.401.724l-1.029 4.455a1 1 0 0 0 1.2 1.2l4.456-1.028a1.5 1.5 0 0 0 .723-.401z"
                    />
                  </g>
                </svg>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label
                className="text-xs font-bold uppercase tracking-wider mb-1.5 block"
                style={{ color: "var(--text-tertiary)" }}
              >
                Name
              </label>
              <input
                className="field"
                value={editForm.name}
                onChange={(e) =>
                  setEditForm((f) => ({ ...f, name: e.target.value }))
                }
                placeholder="Jasmine K."
              />
            </div>
            <div>
              <label
                className="text-xs font-bold uppercase tracking-wider mb-1.5 block"
                style={{ color: "var(--text-tertiary)" }}
              >
                Birthday
              </label>
              <input
                className="field"
                value={editForm.birthday}
                onChange={(e) =>
                  setEditForm((f) => ({ ...f, birthday: e.target.value }))
                }
              />
            </div>
            <div>
              <label
                className="text-xs font-bold uppercase tracking-wider mb-1.5 block"
                style={{ color: "var(--text-tertiary)" }}
              >
                Role
              </label>
              <div className="flex gap-2">
                <input
                  className="field flex-1"
                  value={editForm.role}
                  onChange={(e) =>
                    setEditForm((f) => ({ ...f, role: e.target.value }))
                  }
                  placeholder="IT Administrator"
                />
                <div className="relative flex-1">
                  <select
                    className="field appearance-none w-full"
                    value={editForm.team}
                    onChange={(e) =>
                      setEditForm((f) => ({ ...f, team: e.target.value }))
                    }
                  >
                    {[
                      "IT Team",
                      "Design Team",
                      "Product Team",
                      "Engineering",
                      "HR",
                    ].map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                  <span
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs"
                    style={{
                      color: "var(--text-tertiary)",
                      pointerEvents: "none",
                    }}
                  >
                    ⌄
                  </span>
                </div>
              </div>
            </div>
            <div>
              <label
                className="text-xs font-bold uppercase tracking-wider mb-1.5 block"
                style={{ color: "var(--text-tertiary)" }}
              >
                Bio
              </label>
              <textarea
                className="field resize-none"
                rows={4}
                value={editForm.bio}
                onChange={(e) =>
                  setEditForm((f) => ({ ...f, bio: e.target.value }))
                }
              />
            </div>

            <div
              className="flex items-center justify-between py-3"
              style={{
                borderTop: "1px solid var(--border)",
                borderBottom: "1px solid var(--border)",
              }}
            >
              <span
                className="text-sm font-medium"
                style={{ color: "var(--text-primary)" }}
              >
                Open to mentorship?
              </span>
              <button
                onClick={() =>
                  setEditForm((f) => ({
                    ...f,
                    openToMentorship: !f.openToMentorship,
                  }))
                }
                className="relative pressable"
                style={{ width: 48, height: 28 }}
              >
                <div
                  className="absolute inset-0 rounded-full transition-colors"
                  style={{
                    background: editForm.openToMentorship
                      ? "var(--accent)"
                      : "var(--border)",
                  }}
                />
                <div
                  className="absolute top-1 w-5 h-5 rounded-full bg-white shadow transition-all"
                  style={{ left: editForm.openToMentorship ? 24 : 3 }}
                />
              </button>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span
                  className="text-xs font-bold uppercase tracking-wider"
                  style={{ color: "var(--text-tertiary)" }}
                >
                  Interests
                </span>
                <button
                  className="text-lg leading-none"
                  style={{ color: "var(--text-secondary)" }}
                >
                  +
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {user.interests.map((i) => (
                  <span key={i} className="chip">
                    🎮 {i}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 pb-5 pt-2 flex-shrink-0">
          <button
            onClick={() => {
              setUser((u) => ({
                ...u,
                name: editForm.name,
                role: editForm.role,
                team: editForm.team,
                bio: editForm.bio,
                openToMentorship: editForm.openToMentorship,
              }));
              setView("main");
            }}
            className="w-full py-3.5 rounded-2xl text-sm font-bold text-white pressable"
            style={{ background: "var(--text-primary)" }}
          >
            SAVE CHANGES
          </button>
        </div>
      </div>
    );
  }

  if (view === "bio") {
    return (
      <div className="flex flex-col h-full overflow-y-auto scrollbar-hide">
        <button
          onClick={() => setView("main")}
          className="absolute top-4 left-4 z-10 w-8 h-8 rounded-full flex items-center justify-center pressable"
          style={{ background: "var(--surface-2)" }}
        >
          ←
        </button>
        {/* Hero */}
        <div
          className="relative h-44 flex-shrink-0"
          style={{ background: "var(--surface-2)" }}
        >
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
            <div className="relative">
              <div
                className="w-16 h-16 rounded-full"
                style={{
                  background: "var(--border)",
                  border: "3px solid white",
                }}
              />
              <Mascot
                size={40}
                className="absolute -top-8 left-1/2 -translate-x-1/2"
              />
            </div>
          </div>
        </div>

        <div className="px-5 pt-12 pb-5">
          <div className="flex items-center gap-2 mb-1">
            <span
              className="text-lg font-bold"
              style={{ color: "var(--text-primary)" }}
            >
              {user.name}
            </span>
            <LevelBadge level={user.level} size={22} />
          </div>
          <div
            className="text-sm mb-3"
            style={{ color: "var(--text-secondary)" }}
          >
            {user.role} on {user.team}
          </div>
          <p
            className="text-sm leading-relaxed mb-5"
            style={{ color: "var(--text-primary)" }}
          >
            {user.bio}
          </p>
          <div>
            <div
              className="text-xs font-bold uppercase tracking-wider mb-2"
              style={{ color: "var(--text-tertiary)" }}
            >
              Interests
            </div>
            <div className="flex flex-wrap gap-2">
              {user.interests.map((i) => (
                <span key={i} className="chip">
                  🎮 {i}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main profile view
  return (
    <div className="flex flex-col h-full overflow-y-auto scrollbar-hide">
      <div className="flex items-center justify-between px-4 pt-4 pb-2 flex-shrink-0">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-sm font-semibold pressable"
          style={{ color: "var(--accent)" }}
        >
          ← Back
        </button>
      </div>
      <div className="flex flex-col items-center px-4 pt-4 pb-4">
        <div className="relative w-full mb-4">
          {/* Gray background card */}
          <div
            className="w-full rounded-2xl"
            style={{ height: 160, background: "var(--border-strong)" }}
          />
          {/* Mascot overlapping bottom-left */}
          <div
            className="absolute -bottom-6 left-4 flex items-center justify-center rounded-full border-4 border-white"
            style={{
              width: 64,
              height: 64,
              background: "#C8E0F0",
            }}
          >
            <span
              className="text-sm font-bold"
              style={{ color: "var(--text-secondary)" }}
            >
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </span>
          </div>
        </div>
      </div>

      {/* Info section */}
      <div
        className="mx-4 rounded-2xl overflow-hidden mb-3"
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
        }}
      >
        <div
          className="px-4 py-3"
          style={{ borderBottom: "1px solid var(--border)" }}
        >
          <div
            className="text-xs font-bold uppercase tracking-wider mb-2"
            style={{ color: "var(--text-tertiary)" }}
          >
            About
          </div>
          <p
            className="text-sm leading-relaxed line-clamp-3"
            style={{ color: "var(--text-primary)" }}
          >
            {user.bio}
          </p>
        </div>
        <div className="px-4 py-3">
          <div
            className="text-xs font-bold uppercase tracking-wider mb-2"
            style={{ color: "var(--text-tertiary)" }}
          >
            Interests
          </div>
          <div className="flex flex-wrap gap-1.5">
            {user.interests.map((i) => (
              <span key={i} className="chip">
                🎮 {i}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="px-4 space-y-2 pb-4">
        <button
          onClick={() => setView("edit")}
          className="w-full py-3 rounded-2xl text-sm font-semibold pressable flex items-center justify-center gap-2"
          style={{
            background: "var(--surface)",
            border: "1.5px solid var(--border)",
            color: "var(--text-primary)",
          }}
        >
          ✏️ Edit Profile
        </button>
        <button
          className="w-full py-3 rounded-2xl text-sm font-semibold pressable flex items-center justify-center gap-2"
          style={{
            background: "var(--surface)",
            border: "1.5px solid var(--border)",
            color: "var(--text-primary)",
          }}
        >
          ⚙️ Account Settings
        </button>
      </div>
    </div>
  );
}
