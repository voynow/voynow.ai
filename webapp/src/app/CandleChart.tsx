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

type Candle = { o: number; h: number; l: number; c: number };

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

export default function CandleChart({ tick = 60, vol = 1, n = 60 }: { tick?: number; vol?: number; n?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = W;
    canvas.height = H;

    const candles = genSeries(vol, n);
    const bw = ((CR - CL) / n) * 0.6;

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      let lo = Infinity;
      let hi = -Infinity;
      for (const k of candles) {
        if (k.l < lo) lo = k.l;
        if (k.h > hi) hi = k.h;
      }
      const pad = (hi - lo) * 0.04 || 100;
      lo -= pad;
      hi += pad;
      const span = hi - lo || 1;
      const y = (p: number) => CT + (1 - (p - lo) / span) * (CB - CT);
      const x = (i: number) => CL + (i / (n - 1)) * (CR - CL);

      for (let i = 0; i < candles.length; i++) {
        const k = candles[i];
        const up = k.c >= k.o;
        const cx = x(i);
        ctx.strokeStyle = up ? UP_DIM : DOWN_DIM;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(cx, y(k.h));
        ctx.lineTo(cx, y(k.l));
        ctx.stroke();
        const top = y(Math.max(k.o, k.c));
        const bot = y(Math.min(k.o, k.c));
        ctx.fillStyle = up ? UP : DOWN;
        ctx.fillRect(cx - bw / 2, top, bw, Math.max(1, bot - top));
      }
    };

    draw();

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let last = 0;
    let acc = 0;
    const frame = (t: number) => {
      if (last) acc += t - last;
      last = t;
      let steps = 0;
      while (acc >= tick && steps < 8) {
        candles.shift();
        candles.push(genCandle(candles[candles.length - 1].c, vol));
        acc -= tick;
        steps++;
      }
      if (steps > 0) draw();
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [tick, vol, n]);

  return <canvas ref={canvasRef} className="h-full w-full" style={{ display: "block" }} />;
}
