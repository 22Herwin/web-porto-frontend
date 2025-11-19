'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useStackScroll(sectionClass = '.stack-section') {
  useEffect(() => {
    const sections = gsap.utils.toArray(sectionClass) as HTMLElement[];
    if (!sections.length) return;

    sections.forEach((section, i) => {
      section.style.zIndex = String(i + 1);
    });

    const createTriggers = () => {
      // remove previous triggers before creating new ones
      ScrollTrigger.getAll().forEach((t) => t.kill());

      sections.forEach((section, i) => {
        // recompute sizes
        const viewportH = window.innerHeight || document.documentElement.clientHeight;
        const contentH = Math.max(
          section.scrollHeight,
          section.offsetHeight,
          section.getBoundingClientRect().height,
        );

        // consider a section "long" when its content is taller than the viewport
        const isLong = contentH > viewportH;

        // If it's long, do not pin and do NOT change z-index while active
        if (isLong) {
          ScrollTrigger.create({
            trigger: section,
            start: 'top top',
            end: () => `+=${contentH}`,
            pin: false,
            pinSpacing: false,
            anticipatePin: 0,
            scrub: 0,
            invalidateOnRefresh: true,
            // <-- removed onEnter/onLeaveBack that previously elevated long sections' z-index
          });
        } else {
          // normal stacked/pinned behaviour for short sections
          const natural = Math.max(section.offsetHeight, Math.ceil(contentH));
          ScrollTrigger.create({
            trigger: section,
            start: 'top top',
            end: () => `+=${natural}`,
            pin: true,
            pinSpacing: false, // keep stacked overlay look
            anticipatePin: 1,
            scrub: 0, // no heavy smoothing to avoid "sticky" feel
            invalidateOnRefresh: true,
            onEnter: () => gsap.set(section, { zIndex: sections.length + 1 }), // pinned sections rise on enter
            onLeaveBack: () => gsap.set(section, { zIndex: i + 1 }),
          });
        }
      });
    };

    // initial create and refresh after load/resize to catch images/fonts
    createTriggers();
    const t1 = window.setTimeout(() => ScrollTrigger.refresh(), 120);
    const t2 = window.setTimeout(() => {
      createTriggers();
      ScrollTrigger.refresh();
    }, 600);

    const onResize = () => {
      createTriggers();
      ScrollTrigger.refresh();
    };
    window.addEventListener('resize', onResize);
    window.addEventListener('load', onResize);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('load', onResize);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [sectionClass]);
}

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

  gsap.to(window, {
    scrollTo: { y: target, offsetY: 0 },
    duration: 1,
    ease: 'power2.inOut',
  });
}
