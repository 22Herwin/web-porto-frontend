'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface ExpertiseSectionProps {
  className?: string;
}

const EXPERTISE = [
  {
    num: '01',
    title: 'Web Dev',
    desc: 'I craft responsive and dynamic user interfaces using React, Tailwind CSS, and JavaScript — turning ideas into smooth, beautiful experiences.',
    stack: ['React', 'Tailwind CSS', 'JavaScript'],
  },
  {
    num: '02',
    title: 'Backend Dev',
    desc: 'I build robust APIs and server logic using Node.js and Express, making sure the systems behind the scenes run fast and secure.',
    stack: ['Node.js', 'Express'],
  },
  {
    num: '03',
    title: 'Unity Dev',
    desc: 'I create immersive experiences with Unity — designing and developing engaging games and interactive experiences using Unity and C# — combining code, physics and art.',
    stack: ['Unity', 'C#'],
  },
];

const WIDE = '(min-width: 901px)';
const REDUCED = '(prefers-reduced-motion: reduce)';

const ExpertiseSection = ({ className = '' }: ExpertiseSectionProps) => {
  const [active, setActive] = useState(0);
  const panelsRef = useRef<HTMLDivElement>(null);
  const lockUntil = useRef(0);

  useEffect(() => {
    const root = panelsRef.current;
    return () => {
      if (root) gsap.killTweensOf(root.querySelectorAll('.ex-panel, .ex-body > *'));
    };
  }, []);

  // Panels are resized by tweening flex-grow (3 simple boxes, only on interaction, never on scroll).
  const activate = (index: number, now: number, fromHover = false) => {
    const root = panelsRef.current;
    if (!root || index === active) return;

    // prefers-reduced-motion: keep the transition but make it shorter and drop the slide-up
    // (an instant snap reads as a glitch / blink rather than "less motion")
    const reduce = window.matchMedia(REDUCED).matches;
    const duration = reduce ? 0.4 : 0.9;

    // After a switch the panels slide under a resting cursor; ignore the hover that causes.
    if (fromHover && now < lockUntil.current) return;
    lockUntil.current = now + duration * 1000 + 50;

    setActive(index);

    // narrow screens render every panel open (see CSS), nothing to animate
    if (!window.matchMedia(WIDE).matches) return;

    const panels = root.querySelectorAll<HTMLElement>('.ex-panel');

    // ease-out: starts moving immediately (an in/out curve sits still, then snaps)
    gsap.to(panels, {
      flexGrow: (i) => (i === index ? 1 : 0),
      duration,
      ease: 'power4.out',
      overwrite: 'auto',
    });

    gsap.fromTo(
      panels[index].querySelectorAll('.ex-body > *'),
      reduce ? { opacity: 0 } : { opacity: 0, y: 16 },
      {
        opacity: 1,
        y: 0,
        duration: reduce ? 0.3 : 0.6,
        ease: 'power3.out',
        stagger: reduce ? 0 : 0.06,
        delay: reduce ? 0.05 : 0.12,
        clearProps: 'opacity,transform',
        overwrite: 'auto',
      },
    );
  };

  return (
    <section
      id="expertise"
      className={`ex tx tx-paper select-none ${className}`}
      data-theme="expertise"
      data-bg="#ebe9e4"
    >
      <div className="ex-top">
        <span>02 / Expertise</span>
        <span>[ hover / tap a panel ]</span>
      </div>

      <div className="ex-head">
        <h2 className="ex-heading" data-reveal="lines">
          My Expertise
        </h2>

        <aside className="ex-note" data-reveal="fade">
          <p>Sleeping is the best solutions of fixing bugs. Trust me, I&apos;ve tried...</p>
        </aside>
      </div>

      <div className="ex-panels" ref={panelsRef} data-reveal="fade">
        {EXPERTISE.map(({ num, title, desc, stack }, i) => {
          const isActive = i === active;
          return (
            <article
              key={num}
              className="ex-panel"
              data-active={isActive}
              onPointerEnter={(e) => activate(i, e.timeStamp, true)}
            >
              <h3 className="ex-strip-wrap">
                <button
                  type="button"
                  className="ex-strip"
                  aria-expanded={isActive}
                  aria-controls={`ex-body-${i}`}
                  onClick={(e) => activate(i, e.timeStamp)}
                  onFocus={(e) => activate(i, e.timeStamp)}
                >
                  <span className="ex-num">{num}</span>
                  <span className="ex-title">{title}</span>
                </button>
              </h3>

              <div className="ex-body" id={`ex-body-${i}`} aria-hidden={!isActive}>
                <p className="ex-desc">{desc}</p>
                <ul className="ex-stack">
                  {stack.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>

              <div className="ex-diag" aria-hidden>
                <p>DIAGNOSTIC.EXE</p>
                <p className="ex-diag-dim">RUNNING STACK SCAN...</p>
                <ul>
                  {stack.map((s) => (
                    <li key={s}>
                      <span>&gt; {s}</span>
                      <span className="ex-diag-ok">[OK]</span>
                    </li>
                  ))}
                </ul>
                <p className="ex-diag-dim">RESULT: READY</p>
              </div>

              <span className="ex-bignum" aria-hidden>
                {num}
              </span>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default ExpertiseSection;
