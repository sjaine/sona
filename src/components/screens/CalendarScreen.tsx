"use client";
import { useState } from "react";
import { CALENDAR_EVENTS, CalEvent } from "@/lib/data";

type CalView = "calendar" | "list";
const MONTH_NAMES = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const DAY_NAMES = ["S","M","T","W","T","F","S"];

function getDaysInMonth(y: number, m: number) { return new Date(y, m + 1, 0).getDate(); }
function getFirstDay(y: number, m: number) { return new Date(y, m, 1).getDay(); }

// ─── Event Detail ───────────────────────────────────────────────────────────
function EventDetail({ event, onClose }: { event: CalEvent; onClose: () => void }) {
  const [rsvp, setRsvp] = useState(event.rsvp);
  const date = new Date(event.date + "T00:00:00");

  return (
    <div className="flex flex-col h-full">
      <div className="relative flex-shrink-0">
        <div className="h-44" style={{ background: "var(--surface-2)" }} />
        <button
          onClick={onClose}
          className="absolute top-4 left-4 w-8 h-8 rounded-full flex items-center justify-center pressable"
          style={{ background: "rgba(255,255,255,0.9)" }}
        >←</button>
        <div
          className="absolute -bottom-5 left-5 w-10 h-10 rounded-full flex items-center justify-center text-xl"
          style={{ background: "white", border: "2px solid var(--border)" }}
        >
          {event.attendees > 20 ? "🏢" : "👥"}
        </div>
        <div
          className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold"
          style={{ background: event.scope === "Team" ? "var(--accent-light)" : "var(--green-light)", color: event.scope === "Team" ? "var(--accent)" : "var(--green)" }}
        >
          {event.scope}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide px-5 pt-8 pb-5">
        <div className="text-xl font-bold mb-0.5" style={{ color: "var(--text-primary)" }}>{event.title}</div>
        <div className="text-sm mb-1" style={{ color: "var(--text-secondary)" }}>
          Added by <span className="font-semibold">{event.organizer}</span>
        </div>
        <div className="flex items-center gap-2 mb-4">
          <div className="flex -space-x-1.5">
            {[0,1,2,3].map(i => <div key={i} className="w-6 h-6 rounded-full border-2 border-white" style={{ background: ["#C8E8F8","#DCF5E8","#FEF3DC","#EDE9FF"][i] }} />)}
          </div>
          <span className="text-sm" style={{ color: "var(--text-secondary)" }}>{event.attendees} going</span>
        </div>

        <div className="mb-4">
          <div className="text-sm font-bold mb-1" style={{ color: "var(--text-primary)" }}>Location</div>
          {event.locationAddress ? (
            <>
              <div className="text-sm" style={{ color: "var(--text-primary)" }}>{event.location}</div>
              <div className="text-sm" style={{ color: "var(--text-secondary)" }}>{event.locationAddress}</div>
              <button className="text-xs font-semibold mt-1 px-3 py-1 rounded-full pressable" style={{ background: "var(--surface-2)", color: "var(--accent)" }}>
                Open in Maps ↗
              </button>
            </>
          ) : (
            <div className="text-sm" style={{ color: "var(--text-secondary)" }}>{event.location}</div>
          )}
        </div>

        <div className="mb-4">
          <div className="text-sm font-bold mb-1" style={{ color: "var(--text-primary)" }}>Date and Time</div>
          <div className="text-sm" style={{ color: "var(--text-secondary)" }}>
            {date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}<br />
            {event.startTime}{event.endTime ? ` to ${event.endTime}` : ""}
          </div>
        </div>

        <div className="mb-4">
          <div className="text-sm font-bold mb-1.5" style={{ color: "var(--text-primary)" }}>Tags</div>
          <div className="flex flex-wrap gap-1.5">
            {event.tags.map(t => <span key={t} className="chip chip-accent">{t}</span>)}
          </div>
        </div>

        <div className="mb-5">
          <div className="text-sm font-bold mb-1" style={{ color: "var(--text-primary)" }}>Description</div>
          <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{event.description}</p>
        </div>

        {/* RSVP */}
        <div className="flex gap-2">
          {(["Going","Undecided","Not going"] as const).map(r => (
            <button
              key={r}
              onClick={() => setRsvp(r)}
              className="flex-1 py-2.5 rounded-xl text-xs font-bold pressable"
              style={{
                background: rsvp === r ? "var(--text-primary)" : "var(--surface-2)",
                color: rsvp === r ? "white" : "var(--text-secondary)",
                border: `1px solid ${rsvp === r ? "transparent" : "var(--border)"}`,
              }}
            >
              {r}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Create Event ────────────────────────────────────────────────────────────
function CreateEvent({ onClose }: { onClose: () => void }) {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");
  const [tags, setTags] = useState(["Team Social", "Hangout", "After Work"]);
  const [visibility, setVisibility] = useState<"Team" | "Organization">("Team");
  const [description, setDescription] = useState("");

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-5 pt-4 pb-3 flex-shrink-0">
        <div className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>Create Event</div>
        <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center pressable" style={{ background: "var(--surface-2)" }}>✓</button>
      </div>
      <div className="flex-1 overflow-y-auto scrollbar-hide px-5 pb-4">
        {/* Image upload */}
        <div className="w-full h-36 rounded-2xl mb-4 flex items-center justify-center" style={{ background: "var(--surface-2)", border: "1.5px dashed var(--border-strong)" }}>
          <span className="text-2xl opacity-40">📷</span>
        </div>

        <input className="field mb-3" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
        <input className="field mb-3" placeholder="Location" value={location} onChange={e => setLocation(e.target.value)} />

        <div className="grid grid-cols-3 gap-2 mb-3">
          <div className="text-sm font-medium flex items-center" style={{ color: "var(--text-secondary)" }}>Start</div>
          <input className="field col-span-1" placeholder="Date" value={startDate} onChange={e => setStartDate(e.target.value)} />
          <input className="field col-span-1" placeholder="Time" value={startTime} onChange={e => setStartTime(e.target.value)} />
          <div className="text-sm font-medium flex items-center" style={{ color: "var(--text-secondary)" }}>End</div>
          <input className="field col-span-1" placeholder="Date" value={endDate} onChange={e => setEndDate(e.target.value)} />
          <input className="field col-span-1" placeholder="Time" value={endTime} onChange={e => setEndTime(e.target.value)} />
        </div>

        <div className="mb-3">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>Tags</span>
            <button className="text-sm" style={{ color: "var(--accent)" }}>+</button>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {tags.map(t => (
              <button key={t} onClick={() => setTags(prev => prev.filter(x => x !== t))} className="chip chip-accent text-xs pressable">
                {t} ×
              </button>
            ))}
          </div>
        </div>

        <div className="mb-3">
          <div className="text-sm font-medium mb-2" style={{ color: "var(--text-secondary)" }}>Visibility</div>
          {(["Team","Organization"] as const).map(v => (
            <div key={v} className="flex items-center justify-between py-2.5 pressable" onClick={() => setVisibility(v)} style={{ borderBottom: "1px solid var(--border)" }}>
              <span className="text-sm" style={{ color: "var(--text-primary)" }}>{v === "Organization" ? "Organization (anyone)" : v}</span>
              <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center" style={{ borderColor: visibility === v ? "var(--accent)" : "var(--border)" }}>
                {visibility === v && <div className="w-2.5 h-2.5 rounded-full" style={{ background: "var(--accent)" }} />}
              </div>
            </div>
          ))}
        </div>

        <div>
          <div className="text-sm font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>Description</div>
          <textarea className="field resize-none" rows={3} placeholder="Write a little about the event..." value={description} onChange={e => setDescription(e.target.value)} />
        </div>
      </div>
    </div>
  );
}

// ─── Month Grid ───────────────────────────────────────────────────────────────
function MonthGrid({ events, selectedDay, onSelectDay, onSelectEvent }: {
  events: CalEvent[]; selectedDay: number | null;
  onSelectDay: (d: number) => void; onSelectEvent: (e: CalEvent) => void;
}) {
  const year = 2026; const month = 2; // March 2026
  const days = getDaysInMonth(year, month);
  const firstDay = getFirstDay(year, month);
  const cells: (number | null)[] = [...Array(firstDay).fill(null), ...Array.from({length: days}, (_,i) => i+1)];
  while (cells.length % 7 !== 0) cells.push(null);

  const eventsByDay: Record<number, CalEvent[]> = {};
  events.forEach(e => {
    const d = parseInt(e.date.split("-")[2]);
    if (!eventsByDay[d]) eventsByDay[d] = [];
    eventsByDay[d].push(e);
  });

  const selectedEvents = selectedDay ? (eventsByDay[selectedDay] || []) : [];
  const today = 19;

  return (
    <>
      {/* Grid */}
      <div className="grid grid-cols-7 px-3 mb-1 flex-shrink-0">
        {DAY_NAMES.map((d,i) => <div key={i} className="text-center py-1.5 text-xs font-semibold" style={{ color: "var(--text-tertiary)" }}>{d}</div>)}
      </div>
      <div className="grid grid-cols-7 px-3 flex-shrink-0">
        {cells.map((day, i) => {
          const isToday = day === today;
          const isSel = day === selectedDay;
          const hasEvents = day ? (eventsByDay[day]?.length ?? 0) > 0 : false;
          return (
            <div key={i} onClick={() => day && onSelectDay(day)} className="flex flex-col items-center py-0.5 cursor-pointer">
              <div
                className="w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium pressable"
                style={{
                  background: isSel ? "var(--text-primary)" : isToday ? "var(--accent-light)" : "transparent",
                  color: isSel ? "white" : isToday ? "var(--accent)" : day ? "var(--text-primary)" : "transparent",
                  fontWeight: isSel || isToday ? 700 : 400,
                }}
              >
                {day || ""}
              </div>
              {hasEvents && (
                <div className="flex gap-0.5 mt-0.5">
                  {(eventsByDay[day!] || []).slice(0,2).map((ev,j) => (
                    <div key={j} className="w-1.5 h-1.5 rounded-full" style={{ background: ev.scope === "Team" ? "var(--text-primary)" : "var(--text-tertiary)" }} />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div style={{ height: 1, background: "var(--border)", margin: "8px 12px" }} />
      {/* Day events */}
      <div className="overflow-y-auto scrollbar-hide flex-1 pb-2">
        {selectedDay && (
          <div className="px-4 pb-1 text-sm font-bold" style={{ color: "var(--text-secondary)" }}>
            Today {["January","February","March"][month]} {selectedDay}
          </div>
        )}
        {selectedEvents.map(ev => (
          <button key={ev.id} onClick={() => onSelectEvent(ev)} className="w-full px-4 mb-2 text-left pressable">
            <div className="flex items-start gap-3 py-2.5" style={{ borderLeft: `3px solid ${ev.color}`, paddingLeft: 12 }}>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{ev.title}</div>
                    <div className="text-xs mt-0.5" style={{ color: "var(--text-secondary)" }}>{ev.startTime} · {ev.location}</div>
                  </div>
                  <div>
                    <div className="text-xs font-semibold" style={{ color: ev.rsvp === "Going" ? "var(--green)" : ev.rsvp === "Not going" ? "var(--red)" : "var(--text-tertiary)" }}>
                      RSVP
                    </div>
                    <div className="text-xs" style={{ color: "var(--text-secondary)" }}>{ev.rsvp}</div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {ev.tags.slice(0,3).map(t => <span key={t} className="chip" style={{ fontSize: 10 }}>{t}</span>)}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </>
  );
}

// ─── List View ────────────────────────────────────────────────────────────────
function ListView({ events, onSelectEvent }: { events: CalEvent[]; onSelectEvent: (e: CalEvent) => void }) {
  const groups = [
    { label: "This Week", sub: "March 19-21", dates: ["2026-03-19","2026-03-20","2026-03-21"] },
    { label: "Next Week", sub: "March 24-28", dates: ["2026-03-24","2026-03-25","2026-03-26","2026-03-27","2026-03-28"] },
    { label: "Next Week", sub: "March 29 Onwards", dates: ["2026-03-29","2026-03-30","2026-03-31"] },
  ];

  return (
    <div className="flex-1 overflow-y-auto scrollbar-hide pb-4">
      {groups.map((group, gi) => {
        const groupEvents = events.filter(e => group.dates.includes(e.date));
        if (groupEvents.length === 0) return null;
        const byDate: Record<string, CalEvent[]> = {};
        groupEvents.forEach(e => { if (!byDate[e.date]) byDate[e.date] = []; byDate[e.date].push(e); });

        return (
          <div key={gi}>
            <div className="px-4 pt-3 pb-2">
              <span className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>{group.label} </span>
              <span className="text-sm" style={{ color: "var(--text-tertiary)" }}>{group.sub}</span>
            </div>
            {Object.entries(byDate).sort().map(([date, evs]) => {
              const d = new Date(date + "T00:00:00");
              const dayNum = d.getDate();
              const dayName = d.toLocaleDateString("en-US", { weekday: "short" });
              return evs.map(ev => (
                <button key={ev.id} onClick={() => onSelectEvent(ev)} className="w-full px-4 mb-2 text-left pressable">
                  <div className="flex gap-3">
                    <div className="w-12 flex-shrink-0 text-right">
                      <div className="text-base font-bold" style={{ color: "var(--text-primary)" }}>{dayNum}</div>
                      <div className="text-xs" style={{ color: "var(--text-tertiary)" }}>{dayName}</div>
                    </div>
                    <div className="flex-1 rounded-2xl p-3" style={{ background: "var(--surface)", border: "1px solid var(--border)", borderLeft: `3px solid ${ev.color}` }}>
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <div>
                          <div className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{ev.title}</div>
                          <div className="text-xs mt-0.5" style={{ color: "var(--text-secondary)" }}>{ev.startTime} · {ev.location}</div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <div className="text-xs font-semibold" style={{ color: "var(--text-tertiary)" }}>RSVP</div>
                          <div className="text-xs font-bold" style={{ color: ev.rsvp === "Going" ? "var(--green)" : ev.rsvp === "Not going" ? "var(--red)" : "var(--amber)" }}>
                            {ev.rsvp}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <div className="flex -space-x-1">
                          {[0,1,2].map(i => <div key={i} className="w-4 h-4 rounded-full border border-white" style={{ background: "var(--surface-2)" }} />)}
                        </div>
                        <span className="text-xs" style={{ color: "var(--text-tertiary)" }}>{ev.attendees} going</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {ev.tags.slice(0,4).map(t => <span key={t} className="chip" style={{ fontSize: 9, padding: "2px 8px" }}>{t}</span>)}
                      </div>
                    </div>
                  </div>
                </button>
              ));
            })}
          </div>
        );
      })}
    </div>
  );
}

// ─── Main Calendar ────────────────────────────────────────────────────────────
export default function CalendarScreen() {
  const [view, setView] = useState<CalView>("calendar");
  const [selectedDay, setSelectedDay] = useState<number | null>(19);
  const [selectedEvent, setSelectedEvent] = useState<CalEvent | null>(null);
  const [showCreate, setShowCreate] = useState(false);

  if (selectedEvent) {
    return <EventDetail event={selectedEvent} onClose={() => setSelectedEvent(null)} />;
  }
  if (showCreate) {
    return <CreateEvent onClose={() => setShowCreate(false)} />;
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-4 pb-2 flex-shrink-0">
        <div>
          <div className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>Shared Events</div>
          <div className="text-xs font-semibold mt-0.5" style={{ color: "var(--text-tertiary)" }}>March 2026</div>
        </div>
        <div className="flex items-center gap-2">
          <button className="w-8 h-8 rounded-full flex items-center justify-center pressable" style={{ background: "var(--surface-2)" }}>🔍</button>
          <button onClick={() => setShowCreate(true)} className="w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold pressable" style={{ background: "var(--text-primary)", color: "white" }}>+</button>
          {/* Segmented */}
          <div className="flex rounded-full p-0.5" style={{ background: "var(--surface-2)" }}>
            {(["calendar","list"] as const).map(v => (
              <button
                key={v}
                onClick={() => setView(v)}
                className="px-3 py-1 rounded-full text-xs font-bold pressable"
                style={{ background: view === v ? "var(--surface)" : "transparent", color: view === v ? "var(--text-primary)" : "var(--text-tertiary)" }}
              >
                {v === "calendar" ? "Calendar" : "List"}
              </button>
            ))}
          </div>
        </div>
      </div>

      {view === "calendar" ? (
        <MonthGrid events={CALENDAR_EVENTS} selectedDay={selectedDay} onSelectDay={setSelectedDay} onSelectEvent={setSelectedEvent} />
      ) : (
        <ListView events={CALENDAR_EVENTS} onSelectEvent={setSelectedEvent} />
      )}

      {/* Legend */}
      <div className="flex items-center gap-4 px-4 py-2 flex-shrink-0" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full" style={{ background: "var(--text-primary)" }} />
          <span className="text-xs" style={{ color: "var(--text-tertiary)" }}>Team</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full" style={{ background: "var(--text-tertiary)" }} />
          <span className="text-xs" style={{ color: "var(--text-tertiary)" }}>Organization</span>
        </div>
      </div>

      {/* FAB */}
      <button
        onClick={() => setShowCreate(true)}
        className="absolute bottom-20 right-4 px-5 py-3 rounded-full text-sm font-bold text-white pressable"
        style={{ background: "var(--surface-2)", color: "var(--text-tertiary)", border: "1px solid var(--border)" }}
      >
        ＋
      </button>
    </div>
  );
}
