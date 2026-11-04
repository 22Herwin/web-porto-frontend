'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function scrollToSection(id: string, sectionClass = '.stack-section') {
  const target = document.getElementById(id);
  const sections = gsap.utils.toArray(sectionClass) as HTMLElement[];
  if (!target) return;

  const targetIndex = sections.indexOf(target);
  if (targetIndex === -1) return;

  sections.forEach((s, i) => {
    if (i <= targetIndex) {
      s.style.zIndex = String(sections.length - (targetIndex - i));
    } else {
      s.style.zIndex = String(i + 1);
    }
  });

  // leave room for the fixed header so the section's top edge isn't hidden under it
  const headerH = document.querySelector('header')?.offsetHeight ?? 0;

  // CSS scroll-snap re-snaps every programmatic scroll step, which would fight the tween;
  // switch it off while we animate and restore it afterwards (the target is a snap position).
  const pinned = ScrollTrigger.getById(id);
  const root = document.documentElement;
  const restoreSnap = () => {
    root.style.scrollSnapType = '';
  };
  root.style.scrollSnapType = 'none';

  gsap.to(window, {
    // a pinned section moves while pinned, so aim at its ScrollTrigger start instead of its box
    scrollTo: pinned ? { y: pinned.start, offsetY: 0 } : { y: target, offsetY: headerH },
    duration: 1,
    ease: 'power2.inOut',
    onComplete: restoreSnap,
    onInterrupt: restoreSnap,
  });
}
