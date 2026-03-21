"use client";

interface AvatarProps {
  initials: string; color?: string; size?: number;
  textColor?: string; className?: string;
}

export default function Avatar({ initials, color = "#E8E4DC", size = 36, textColor = "#6B6560", className = "" }: AvatarProps) {
  return (
    <div
      className={`flex items-center justify-center rounded-full flex-shrink-0 font-semibold ${className}`}
      style={{ width: size, height: size, background: color, color: textColor, fontSize: size * 0.33 }}
    >
      {initials}
    </div>
  );
}
