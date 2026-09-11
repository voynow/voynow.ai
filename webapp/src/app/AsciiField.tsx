"use client";

import { useEffect, useRef } from "react";

const CELL_W = 6;
const CELL_H = 11;
const INK = "#32323b";
const FRAME_MS = 40;
const FLOW = 0.012;
const RISE = 0.7;
// field is defined in these pixel units so blocks keep their size on any viewport
const REF_W = 1750;
const REF_H = 924;
const ASPECT = REF_H / REF_W;

// each layer is a lattice of candidate blocks; smaller blocks drift faster for parallax
const layers = [
  { size: 0.17, speed: 1.0, fill: 0.36, seed: 11 },
  { size: 0.09, speed: 1.8, fill: 0.28, seed: 29 },
  { size: 0.045, speed: 2.9, fill: 0.14, seed: 47 },
];

const EDGE = "─│┌┐└┘├┤┬┴┼═║";
const DENSE = "╱╲┼≡≠+×∷#%";
const SPARSE = "·.,'`˙°∘";
const RARE = "αβγδλμπσφψΩ∂∑√∞∫";

const hash = (a: number, b: number) => {
  const x = Math.sin(a * 127.1 + b * 311.7) * 43758.5453;
  return x - Math.floor(x);
};

const pick = (set: string, c: number, r: number) => set[Math.floor(hash(c, r) * set.length)];

// 0 empty, 1 edge, 2 dense, 3 sparse
const sample = (x: number, y: number, s: number) => {
  let kind = 0;
  for (const L of layers) {
    const u = x - s * FLOW * L.speed;
    const v = y * ASPECT - s * FLOW * RISE * L.speed;
    const i = Math.floor(u / L.size);
    const j = Math.floor(v / L.size);
    if (hash(i + L.seed, j - L.seed) > L.fill) continue;
    const fx = u / L.size - i;
    const fy = v / L.size - j;
    const m = 0.06 + 0.12 * hash(j + L.seed, i);
    const inner = Math.min(fx - m, 1 - m - fx, fy - m, 1 - m - fy);
    if (inner < 0) continue;
    const edge = 0.9 / ((L.size * REF_W) / CELL_W);
    kind = inner < edge ? 1 : hash(i * 3 + L.seed, j * 7) < 0.55 ? 2 : 3;
  }
  return kind;
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
      for (let r = 0; r < ROWS; r++) {
        const y = 1 - (r * CH) / (REF_H * scale);
        for (let c = 0; c < COLS; c++) {
          const x = (c * CW) / (REF_W * scale);
          const kind = sample(x, y, s);
          let ch = "";
          if (kind === 1) ch = pick(EDGE, c, r);
          else if (kind === 2) ch = hash(r, c) < 0.05 ? pick(RARE, c, r) : pick(DENSE, c, r);
          else if (kind === 3) ch = hash(c, r) < 0.6 ? pick(SPARSE, c, r) : "";
          else if (hash(c, r) < 0.03) ch = "·";
          if (ch) ctx.fillText(ch, c * CW + CW / 2, r * CH + CH / 2);
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
