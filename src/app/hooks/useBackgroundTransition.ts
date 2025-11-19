import { useEffect } from 'react';

export function useBackgroundTransition() {
  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>('[data-bg]');
    const main = document.querySelector('main');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const section = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            const bg = section.dataset.bg;
            if (main && bg) {
              main.style.transition = 'background-color 1s ease';
              main.style.backgroundColor = bg;
            }
          }
        });
      },
      { threshold: 0.4 }, // triggers when section ~40% visible
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);
}
