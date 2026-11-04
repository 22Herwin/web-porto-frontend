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
  { id: 'contact', label: 'Contact' },
];

const Header = () => {
  const [active, setActive] = React.useState('home');
  const listRef = React.useRef<HTMLUListElement>(null);
  const indicatorRef = React.useRef<HTMLSpanElement>(null);
  const placed = React.useRef(false);

  // slide the red block to the active link (x + scaleX only, so it stays on the compositor)
  const moveIndicator = React.useCallback((animate: boolean) => {
    const list = listRef.current;
    const indicator = indicatorRef.current;
    const link = list?.querySelector<HTMLElement>('[aria-current="true"]');
    if (!list || !indicator || !link) return;

    const linkRect = link.getBoundingClientRect();
    const listRect = list.getBoundingClientRect();

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    gsap.to(indicator, {
      x: linkRect.left - listRect.left,
      scaleX: linkRect.width,
      opacity: 1,
      duration: animate && !reduce ? 0.55 : 0,
      ease: 'expo.inOut',
      overwrite: true,
    });
  }, []);

  React.useEffect(() => {
    moveIndicator(placed.current);
    placed.current = true;
  }, [active, moveIndicator]);

  // re-measure when fonts load or the viewport changes (link widths shift)
  React.useEffect(() => {
    const remeasure = () => moveIndicator(false);
    document.fonts.ready.then(remeasure);
    window.addEventListener('resize', remeasure);
    return () => window.removeEventListener('resize', remeasure);
  }, [moveIndicator]);

  // highlight the section currently crossing the middle of the viewport
  React.useEffect(() => {
    const sections = NAV_ITEMS.map(({ id }) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null,
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const go = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    scrollToSection(id);
  };

  return (
    <header className="nav-x select-none" data-theme="hero">
      <nav aria-label="Main navigation" className="nav-x-inner">
        <a
          href="#home"
          className="nav-x-mark"
          onClick={(e) => go(e, 'home')}
          aria-label="Herwin, back to top"
        >
          HERWIN<sup>&copy;26</sup>
        </a>

        <ul className="nav-x-list" ref={listRef}>
          <span className="nav-x-indicator" ref={indicatorRef} aria-hidden />
          {NAV_ITEMS.map(({ id, label }, i) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className="nav-x-link"
                aria-current={active === id ? 'true' : undefined}
                onClick={(e) => go(e, id)}
              >
                <span className="nav-x-index">{String(i + 1).padStart(2, '0')}</span>
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
