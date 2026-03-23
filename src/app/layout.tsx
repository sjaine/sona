import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sprout — Employee Onboarding",
  description: "Your onboarding companion",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex items-center justify-center overflow-hidden">
        {children}
      </body>
    </html>
  );
}
