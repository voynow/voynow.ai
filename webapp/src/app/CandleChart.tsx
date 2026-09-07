"use client";

import { useEffect, useRef } from "react";

const BASE = 64000;

// character grid; the chart is rasterized offscreen at this resolution and each pixel becomes one glyph
const COLS = 220;
const ROWS = 84;
const CW = 6;
const CH = 10;
const W = COLS * CW;
const H = ROWS * CH;

const RAMP = " .:-=zk#@";
const INK = "#80808c";
const GLOW_UP = "rgba(58,163,134,0.9)";
const GLOW_DOWN = "rgba(177,73,93,0.9)";

const MARK_EVERY = 20;
const MARK_NOISE = 10; // spacing varies ±half this
const MA_PERIOD = 50;

type Mark = "long" | "short" | null;
type Candle = { o: number; h: number; l: number; c: number; mark: Mark };

const rnd = () => Math.random();

function genCandle(prev: number, vol: number): Candle {
  const o = prev;
  const c = o + (rnd() - 0.5) * 461 * vol;
  const h = Math.max(o, c) + rnd() * 85 * vol;
  const l = Math.min(o, c) - rnd() * 85 * vol;
  return { o, h, l, c, mark: null };
}

function range(cs: Candle[], start: number) {
  let lo = Infinity;
  let hi = -Infinity;
  for (let i = start; i < cs.length; i++) {
    if (cs[i].l < lo) lo = cs[i].l;
    if (cs[i].h > hi) hi = cs[i].h;
  }
  const pad = (hi - lo) * 0.04 || 100;
  return { lo: lo - pad, hi: hi + pad };
}

export default function CandleChart({ tick = 60, vol = 1, n = 60 }: { tick?: number; vol?: number; n?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = W;
    canvas.height = H;

    const off = document.createElement("canvas");
    off.width = COLS;
    off.height = ROWS;
    const octx = off.getContext("2d", { willReadFrequently: true });
    if (!octx) return;

    const dx = COLS / n;
    const bw = Math.max(1, Math.round(dx * 0.5));
    const WARM = MA_PERIOD - 1; // off-screen history so the MA spans the full width

    let countdown = MARK_EVERY + Math.round((rnd() - 0.5) * MARK_NOISE);
    const makeNext = (prev: number): Candle => {
      const k = genCandle(prev, vol);
      if (--countdown <= 0) {
        k.mark = rnd() > 0.5 ? "long" : "short";
        countdown = MARK_EVERY + Math.round((rnd() - 0.5) * MARK_NOISE);
      }
      return k;
    };

    const candles: Candle[] = [];
    let seed = BASE;
    for (let i = 0; i < WARM + n + 2; i++) {
      const k = makeNext(seed);
      candles.push(k);
      seed = k.c;
    }

    let phase = 0;
    const r0 = range(candles, WARM);
    let curLo = r0.lo;
    let curHi = r0.hi;

    const raster = () => {
      octx.clearRect(0, 0, COLS, ROWS);
      const span = curHi - curLo || 1;
      const y = (p: number) => 1 + (1 - (p - curLo) / span) * (ROWS - 2);
      const x = (i: number) => (i - WARM) * dx - phase;

      for (let i = 0; i < candles.length; i++) {
        const k = candles[i];
        const up = k.c >= k.o;
        const cx = x(i);
        octx.fillStyle = up ? "rgba(0,255,0,0.45)" : "rgba(255,0,0,0.45)";
        octx.fillRect(cx, y(k.h), 1, Math.max(1, y(k.l) - y(k.h)));
        octx.fillStyle = up ? "rgba(0,255,0,1)" : "rgba(255,0,0,1)";
        const a = y(k.o);
        const b = y(k.c);
        octx.fillRect(cx - bw / 2, Math.min(a, b), bw, Math.max(1, Math.abs(b - a)));
        if (k.mark) {
          octx.fillStyle = k.mark === "long" ? "rgba(0,255,0,1)" : "rgba(255,0,0,1)";
          octx.fillRect(cx - 1, k.mark === "long" ? y(k.l) + 2 : y(k.h) - 3, 3, 1);
        }
      }

      octx.fillStyle = "rgba(255,255,255,0.6)";
      for (let i = MA_PERIOD - 1; i < candles.length; i++) {
        let sum = 0;
        for (let j = i - MA_PERIOD + 1; j <= i; j++) sum += candles[j].c;
        octx.fillRect(x(i), y(sum / MA_PERIOD), 1, 1);
      }
    };

    const draw = () => {
      raster();
      const px = octx.getImageData(0, 0, COLS, ROWS).data;
      ctx.clearRect(0, 0, W, H);
      ctx.font = `${CH - 1}px ui-monospace, Menlo, monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.shadowBlur = 14;
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          const o = (r * COLS + c) * 4;
          const a = px[o + 3] / 255;
          if (a < 0.08) continue;
          const g = px[o + 1];
          const rd = px[o];
          const b = px[o + 2];
          const neutral = b > 0;
          const ch = RAMP[Math.min(RAMP.length - 1, Math.floor(a * (RAMP.length - 1) + 0.5))];
          ctx.shadowColor = neutral ? "transparent" : g > rd ? GLOW_UP : GLOW_DOWN;
          ctx.fillStyle = INK;
          ctx.fillText(ch, c * CW + CW / 2, r * CH + CH / 2);
        }
      }
    };

    draw();

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let last = 0;
    const frame = (t: number) => {
      const dt = Math.min(last ? t - last : 0, 50);
      last = t;
      phase += (dt * dx) / tick;
      while (phase >= dx) {
        candles.shift();
        candles.push(makeNext(candles[candles.length - 1].c));
        phase -= dx;
      }
      const r = range(candles, WARM);
      curLo += (r.lo - curLo) * 0.06;
      curHi += (r.hi - curHi) * 0.06;
      draw();
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [tick, vol, n]);

  return <canvas ref={canvasRef} className="h-full w-full" style={{ display: "block" }} />;
}
