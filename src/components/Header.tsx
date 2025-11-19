'use client';
import React from 'react';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { scrollToSection } from '../app/hooks/useStackScroll';

gsap.registerPlugin(ScrollToPlugin);

const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'expertise', label: 'Expertise' },
  { id: 'work', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
];

const Header = () => {
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);
  const [revealedCount, setRevealedCount] = React.useState(0);

  React.useEffect(() => {
    const timers: number[] = [];
    NAV_ITEMS.forEach((_, i) => {
      timers.push(
        window.setTimeout(() => {
          setRevealedCount((c) => Math.max(c, i + 1));
        }, i * 100),
      );
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <header className="select-none font-alkatra py-7 md:py-9 fixed top-0 left-0 w-full z-999 bg-transparent">
      <nav aria-label="Main navigation" className="max-w-7xl mx-auto">
        <ul className="list-none m-0 p-0 flex justify-center items-center gap-8">
          {NAV_ITEMS.map(({ id, label }, i) => {
            const isHovered = hoveredIndex === i;
            const anyHovered = hoveredIndex !== null;
            const revealed = i < revealedCount;

            const opacityClass = !revealed
              ? 'opacity-0'
              : !anyHovered
                ? 'opacity-100'
                : isHovered
                  ? 'opacity-100'
                  : 'opacity-60';

            const translateClass = revealed ? 'translate-y-0' : 'translate-y-2';
            const colorClass = 'text-current';
            const underlineClass = isHovered ? 'underline decoration-current' : '';

            const itemClasses = [
              'uppercase',
              'transition-all',
              'duration-500',
              'ease-out',
              'cursor-pointer',
              opacityClass,
              translateClass,
              colorClass,
              underlineClass,
            ].join(' ');

            return (
              <li
                key={id}
                className={itemClasses}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => scrollToSection(id)}
              >
                {label}
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
