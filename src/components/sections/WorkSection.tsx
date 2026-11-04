'use client';

import Image from 'next/image';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface WorkSectionProps {
  className?: string;
}

type Item = {
  title: string;
  eyebrow?: string;
  /** optional, e.g. '2025'; the side label shows the min-max range of the years that are filled in */
  year?: string;
  desc?: string;
  stack: string[];
  img?: string;
  /** big typographic fallback shown when there is no image */
  typeLabel?: string;
};

const ITEMS: Item[] = [
  {
    title: 'VR + Digital Twin',
    eyebrow: 'Innowork 2025 @ Effortech · Surabaya, Indonesia',
    desc: 'A VR + Digital Twin simulation of a UHT milk machine, created for Innowork 2025 at Effortech to visualize real-time industrial processes.',
    year: '2025',
    stack: ['Unity', 'VR', 'MQTT', 'IoT'],
    img: '/images/image1.webp',
  },
  {
    title: 'Virtual Art Gallery',
    desc: 'A virtual art gallery built with A-Frame, showcasing interactive 3D spaces for exploring digital artworks online.',
    stack: ['A-Frame', '3D'],
    img: '/images/image2.webp',
  },
  {
    title: 'Music Discovery App',
    desc: 'A responsive web app built with Bootstrap, featuring a clean interface for browsing and discovering trending music.',
    stack: ['Bootstrap', 'Responsive'],
    img: '/images/image3.webp',
  },
];

// Horizontal pinned mode only on desktop with motion allowed; otherwise the cards simply stack.
const PIN_QUERY = '(min-width: 901px) and (prefers-reduced-motion: no-preference)';

const pad2 = (n: number) => String(n).padStart(2, '0');

// everything on the page that talks about the list is derived from ITEMS (count, numbering, years)
const YEARS = ITEMS.map((i) => Number(i.year)).filter((y) => Number.isFinite(y) && y > 0);
const SIDE_LABEL =
  YEARS.length > 0
    ? `Project files / ${Math.min(...YEARS)} - ${Math.max(...YEARS)}`
    : `Project files / ${pad2(ITEMS.length)} entries`;

const WorkSection = ({ className = '' }: WorkSectionProps) => {
  const rootRef = useRef<HTMLElement>(null);
  // the GSAP setup measures the cards, so rebuild it whenever the list length changes (also on hot reload)
  const itemCount = ITEMS.length;

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const q = gsap.utils.selector(root);
    const mm = gsap.matchMedia();

    mm.add(PIN_QUERY, () => {
      const viewport = q('.wk-viewport')[0] as HTMLElement;
      const track = q('.wk-track')[0] as HTMLElement;
      const cards = q('.wk-card') as HTMLElement[];
      const fill = q('.wk-bar-fill')[0] as HTMLElement;
      const count = q('.wk-count')[0] as HTMLElement;
      if (!viewport || !track || !fill || !count || cards.length < 2) return;

      const setFill = gsap.quickSetter(fill, 'scaleX');
      const last = cards[cards.length - 1];
      // travel between "first card centred" and "last card centred"
      const distance = () => Math.max(1, last.offsetLeft - cards[0].offsetLeft);
      // track translation that puts the first card in the middle of the viewport
      const startX = () => (viewport.clientWidth - cards[0].offsetWidth) / 2 - cards[0].offsetLeft;
      const headerH = () => document.querySelector('header')?.offsetHeight ?? 0;

      // progress value at which each card sits in the centre of the viewport
      const computeStops = () =>
        cards.map((c) => Math.min(1, (c.offsetLeft - cards[0].offsetLeft) / distance()));
      let stops = computeStops();
      let step = 1;
      let dist = 1;
      const measure = () => {
        stops = computeStops();
        step = cards[1].offsetLeft - cards[0].offsetLeft || 1;
        dist = distance();
      };
      measure();

      // The card at the focus position "pops out": bigger, lifted, slightly tilted, with a hard
      // red offset shadow. Neighbours shrink, sink and fade. Transform + opacity only, driven
      // continuously by scroll progress (f = 1 at the focus position, 0 one card away).
      const setters = cards.map((c) => {
        const shadow = c.querySelector<HTMLElement>('.wk-shadow') as HTMLElement;
        return {
          scaleX: gsap.quickSetter(c, 'scaleX'),
          scaleY: gsap.quickSetter(c, 'scaleY'),
          y: gsap.quickSetter(c, 'y', 'px'),
          rotation: gsap.quickSetter(c, 'rotation', 'deg'),
          opacity: gsap.quickSetter(c, 'opacity'),
          shX: gsap.quickSetter(shadow, 'x', 'px'),
          shY: gsap.quickSetter(shadow, 'y', 'px'),
          shOpacity: gsap.quickSetter(shadow, 'opacity'),
        };
      });
      const focus = (progress: number) => {
        cards.forEach((_, i) => {
          const t = Math.min(1, Math.abs(((progress - stops[i]) * dist) / step));
          const f = 1 - t;
          const s = setters[i];
          s.scaleX(0.9 + 0.14 * f);
          s.scaleY(0.9 + 0.14 * f);
          s.y(22 * t - 10 * f);
          s.rotation(-0.8 * f);
          s.opacity(0.3 + 0.7 * f);
          s.shX(16 * f);
          s.shY(16 * f);
          s.shOpacity(f);
        });
      };

      // tells the CSS (snap-align) that this section is pinned inside a .pin-spacer
      root.dataset.pinned = 'true';

      gsap.fromTo(
        track,
        { x: () => startX() },
        {
          x: () => startX() - distance(),
          ease: 'none',
          scrollTrigger: {
            id: 'work',
            trigger: root,
            start: () => `top top+=${headerH()}`,
            end: () => `+=${distance()}`,
            pin: true,
            anticipatePin: 1,
            scrub: 0.8,
            invalidateOnRefresh: true,
            onRefresh: (self) => {
              measure();
              focus(self.progress);
            },
            // one scroll gesture = next / previous card
            snap: {
              snapTo: (value, self) => {
                const eps = 0.002;
                if ((self?.direction ?? 1) > 0) return stops.find((p) => p > value + eps) ?? 1;
                return [...stops].reverse().find((p) => p < value - eps) ?? 0;
              },
              duration: { min: 0.45, max: 0.95 },
              delay: 0.06,
              ease: 'power3.inOut',
            },
            onUpdate: (self) => {
              setFill(self.progress);
              focus(self.progress);
              let idx = 0;
              stops.forEach((p, i) => {
                if (Math.abs(p - self.progress) < Math.abs(stops[idx] - self.progress)) idx = i;
              });
              const label = pad2(idx + 1);
              if (count.textContent !== label) count.textContent = label;
            },
          },
        },
      );

      focus(0);

      return () => {
        delete root.dataset.pinned;
      };
    });

    return () => mm.revert();
  }, [itemCount]);

  return (
    <section
      id="work"
      ref={rootRef}
      className={`wk tx tx-dark select-none ${className}`}
      data-theme="work"
      data-bg="#0a0908"
    >
      <div className="wk-top">
        <span>03 / Work &amp; Experience</span>
        <span className="wk-rec" aria-hidden>
          <i /> REC
        </span>
        <span>[ project / experience ]</span>
      </div>

      <p className="wk-side" aria-hidden>
        {SIDE_LABEL}
      </p>

      <div className="wk-head">
        <h2 className="wk-heading">My Work</h2>
        <p className="wk-note">Ain&apos;t much, but aight.</p>
      </div>

      <div className="wk-viewport">
        <div className="wk-track">
          {ITEMS.map((item, i) => (
            <article key={item.title} className="wk-card">
              <div className="wk-frame">
                <span className="wk-shadow" aria-hidden />
                <div className="wk-media">
                  {item.img ? (
                    <Image
                      src={item.img}
                      alt={item.title}
                      fill
                      sizes="(min-width: 901px) 68vw, 100vw"
                      className="wk-img object-cover"
                    />
                  ) : (
                    <div className="wk-type" aria-hidden>
                      {item.typeLabel}
                    </div>
                  )}
                  <span className="wk-num">{pad2(i + 1)}</span>
                </div>
              </div>

              <div className="wk-info">
                <div>
                  {item.eyebrow && <p className="wk-eyebrow">{item.eyebrow}</p>}
                  <h3 className="wk-title">{item.title}</h3>
                </div>
                <div>
                  {item.desc && <p className="wk-desc">{item.desc}</p>}
                  <ul className="wk-stack">
                    {item.stack.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="wk-bottom" aria-hidden>
        <span>Scroll →</span>
        <span className="wk-bar">
          <span className="wk-bar-fill" />
        </span>
        <span>
          <span className="wk-count">01</span> / {pad2(ITEMS.length)}
        </span>
      </div>
    </section>
  );
};

export default WorkSection;
