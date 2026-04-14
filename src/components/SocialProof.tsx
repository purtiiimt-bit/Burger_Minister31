"use client";

import { useState, useEffect } from "react";

// Random count between 1-18
function getDynamicCount(): number {
  return Math.floor(Math.random() * 18) + 1;
}

// Random last-order between 1-15 mins
function getLastOrderMins(): number {
  return Math.floor(Math.random() * 15) + 1;
}

export default function SocialProof() {
  const [count, setCount] = useState(5);
  const [mins, setMins] = useState(3);

  useEffect(() => {
    setCount(getDynamicCount());
    setMins(getLastOrderMins());

    // Update every 30 seconds
    const interval = setInterval(() => {
      setCount(getDynamicCount());
      setMins(getLastOrderMins());
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const avatars = [
    { letter: "R", bg: "bg-green-700" },
    { letter: "S", bg: "bg-green-600" },
    { letter: "A", bg: "bg-green-500" },
  ];

  return (
    <div className="mb-6 flex items-center gap-3 rounded-2xl border border-secondary/20 bg-secondary/5 p-3 sm:p-4">
      {/* Avatar stack */}
      <div className="flex shrink-0 -space-x-2">
        {avatars.map((a, i) => (
          <div
            key={i}
            className={`flex h-8 w-8 items-center justify-center rounded-full border-2 border-surface text-xs font-bold text-white ${a.bg}`}
          >
            {a.letter}
          </div>
        ))}
      </div>

      {/* Text */}
      <div className="min-w-0 flex-1">
        <p className="text-xs leading-snug text-on-surface/80 sm:text-sm">
          <span className="font-bold text-on-surface">{count} people</span>
          <span className="text-on-surface/60"> from Sector 58 ordered today</span>
          <span className="hidden text-on-surface/40 sm:inline">
            {" "}· Last order {mins} mins ago
          </span>
        </p>
        <p className="mt-0.5 text-xs text-on-surface/40 sm:hidden">
          Last order {mins} mins ago
        </p>
      </div>

      {/* Live pulse dot */}
      <div className="relative flex h-2 w-2 shrink-0">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
      </div>
    </div>
  );
}
