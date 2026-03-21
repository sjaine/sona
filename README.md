# Sprout — Employee Onboarding App

A Next.js 14 + Tailwind CSS mobile app prototype.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Stack
- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **DM Sans** font (Google Fonts)

## Design Tokens
All colors are CSS variables in `globals.css`:
- `--bg`, `--surface`, `--surface-2` — backgrounds
- `--accent` — primary purple (#5B4FE8)
- `--accent-2` — coral/orange (#E8784A)
- `--green`, `--amber`, `--red` — status colors

## Screens

### 🏠 Home Dashboard
- Mascot with level badge + XP display
- Work status picker (Focused / Available / In a meeting / Away)
- Team member avatars + View Team
- Quest mini-cards + Daily Activity preview (side by side)
- Community latest post preview
- Daily Prompt sheet with answer + word cloud result

### 👤 Profile
- Main view: avatar, mascot, status, team, bio preview, interests
- Edit Profile: name, birthday, role/team, bio, mentorship toggle, interests
- Bio full view: hero image, full bio, interests

### 👥 Community
- Post composer bar (Public / Team scope toggle)
- Daily Activity #96 card → opens prompt screen → result word cloud
- Channel filter (All / Pet / Food / Sport)
- Feed with emoji reactions (tap + to add)
- Inline comment preview

### ⭐ Quests
- Onboarding section (Week 01/12) with Done / Start buttons
- Daily Quest with countdown timer
- Career Milestones (locked)
- Quest detail sheet on Start tap

### 📅 Calendar (Shared Events)
- **Calendar view**: full month grid, dot indicators, tap day → event list below
- **List view**: grouped by This Week / Next Week with date column
- Event detail: location + Open in Maps, attendees, RSVP toggle, tags, description
- Create Event form: image upload, title, location, start/end, tags, visibility (Team / Organization), description

## File Structure
```
src/
├── app/
│   ├── globals.css       Design tokens + animations
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── PhoneShell.tsx    Phone frame + 5-tab nav
│   ├── screens/
│   │   ├── HomeScreen.tsx
│   │   ├── ProfileScreen.tsx
│   │   ├── CommunityScreen.tsx
│   │   ├── QuestsScreen.tsx
│   │   └── CalendarScreen.tsx
│   └── ui/
│       ├── Mascot.tsx     Line-art SVG mascot
│       ├── LevelBadge.tsx Hexagon level badge
│       └── Avatar.tsx
└── lib/
    └── data.ts           All types + seed data
```
