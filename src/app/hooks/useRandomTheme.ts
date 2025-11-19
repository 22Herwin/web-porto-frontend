'use client';
import { useEffect } from 'react';

export default function useHeaderTheme() {
  useEffect(() => {
    const header = document.querySelector('header');
    const sections = document.querySelectorAll('section[data-theme]');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const theme = entry.target.getAttribute('data-theme');
            if (theme) header?.setAttribute('data-theme', theme);
          }
        });
      },
      { threshold: 0.5 },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);
}
