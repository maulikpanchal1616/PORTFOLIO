import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/layout/SmoothScroll";
import CustomCursor from "@/components/layout/CustomCursor";
import Navbar from "@/components/layout/Navbar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Maulik Panchal | Premium Cinematic Portfolio",
  description: "Explore the cinematic portfolio of Maulik Panchal, a Full Stack Developer specializing in premium, award-winning digital experiences. Bridging the gap between futuristic UI/UX design and robust engineering, I craft high-performance web applications, immersive 3D interfaces, and AI-powered solutions that elevate brands into the next digital era.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${outfit.variable} h-full antialiased overflow-x-hidden`}>
      <body suppressHydrationWarning className="min-h-full flex flex-col font-sans selection:bg-[var(--color-electric-blue)] selection:text-black">
        <SmoothScroll>
          <CustomCursor />
          <Navbar />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
