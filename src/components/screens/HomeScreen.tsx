"use client";
import { useState, useRef } from "react";
import Mascot from "../ui/Mascot";
import LevelBadge from "../ui/LevelBadge";
import Avatar from "../ui/Avatar";
import {
  CURRENT_USER,
  TEAM_MEMBERS,
  QUESTS,
  FEED_POSTS,
  DAILY_PROMPT,
} from "@/lib/data";

const STATUS_COLORS: Record<string, string> = {
  Focused: "#E8784A",
  Available: "#3DAA6B",
  "In a meeting": "#5B4FE8",
  Away: "#A09A92",
};

const STATUSES = ["Focused", "Available", "In a meeting", "Away"];

interface Props {
  onTabChange: (t: string) => void;
}

function useDragScroll(ref: React.RefObject<HTMLDivElement>) {
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);
  const velocity = useRef(0);
  const lastX = useRef(0);
  const lastTime = useRef(0);
  const rafId = useRef<number>(0);

  function cancelMomentum() {
    if (rafId.current) cancelAnimationFrame(rafId.current);
  }

  function applyMomentum() {
    if (!ref.current) return;
    velocity.current *= 0.92; // friction — lower = stops faster, higher = glides longer
    if (Math.abs(velocity.current) < 0.5) return;
    ref.current.scrollLeft += velocity.current;
    rafId.current = requestAnimationFrame(applyMomentum);
  }

  function onMouseDown(e: React.MouseEvent) {
    if (!ref.current) return;
    cancelMomentum();
    isDragging.current = true;
    startX.current = e.clientX;
    scrollLeftStart.current = ref.current.scrollLeft;
    lastX.current = e.clientX;
    lastTime.current = performance.now();
    velocity.current = 0;
    ref.current.style.cursor = "grabbing";
    ref.current.style.userSelect = "none";
    // disable snap while dragging so it doesn't fight the movement
    ref.current.style.scrollSnapType = "none";
  }

  function onMouseMove(e: React.MouseEvent) {
    if (!isDragging.current || !ref.current) return;
    const dx = e.clientX - startX.current;
    ref.current.scrollLeft = scrollLeftStart.current - dx;

    // track velocity
    const now = performance.now();
    const dt = now - lastTime.current;
    if (dt > 0) {
      velocity.current = ((lastX.current - e.clientX) / dt) * 16; // normalise to ~60fps
    }
    lastX.current = e.clientX;
    lastTime.current = now;
  }

  function onMouseUp() {
    if (!ref.current) return;
    isDragging.current = false;
    ref.current.style.cursor = "grab";
    ref.current.style.userSelect = "";
    // re-enable snap after momentum settles
    rafId.current = requestAnimationFrame(applyMomentum);
    setTimeout(() => {
      if (ref.current) ref.current.style.scrollSnapType = "x mandatory";
    }, 400);
  }

  return { onMouseDown, onMouseMove, onMouseUp, onMouseLeave: onMouseUp };
}

function CarouselSection({
  onTabChange,
  onOpenPrompt,
}: {
  onTabChange: (t: string) => void;
  onOpenPrompt: () => void;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const dragHandlers = useDragScroll(scrollRef);

  const questsPreview = QUESTS.filter((q) => q.status !== "locked").slice(0, 3);

  function handleScroll() {
    if (!scrollRef.current) return;
    const { scrollLeft, offsetWidth } = scrollRef.current;
    const cardWidth = offsetWidth * 0.82 + 12;
    setActiveIndex(Math.round(scrollLeft / cardWidth));
  }

  return (
    <div>
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        {...dragHandlers}
        className="flex gap-3 overflow-x-auto scrollbar-hide"
        style={{
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
          paddingBottom: 4,
          overflowY: "visible",
          cursor: "grab",
        }}
      >
        {/* Card 1 — Quests */}
        <div
          className="flex-shrink-0"
          style={{
            width: "82%",
            maxWidth: 300,
            scrollSnapAlign: "start",
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: 20,
            padding: "18px",
          }}
        >
          <div className="flex justify-between">
            <div
              className="text-xs font-bold uppercase tracking-wider mb-3"
              style={{ color: "var(--text-tertiary)" }}
            >
              Quests
            </div>
            <button
              onClick={() => onTabChange("quests")}
              className="text-[10px] font-semibold pressable mb-3"
              style={{ color: "var(--accent)" }}
            >
              See all ↗
            </button>
          </div>
          <div className="space-y-2">
            {questsPreview.map((q) => (
              <div key={q.id} className="flex items-center gap-3">
                <div
                  className="flex-shrink-0 flex items-center justify-center rounded-xl text-sm"
                  style={{
                    width: 36,
                    height: 36,
                    background:
                      q.status === "done"
                        ? "var(--surface-2)"
                        : "var(--accent-light)",
                  }}
                >
                  {q.status === "done" ? "✓" : q.icon}
                </div>
                <span
                  className="text-xs leading-snug"
                  style={{
                    color:
                      q.status === "done"
                        ? "var(--text-tertiary)"
                        : "var(--text-primary)",
                    textDecoration:
                      q.status === "done" ? "line-through" : "none",
                  }}
                >
                  {q.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Card 2 — Daily Activity */}
        <div
          className="flex-shrink-0"
          style={{
            width: "82%",
            maxWidth: 300,
            scrollSnapAlign: "start",
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: 20,
            padding: "18px",
          }}
        >
          <div className="flex justify-between">
            <div
              className="text-xs font-bold uppercase tracking-wider mb-3"
              style={{ color: "var(--text-tertiary)" }}
            >
              Daily Activity
            </div>
            <button
              onClick={() => onOpenPrompt()}
              className="text-[10px] font-semibold pressable mb-3"
              style={{ color: "var(--accent)" }}
            >
              See all ↗
            </button>
          </div>
          <div className="flex items-start gap-3">
            <div
              className="flex-shrink-0 flex items-center justify-center rounded-xl text-base"
              style={{
                width: 36,
                height: 36,
                background: "var(--accent-light)",
              }}
            >
              💬
            </div>
            <div className="flex-1 min-w-0">
              <p
                className="text-sm font-bold leading-snug mb-2"
                style={{ color: "var(--text-primary)" }}
              >
                {DAILY_PROMPT.question}
              </p>
              <p className="text-xs" style={{ color: "var(--text-tertiary)" }}>
                Bob and {DAILY_PROMPT.completedBy - 1} other people joined
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-1.5 mt-3">
        {[0, 1].map((i) => (
          <div
            key={i}
            style={{
              width: activeIndex === i ? 16 : 6,
              height: 6,
              borderRadius: 99,
              background:
                activeIndex === i ? "var(--text-primary)" : "var(--border)",
              transition: "width 0.2s ease, background 0.2s ease",
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default function HomeScreen({ onTabChange }: Props) {
  const [status, setStatus] = useState(CURRENT_USER.status);
  const [showStatusPicker, setShowStatusPicker] = useState(false);
  const [showDailyPrompt, setShowDailyPrompt] = useState(false);
  const [promptAnswer, setPromptAnswer] = useState("");
  const [promptSubmitted, setPromptSubmitted] = useState(false);

  const questsPreview = QUESTS.filter((q) => q.status !== "locked").slice(0, 3);
  const latestPost = FEED_POSTS[0];

  return (
    <div className="relative flex flex-col h-full overflow-hidden">
      <div className="flex-1 overflow-y-auto scrollbar-hide pb-2">
        {/* Top bar */}
        <div className="flex items-center justify-between px-4 pt-2">
          <button
            onClick={() => onTabChange("profile")}
            className="w-9 h-9 rounded-full pressable flex items-center justify-center"
            style={{
              background: "#C8E0F0",
              border: "1.5px solid var(--border)",
            }}
          >
            <span
              className="text-xs font-bold"
              style={{ color: "var(--text-secondary)" }}
            >
              {CURRENT_USER.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </span>
          </button>
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#868686]">
            <span className="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
              >
                <g fill="none">
                  <path d="m12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036q-.016-.004-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z" />
                  <path
                    fill="#D9D9D9"
                    d="M12 2a7 7 0 0 0-7 7v3.528a1 1 0 0 1-.105.447l-1.717 3.433A1.1 1.1 0 0 0 4.162 18h15.676a1.1 1.1 0 0 0 .984-1.592l-1.716-3.433a1 1 0 0 1-.106-.447V9a7 7 0 0 0-7-7m0 19a3 3 0 0 1-2.83-2h5.66A3 3 0 0 1 12 21"
                  />
                </g>
              </svg>
            </span>
            <span className="text-xs font-bold text-[#D9D9D9]">2</span>
          </div>
        </div>

        {/* Profile hero */}
        <div className="flex flex-col items-center px-4 pb-4">
          <div className="flex items-center gap-2 mt-2">
            <span
              className="text-xl font-bold"
              style={{ color: "var(--text-primary)" }}
            >
              {CURRENT_USER.name}
            </span>
            <LevelBadge level={CURRENT_USER.level} size={22} />
          </div>

          <div
            className="text-[10px] font-medium mt-1 px-4 py-1.5 rounded-full"
            style={{
              background: "var(--surface-2)",
              color: "var(--text-secondary)",
            }}
          >
            {CURRENT_USER.xpToNext} XP to next level
          </div>

          {/* Mascot */}
          <div className="my-5 bob">
            <Mascot size={90} />
          </div>

          {/* Status */}
          <button
            className="flex items-center gap-2 px-3 py-1.5 rounded-full pressable"
            style={{ background: "var(--surface-2)" }}
            onClick={() => setShowStatusPicker(true)}
          >
            <span
              className="status-dot"
              style={{ background: STATUS_COLORS[status] }}
            />
            <span
              className="text-sm font-medium"
              style={{ color: "var(--text-primary)" }}
            >
              {status}
            </span>
            <span className="text-xs" style={{ color: "var(--text-tertiary)" }}>
              ↺
            </span>
          </button>

          {/* Team avatars */}
          <div className="flex items-center gap-3 mt-4">
            <div className="flex -space-x-2 gap-[3px]">
              {TEAM_MEMBERS.slice(0, 3).map((m, i) => (
                <div key={i} className="relative">
                  <Avatar
                    initials={m.initials}
                    color={m.color}
                    size={32}
                    className="border-2 border-white"
                  />
                  <span
                    className="absolute bottom-0 right-0 block w-2.5 h-2.5 rounded-full border-2 border-white"
                    style={{ background: STATUS_COLORS[m.status] }}
                  />
                </div>
              ))}
            </div>
            <span
              className="text-sm font-medium"
              style={{ color: "var(--text-secondary)" }}
            >
              +7
            </span>
            <button
              className="px-4 py-1.5 rounded-full text-xs font-semibold pressable"
              style={{
                background: "var(--surface)",
                border: "1.5px solid var(--border)",
                color: "var(--text-primary)",
              }}
            >
              View Team
            </button>
          </div>
        </div>

        {/* 2-column preview row */}
        {/* Carousel */}
        <div className="px-4 mb-3">
          <CarouselSection
            onTabChange={onTabChange}
            onOpenPrompt={() => setShowDailyPrompt(true)}
          />
        </div>

        {/* Community preview */}
        <div className="px-4 mb-3">
          <div className="flex items-center justify-between mb-2">
            <span
              className="text-xs font-bold uppercase tracking-wider"
              style={{ color: "var(--text-tertiary)" }}
            >
              Community
            </span>
            <button
              onClick={() => onTabChange("community")}
              className="text-[10px] font-semibold"
              style={{ color: "var(--accent)" }}
            >
              See all ↗
            </button>
          </div>
          <button
            onClick={() => onTabChange("community")}
            className="w-full rounded-2xl p-4 text-left pressable"
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
            }}
          >
            <div className="flex items-start gap-3 mb-3">
              <Avatar
                initials={latestPost.authorInitials}
                color={latestPost.authorColor}
                size={38}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span
                    className="text-sm font-semibold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {latestPost.author}
                  </span>
                  <span
                    className="text-xs"
                    style={{ color: "var(--text-tertiary)" }}
                  >
                    {latestPost.timeAgo}
                  </span>
                </div>
                <div
                  className="text-xs mt-0.5"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Posted to {latestPost.channel}
                </div>
                <p
                  className="text-sm mt-2 leading-snug"
                  style={{ color: "var(--text-primary)" }}
                >
                  {latestPost.content}
                </p>
              </div>
            </div>
            {latestPost.image && (
              <div
                className="w-full h-24 rounded-xl"
                style={{ background: "var(--surface-2)" }}
              />
            )}
          </button>
        </div>
      </div>

      {/* Status picker sheet */}
      {showStatusPicker && (
        <div
          className="sheet-overlay"
          onClick={() => setShowStatusPicker(false)}
        >
          <div className="sheet slide-up" onClick={(e) => e.stopPropagation()}>
            <div
              className="w-8 h-1 rounded-full mx-auto mb-4"
              style={{ background: "var(--border)" }}
            />
            <div
              className="text-base font-bold mb-3"
              style={{ color: "var(--text-primary)" }}
            >
              Set Status
            </div>
            <div className="space-y-2">
              {STATUSES.map((s) => (
                <button
                  key={s}
                  onClick={() => {
                    setStatus(s as typeof status);
                    setShowStatusPicker(false);
                  }}
                  className="flex items-center gap-3 w-full p-3 rounded-2xl pressable"
                  style={{
                    background:
                      status === s ? "var(--accent-light)" : "var(--surface-2)",
                  }}
                >
                  <span
                    className="status-dot"
                    style={{ background: STATUS_COLORS[s] }}
                  />
                  <span
                    className="text-sm font-medium"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {s}
                  </span>
                  {status === s && (
                    <span
                      className="ml-auto text-xs font-bold"
                      style={{ color: "var(--accent)" }}
                    >
                      ✓
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Daily Prompt sheet */}
      {showDailyPrompt && (
        <div
          className="sheet-overlay"
          onClick={() => setShowDailyPrompt(false)}
        >
          <div
            className="sheet slide-up max-h-[85%] overflow-y-auto scrollbar-hide"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="w-8 h-1 rounded-full mx-auto mb-4"
              style={{ background: "var(--border)" }}
            />
            <div className="flex items-center justify-between mb-1">
              <span
                className="text-xs font-bold"
                style={{ color: "var(--text-tertiary)" }}
              >
                #{DAILY_PROMPT.number}
              </span>
              {promptSubmitted && (
                <span
                  className="text-xs"
                  style={{ color: "var(--text-tertiary)" }}
                >
                  🕐 6 HOURS
                </span>
              )}
            </div>
            <div
              className="text-xs font-semibold mb-1"
              style={{ color: "var(--text-tertiary)" }}
            >
              Today's prompt
            </div>
            <p
              className="text-base font-bold mb-4"
              style={{ color: "var(--text-primary)" }}
            >
              {DAILY_PROMPT.question}
            </p>

            {!promptSubmitted ? (
              <>
                <textarea
                  className="field mb-4 resize-none"
                  rows={3}
                  placeholder="Type your answer here"
                  value={promptAnswer}
                  onChange={(e) => setPromptAnswer(e.target.value)}
                />
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex -space-x-1.5">
                    {TEAM_MEMBERS.slice(0, 3).map((m, i) => (
                      <Avatar
                        key={i}
                        initials={m.initials}
                        color={m.color}
                        size={22}
                        className="border border-white"
                      />
                    ))}
                  </div>
                  <span
                    className="text-xs"
                    style={{ color: "var(--text-tertiary)" }}
                  >
                    {DAILY_PROMPT.completedBy} others completed
                  </span>
                </div>
                <button
                  onClick={() => {
                    if (promptAnswer.trim()) setPromptSubmitted(true);
                  }}
                  className="w-full py-3.5 rounded-2xl text-sm font-bold text-white pressable"
                  style={{
                    background: promptAnswer.trim()
                      ? "var(--text-primary)"
                      : "var(--border)",
                    color: promptAnswer.trim()
                      ? "white"
                      : "var(--text-tertiary)",
                  }}
                >
                  SUBMIT +10 XP ⚡
                </button>
              </>
            ) : (
              <>
                <div
                  className="mb-4 relative h-48 rounded-2xl overflow-hidden"
                  style={{ background: "var(--surface-2)" }}
                >
                  {DAILY_PROMPT.answers.map((name, i) => {
                    const positions = [
                      { top: "15%", right: "20%" },
                      { top: "25%", left: "30%" },
                      { top: "40%", left: "10%" },
                      { top: "55%", right: "15%" },
                      { top: "65%", left: "40%" },
                      { top: "75%", right: "35%" },
                      { top: "30%", right: "5%" },
                    ];
                    const sizes = [24, 16, 16, 32, 16, 16, 16];
                    const pos = positions[i] || {
                      top: `${20 + i * 10}%`,
                      left: `${10 + i * 12}%`,
                    };
                    return (
                      <div
                        key={name}
                        className="absolute rounded-full flex items-center justify-center font-bold pop-in"
                        style={{
                          ...pos,
                          fontSize: `${sizes[i] || 14}px`,
                          background:
                            i === 3 ? "var(--text-primary)" : "var(--surface)",
                          color: i === 3 ? "white" : "var(--text-primary)",
                          padding: "4px 10px",
                          animationDelay: `${i * 0.08}s`,
                          border: "1px solid var(--border)",
                        }}
                      >
                        {name}
                      </div>
                    );
                  })}
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex -space-x-1.5">
                    {TEAM_MEMBERS.slice(0, 3).map((m, i) => (
                      <Avatar
                        key={i}
                        initials={m.initials}
                        color={m.color}
                        size={22}
                        className="border border-white"
                      />
                    ))}
                  </div>
                  <span
                    className="text-xs"
                    style={{ color: "var(--text-tertiary)" }}
                  >
                    {DAILY_PROMPT.completedBy} others completed
                  </span>
                </div>
                <button
                  onClick={() => setShowDailyPrompt(false)}
                  className="w-full py-3 rounded-2xl text-sm font-bold pressable"
                  style={{
                    background: "var(--surface-2)",
                    color: "var(--text-secondary)",
                  }}
                >
                  Close
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
