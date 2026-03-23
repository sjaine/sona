export type Tab = "home" | "profile" | "community" | "quests" | "calendar";
export type CalView = "calendar" | "list";

export interface User {
  name: string;
  role: string;
  team: string;
  bio: string;
  interests: string[];
  level: number;
  xp: number;
  xpToNext: number;
  status: "Focused" | "Available" | "In a meeting" | "Away";
  openToMentorship: boolean;
}

export interface Comment {
  id: string;
  author: string;
  initials: string;
  color: string;
  text: string;
  timeAgo: string;
}

export interface TeamMember {
  name: string;
  initials: string;
  color: string;
  status: "Focused" | "Available" | "In a meeting" | "Away";
}

export interface Post {
  id: string;
  author: string; authorRole: string; authorInitials: string; authorColor: string;
  channel: string; scope: "Public" | "Team";
  content: string; image?: boolean;
  timeAgo: string;
  reactions: { emoji: string; count: number }[];
  comments: number;
  liked: boolean;
  commentList: Comment[];
}

export interface Quest {
  id: string; title: string; subtitle: string;
  icon: string; xp: number;
  type: "In-Person" | "Digital" | "Social";
  status: "done" | "start" | "locked";
  section: "onboarding" | "daily" | "career";
}

export interface CalEvent {
  id: string; title: string; date: string;
  startTime: string; endTime: string;
  location: string; locationAddress?: string;
  organizer: string; scope: "Team" | "Organization";
  rsvp: "Going" | "Not going" | "Undecided";
  tags: string[]; description: string;
  attendees: number; color: string;
}

export const CURRENT_USER: User = {
  name: "Jasmine K.", role: "IT Administrator", team: "IT Team",
  bio: "Donec sagittis leo quis pharetra ornare. Quis accumsan justo. Nullam id arcu tristique, lobortis ligula non, finibus tellus.",
  interests: ["Games", "Food", "etc"],
  level: 10, xp: 30, xpToNext: 90,
  status: "Focused", openToMentorship: true,
};

export const TEAM_MEMBERS: TeamMember[] = [
  { name: "Maya",    initials: "MA", color: "#C8E8F8", status: "Available" },
  { name: "Bob",     initials: "BS", color: "#DCF5E8", status: "In a meeting" },
  { name: "Steve",   initials: "ST", color: "#F0E3FE", status: "Focused" },
  { name: "Nayeong", initials: "NC", color: "#FEF3DC", status: "Away" },
];

export const FEED_POSTS: Post[] = [
  {
    id: "p1", author: "Maya", authorRole: "Product Designer",
    authorInitials: "MA", authorColor: "#C8E8F8",
    channel: "Social", scope: "Public",
    content: "Maya just finished onboarding week 2 task!",
    timeAgo: "now",
    reactions: [{ emoji: "👏", count: 1 }, { emoji: "🔥", count: 3 }, { emoji: "🎉", count: 5 }],
    comments: 1, liked: false,
    commentList: [
      {
        id: "c0",
        author: "Bob S.",
        initials: "BS",
        color: "#DCF5E8",
        text: "Wowww congrats :)",
        timeAgo: "now",
      }
    ],
    
  },
  {
    id: "p2", author: "Bob S.", authorRole: "Senior IT Engineer",
    authorInitials: "BS", authorColor: "#DCF5E8",
    channel: "Pet", scope: "Team",
    content: "I just got a new dog! Isn't he cute?",
    image: true, timeAgo: "5 mins ago",
    reactions: [], comments: 0, liked: false,
    commentList: [],
  },
  {
    id: "p3", author: "Nayeong C.", authorRole: "UX Designer",
    authorInitials: "NC", authorColor: "#FEF3DC",
    channel: "Food", scope: "Public",
    content: "Found the best ramen near the office — Tantan Noodles 🍜 highly recommend the spicy broth!",
    timeAgo: "1h ago",
    reactions: [{ emoji: "😍", count: 8 }], comments: 3, liked: true,
    commentList: [
      {
        id: "c0",
        author: "Bob S.",
        initials: "BS",
        color: "#DCF5E8",
        text: "Wowww congrats :)",
        timeAgo: "now",
      }, {
        id: "c0",
        author: "Francine",
        initials: "FP",
        color: "#FFC943",
        text: "Ayeeee",
        timeAgo: "now",
      }, {
        id: "c0",
        author: "Hayat",
        initials: "HG",
        color: "#39D4B3",
        text: "I need to go there!",
        timeAgo: "now",
      }
    ],
  },
];

export const DAILY_PROMPT = {
  number: 96,
  question: "Who is the person you'd like to say \"Thank you\" to?",
  completedBy: 16,
  answers: ["Sona", "Jaine", "Maya", "Steve", "Nayeong", "Gladdens", "Jessie"],
};

export const QUESTS: Quest[] = [
  { id: "q1", title: "First post to community", subtitle: "Post anything to community!", icon: "📝", xp: 10, type: "In-Person", status: "done", section: "onboarding" },
  { id: "q2", title: "Take a tour of your workplace", subtitle: "Explore your new office!", icon: "👤", xp: 10, type: "In-Person", status: "done", section: "onboarding" },
  { id: "q3", title: "Try to book a meeting room", subtitle: "Practice booking a room", icon: "🔖", xp: 10, type: "In-Person", status: "start", section: "onboarding" },
  { id: "d1", title: "Answer to daily prompt", subtitle: "Share your thoughts", icon: "📝", xp: 10, type: "Digital", status: "start", section: "daily" },
  { id: "d2", title: "Coffee chat with 1 peer", subtitle: "Connect with a colleague", icon: "👤", xp: 10, type: "In-Person", status: "start", section: "daily" },
  { id: "m1", title: "Complete profile", subtitle: "Fill in all profile fields", icon: "⭐", xp: 20, type: "Digital", status: "locked", section: "career" },
  { id: "m2", title: "100 XP milestone", subtitle: "Earn 100 total XP", icon: "🏆", xp: 50, type: "Digital", status: "locked", section: "career" },
];

export const CALENDAR_EVENTS: CalEvent[] = [
  {
    id: "e1", title: "Team Climbing", date: "2026-03-19",
    startTime: "4:00 PM", endTime: "7:00 PM",
    location: "Sona Climbing", locationAddress: "165 McIntosh Dr, Markham, ON L3R 0N6",
    organizer: "Jady L.", scope: "Team", rsvp: "Going",
    tags: ["Team Social", "After Work", "Hangout", "Sports"],
    description: "Hey team! We're planning a casual after-work climbing hangout. Come by and hang out! It's mainly a chance to get out, chat, and spend some time together outside of work.",
    attendees: 5, color: "#5B4FE8",
  },
  {
    id: "e2", title: "Dinner", date: "2026-03-19",
    startTime: "7:00 PM", endTime: "9:00 PM",
    location: "Lin Ahn", locationAddress: "200 Front St, Toronto, ON",
    organizer: "Maya T.", scope: "Team", rsvp: "Not going",
    tags: ["Team Social", "After Work", "Hangout", "Food"],
    description: "Team dinner at Lin Ahn. Great Korean food, come join us!",
    attendees: 3, color: "#E8784A",
  },
  {
    id: "e3", title: "Pottery", date: "2026-03-20",
    startTime: "5:30 PM", endTime: "8:00 PM",
    location: "Again Again", locationAddress: "50 Ossington Ave, Toronto, ON",
    organizer: "Sarah K.", scope: "Organization", rsvp: "Undecided",
    tags: ["Organization Social", "After Work", "Hangout", "Art"],
    description: "Intro pottery class at Again Again studio. No experience needed — just good vibes.",
    attendees: 18, color: "#3DAA6B",
  },
  {
    id: "e4", title: "Offsite Happy Hour", date: "2026-03-27",
    startTime: "6:00 PM", endTime: "9:00 PM",
    location: "Rooftop Bar", locationAddress: "1 King St W, Toronto, ON",
    organizer: "HR Team", scope: "Organization", rsvp: "Going",
    tags: ["Organization Social", "After Work", "Hangout", "Food & Drinks"],
    description: "Monthly offsite happy hour on the rooftop. Drinks and appetizers provided.",
    attendees: 37, color: "#E8784A",
  },
  {
    id: "e5", title: "Games Night", date: "2026-03-31",
    startTime: "3:00 PM", endTime: "6:00 PM",
    location: "Game Room", locationAddress: "Office - Floor 3",
    organizer: "Fun Committee", scope: "Organization", rsvp: "Not going",
    tags: ["Organization Social", "Hangout", "Games", "Food & Drinks"],
    description: "Board games, snacks, and good company. Come unwind after the work week!",
    attendees: 37, color: "#5B4FE8",
  },
  {
    id: "e10", title: "Morning Standup", date: "2026-03-10",
    startTime: "9:00 AM", endTime: "9:15 AM",
    location: "Zoom", locationAddress: "",
    organizer: "Sarah K.", scope: "Team", rsvp: "Going",
    tags: ["Team Social"],
    description: "Daily team standup.",
    attendees: 8, color: "#5B4FE8",
  },
];
