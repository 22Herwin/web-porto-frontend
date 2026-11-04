'use client';

import React, { useRef } from 'react';
import { useHeroMotion } from '../../app/hooks/useHeroMotion';

interface HeroSectionProps {
  className?: string;
}

const NAME = 'HERWIN'.split('');
const MARQUEE_ITEMS = ['Web Dev', 'Backend', 'Unity Dev', 'Illustrator'];

const HeroSection = ({ className = '' }: HeroSectionProps) => {
  const rootRef = useRef<HTMLElement | null>(null);
  useHeroMotion(rootRef);

  return (
    <section
      id="home"
      ref={rootRef}
      className={`hx tx tx-paper select-none ${className}`}
      data-theme="hero"
    >
      {/* meta row */}
      <div className="hx-meta" data-intro>
        <span>Artist / Programmer</span>
        <span>[ ver. 2026 / portfolio ]</span>
      </div>

      {/* red halftone sun + system readout, tucked behind / beside the giant name */}
      <div className="hx-disc ht" aria-hidden data-intro />
      <dl className="hx-hud" aria-hidden data-intro>
        <div>
          <dt>SYS.STATUS</dt>
          <dd>
            <span className="hx-tag">ONLINE</span>
          </dd>
        </div>
        <div>
          <dt>BUILD</dt>
          <dd>2026</dd>
        </div>
        <div>
          <dt>SIGNAL</dt>
          <dd>▮▮▮▮▯</dd>
        </div>
      </dl>

      {/* brush greeting on a highlighter swipe, overlapping the name */}
      <div className="hx-welcome" aria-hidden>
        <span className="hx-welcome-swipe" />
        <span className="hx-welcome-text font-splash uppercase">Hi, I&apos;m</span>
      </div>

      {/* giant name, one span per letter for stagger + hover */}
      <h1 className="hx-name" aria-label="Hi, I'm Herwin">
        {NAME.map((ch, i) => (
          <span key={i} className="hx-letter-mask" aria-hidden>
            <span className="hx-letter" style={{ '--i': i } as React.CSSProperties}>
              {ch}
            </span>
          </span>
        ))}
      </h1>

      {/* print ruler */}
      <div className="hx-ruler" aria-hidden data-intro>
        {['000', '025', '050', '075', '100'].map((n) => (
          <span key={n}>{n}</span>
        ))}
      </div>

      {/* intro */}
      <div className="hx-intro">
        <p className="hx-lead" data-intro>
          A Passionate &ldquo;Artist&rdquo; and Programmer even though sometimes I got distracted
          with other stuff :p
        </p>

        <div className="hx-note" data-intro>
          <p>
            I drink coffee, I eat snacks. I write code and improve my design and skills every day. I
            am honored to work with special people and I can adapt with new people :{'>'}
          </p>
          <div className="hx-file" aria-hidden>
            <span className="hx-barcode" />
            <span>FILE: HERWIN_2026.EXE</span>
          </div>
        </div>

        <div className="hx-scroll" aria-hidden data-intro>
          <span>Scroll</span>
          <span className="hx-scroll-arrow">↓</span>
        </div>
      </div>

      {/* marquee band */}
      <div className="hx-marquee" aria-hidden data-intro>
        <div className="hx-marquee-track">
          {[0, 1].map((dup) => (
            <ul key={dup} className="hx-marquee-group">
              {MARQUEE_ITEMS.map((item) => (
                <li key={item}>
                  {item}
                  <span className="hx-marquee-sep">✦</span>
                </li>
              ))}
              {MARQUEE_ITEMS.map((item) => (
                <li key={`${item}-b`}>
                  {item}
                  <span className="hx-marquee-sep">✦</span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
