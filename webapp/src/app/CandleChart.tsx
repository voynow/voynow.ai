"use client";

import { useEffect, useRef } from "react";

const BASE = 64000;

// virtual canvas resolution
const W = 600;
const H = 380;
const CT = 10;
const CB = 370;
const CL = 4;
const CR = 596;

const UP = "#3aa386";
const DOWN = "#b1495d";
const UP_DIM = "#2f6f5c";
const DOWN_DIM = "#7d3a48";
const LONG = "#34d399";
const SHORT = "#fb7185";

const MARK_EVERY = 20;
const MARK_NOISE = 10; // spacing varies ±half this

type Mark = "long" | "short" | null;
type Candle = { o: number; h: number; l: number; c: number; mark: Mark };

const rnd = () => Math.random();

function genCandle(prev: number, vol: number): Candle {
  const o = prev;
  const c = o + (rnd() - 0.5) * 1845 * vol;
  const h = Math.max(o, c) + rnd() * 338 * vol;
  const l = Math.min(o, c) - rnd() * 338 * vol;
  return { o, h, l, c, mark: null };
}

function range(cs: Candle[]) {
  let lo = Infinity;
  let hi = -Infinity;
  for (const k of cs) {
    if (k.l < lo) lo = k.l;
    if (k.h > hi) hi = k.h;
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

    const dx = (CR - CL) / n;
    const bw = dx * 0.6;
    const ms = dx * 0.55; // marker half-width
    const mh = dx * 1.05; // marker height
    const gap = dx * 0.9;

    // candle generator that drops a long/short marker every ~MARK_EVERY bars
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
    for (let i = 0; i < n + 2; i++) {
      const k = makeNext(seed);
      candles.push(k);
      seed = k.c;
    }

    let phase = 0;
    const r0 = range(candles);
    let curLo = r0.lo;
    let curHi = r0.hi;

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      const span = curHi - curLo || 1;
      const y = (p: number) => CT + (1 - (p - curLo) / span) * (CB - CT);
      const x = (i: number) => CL + i * dx - phase;

      ctx.lineWidth = 1;
      ctx.strokeStyle = UP_DIM;
      ctx.beginPath();
      for (let i = 0; i < candles.length; i++) {
        if (candles[i].c < candles[i].o) continue;
        const cx = x(i);
        ctx.moveTo(cx, y(candles[i].h));
        ctx.lineTo(cx, y(candles[i].l));
      }
      ctx.stroke();
      ctx.strokeStyle = DOWN_DIM;
      ctx.beginPath();
      for (let i = 0; i < candles.length; i++) {
        if (candles[i].c >= candles[i].o) continue;
        const cx = x(i);
        ctx.moveTo(cx, y(candles[i].h));
        ctx.lineTo(cx, y(candles[i].l));
      }
      ctx.stroke();

      ctx.fillStyle = UP;
      for (let i = 0; i < candles.length; i++) {
        if (candles[i].c < candles[i].o) continue;
        const a = y(candles[i].c);
        const b = y(candles[i].o);
        ctx.fillRect(x(i) - bw / 2, Math.min(a, b), bw, Math.max(1, Math.abs(b - a)));
      }
      ctx.fillStyle = DOWN;
      for (let i = 0; i < candles.length; i++) {
        if (candles[i].c >= candles[i].o) continue;
        const a = y(candles[i].c);
        const b = y(candles[i].o);
        ctx.fillRect(x(i) - bw / 2, Math.min(a, b), bw, Math.max(1, Math.abs(b - a)));
      }

      // trade markers
      for (let i = 0; i < candles.length; i++) {
        const k = candles[i];
        if (!k.mark) continue;
        const cx = x(i);
        if (k.mark === "long") {
          const ty = y(k.l) + gap;
          ctx.fillStyle = LONG;
          ctx.beginPath();
          ctx.moveTo(cx, ty);
          ctx.lineTo(cx - ms, ty + mh);
          ctx.lineTo(cx + ms, ty + mh);
          ctx.closePath();
          ctx.fill();
        } else {
          const ty = y(k.h) - gap;
          ctx.fillStyle = SHORT;
          ctx.beginPath();
          ctx.moveTo(cx, ty);
          ctx.lineTo(cx - ms, ty - mh);
          ctx.lineTo(cx + ms, ty - mh);
          ctx.closePath();
          ctx.fill();
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
      const r = range(candles);
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
