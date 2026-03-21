"use client";
import { useState } from "react";
import Avatar from "../ui/Avatar";
import { FEED_POSTS, DAILY_PROMPT, Post } from "@/lib/data";

const CHANNELS = ["All", "Pet", "Food", "Sport"];
const REACTION_EMOJIS = ["👏", "🔥", "🎉", "❤️", "😂", "😮"];

type CommunityView = "main" | "dailyActivity" | "dailyResult";

// Add this above the component (or near the top of the file)
const CHANNEL_ICONS: Record<string, React.ReactNode> = {
  Food: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="10"
      height="10"
      viewBox="0 0 24 24"
    >
      <g fill="none">
        <path d="m12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036q-.016-.004-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z" />
        <path
          fill="currentColor"
          d="M17.015 3.055a1 1 0 0 1 1.26 1.548l-.098.079l-2.101 1.501a1.96 1.96 0 0 0-.794 1.937l.032.152l3.343-3.343a1 1 0 0 1 1.497 1.32l-.083.094l-3.343 3.343c.705.18 1.485-.04 1.986-.63l.103-.132l1.501-2.101a1 1 0 0 1 1.694 1.055l-.067.107l-1.5 2.102a3.97 3.97 0 0 1-5.054 1.216l-.18-.1l-2.297 2.296l4.157 4.158a1 1 0 0 1 .083 1.32l-.083.094a1 1 0 0 1-1.32.083l-.094-.083l-4.157-4.158l-4.157 4.158a1 1 0 0 1-1.32.083l-.094-.083a1 1 0 0 1-.083-1.32l.083-.094l4.157-4.158l-1.61-1.61a4.5 4.5 0 0 1-1.355.473l-.25.037a3.89 3.89 0 0 1-3.279-1.15C2.663 10.319 2.132 9.15 2 8.027c-.13-1.105.12-2.289.93-3.098c.809-.81 1.992-1.06 3.097-.93c1.123.133 2.293.664 3.222 1.593a3.89 3.89 0 0 1 1.15 3.278c-.06.505-.207.984-.406 1.401l-.104.204l1.61 1.61l2.298-2.296a3.97 3.97 0 0 1 .944-5.103l.172-.13z"
        />
      </g>
    </svg>
  ),
  Pet: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="10"
      height="10"
      viewBox="0 0 24 24"
    >
      <g fill="none" fillRule="evenodd">
        <path d="m12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036q-.016-.004-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z" />
        <path
          fill="currentColor"
          d="M18.5 2a3.5 3.5 0 0 1 1.796 6.505A9 9 0 1 1 3 12c0-1.24.25-2.42.704-3.495a3.5 3.5 0 1 1 4.8-4.8A9 9 0 0 1 12 2.999c1.24 0 2.42.25 3.495.704A3.5 3.5 0 0 1 18.5 2M12 12a1.5 1.5 0 0 0-1.012 2.608a.5.5 0 0 1-.488.392a1 1 0 1 0 0 2a2.5 2.5 0 0 0 1.5-.5c.418.314.937.5 1.5.5a1 1 0 1 0 0-2a.5.5 0 0 1-.488-.392A1.5 1.5 0 0 0 12 12M9 8a1 1 0 0 0-1 1v1a1 1 0 1 0 2 0V9a1 1 0 0 0-1-1m6 0a1 1 0 0 0-.993.883L14 9v1a1 1 0 0 0 1.993.117L16 10V9a1 1 0 0 0-1-1"
        />
      </g>
    </svg>
  ),
  Game: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="10"
      height="10"
      viewBox="0 0 24 24"
    >
      <g fill="none">
        <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
        <path
          fill="currentColor"
          d="M17 4c1.106 0 1.955.843 2.584 1.75l.213.321l.195.32q.093.157.178.308c.787 1.407 1.472 3.244 1.925 5.059c.45 1.801.699 3.682.54 5.161C22.475 18.404 21.71 20 20 20c-1.534 0-2.743-.82-3.725-1.621l-1.11-.931C14.242 16.692 13.232 16 12 16s-2.243.692-3.164 1.448l-1.11.93C6.742 19.18 5.533 20 4 20c-1.711 0-2.476-1.596-2.635-3.081c-.158-1.48.09-3.36.54-5.161c.453-1.815 1.138-3.652 1.925-5.059l.178-.309l.195-.319l.213-.321C5.045 4.843 5.894 4 7 4c.51 0 1.017.124 1.515.27l.593.182q.147.045.292.086c.865.248 1.75.462 2.6.462s1.735-.214 2.6-.462l.885-.267C15.983 4.124 16.49 4 17 4M8.5 8a2.5 2.5 0 1 0 0 5a2.5 2.5 0 0 0 0-5m7 0a1 1 0 0 0-1 1v.5H14a1 1 0 1 0 0 2h.5v.5a1 1 0 1 0 2 0v-.5h.5a1 1 0 1 0 0-2h-.5V9a1 1 0 0 0-1-1m-7 2a.5.5 0 1 1 0 1a.5.5 0 0 1 0-1"
        />
      </g>
    </svg>
  ),
};

export default function CommunityScreen() {
  const [view, setView] = useState<CommunityView>("main");
  const [posts, setPosts] = useState(FEED_POSTS);
  const [activeChannel, setActiveChannel] = useState("All");
  const [showCompose, setShowCompose] = useState(false);
  const [composeText, setComposeText] = useState("");
  const [composeChannel, setComposeChannel] = useState("Food");
  const [composeScope, setComposeScope] = useState<"Public" | "Team">("Team");
  const [promptAnswer, setPromptAnswer] = useState("");
  const [showReactionPicker, setShowReactionPicker] = useState<string | null>(
    null
  );

  const filteredPosts =
    activeChannel === "All"
      ? posts
      : posts.filter((p) => p.channel === activeChannel);

  function addReaction(postId: string, emoji: string) {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id !== postId) return p;
        const existing = p.reactions.find((r) => r.emoji === emoji);
        if (existing) {
          return {
            ...p,
            reactions: p.reactions.map((r) =>
              r.emoji === emoji ? { ...r, count: r.count + 1 } : r
            ),
          };
        }
        return { ...p, reactions: [...p.reactions, { emoji, count: 1 }] };
      })
    );
    setShowReactionPicker(null);
  }

  function submitPost() {
    if (!composeText.trim()) return;
    const newPost: Post = {
      id: `p${Date.now()}`,
      author: "Jasmine K.",
      authorRole: "IT Administrator",
      authorInitials: "JK",
      authorColor: "#EDE9FF",
      channel: composeChannel,
      scope: composeScope,
      content: composeText,
      timeAgo: "now",
      reactions: [],
      comments: 0,
      liked: false,
    };
    setPosts((prev) => [newPost, ...prev]);
    setComposeText("");
    setShowCompose(false);
  }

  if (view === "dailyActivity") {
    return (
      <div className="flex flex-col h-full">
        <div
          className="flex items-center justify-between px-4 pt-4 pb-3 flex-shrink-0"
          style={{ borderBottom: "1px solid var(--border)" }}
        >
          <div className="flex items-center gap-3">
            <button onClick={() => setView("main")} className="pressable">
              ←
            </button>
            <span
              className="text-lg font-bold"
              style={{ color: "var(--text-primary)" }}
            >
              Daily Activity
            </span>
          </div>
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#868686]">
            <span className="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
              >
                <g fill="none">
                  <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
                  <path
                    fill="#D9D9D9"
                    d="m11.514 2.142l-1.26-.755l-.24 1.449C9.632 5.124 8.069 7.25 6.345 8.744C2.97 11.67 2.231 14.85 3.276 17.475c1 2.512 3.538 4.232 6.114 4.519l.596.066c-1.474-.901-2.42-3.006-2.09-4.579c.326-1.546 1.438-2.994 3.574-4.33l1.077-.672l.402 1.205c.237.712.647 1.284 1.064 1.865c.2.28.403.563.589.864c.643 1.045.813 2.207.398 3.36c-.378 1.048-1.001 1.872-1.86 2.329l.97-.108c2.418-.269 4.193-1.096 5.346-2.479C20.599 18.144 21 16.379 21 14.5c0-1.75-.719-3.554-1.567-5.055c-.994-1.758-2.291-3.218-3.707-4.633c-.245.49-.226.688-.73 1.475a8.15 8.15 0 0 0-3.482-4.145"
                  />
                </g>
              </svg>
            </span>
            <span className="text-xs font-bold text-[#D9D9D9]">2</span>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto scrollbar-hide px-4 py-4">
          <div
            className="text-xs font-semibold mb-0.5"
            style={{ color: "var(--text-tertiary)" }}
          >
            #{DAILY_PROMPT.number}
          </div>
          <div
            className="text-xs font-semibold mb-2"
            style={{ color: "var(--text-tertiary)" }}
          >
            Today's prompt
          </div>
          <p
            className="text-lg font-bold mb-6"
            style={{ color: "var(--text-primary)" }}
          >
            {DAILY_PROMPT.question}
          </p>

          <textarea
            className="field resize-none w-full mb-4"
            rows={5}
            placeholder="Your answer"
            value={promptAnswer}
            onChange={(e) => setPromptAnswer(e.target.value)}
          />

          <div className="flex items-center gap-2 mb-6">
            <div className="flex -space-x-1.5">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-6 h-6 rounded-full border-2 border-white"
                  style={{ background: "var(--surface-2)" }}
                />
              ))}
            </div>
            <span className="text-xs" style={{ color: "var(--text-tertiary)" }}>
              {DAILY_PROMPT.completedBy} others completed
            </span>
          </div>
        </div>
        <div className="px-4 pb-5 flex-shrink-0">
          <button
            onClick={() => {
              if (promptAnswer.trim()) setView("dailyResult");
            }}
            className="w-full py-3.5 rounded-2xl text-sm font-bold pressable"
            style={{
              background: promptAnswer.trim()
                ? "var(--text-primary)"
                : "var(--border)",
              color: promptAnswer.trim() ? "white" : "var(--text-tertiary)",
            }}
          >
            SUBMIT +10 XP
          </button>
        </div>
      </div>
    );
  }

  if (view === "dailyResult") {
    return (
      <div className="flex flex-col h-full">
        <div
          className="flex items-center justify-between px-4 pt-4 pb-3 flex-shrink-0"
          style={{ borderBottom: "1px solid var(--border)" }}
        >
          <div className="flex items-center gap-3">
            <button onClick={() => setView("main")} className="pressable">
              ←
            </button>
            <span
              className="text-lg font-bold"
              style={{ color: "var(--text-primary)" }}
            >
              Daily Activity
            </span>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto scrollbar-hide px-4 py-4">
          <div
            className="text-xs font-semibold mb-0.5"
            style={{ color: "var(--text-tertiary)" }}
          >
            #{DAILY_PROMPT.number}
          </div>
          <div
            className="text-xs font-semibold mb-2"
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

          {/* Word cloud */}
          <div
            className="relative rounded-2xl overflow-hidden mb-4"
            style={{ height: 200, background: "var(--surface-2)" }}
          >
            {DAILY_PROMPT.answers.map((name, i) => {
              const positions = [
                { top: "15%", right: "18%" },
                { top: "22%", left: "28%" },
                { top: "42%", left: "8%" },
                { top: "50%", right: "12%" },
                { top: "65%", left: "38%" },
                { top: "72%", right: "32%" },
                { top: "28%", right: "4%" },
              ];
              const pos = positions[i] || { top: "50%", left: "50%" };
              const isBig = i === 3;
              return (
                <div
                  key={name}
                  className="absolute font-bold rounded-full px-3 py-1 pop-in"
                  style={{
                    ...pos,
                    fontSize: isBig ? 20 : 13,
                    background: isBig
                      ? "var(--text-primary)"
                      : "var(--surface)",
                    color: isBig ? "white" : "var(--text-primary)",
                    border: "1px solid var(--border)",
                    animationDelay: `${i * 0.07}s`,
                  }}
                >
                  {name}
                </div>
              );
            })}
          </div>
          <div className="flex items-center gap-2">
            <div className="flex -space-x-1.5">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-6 h-6 rounded-full border-2 border-white"
                  style={{ background: "var(--surface-2)" }}
                />
              ))}
            </div>
            <span className="text-xs" style={{ color: "var(--text-tertiary)" }}>
              {DAILY_PROMPT.completedBy} others completed
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-4 pb-2 flex-shrink-0">
        <span
          className="text-xl font-bold"
          style={{ color: "var(--text-primary)" }}
        >
          Community
        </span>
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

      {/* Compose bar */}
      <div className="px-4 pb-3 flex-shrink-0">
        <button
          onClick={() => setShowCompose(true)}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-2xl pressable"
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
          }}
        >
          <div
            className="w-8 h-8 rounded-full"
            style={{ background: "var(--surface-2)" }}
          />
          <span className="text-sm" style={{ color: "var(--text-tertiary)" }}>
            What's happening?
          </span>
        </button>
      </div>

      {/* Feed */}
      <div className="flex-1 overflow-y-auto scrollbar-hide pb-2">
        {/* Daily Activity card */}
        <div className="px-4 pb-3 flex-shrink-0">
          <button
            onClick={() => setView("dailyActivity")}
            className="rounded-2xl p-4 text-left pressable"
            style={{
              width: "50%",
              background: "var(--surface)",
              border: "1px solid var(--border)",
            }}
          >
            {/* Title + arrow */}
            <div className="flex items-start justify-between mb-3">
              <div>
                <div
                  className="text-base font-bold"
                  style={{ color: "var(--text-primary)" }}
                >
                  Daily Activity
                </div>
                <div
                  className="text-base font-bold"
                  style={{ color: "var(--text-primary)" }}
                >
                  #{DAILY_PROMPT.number}
                </div>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
              >
                <g fill="none">
                  <path d="M24 0v24H0V0zM12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.105.074l.014.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.016-.018m.264-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.092l.01-.009l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
                  <path
                    fill="currentColor"
                    d="M18 5a1 1 0 0 1 1 1v8a1 1 0 1 1-2 0V8.414l-9.95 9.95a1 1 0 0 1-1.414-1.414L15.586 7H10a1 1 0 1 1 0-2z"
                  />
                </g>
              </svg>
            </div>

            {/* Avatars + count */}
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-6 h-6 rounded-full border-2 border-white flex items-center justify-center"
                    style={{ background: "var(--border)" }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        cx="12"
                        cy="8"
                        r="4"
                        fill="var(--text-tertiary)"
                      />
                      <path
                        d="M4 20c0-4 3.6-7 8-7s8 3 8 7"
                        fill="var(--text-tertiary)"
                      />
                    </svg>
                  </div>
                ))}
              </div>
              <span
                className="text-xs"
                style={{ color: "var(--text-tertiary)" }}
              >
                {DAILY_PROMPT.completedBy} others completed
              </span>
            </div>
          </button>
        </div>

        {/* Channel filter */}
        <div className="flex gap-6 px-4 pb-0 flex-shrink-0 overflow-x-auto scrollbar-hide sticky top-0 bg-[#F9F9F9]">
          {CHANNELS.map((ch) => (
            <button
              key={ch}
              onClick={() => setActiveChannel(ch)}
              className="flex items-center gap-1 pb-1 text-sm pressable flex-shrink-0 mb-2 px-2"
              style={{
                fontWeight: activeChannel === ch ? 700 : 400,
                color:
                  activeChannel === ch
                    ? "var(--text-primary)"
                    : "var(--text-tertiary)",
                borderBottom:
                  activeChannel === ch
                    ? "2px solid var(--text-primary)"
                    : "2px solid transparent",
                transition:
                  "color 0.2s ease, border-color 0.2s ease, font-weight",
              }}
            >
              {ch}
              {activeChannel === ch && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                >
                  <g fill="none" fill-rule="evenodd">
                    <path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
                    <path
                      fill="currentColor"
                      d="M12.707 15.707a1 1 0 0 1-1.414 0L5.636 10.05A1 1 0 1 1 7.05 8.636l4.95 4.95l4.95-4.95a1 1 0 0 1 1.414 1.414z"
                    />
                  </g>
                </svg>
              )}
            </button>
          ))}
        </div>

        {filteredPosts.map((post) => (
          <div
            key={post.id}
            className="mx-4 mb-3 rounded-2xl p-4"
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
            }}
          >
            <div className="flex items-start gap-3 mb-3">
              <Avatar
                initials={post.authorInitials}
                color={post.authorColor}
                size={36}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div
                      className="text-sm font-semibold"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {post.author}
                    </div>
                    <div
                      className="text-xs"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {post.authorRole}
                    </div>
                  </div>
                  <span
                    className="text-xs flex-shrink-0"
                    style={{ color: "var(--text-tertiary)" }}
                  >
                    {post.timeAgo}
                  </span>
                </div>
                <div className="flex gap-1.5 mt-1.5 flex-wrap">
                  <span className="chip" style={{ fontSize: 10 }}>
                    {post.scope === "Team" ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="10"
                        height="10"
                        viewBox="0 0 24 24"
                      >
                        <g fill="none">
                          <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
                          <path
                            fill="currentColor"
                            d="M13 13a4 4 0 0 1 4 4v1.5a1.5 1.5 0 0 1-1.5 1.5h-12A1.5 1.5 0 0 1 2 18.5V17a4 4 0 0 1 4-4zm6 0a3 3 0 0 1 3 3v1.5a1.5 1.5 0 0 1-1.5 1.5H19v-2a5 5 0 0 0-2-4zM9.5 3a4.5 4.5 0 1 1 0 9a4.5 4.5 0 0 1 0-9M18 6a3 3 0 1 1 0 6a3 3 0 0 1 0-6"
                          />
                        </g>
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="10"
                        height="10"
                        viewBox="0 0 24 24"
                      >
                        <g fill="none">
                          <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
                          <path
                            fill="currentColor"
                            d="M13 3a2 2 0 0 1 1.995 1.85L15 5v4h3a2 2 0 0 1 1.995 1.85L20 11v8h1a1 1 0 0 1 .117 1.993L21 21H3a1 1 0 0 1-.117-1.993L3 19h1V5a2 2 0 0 1 1.85-1.995L6 3zm5 8h-3v8h3zm-5-6H6v14h7zm-2 10v2H8v-2zm0-4v2H8v-2zm0-4v2H8V7z"
                          />
                        </g>
                      </svg>
                    )}
                    {post.scope}
                  </span>
                  {post.channel !== post.scope && (
                    <span className="chip" style={{ fontSize: 10 }}>
                      {CHANNEL_ICONS[post.channel] ?? null}
                      {post.channel}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <p
              className="text-sm mb-3"
              style={{ color: "var(--text-primary)" }}
            >
              {post.content}
            </p>

            {post.image && (
              <div
                className="w-full h-32 rounded-xl mb-3"
                style={{ background: "var(--surface-2)" }}
              />
            )}

            {/* Reactions */}
            <div className="flex items-center gap-2 flex-wrap">
              {post.reactions.map((r) => (
                <button
                  key={r.emoji}
                  onClick={() => addReaction(post.id, r.emoji)}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs pressable"
                  style={{
                    background: "var(--surface-2)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <span>{r.emoji}</span>
                  <span style={{ color: "var(--text-secondary)" }}>
                    {r.count}
                  </span>
                </button>
              ))}
              <button
                onClick={() =>
                  setShowReactionPicker(
                    showReactionPicker === post.id ? null : post.id
                  )
                }
                className="w-7 h-7 rounded-full flex items-center justify-center text-base pressable"
                style={{
                  background: "var(--surface-2)",
                  border: "1px solid var(--border)",
                }}
              >
                +
              </button>
              {showReactionPicker === post.id && (
                <div className="flex gap-3 fade-in">
                  {REACTION_EMOJIS.map((e) => (
                    <button
                      key={e}
                      onClick={() => addReaction(post.id, e)}
                      className="text-lg pressable"
                    >
                      {e}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Comment preview */}
            {post.comments > 0 && (
              <div
                className="mt-3 pt-3"
                style={{ borderTop: "1px solid var(--border)" }}
              >
                <div className="flex items-start gap-2">
                  <div
                    className="w-6 h-6 rounded-full flex-shrink-0"
                    style={{ background: "var(--surface-2)" }}
                  />
                  <div
                    className="flex-1 px-3 py-2 rounded-xl"
                    style={{ background: "var(--surface-2)" }}
                  >
                    <div
                      className="text-xs font-semibold"
                      style={{ color: "var(--text-primary)" }}
                    >
                      Bob
                    </div>
                    <div
                      className="text-xs"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      Wowww congrats :)
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Compose — full screen */}
      {showCompose && (
        <div
          className="absolute inset-0 z-50 flex flex-col"
          style={{ background: "var(--surface)" }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-4 py-3 flex-shrink-0"
            style={{ borderBottom: "1px solid var(--border)" }}
          >
            <button
              onClick={() => setShowCompose(false)}
              className="text-sm font-semibold pressable"
              style={{ color: "var(--text-secondary)" }}
            >
              Cancel
            </button>
            <span
              className="text-sm font-bold"
              style={{ color: "var(--text-primary)" }}
            >
              Create post
            </span>
            <button
              onClick={submitPost}
              className="px-4 py-1.5 rounded-full text-sm font-bold pressable"
              style={{
                background: composeText.trim()
                  ? "var(--accent)"
                  : "var(--surface-2)",
                color: composeText.trim() ? "white" : "var(--text-tertiary)",
              }}
            >
              Post
            </button>
          </div>

          {/* Author row */}
          <div className="flex items-center gap-3 px-4 pt-4 pb-2 flex-shrink-0">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: "#C8E0F0" }}
            >
              <span
                className="text-xs font-bold"
                style={{ color: "var(--text-secondary)" }}
              >
                JK
              </span>
            </div>
            <div className="flex flex-col gap-1.5">
              <span
                className="text-sm font-bold"
                style={{ color: "var(--text-primary)" }}
              >
                Jasmine K.
              </span>
              {/* Scope toggle */}
              <button
                onClick={() =>
                  setComposeScope((s) => (s === "Team" ? "Public" : "Team"))
                }
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold pressable self-start"
                style={{
                  background: "var(--surface-2)",
                  border: "1px solid var(--border)",
                  color: "var(--text-secondary)",
                }}
              >
                {composeScope === "Team" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                  >
                    <g fill="none">
                      <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
                      <path
                        fill="currentColor"
                        d="M13 13a4 4 0 0 1 4 4v1.5a1.5 1.5 0 0 1-1.5 1.5h-12A1.5 1.5 0 0 1 2 18.5V17a4 4 0 0 1 4-4zm6 0a3 3 0 0 1 3 3v1.5a1.5 1.5 0 0 1-1.5 1.5H19v-2a5 5 0 0 0-2-4zM9.5 3a4.5 4.5 0 1 1 0 9a4.5 4.5 0 0 1 0-9M18 6a3 3 0 1 1 0 6a3 3 0 0 1 0-6"
                      />
                    </g>
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                  >
                    <g fill="none">
                      <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
                      <path
                        fill="currentColor"
                        d="M13 3a2 2 0 0 1 1.995 1.85L15 5v4h3a2 2 0 0 1 1.995 1.85L20 11v8h1a1 1 0 0 1 .117 1.993L21 21H3a1 1 0 0 1-.117-1.993L3 19h1V5a2 2 0 0 1 1.85-1.995L6 3zm5 8h-3v8h3zm-5-6H6v14h7zm-2 10v2H8v-2zm0-4v2H8v-2zm0-4v2H8V7z"
                      />
                    </g>
                  </svg>
                )}
                {composeScope} ⌄
              </button>
            </div>
          </div>

          {/* Text area — grows to fill */}
          <div className="flex-1 px-4 overflow-hidden">
            <textarea
              className="w-full h-full resize-none outline-none text-sm leading-relaxed"
              style={{
                background: "transparent",
                color: "var(--text-primary)",
                fontFamily: "inherit",
                minHeight: 120,
              }}
              placeholder="What's happening?"
              value={composeText}
              onChange={(e) => setComposeText(e.target.value)}
              autoFocus
            />
          </div>

          {/* Bottom toolbar */}
          <div
            className="flex-shrink-0 px-4 py-3"
            style={{ borderTop: "1px solid var(--border)" }}
          >
            <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide">
              {/* Photo */}
              <button
                className="pressable flex-shrink-0"
                style={{ color: "var(--text-tertiary)" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                >
                  <g fill="none">
                    <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
                    <path
                      fill="currentColor"
                      d="M20 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm0 2H4v10.1l4.995-4.994a1.25 1.25 0 0 1 1.768 0l4.065 4.066l1.238-1.238a1.25 1.25 0 0 1 1.768 0L20 15.101zm-4.5 2a1.5 1.5 0 1 1 0 3a1.5 1.5 0 0 1 0-3"
                    />
                  </g>
                </svg>
              </button>

              {/* Calendar */}
              <button
                className="pressable flex-shrink-0"
                style={{ color: "var(--text-tertiary)" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                >
                  <g fill="none" fillRule="evenodd">
                    <path d="m12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036q-.016-.004-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z" />
                    <path
                      fill="currentColor"
                      d="M16 3a1 1 0 0 1 1 1v1h2a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2V4a1 1 0 0 1 2 0v1h6V4a1 1 0 0 1 1-1M8 7H5v2h14V7h-3zm-3 4v8h14v-8zm2 2a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2H8a1 1 0 0 1-1-1m1 2a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2zm3-2a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2H12a1 1 0 0 1-1-1m1 2a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2zm3-2a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2H16a1 1 0 0 1-1-1m1 2a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2z"
                    />
                  </g>
                </svg>
              </button>

              {/* Divider */}
              <div
                className="w-px h-5 flex-shrink-0"
                style={{ background: "var(--border)" }}
              />

              {/* Channel pills */}
              {[
                {
                  key: "Food",
                  svg: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                    >
                      <g fill="none">
                        <path d="m12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036q-.016-.004-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z" />
                        <path
                          fill="currentColor"
                          d="M17.015 3.055a1 1 0 0 1 1.26 1.548l-.098.079l-2.101 1.501a1.96 1.96 0 0 0-.794 1.937l.032.152l3.343-3.343a1 1 0 0 1 1.497 1.32l-.083.094l-3.343 3.343c.705.18 1.485-.04 1.986-.63l.103-.132l1.501-2.101a1 1 0 0 1 1.694 1.055l-.067.107l-1.5 2.102a3.97 3.97 0 0 1-5.054 1.216l-.18-.1l-2.297 2.296l4.157 4.158a1 1 0 0 1 .083 1.32l-.083.094a1 1 0 0 1-1.32.083l-.094-.083l-4.157-4.158l-4.157 4.158a1 1 0 0 1-1.32.083l-.094-.083a1 1 0 0 1-.083-1.32l.083-.094l4.157-4.158l-1.61-1.61a4.5 4.5 0 0 1-1.355.473l-.25.037a3.89 3.89 0 0 1-3.279-1.15C2.663 10.319 2.132 9.15 2 8.027c-.13-1.105.12-2.289.93-3.098c.809-.81 1.992-1.06 3.097-.93c1.123.133 2.293.664 3.222 1.593a3.89 3.89 0 0 1 1.15 3.278c-.06.505-.207.984-.406 1.401l-.104.204l1.61 1.61l2.298-2.296a3.97 3.97 0 0 1 .944-5.103l.172-.13z"
                        />
                      </g>
                    </svg>
                  ),
                },
                {
                  key: "Pet",
                  svg: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                    >
                      <g fill="none" fillRule="evenodd">
                        <path d="m12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036q-.016-.004-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z" />
                        <path
                          fill="currentColor"
                          d="M18.5 2a3.5 3.5 0 0 1 1.796 6.505A9 9 0 1 1 3 12c0-1.24.25-2.42.704-3.495a3.5 3.5 0 1 1 4.8-4.8A9 9 0 0 1 12 2.999c1.24 0 2.42.25 3.495.704A3.5 3.5 0 0 1 18.5 2M12 12a1.5 1.5 0 0 0-1.012 2.608a.5.5 0 0 1-.488.392a1 1 0 1 0 0 2a2.5 2.5 0 0 0 1.5-.5c.418.314.937.5 1.5.5a1 1 0 1 0 0-2a.5.5 0 0 1-.488-.392A1.5 1.5 0 0 0 12 12M9 8a1 1 0 0 0-1 1v1a1 1 0 1 0 2 0V9a1 1 0 0 0-1-1m6 0a1 1 0 0 0-.993.883L14 9v1a1 1 0 0 0 1.993.117L16 10V9a1 1 0 0 0-1-1"
                        />
                      </g>
                    </svg>
                  ),
                },
                {
                  key: "Game",
                  svg: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                    >
                      <g fill="none">
                        <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
                        <path
                          fill="currentColor"
                          d="M17 4c1.106 0 1.955.843 2.584 1.75l.213.321l.195.32q.093.157.178.308c.787 1.407 1.472 3.244 1.925 5.059c.45 1.801.699 3.682.54 5.161C22.475 18.404 21.71 20 20 20c-1.534 0-2.743-.82-3.725-1.621l-1.11-.931C14.242 16.692 13.232 16 12 16s-2.243.692-3.164 1.448l-1.11.93C6.742 19.18 5.533 20 4 20c-1.711 0-2.476-1.596-2.635-3.081c-.158-1.48.09-3.36.54-5.161c.453-1.815 1.138-3.652 1.925-5.059l.178-.309l.195-.319l.213-.321C5.045 4.843 5.894 4 7 4c.51 0 1.017.124 1.515.27l.593.182q.147.045.292.086c.865.248 1.75.462 2.6.462s1.735-.214 2.6-.462l.885-.267C15.983 4.124 16.49 4 17 4M8.5 8a2.5 2.5 0 1 0 0 5a2.5 2.5 0 0 0 0-5m7 0a1 1 0 0 0-1 1v.5H14a1 1 0 1 0 0 2h.5v.5a1 1 0 1 0 2 0v-.5h.5a1 1 0 1 0 0-2h-.5V9a1 1 0 0 0-1-1m-7 2a.5.5 0 1 1 0 1a.5.5 0 0 1 0-1"
                        />
                      </g>
                    </svg>
                  ),
                },
              ].map(({ key, svg }) => (
                <button
                  key={key}
                  onClick={() => setComposeChannel(key)}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold pressable flex-shrink-0"
                  style={{
                    background:
                      composeChannel === key
                        ? "var(--surface-2)"
                        : "transparent",
                    color:
                      composeChannel === key
                        ? "var(--text-primary)"
                        : "var(--text-tertiary)",
                    border:
                      composeChannel === key
                        ? "1.5px solid var(--border)"
                        : "1.5px solid transparent",
                  }}
                >
                  {svg}
                  {key}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
