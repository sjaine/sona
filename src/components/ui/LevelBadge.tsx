"use client";

interface LevelBadgeProps { level: number; size?: number; }

export default function LevelBadge({ level, size = 28 }: LevelBadgeProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M14 2 L24 7.5 L24 20.5 L14 26 L4 20.5 L4 7.5 Z"
        fill="#5B4FE8" stroke="#4338D4" strokeWidth="1"
      />
      <text
        x="14" y="18"
        textAnchor="middle"
        fill="white"
        fontSize="10"
        fontWeight="700"
        fontFamily="DM Sans, sans-serif"
      >{level}</text>
    </svg>
  );
}
