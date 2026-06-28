"use client";

import { useEffect, useRef } from "react";

const STREAMS = 6;
const BASE = 64000;
const BAND_OVERLAP = 2.4; // band height = spacing * this (taller bars / more overlap)

const UP = "#3aa386";
const DOWN = "#b1495d";
const UP_DIM = "#2f6f5c";
const DOWN_DIM = "#7d3a48";

type Candle = { o: number; h: number; l: number; c: number };
type Stream = {
  candles: Candle[];
  vol: number;
  tick: number;
  phase: number;
  lo: number;
  hi: number;
  centerY: number;
  band: number;
};

const rnd = () => Math.random();

function genCandle(prev: number, vol: number): Candle {
  const o = prev;
  const c = o + (rnd() - 0.5) * 1845 * vol;
  const h = Math.max(o, c) + rnd() * 338 * vol;
  const l = Math.min(o, c) - rnd() * 338 * vol;
  return { o, h, l, c };
}

function genSeries(vol: number, n: number): Candle[] {
  const arr: Candle[] = [];
  let p = BASE;
  for (let i = 0; i < n; i++) {
    const k = genCandle(p, vol);
    arr.push(k);
    p = k.c;
  }
  return arr;
}

export default function ChartGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let w = 0;
    let h = 0;
    let m = 60; // visible candle slots
    let dx = 10;
    let streams: Stream[] = [];

    const range = (cs: Candle[]) => {
      let lo = Infinity;
      let hi = -Infinity;
      for (const k of cs) {
        if (k.l < lo) lo = k.l;
        if (k.h > hi) hi = k.h;
      }
      const pad = (hi - lo) * 0.04 || 100;
      return { lo: lo - pad, hi: hi + pad };
    };

    const build = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      m = Math.max(30, Math.round(w / 24));
      dx = w / m;
      const spacing = h / STREAMS;
      streams = Array.from({ length: STREAMS }, (_, i) => {
        const vol = 0.6 + ((i * 53) % 80) / 100;
        const candles = genSeries(vol, m + 2);
        const r = range(candles);
        return {
          candles,
          vol,
          tick: (70 + ((i * 37) % 120)) * 2,
          phase: 0,
          lo: r.lo,
          hi: r.hi,
          centerY: spacing * (i + 0.5),
          band: spacing * BAND_OVERLAP,
        };
      });
    };

    const drawStream = (s: Stream) => {
      const span = s.hi - s.lo || 1;
      const top = s.centerY - s.band / 2;
      const bot = s.centerY + s.band / 2;
      const y = (p: number) => top + (1 - (p - s.lo) / span) * (bot - top);
      const x = (i: number) => i * dx - s.phase;
      const bw = dx * 0.6;
      const cs = s.candles;

      ctx.lineWidth = 1;
      ctx.strokeStyle = UP_DIM;
      ctx.beginPath();
      for (let i = 0; i < cs.length; i++) {
        if (cs[i].c < cs[i].o) continue;
        const cx = x(i);
        ctx.moveTo(cx, y(cs[i].h));
        ctx.lineTo(cx, y(cs[i].l));
      }
      ctx.stroke();
      ctx.strokeStyle = DOWN_DIM;
      ctx.beginPath();
      for (let i = 0; i < cs.length; i++) {
        if (cs[i].c >= cs[i].o) continue;
        const cx = x(i);
        ctx.moveTo(cx, y(cs[i].h));
        ctx.lineTo(cx, y(cs[i].l));
      }
      ctx.stroke();

      ctx.fillStyle = UP;
      for (let i = 0; i < cs.length; i++) {
        if (cs[i].c < cs[i].o) continue;
        const a = y(cs[i].c);
        const b = y(cs[i].o);
        ctx.fillRect(x(i) - bw / 2, Math.min(a, b), bw, Math.max(1, Math.abs(b - a)));
      }
      ctx.fillStyle = DOWN;
      for (let i = 0; i < cs.length; i++) {
        if (cs[i].c >= cs[i].o) continue;
        const a = y(cs[i].c);
        const b = y(cs[i].o);
        ctx.fillRect(x(i) - bw / 2, Math.min(a, b), bw, Math.max(1, Math.abs(b - a)));
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const s of streams) drawStream(s);
    };

    build();
    draw();

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ro = new ResizeObserver(() => {
      build();
      draw();
    });
    ro.observe(canvas);

    let raf = 0;
    if (!reduce) {
      let last = 0;
      const frame = (t: number) => {
        const dt = Math.min(last ? t - last : 0, 50);
        last = t;
        for (const s of streams) {
          s.phase += (dt * dx) / s.tick;
          while (s.phase >= dx) {
            s.candles.shift();
            s.candles.push(genCandle(s.candles[s.candles.length - 1].c, s.vol));
            s.phase -= dx;
          }
          // ease vertical scale toward target so it glides
          const r = range(s.candles);
          s.lo += (r.lo - s.lo) * 0.06;
          s.hi += (r.hi - s.hi) * 0.06;
        }
        draw();
        raf = requestAnimationFrame(frame);
      };
      raf = requestAnimationFrame(frame);
    }

    return () => {
      ro.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return <canvas ref={canvasRef} className="h-full w-full" style={{ display: "block" }} />;
}
