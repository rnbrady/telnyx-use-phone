"use client";

import Phone from "@/components/phone";
import WorldMap from "@/components/svg/world";

export default function Home() {
  return (
    <div className="min-h-screen w-screen flex flex-col items-center justify-start font-[family-name:var(--font-geist-sans)]">
      <WorldMap className="absolute text-emerald-500 shrink -z-10 opacity-10 w-screen px-24" />
      <main className="flex flex-col gap-8 items-center  p-4">
        <h1 className="text-4xl font-bold text-gray-600">usePhone Demo</h1>
        <Phone />
      </main>
    </div>
  );
}
