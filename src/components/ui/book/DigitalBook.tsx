"use client";

import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";

// Dynamically import the BookViewer so it only runs on the client-side.
// react-pageflip uses the window object which breaks Next.js Server-Side Rendering (SSR).
const BookViewer = dynamic(() => import("./BookViewer"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[600px] flex flex-col items-center justify-center bg-[#111] border border-white/10 shadow-2xl rounded-lg">
      <Loader2 className="w-8 h-8 animate-spin text-cyan-500 mb-4" />
      <p className="text-white/50 font-mono text-sm tracking-widest uppercase">Opening Book...</p>
    </div>
  ),
});

export default function DigitalBook({ chapters }: { chapters: any[] }) {
  return (
    <div className="w-full max-w-[1200px] mx-auto py-10 md:py-20 flex justify-center perspective-[2000px]">
      <BookViewer chapters={chapters} />
    </div>
  );
}
