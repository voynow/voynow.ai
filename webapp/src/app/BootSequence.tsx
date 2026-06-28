"use client";

import { useEffect, useState } from "react";
import CandleChart from "./CandleChart";

const DURATION = 2000;
const FADE = 450;
const STEP = 60;

export default function BootSequence() {
  const [pct, setPct] = useState(0);
  const [fading, setFading] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setGone(true);
      return;
    }
    const interval = setInterval(() => setPct((p) => Math.min(100, p + (100 * STEP) / DURATION)), STEP);
    const t1 = setTimeout(() => setFading(true), DURATION);
    const t2 = setTimeout(() => setGone(true), DURATION + FADE);
    return () => {
      clearInterval(interval);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (gone) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-[#0c0c0e] transition-opacity cursor-pointer overflow-hidden font-[family-name:var(--font-mono)]"
      style={{ opacity: fading ? 0 : 1, transitionDuration: `${FADE}ms` }}
      onClick={() => setFading(true)}
    >
      <div className="absolute inset-0" style={{ opacity: 0.4, filter: "grayscale(0.45) brightness(0.7)" }}>
        <CandleChart tick={STEP} />
      </div>

      {/* simple loader */}
      <div className="absolute inset-0 flex items-center justify-center select-none">
        <div className="w-72 sm:w-96 px-6">
          <div className="flex justify-between text-[11px] tracking-[0.2em] uppercase text-neutral-400 mb-3">
            <span>Loading</span>
            <span className="tabular-nums text-emerald-400">{Math.round(pct)}%</span>
          </div>
          <div className="h-1.5 w-full bg-neutral-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-400 rounded-full transition-[width] duration-150 ease-linear"
              style={{ width: `${pct}%`, boxShadow: "0 0 12px rgba(52,211,153,0.7)" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
