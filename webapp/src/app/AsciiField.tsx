"use client";

import { useEffect, useRef } from "react";

const CELL_W = 7;
const CELL_H = 14;
const INK = "#5c5c68";
const FRAME_MS = 40;
const FLOW = 0.02;
const RISE = 0.6;
// field is defined in these pixel units so landmasses keep their size on any viewport
const REF_W = 1750;
const REF_H = 924;

// 2d blobs anchored at or below the bottom edge; contour bands of their sum become the shoreline
const blobs = [
  { cx: 0.02, cy: -0.05, wx: 0.3, wy: 1.5, a: 1.0, speed: 0.9, phase: 0 },
  { cx: 0.2, cy: -0.15, wx: 0.22, wy: 1.0, a: 0.75, speed: 1.3, phase: 2.1 },
  { cx: 0.38, cy: -0.1, wx: 0.24, wy: 1.2, a: 0.85, speed: 1.1, phase: 4.2 },
  { cx: 0.55, cy: -0.08, wx: 0.2, wy: 1.1, a: 0.8, speed: 1.2, phase: 0.7 },
  { cx: 0.72, cy: -0.12, wx: 0.24, wy: 1.3, a: 0.9, speed: 1.0, phase: 3.3 },
  { cx: 0.9, cy: -0.02, wx: 0.3, wy: 1.5, a: 1.0, speed: 0.8, phase: 1.3 },
];

const SHORE = "~~~~-≈_~";
const MID = "=+:;/\\|=";
const DEEP = "..·,'`.. ";
const HEX = "0123456789abcdef";

const hash = (c: number, r: number) => {
  const x = Math.sin(c * 127.1 + r * 311.7) * 43758.5453;
  return x - Math.floor(x);
};

const glyph = (v: number, c: number, r: number) => {
  const h = hash(c, r);
  if (v > 0.82) return h < 0.06 ? HEX[Math.floor(hash(r, c) * 16)] : DEEP[Math.floor(h * DEEP.length)];
  if (v > 0.64) return MID[Math.floor(h * MID.length)];
  if (v > 0.47) return SHORE[Math.floor(h * SHORE.length)];
  return "";
};

export default function AsciiField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let COLS = 1;
    let ROWS = 1;
    let CW = CELL_W;
    let CH = CELL_H;
    let scale = 1;
    const fit = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      scale = Math.max(0.5, Math.min(1, canvas.clientWidth / REF_W));
      CW = CELL_W * scale;
      CH = CELL_H * scale;
      COLS = Math.ceil(canvas.clientWidth / CW);
      ROWS = Math.ceil(canvas.clientHeight / CH);
      canvas.width = Math.round(COLS * CW * dpr);
      canvas.height = Math.round(ROWS * CH * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.font = `${CH - 2 * scale}px ui-monospace, Menlo, monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = INK;
    };
    fit();
    window.addEventListener("resize", fit);

    const draw = (t: number) => {
      const s = t / 1000;
      ctx.clearRect(0, 0, COLS * CW, ROWS * CH);
      const live = blobs.map((b) => {
        const cx = (((b.cx + s * b.speed * FLOW) % 1) + 1) % 1;
        const cy = (((b.cy + s * b.speed * FLOW * RISE) % 1) + 1) % 1;
        const swell = 0.55 + 0.45 * Math.sin(cx * Math.PI * 2 * 1.5 + b.phase);
        return { ...b, cx, cy, wy: b.wy * swell };
      });
      const shift = s * FLOW;
      for (let r = 0; r < ROWS; r++) {
        const y = 1 - (r * CH) / (REF_H * scale);
        for (let c = 0; c < COLS; c++) {
          const x = (c * CW) / (REF_W * scale);
          const nx = x - shift;
          const ny = y - shift * RISE;
          const rough =
            0.09 * Math.sin(nx * 41 + ny * 23) * Math.cos(ny * 37 - nx * 17) +
            0.06 * Math.sin(nx * 97 - ny * 61) +
            0.05 * Math.sin(ny * 131 + nx * 53) * Math.sin(nx * 29);
          let v = 0;
          for (const b of live) {
            const raw = x - b.cx;
            const dx = (raw - Math.round(raw)) / b.wx;
            const rawY = y - b.cy;
            const dy = (rawY - Math.round(rawY)) / b.wy;
            v = Math.max(v, b.a * Math.exp(-(dx * dx + dy * dy)));
          }
          const ch = glyph(0.5 + 0.42 * v + rough, c, r);
          if (ch && ch !== " ") ctx.fillText(ch, c * CW + CW / 2, r * CH + CH / 2);
        }
      }
    };

    draw(0);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return () => window.removeEventListener("resize", fit);

    let raf = 0;
    let last = 0;
    const frame = (t: number) => {
      if (t - last >= FRAME_MS) {
        last = t;
        draw(t);
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", fit);
    };
  }, []);

  return <canvas ref={canvasRef} className="h-full w-full" style={{ display: "block" }} />;
}
