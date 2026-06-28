"use client";

import { useEffect, useRef, useState } from "react";

const BASE = 64000;
const N = 90;

const W = 2000;
const H = 1000;
const CT = 70;
const CB = 858;
const CL = 12;
const CR = 1680;
const PR = 1986;
const PW = 250;
const VBT = 880;
const VBB = 986;

const UP = "#3aa386";
const DOWN = "#b1495d";
const UP_DIM = "#2f6f5c";
const DOWN_DIM = "#7d3a48";

type Candle = { o: number; h: number; l: number; c: number; v: number };
type Dot = { x: number; y: number; w: number; h: number; op: number; red: boolean };

const rnd = () => Math.random();

function genCandle(prev: number): Candle {
  const o = prev;
  const c = o + (rnd() - 0.5) * 820;
  const h = Math.max(o, c) + rnd() * 150;
  const l = Math.min(o, c) - rnd() * 150;
  return { o, h, l, c, v: rnd() * 90 + 15 };
}

function genSeries(): Candle[] {
  const arr: Candle[] = [];
  let p = BASE;
  for (let i = 0; i < N; i++) {
    const k = genCandle(p);
    arr.push(k);
    p = k.c;
  }
  return arr;
}

export default function CandleChart({ tick = 60 }: { tick?: number }) {
  const [candles, setCandles] = useState<Candle[]>([]);
  const dots = useRef<Dot[]>([]);

  useEffect(() => {
    dots.current = Array.from({ length: 150 }, () => ({
      x: CL + rnd() * (CR - CL),
      y: CT + rnd() * (CB - CT),
      w: 8 + rnd() * 26,
      h: 2 + rnd() * 4,
      op: 0.12 + rnd() * 0.5,
      red: rnd() > 0.55,
    }));
    setCandles(genSeries());

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const interval = setInterval(() => {
      setCandles((prev) => (prev.length ? [...prev.slice(1), genCandle(prev[prev.length - 1].c)] : prev));
    }, tick);
    return () => clearInterval(interval);
  }, [tick]);

  if (!candles.length) return null;

  let lo = Infinity;
  let hi = -Infinity;
  for (const k of candles) {
    if (k.l < lo) lo = k.l;
    if (k.h > hi) hi = k.h;
  }
  const pad = (hi - lo) * 0.015 || 100;
  lo -= pad;
  hi += pad;
  const span = hi - lo || 1;
  const y = (p: number) => CT + (1 - (p - lo) / span) * (CB - CT);
  const x = (i: number) => CL + (i / (N - 1)) * (CR - CL);
  const bw = ((CR - CL) / N) * 0.72;
  const last = candles[candles.length - 1];
  const mid = (hi + lo) / 2;

  const B = 46;
  const buckets = new Array(B).fill(0);
  for (const k of candles) {
    const idx = Math.min(B - 1, Math.max(0, Math.floor(((k.c - lo) / span) * B)));
    buckets[idx] += k.v;
  }
  const maxBucket = Math.max(...buckets, 1);
  const maxVol = Math.max(...candles.map((k) => k.v), 1);

  return (
    <svg className="w-full h-full" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice">
      {dots.current.map((d, i) => (
        <rect key={i} x={d.x} y={d.y} width={d.w} height={d.h} fill={d.red ? "#b14a3a" : "#d98a4a"} opacity={d.op * (0.4 + rnd() * 0.6)} />
      ))}

      {candles.map((k, i) => {
        const up = k.c >= k.o;
        const cx = x(i);
        const top = y(Math.max(k.o, k.c));
        const bot = y(Math.min(k.o, k.c));
        return (
          <g key={i}>
            <line x1={cx} x2={cx} y1={y(k.h)} y2={y(k.l)} stroke={up ? UP_DIM : DOWN_DIM} strokeWidth="1.1" />
            <rect x={cx - bw / 2} y={top} width={bw} height={Math.max(1, bot - top)} fill={up ? UP : DOWN} />
          </g>
        );
      })}

      {candles.map((k, i) => {
        const up = k.c >= k.o;
        const bh = (k.v / maxVol) * (VBB - VBT);
        return <rect key={i} x={x(i) - bw / 2} y={VBB - bh} width={bw} height={bh} fill={up ? UP_DIM : DOWN_DIM} opacity="0.5" />;
      })}

      {buckets.map((v, i) => {
        if (v <= 0) return null;
        const len = (v / maxBucket) * PW;
        const price = lo + ((i + 0.5) / B) * span;
        const by = y(price);
        const bh = ((CB - CT) / B) * 0.74;
        return (
          <g key={i}>
            <rect x={PR - len} y={by - bh / 2} width={len} height={bh} fill={price > mid ? "#4f7d68" : "#8a4a58"} opacity="0.85" />
            <text x={PR + 8} y={by + 4} fontSize="11" fill="#5a5a62" fontFamily="monospace">
              {Math.round(v)}K
            </text>
          </g>
        );
      })}

      {Array.from({ length: 9 }, (_, i) => {
        const p = lo + (i / 8) * span;
        return (
          <text key={i} x={W - 6} y={y(p) + 4} fontSize="12" textAnchor="end" fill="#55555c" fontFamily="monospace">
            {Math.round(p).toLocaleString()}
          </text>
        );
      })}

      <line x1={x(58)} x2={x(58)} y1={CT} y2={VBB} stroke="#4a4a52" strokeWidth="1" strokeDasharray="4 5" opacity="0.7" />
      <line x1={CL} x2={W} y1={y(last.c)} y2={y(last.c)} stroke="#4a4a52" strokeWidth="1" strokeDasharray="4 5" opacity="0.7" />
      <rect x={W - 150} y={y(last.c) - 13} width={150} height={26} fill={last.c >= last.o ? UP : DOWN} />
      <text x={W - 10} y={y(last.c) + 5} fontSize="13" textAnchor="end" fill="#0c0c0e" fontFamily="monospace" fontWeight="bold">
        {Math.round(last.c).toLocaleString()}
      </text>
    </svg>
  );
}
