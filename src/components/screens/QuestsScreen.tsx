"use client";
import { useState } from "react";
import { QUESTS, Quest } from "@/lib/data";

const TYPE_COLORS: Record<string, string> = {
  "In-Person": "#B8B8B8",
  Digital: "#B8B8B8",
  Social: "var(--green-light)",
};
const TYPE_TEXT: Record<string, string> = {
  "In-Person": "#FAFAFA",
  Digital: "#FAFAFA",
  Social: "var(--green)",
};

function QuestRow({
  quest,
  onStart,
  onDone,
}: {
  quest: Quest;
  onStart: () => void;
  onDone: () => void;
}) {
  return (
    <div
      className="quest-card"
      style={{ opacity: quest.status === "locked" ? 0.5 : 1 }}
    >
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center text-base flex-shrink-0"
        style={{
          background:
            quest.status === "done" ? "var(--surface)" : "var(--surface)",
          border: "1px solid var(--border)",
        }}
      >
        {quest.status === "done" ? (
          <span className="text-sm font-bold" style={{ color: "var(--green)" }}>
            ✓
          </span>
        ) : (
          <span>{quest.icon}</span>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap gap-1.5 mb-1">
          <span
            className="chip"
            style={{
              background: "#B8B8B8",
              color: "#FAFAFA",
              border: "none",
              fontSize: 10,
            }}
          >
            +{quest.xp} XP{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="10"
              viewBox="0 0 24 24"
            >
              <g fill="none" fill-rule="evenodd">
                <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
                <path
                  fill="currentColor"
                  d="M8.084 2.6c.162-.365.523-.6.923-.6h7.977c.75 0 1.239.79.903 1.462L15.618 8h3.358c.9 0 1.35 1.088.714 1.724L7.737 21.677c-.754.754-2.01-.022-1.672-1.033L8.613 13H5.015a1.01 1.01 0 0 1-.923-1.42z"
                />
              </g>
            </svg>
          </span>
          <span
            className="chip"
            style={{
              background: TYPE_COLORS[quest.type],
              color: TYPE_TEXT[quest.type],
              border: "none",
              fontSize: 10,
            }}
          >
            {quest.type}
          </span>
        </div>
        <div
          className="text-sm font-semibold"
          style={{
            color:
              quest.status === "done"
                ? "var(--text-tertiary)"
                : "var(--text-primary)",
            textDecoration: quest.status === "done" ? "line-through" : "none",
          }}
        >
          {quest.title}
        </div>
        <div
          className="text-xs mt-0.5"
          style={{ color: "var(--text-tertiary)" }}
        >
          {quest.subtitle}
        </div>
      </div>
      <div className="flex-shrink-0">
        {quest.status === "done" ? (
          <span
            className="px-2 py-1 rounded-full text-[10px] font-semibold flex justify-center items-center gap-1"
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              color: "var(--text-tertiary)",
            }}
          >
            Done
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="11"
              height="11"
              viewBox="0 0 24 24"
            >
              <g fill="none" fill-rule="evenodd">
                <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
                <path
                  fill="currentColor"
                  d="M21.192 5.465a1 1 0 0 1 0 1.414L9.95 18.122a1.1 1.1 0 0 1-1.556 0l-5.586-5.586a1 1 0 1 1 1.415-1.415l4.95 4.95L19.777 5.465a1 1 0 0 1 1.414 0Z"
                />
              </g>
            </svg>
          </span>
        ) : quest.status === "start" ? (
          <button
            onClick={onStart}
            className="px-2 py-1 rounded-full text-[10px] font-bold text-white pressable flex gap-1 justify-center items-center"
            style={{ background: "var(--text-primary)" }}
          >
            Start{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
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
          </button>
        ) : (
          <span className="text-xs" style={{ color: "var(--text-tertiary)" }}>
            🔒
          </span>
        )}
      </div>
    </div>
  );
}

export default function QuestsScreen() {
  const [quests, setQuests] = useState(QUESTS);
  const [startedQuest, setStartedQuest] = useState<Quest | null>(null);

  const onboarding = quests.filter((q) => q.section === "onboarding");
  const daily = quests.filter((q) => q.section === "daily");
  const career = quests.filter((q) => q.section === "career");

  function handleStart(quest: Quest) {
    setStartedQuest(quest);
  }

  function handleMarkDone(id: string) {
    setQuests((prev) =>
      prev.map((q) => (q.id === id ? { ...q, status: "done" as const } : q))
    );
    setStartedQuest(null);
  }

  return (
    <div className="relative flex flex-col h-full overflow-hidden">
      <div className="flex items-center gap-3 px-4 pt-4 pb-3 flex-shrink-0">
        <span
          className="text-xl font-bold"
          style={{ color: "var(--text-primary)" }}
        >
          Quest
        </span>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide px-4 pb-4">
        {/* Onboarding section */}
        <div className="flex items-center justify-between mb-3">
          <span
            className="text-sm font-bold"
            style={{ color: "var(--text-secondary)" }}
          >
            Onboarding
          </span>
          <span
            className="text-sm font-bold"
            style={{ color: "var(--text-tertiary)" }}
          >
            WEEK 01 / 12
          </span>
        </div>
        <div
          className="rounded-2xl p-3 mb-4"
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
          }}
        >
          {onboarding.map((q) => (
            <QuestRow
              key={q.id}
              quest={q}
              onStart={() => handleStart(q)}
              onDone={() => handleMarkDone(q.id)}
            />
          ))}
        </div>

        <div
          style={{ height: 1, background: "var(--border)", margin: "0 0 16px" }}
        />

        {/* Daily section */}
        <div className="flex items-center justify-between mb-3">
          <span
            className="text-sm font-bold"
            style={{ color: "var(--text-secondary)" }}
          >
            Daily Quest
          </span>
          <div
            className="flex items-center gap-1 text-sm font-bold"
            style={{ color: "var(--text-tertiary)" }}
          >
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
              >
                <g fill="none" fill-rule="evenodd">
                  <path d="m12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036q-.016-.004-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z" />
                  <path
                    fill="currentColor"
                    d="M10.975 3.002a1 1 0 0 1-.754 1.196a8 8 0 0 0-.583.156a1 1 0 0 1-.59-1.911q.36-.112.73-.195a1 1 0 0 1 1.197.754m2.05 0a1 1 0 0 1 1.196-.754c4.454 1.01 7.78 4.992 7.78 9.752c0 5.523-4.478 10-10 10c-4.761 0-8.743-3.325-9.753-7.779a1 1 0 0 1 1.95-.442a8 8 0 1 0 9.58-9.58a1 1 0 0 1-.753-1.197M6.614 4.72a1 1 0 0 1-.053 1.414q-.222.205-.427.426A1 1 0 0 1 4.668 5.2q.255-.276.532-.533a1 1 0 0 1 1.414.053M12 6a1 1 0 0 1 1 1v4.586l2.707 2.707a1 1 0 0 1-1.414 1.414l-3-3A1 1 0 0 1 11 12V7a1 1 0 0 1 1-1M3.693 8.388a1 1 0 0 1 .661 1.25a8 8 0 0 0-.156.583a1 1 0 0 1-1.95-.442q.084-.37.195-.73a1 1 0 0 1 1.25-.661"
                  />
                </g>
              </svg>
            </span>{" "}
            6 HOURS
          </div>
        </div>
        <div
          className="rounded-2xl p-3 mb-4"
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
          }}
        >
          {daily.map((q) => (
            <QuestRow
              key={q.id}
              quest={q}
              onStart={() => handleStart(q)}
              onDone={() => handleMarkDone(q.id)}
            />
          ))}
        </div>
      </div>

      {/* Quest start sheet */}
      {startedQuest && (
        <div className="sheet-overlay" onClick={() => setStartedQuest(null)}>
          <div className="sheet slide-up" onClick={(e) => e.stopPropagation()}>
            <div
              className="w-8 h-1 rounded-full mx-auto mb-4"
            />
            <div className="flex gap-1.5 mb-3">
              <span className="chip text-xs">
                +{startedQuest.xp} XP{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                >
                  <g fill="none" fill-rule="evenodd">
                    <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
                    <path
                      fill="currentColor"
                      d="M8.084 2.6c.162-.365.523-.6.923-.6h7.977c.75 0 1.239.79.903 1.462L15.618 8h3.358c.9 0 1.35 1.088.714 1.724L7.737 21.677c-.754.754-2.01-.022-1.672-1.033L8.613 13H5.015a1.01 1.01 0 0 1-.923-1.42z"
                    />
                  </g>
                </svg>
              </span>
              <span
                className="chip text-xs"
                style={{
                  background: TYPE_COLORS[startedQuest.type],
                  color: TYPE_TEXT[startedQuest.type],
                  border: "none",
                }}
              >
                {startedQuest.type}
              </span>
            </div>
            <div
              className="text-lg font-bold mb-1"
              style={{ color: "var(--text-primary)" }}
            >
              {startedQuest.title}
            </div>
            <p
              className="text-sm mb-6"
              style={{ color: "var(--text-secondary)" }}
            >
              {startedQuest.subtitle}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setStartedQuest(null)}
                className="flex-1 py-3 rounded-2xl text-sm font-semibold pressable"
                style={{
                  background: "var(--surface-2)",
                  color: "var(--text-secondary)",
                }}
              >
                Later
              </button>
              <button
                onClick={() => handleMarkDone(startedQuest.id)}
                className="flex-1 py-3 rounded-2xl text-sm font-bold text-white pressable"
                style={{ background: "var(--text-primary)" }}
              >
                Mark Done ✓
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
