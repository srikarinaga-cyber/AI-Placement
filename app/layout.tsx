import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Placement Mentor - Tier-2 & Tier-3 Students",
  description:
    "AI-powered personalized placement mentor for Tier-2 and Tier-3 Indian engineering & degree students.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="light">
      <body>{children}</body>
    </html>
  );
}
