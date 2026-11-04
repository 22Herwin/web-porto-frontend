'use client';

import { useEffect, type RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Hero motion:
 *  - intro timeline (letters rise, highlighter wipes, brush text, supporting copy)
 *  - marquee that speeds up with scroll velocity and reverses with scroll direction
 * Initial hidden states live in CSS (globals.css, `.hx-*`) so there is no flash before hydration.
 * Everything is skipped under prefers-reduced-motion (CSS shows the final state).
 */
export function useHeroMotion(scope: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = scope.current;
    if (!root) return;

    const q = gsap.utils.selector(root);
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // ---- intro ----
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

      tl.fromTo(
        q('.hx-letter'),
        { yPercent: 105 },
        { yPercent: 0, duration: 1.2, stagger: 0.07, clearProps: 'transform' },
        0,
      )
        .fromTo(
          q('.hx-welcome-swipe'),
          { clipPath: 'inset(0 100% 0 0)' },
          { clipPath: 'inset(0 0% 0 0)', duration: 0.7, ease: 'power4.inOut' },
          0.55,
        )
        .fromTo(
          q('.hx-welcome-text'),
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
          0.9,
        )
        .fromTo(
          q('[data-intro]'),
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.08, clearProps: 'transform' },
          0.7,
        );

      gsap.set(q('.hx-letter-mask'), { visibility: 'visible' });
    });

    // ---- marquee ----
    // Runs in both modes: full (velocity + direction aware) normally, a slow constant drift under
    // prefers-reduced-motion. It only ticks while the hero is on screen.
    const setupMarquee = (interactive: boolean) => {
      const track = q('.hx-marquee-track')[0];
      if (!track) return;

      const loop = gsap.to(track, {
        xPercent: -50,
        duration: interactive ? 28 : 70,
        ease: 'none',
        repeat: -1,
      });

      // scroll velocity feeds a "boost" that decays back to 1; direction flips the loop.
      // Smoothed in the ticker (re-creating tweens on every scroll event would never ramp up).
      let dir = 1;
      let boost = 1;
      let timeScale = 1;

      const tick = () => {
        boost += (1 - boost) * 0.05;
        timeScale += (dir * boost - timeScale) * 0.15;
        loop.timeScale(timeScale);
      };

      const setRunning = (running: boolean) => {
        loop.paused(!running);
        if (!interactive) return;
        if (running) gsap.ticker.add(tick);
        else gsap.ticker.remove(tick);
      };

      const st = ScrollTrigger.create({
        trigger: root,
        start: 'top bottom',
        end: 'bottom top',
        onToggle: (self) => setRunning(self.isActive),
        onUpdate: interactive
          ? (self) => {
              dir = self.direction; // 1 = scrolling down, -1 = up
              boost = Math.max(boost, 1 + Math.min(Math.abs(self.getVelocity()) / 250, 8));
            }
          : undefined,
      });
      setRunning(st.isActive);

      return () => gsap.ticker.remove(tick);
    };

    mm.add('(prefers-reduced-motion: no-preference)', () => setupMarquee(true));
    mm.add('(prefers-reduced-motion: reduce)', () => setupMarquee(false));

    return () => mm.revert();
  }, [scope]);
}
