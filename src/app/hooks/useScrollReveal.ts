'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

/**
 * One-shot reveals (no scrub, no pinning):
 *   data-reveal="lines" -> text rises line by line out of a mask
 *   data-reveal="fade"  -> block fades/slides up
 * Elements start hidden via CSS (`[data-reveal]`), so nothing flashes before the animation.
 * Skipped under prefers-reduced-motion (CSS shows them as-is).
 */
export function useScrollReveal() {
  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // clamp() keeps the start inside the page bounds. Blocks fire as soon as their top edge
      // peeks in (so things pinned near the page bottom still reveal); text lines wait a bit longer.
      const trigger = (el: Element, start: string) => ({
        trigger: el,
        start: `clamp(${start})`,
        once: true,
      });

      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
        if (el.dataset.reveal === 'lines') {
          SplitText.create(el, {
            type: 'lines',
            mask: 'lines',
            autoSplit: true,
            onSplit: (self) => {
              gsap.set(el, { visibility: 'visible' });
              return gsap.from(self.lines, {
                yPercent: 110,
                duration: 0.9,
                ease: 'power4.out',
                stagger: 0.08,
                scrollTrigger: trigger(el, 'top 92%'),
              });
            },
          });
        } else {
          gsap.set(el, { visibility: 'visible' });
          gsap.from(el, {
            y: 40,
            opacity: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: trigger(el, 'top 98%'),
          });
        }
      });

      // text/fonts settle after first paint; re-measure trigger positions
      document.fonts.ready.then(() => ScrollTrigger.refresh());
    });

    return () => mm.revert();
  }, []);
}
