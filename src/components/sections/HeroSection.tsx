'use client';
import React from 'react';
import RandomRoles from '../ui/decorations/RandomRoles';
import { useRandomRectangles } from '../../app/hooks/useRandomRectangles';

interface HeroSectionProps {
  className?: string;
}

const HeroSection = ({ className = '' }: HeroSectionProps) => {
  const text =
    "Heyy I'm Herwin, I'm a Passionate “Artist” and Programmer even though sometimes I'm busy with other stuff :p";

  const chunkWords = (s: string, size = 4) => {
    const words = s.split(/\s+/);
    const lines: string[] = [];
    for (let i = 0; i < words.length; i += size) {
      lines.push(words.slice(i, i + size).join(' '));
    }
    return lines;
  };

  React.useEffect(() => {
    const wrapper = document.querySelector('.hero-title-wrapper');
    if (!wrapper) return;
    // ensure class added after paint so animation plays
    requestAnimationFrame(() => {
      wrapper.classList.add('is-animate');
    });
    // optional: remove class on unmount so it can be re-triggered later
    return () => wrapper.classList.remove('is-animate');
  }, []);

  const randomRects = useRandomRectangles(20);
  const lines = chunkWords(text, 7); // change use n words per line

  return (
    <section
      id="hero"
      className={`hero bg-white text-black overflow-hidden relative select-none ${className}`}
      data-theme="hero"
    >
      {/* random decorative rectangles */}
      {randomRects.map((r) => (
        <div
          key={r.id}
          aria-hidden
          className={`absolute animate-float ${r.isFilled ? 'bg-black' : 'border-black'}`}
          style={
            {
              left: `${r.left}%`,
              top: `${r.top}%`,
              width: `${r.size}px`,
              height: `${r.size}px`,
              transform: `rotate(${r.rotate}deg)`,
              opacity: r.opacity,
              borderWidth: `${r.borderW}px`,
              pointerEvents: 'none',
              '--r': `${r.rotate}deg`,
            } as React.CSSProperties
          }
        />
      ))}

      <div className="hero-bg-text font-bebas-neue uppercase" aria-hidden>
        Prog-
        <br />
        rammer
      </div>

      <div className="hero-inner max-w-4xl mx-auto text-center relative z-10 px-6">
        <div className="hero-title-wrapper inline-block relative">
          <div className="hero-title-line hero-title-line--top" aria-hidden />
          <h1 className="hero-title font-splash uppercase relative z-20">Welcome</h1>
          <div className="hero-title-line hero-title-line--bottom" aria-hidden />
        </div>

        <div className="hero-description max-w-2xl mx-auto font-architects-daughter text-lg md:text-xl">
          {lines.map((ln, idx) => (
            <div key={idx} className="leading-tight">
              {ln}
            </div>
          ))}
        </div>

        <div className="hero-arrow">
          <div className="text-3xl animate-bounce mx-auto w-fit cursor-pointer">↓</div>
        </div>
      </div>

      <div className="absolute bottom-22 right-6 w-60 text-[0.8rem] leading-relaxed font-mono text-white bg-black p-3 -rotate-2 z-10">
        <p className="mb-3">
          I drink coffee, I eat snacks. I write code and improve my design and skills every day. I
          am honored to work with special people and I can adapt with new people :{'>'}
        </p>
        <p className="italic opacity-80">
          Create this while laying on the bed and snacks of course :3
        </p>
      </div>

      <div className="absolute bottom-11 right-6 text-xs font-mono tracking-widest">
        [ ver. 2025 / portfolio ]
      </div>

      <RandomRoles />
    </section>
  );
};
export default HeroSection;
