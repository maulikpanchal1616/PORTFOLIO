// Force Vercel rebuild to update metadata title
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
  title: "Maulik Panchal | Full Stack Developer | AI Developer | Ahmedabad",
  description: "Maulik Panchal is a BCA graduate and Full Stack Developer from Ahmedabad specializing in React, Next.js, AI applications, Python, Django, and modern web development projects.",
  keywords: [
    "Maulik Panchal",
    "Full Stack Developer Ahmedabad",
    "React Developer",
    "Next.js Developer",
    "AI Developer",
    "Python Developer",
    "BCA Developer Gujarat",
    "Web Developer Portfolio"
  ],
  authors: [{ name: "Maulik Panchal" }],
  creator: "Maulik Panchal",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Maulik Panchal | Full Stack Developer | AI Developer | Ahmedabad",
    description: "Maulik Panchal is a BCA graduate and Full Stack Developer from Ahmedabad specializing in React, Next.js, AI applications, Python, Django, and modern web development projects.",
    url: "/",
    siteName: "Maulik Panchal Portfolio",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Maulik Panchal | Full Stack Developer | AI Developer | Ahmedabad",
    description: "Maulik Panchal is a BCA graduate and Full Stack Developer from Ahmedabad specializing in React, Next.js, AI applications, Python, Django, and modern web development projects.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

import Global3DBackground from "@/components/ui/Global3DBackground";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Maulik Panchal",
    "jobTitle": "Full Stack Developer",
    "url": "https://maulikvp.vercel.app",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Ahmedabad",
      "addressRegion": "Gujarat",
      "addressCountry": "India"
    },
    "knowsAbout": [
      "React",
      "Next.js",
      "Python",
      "Django",
      "AI",
      "Web Development"
    ],
    "sameAs": [
      "https://github.com/maulikpanchal1616",
      "https://linkedin.com/in/maulik-panchal-260621295"
    ]
  };

  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${outfit.variable} h-full antialiased overflow-x-clip`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body suppressHydrationWarning className="min-h-full flex flex-col font-sans selection:bg-[var(--color-electric-blue)] selection:text-black bg-transparent">
        <Global3DBackground />
        <SmoothScroll>
          <CustomCursor />
          <Navbar />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
