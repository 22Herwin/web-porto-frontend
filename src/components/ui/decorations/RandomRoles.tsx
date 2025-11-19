'use client';
import React from 'react';

const roles = ['Web Dev', 'Backend', 'Unity Dev', 'Illustrator'];

interface RoleItem {
  id: number;
  text: string;
  top: string;
  left: string;
  rotation: number;
}

export default function RandomRoles() {
  const [isClient, setIsClient] = React.useState(false);
  const [rolePositions, setRolePositions] = React.useState<RoleItem[]>([]);

  // mark client after hydration
  React.useEffect(() => {
    setIsClient(true);
  }, []);

  // place items after we know hero size; avoid overlaps by checking center distance
  React.useEffect(() => {
    if (!isClient) return;

    const hero = document.querySelector('.hero') as HTMLElement | null;
    if (!hero) return;

    const rect = hero.getBoundingClientRect();
    const placed: { x: number; y: number }[] = [];
    const generated: RoleItem[] = [];

    const minDist = Math.min(rect.width, rect.height) * 0.12;
    const randInRange = (min: number, max: number) => min + Math.random() * (max - min);

    roles.forEach((text, i) => {
      let attempts = 0;
      let found = false;
      let x = 0;
      let y = 0;

      while (!found && attempts < 300) {
        attempts += 1;
        const xFrac = randInRange(0.55, 0.95);
        const yFrac = randInRange(0.05, 0.85);
        x = Math.round(rect.width * xFrac);
        y = Math.round(rect.height * yFrac);

        const ok = placed.every((p) => Math.hypot(p.x - x, p.y - y) >= minDist);
        if (ok) {
          found = true;
          placed.push({ x, y });
        }
      }

      if (!found) {
        const xFrac = randInRange(0.55, 0.95);
        const yFrac = randInRange(0.05, 0.95);
        x = Math.round(rect.width * xFrac);
        y = Math.round(rect.height * yFrac);
        placed.push({ x, y });
      }

      generated.push({
        id: i,
        text,
        left: `${Math.round((x / rect.width) * 100)}%`,
        top: `${Math.round((y / rect.height) * 100)}%`,
        rotation: Math.round((Math.random() * 10 - 5) * 10) / 10,
      });
    });

    setRolePositions(generated);

    // ✅ Properly typed debounce timeout
    let resizeTimeout: ReturnType<typeof setTimeout> | null = null;

    const onResize = (): void => {
      if (resizeTimeout) clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        setRolePositions([]);
        setTimeout(() => setRolePositions(generated), 0);
      }, 120);
    };

    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      if (resizeTimeout) clearTimeout(resizeTimeout);
    };
  }, [isClient]);

  if (!isClient) return null;

  return (
    <>
      {rolePositions.map((r) => (
        <p
          key={r.id}
          className="absolute px-3 py-1 font-architects-daughter uppercase whitespace-nowrap"
          style={{
            top: r.top,
            left: r.left,
            transform: `rotate(${r.rotation}deg)`,
            background: 'black',
            color: 'white',
            border: '1px solid rgba(0,0,0,0.06)',
            mixBlendMode: 'multiply',
            zIndex: 2,
            pointerEvents: 'none',
          }}
        >
          {r.text}
        </p>
      ))}
    </>
  );
}
