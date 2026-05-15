import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vistara - Professional Video Editing & Content Creation",
  description: "BBA student & freelance video editor specializing in corporate videos, social media content, and creative storytelling. Transform your vision into compelling visual narratives.",
  keywords: "video editing, content creation, freelance video editor, BBA student, Vistara, video production, social media content, motion graphics",
  authors: [{ name: "Vistara" }],
  openGraph: {
    title: "Vistara - Professional Video Editing",
    description: "Transform your vision into compelling visual narratives",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}