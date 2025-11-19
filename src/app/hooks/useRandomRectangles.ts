'use client';
import { useEffect, useState } from 'react';

export interface RandomRect {
  id: number;
  left: number;
  top: number;
  size: number;
  rotate: number;
  opacity: number;
  borderW: number;
  isFilled: boolean;
}

export function useRandomRectangles(count: number = 20) {
  const [rects, setRects] = useState<RandomRect[]>([]);

  useEffect(() => {
    const arr: RandomRect[] = Array.from({ length: count }).map((_, i) => {
      let left = Math.random() * 100;
      const top = Math.random() * 100;
      const size = Math.round(Math.random() * 64 + 16);
      const rotate = Math.round((Math.random() * 40 - 20) * 10) / 10;
      const opacity = +(Math.random() * 0.25 + 0.05).toFixed(2);
      const borderW = Math.random() > 0.6 ? 2 : 1;
      const isFilled = Math.random() > 0.8;

      if (left > 40 && left < 60) left += left < 50 ? -20 : 20;

      return { id: i, left, top, size, rotate, opacity, borderW, isFilled };
    });

    // Defer state update to the next frame
    requestAnimationFrame(() => {
      setRects(arr);
    });
  }, [count]);

  return rects;
}
