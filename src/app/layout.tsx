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
  title: "MaulikVP | Freelance Web Developer Ahmedabad | Next.js & React Developer Gujarat India",
  description:
    "MaulikVP is a freelance web developer based in Ahmedabad, Gujarat, India. Specializing in business website development, portfolio websites, startup websites, Next.js, React, and custom full stack web development for small businesses and startups across India.",
  keywords: [
    // Primary keywords
    "freelance web developer ahmedabad",
    "website developer ahmedabad",
    "website developer gujarat",
    "freelance web developer gujarat",
    "freelance full stack developer india",
    "business website developer india",
    "startup website developer india",
    "portfolio website developer india",
    "nextjs developer india",
    "react developer india",
    "custom website developer india",
    "professional website developer india",
    "modern website developer india",
    "seo friendly website developer india",
    // Secondary keywords
    "affordable website developer",
    "website developer for small business",
    "website developer for startups",
    "fast website developer",
    "responsive website developer",
    "website redesign expert",
    "landing page developer",
    "portfolio website creator",
    // Brand + name
    "Maulik Panchal",
    "MaulikVP",
    "Full Stack Developer Ahmedabad",
    "Next.js Developer Ahmedabad",
    "React Developer Ahmedabad",
    "web developer ahmedabad",
    "web developer gujarat",
    "web developer india",
    // Services
    "business website development",
    "portfolio website development",
    "startup website development",
    "landing page development",
    "full stack web development",
    "custom website development",
    "responsive website development",
    "modern website design",
    "website redesign services",
    "seo friendly website development",
    "next.js website development",
    "react website development",
    "personal branding website",
    "performance optimization services",
  ],
  authors: [{ name: "Maulik Panchal", url: "https://maulikvp.vercel.app" }],
  creator: "Maulik Panchal",
  publisher: "MaulikVP",
  category: "Web Development Services",
  alternates: {
    canonical: "https://maulikvp.vercel.app",
  },
  openGraph: {
    title: "MaulikVP | Freelance Web Developer Ahmedabad | Next.js & React Developer Gujarat India",
    description:
      "Freelance web developer from Ahmedabad specializing in business websites, portfolio websites, startup websites, and full stack Next.js & React development for clients across India.",
    url: "https://maulikvp.vercel.app",
    siteName: "MaulikVP — Freelance Web Development Services",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "https://maulikvp.vercel.app/images/profile.png",
        width: 1200,
        height: 630,
        alt: "Maulik Panchal — Freelance Web Developer in Ahmedabad, Gujarat, India",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MaulikVP | Freelance Web Developer Ahmedabad | Next.js & React Developer Gujarat India",
    description:
      "Freelance web developer from Ahmedabad specializing in business websites, portfolio websites, startup websites, and full stack Next.js & React development for clients across India.",
    images: ["https://maulikvp.vercel.app/images/profile.png"],
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
import PremiumWatermark from "@/components/ui/PremiumWatermark";
import ScrollProgressBar from "@/components/layout/ScrollProgressBar";
import { GoogleAnalytics } from '@next/third-parties/google';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // JSON-LD Schema 1: Person
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://maulikvp.vercel.app/#person",
    "name": "Maulik Panchal",
    "alternateName": "MaulikVP",
    "jobTitle": "Freelance Web Developer",
    "description": "Freelance web developer based in Ahmedabad, Gujarat, India, specializing in business website development, portfolio websites, startup websites, Next.js, React, and full stack web development.",
    "url": "https://maulikvp.vercel.app",
    "email": "maulikvpanchal2006@gmail.com",
    "image": "https://maulikvp.vercel.app/images/profile.png",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Ahmedabad",
      "addressRegion": "Gujarat",
      "addressCountry": "IN"
    },
    "areaServed": [
      { "@type": "City", "name": "Ahmedabad" },
      { "@type": "City", "name": "Gandhinagar" },
      { "@type": "State", "name": "Gujarat" },
      { "@type": "Country", "name": "India" }
    ],
    "knowsAbout": [
      "Business Website Development",
      "Portfolio Website Development",
      "Startup Website Development",
      "Landing Page Development",
      "Full Stack Web Development",
      "Next.js Development",
      "React Development",
      "Custom Website Development",
      "SEO Friendly Website Development",
      "Website Redesign Services",
      "Performance Optimization",
      "Personal Branding Website Development",
      "JavaScript",
      "TypeScript",
      "Python",
      "Django"
    ],
    "hasOccupation": {
      "@type": "Occupation",
      "name": "Freelance Web Developer",
      "occupationalCategory": "15-1256.00",
      "description": "Designs and develops custom websites and web applications for businesses, startups, and individuals.",
      "occupationLocation": {
        "@type": "City",
        "name": "Ahmedabad"
      }
    },
    "sameAs": [
      "https://github.com/maulikpanchal1616",
      "https://linkedin.com/in/maulik-panchal-260621295"
    ]
  };

  // JSON-LD Schema 2: ProfessionalService + Organization
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": ["ProfessionalService", "Organization"],
    "@id": "https://maulikvp.vercel.app/#service",
    "name": "MaulikVP",
    "legalName": "MaulikVP Web Development Services",
    "description": "MaulikVP provides freelance web development services for businesses, startups, and professionals across Ahmedabad, Gujarat, and India. Services include business website development, portfolio website development, startup website development, landing page development, full stack Next.js and React development, custom website development, SEO-friendly website development, website redesign, and performance optimization.",
    "url": "https://maulikvp.vercel.app",
    "email": "maulikvpanchal2006@gmail.com",
    "image": "https://maulikvp.vercel.app/images/profile.png",
    "founder": {
      "@id": "https://maulikvp.vercel.app/#person"
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Ahmedabad",
      "addressRegion": "Gujarat",
      "addressCountry": "IN"
    },
    "areaServed": [
      { "@type": "City", "name": "Ahmedabad" },
      { "@type": "City", "name": "Gandhinagar" },
      { "@type": "State", "name": "Gujarat" },
      { "@type": "Country", "name": "India" }
    ],
    "serviceType": "Web Development",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Web Development Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Business Website Development",
            "description": "Professional business websites for small businesses and local businesses in Ahmedabad, Gujarat, and India."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Portfolio Website Development",
            "description": "Custom portfolio websites for professionals, freelancers, and creatives across India."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Startup Website Development",
            "description": "Fast, modern startup websites built to attract investors and customers for Indian startups."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Landing Page Development",
            "description": "High-converting landing pages for campaigns, products, and services."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Full Stack Web Development",
            "description": "End-to-end full stack web application development using Next.js, React, Node.js, and modern databases."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Next.js Website Development",
            "description": "Fast, SEO-optimized websites and web apps built with Next.js for businesses across India."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "React Website Development",
            "description": "Dynamic, interactive web applications built with React for startups and businesses."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Custom Website Development",
            "description": "Fully custom website design and development tailored to specific business requirements."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "SEO Friendly Website Development",
            "description": "Websites built with on-page SEO best practices, fast load times, and search engine optimization for better Google rankings."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Website Redesign Services",
            "description": "Modernize and redesign outdated websites to improve performance, aesthetics, and user experience."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Performance Optimization Services",
            "description": "Website speed optimization, Core Web Vitals improvement, and load time reduction for existing websites."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Personal Branding Website Development",
            "description": "Professional personal branding websites for freelancers, professionals, and entrepreneurs."
          }
        }
      ]
    },
    "sameAs": [
      "https://github.com/maulikpanchal1616",
      "https://linkedin.com/in/maulik-panchal-260621295"
    ]
  };

  // JSON-LD Schema 3: WebSite with SearchAction
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://maulikvp.vercel.app/#website",
    "name": "MaulikVP — Freelance Web Developer Ahmedabad",
    "url": "https://maulikvp.vercel.app",
    "description": "Official portfolio and service website of MaulikVP, a freelance web developer in Ahmedabad, Gujarat, India.",
    "publisher": {
      "@id": "https://maulikvp.vercel.app/#person"
    },
    "inLanguage": "en-IN"
  };

  // JSON-LD Schema 4: FAQPage
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Are you available for freelance web development projects in Ahmedabad?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, MaulikVP is a freelance web developer based in Ahmedabad, Gujarat, India, available for business website development, portfolio website development, startup websites, and full stack web development projects both locally and remotely across India."
        }
      },
      {
        "@type": "Question",
        "name": "What web development services do you offer?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "MaulikVP offers business website development, portfolio website development, startup website development, landing page development, full stack web development, Next.js development, React development, custom website development, SEO-friendly website development, website redesign services, performance optimization, and personal branding website development."
        }
      },
      {
        "@type": "Question",
        "name": "Do you build websites using Next.js and React?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. MaulikVP specializes in Next.js and React development, building fast, SEO-optimized, and modern web applications for businesses and startups across Gujarat and India."
        }
      },
      {
        "@type": "Question",
        "name": "Can you build a website for my small business?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely. MaulikVP provides professional business website development services tailored for small businesses, local businesses, startups, and entrepreneurs in Ahmedabad, Gujarat, and across India."
        }
      },
      {
        "@type": "Question",
        "name": "Do you create SEO-friendly websites?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Every website built by MaulikVP follows SEO best practices including proper meta tags, fast load times, semantic HTML, mobile responsiveness, Core Web Vitals optimization, and structured data — to help your site rank better on Google."
        }
      },
      {
        "@type": "Question",
        "name": "Are you available for remote web development work across India?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. While based in Ahmedabad, Gujarat, MaulikVP is available for remote freelance web development projects for clients across India, including Mumbai, Delhi, Bangalore, Surat, and beyond."
        }
      },
      {
        "@type": "Question",
        "name": "Can you redesign my existing website?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. MaulikVP offers website redesign services to modernize outdated websites, improve performance, upgrade UI/UX design, and make them mobile-responsive and search engine friendly."
        }
      },
      {
        "@type": "Question",
        "name": "What technologies do you use for web development?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "MaulikVP uses Next.js, React, TypeScript, JavaScript, Node.js, Python, Django, PostgreSQL, Supabase, TailwindCSS, Framer Motion, and other modern technologies to build premium web applications."
        }
      }
    ]
  };

  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${outfit.variable} h-full antialiased overflow-x-clip`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </head>
      <body suppressHydrationWarning className="min-h-full flex flex-col font-sans selection:bg-[var(--color-electric-blue)] selection:text-black bg-transparent">
        <Global3DBackground />
        <SmoothScroll>
          <CustomCursor />
          <ScrollProgressBar />
          <Navbar />
          {children}
          <PremiumWatermark />
        </SmoothScroll>
      </body>
      <GoogleAnalytics gaId="G-NEJR81JXWF" />
    </html>
  );
}
