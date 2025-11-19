'use client';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

interface HeroSectionProps {
  className?: string;
}

type Experience = {
  id: string;
  title: string;
  location?: string;
  date?: string;
  desc: string;
  tech?: string;
  imgSrc?: string;
};

const EXPERIENCES: Experience[] = [
  {
    id: 'innowork',
    title: 'Innowork 2025 @ Effortech',
    location: 'Surabaya, Indonesia',
    date: '2025',
    desc: 'A VR + Digital Twin simulation of a UHT milk machine, created for Innowork 2025 at Effortech to visualize real-time industrial processes.',
    tech: 'Unity + VR → MQTT → IoT',
    imgSrc: '/images/innowork.svg',
  },
  {
    id: 'kmipn',
    title: 'KMIPN V 2023',
    location: 'Surabaya, Indonesia',
    date: '2023',
    desc: 'A VR + Digital Twin simulation of a UHT milk machine, created for Innowork 2025 at Effortech to visualize real-time industrial processes.',
    tech: '3D + Unity → Game Development',
    imgSrc: '/images/innowork.svg',
  },
  // add more items here if needed
];

const ExperienceSection = ({ className = '' }: HeroSectionProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // default first open (change to null if none)
  const descRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [heights, setHeights] = useState<number[]>([]);
  const [activePreview, setActivePreview] = useState<string | undefined>(EXPERIENCES[0].imgSrc);

  // measure heights for smooth expand/collapse
  useEffect(() => {
    const measureAll = () => {
      const arr = EXPERIENCES.map((_, i) => {
        const el = descRefs.current[i];
        return el ? el.scrollHeight : 0;
      });
      setHeights(arr);
    };

    measureAll();
    // remeasure after a short delay (images/fonts)
    const t = window.setTimeout(measureAll, 250);

    const onResize = () => measureAll();
    window.addEventListener('resize', onResize);

    return () => {
      window.clearTimeout(t);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  const toggle = (i: number) => {
    const next = openIndex === i ? null : i;

    if (next !== null) {
      // measure the actual content height right now and include the open paddings (24 + 24)
      const el = descRefs.current[i];
      const measured = el ? el.scrollHeight + 24 + 24 : 0;
      setHeights((prev) => {
        const copy = Array.from({ length: EXPERIENCES.length }, (_, idx) => prev[idx] ?? 0);
        copy[i] = measured;
        return copy;
      });
      setActivePreview(EXPERIENCES[i].imgSrc);
    } else {
      setActivePreview(undefined);
    }

    setOpenIndex(next);
  };

  return (
    <section
      id="experience"
      className={`experience-section min-h-screen py-20 px-4 md:px-12 lg:px-20 relative bg-[#0a0908] overflow-hidden text-white select-none ${className}`}
      data-theme="experience"
      data-bg="#0a0908"
    >
      {/* giant outline background word */}
      <div aria-hidden className="absolute inset-0 pt-24 pointer-events-none select-none z-0">
        <div className="experience-bg-word-wrap font-bebas-neue">
          {/* TOP LEFT */}
          <div className="experience-bg-left">
            <span className="experience-bg-word experience-bg-fill">EXPERIENCE</span>
            <span className="experience-bg-word experience-bg-outline">EXPERIENCE</span>
          </div>

          {/* BOTTOM RIGHT */}
          <div className="experience-bg-right">
            <span className="experience-bg-word experience-bg-outline">EXPERIENCE</span>
            <span className="experience-bg-word experience-bg-fill">EXPERIENCE</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center min-h-screen">
        <div className="space-y-6">
          {/* map cards */}
          {EXPERIENCES.map((exp, i) => {
            const isOpen = openIndex === i;
            return (
              <article
                key={exp.id}
                className="experience-card border border-white/10 overflow-hidden"
              >
                <div
                  className="experience-card-wrapper transition-all duration-400"
                  // keep visual max-height controlled by inner description cup
                >
                  <div
                    role="button"
                    tabIndex={0}
                    aria-expanded={isOpen}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        toggle(i);
                      }
                    }}
                    onClick={() => toggle(i)}
                    className="experience-card-title font-mono text-[#1a1a1a] text-sm leading-relaxed bg-gray-200 px-6 py-4 cursor-pointer flex items-center justify-between"
                  >
                    <div>
                      <h3 className="text-2xl mb-1">{exp.title}</h3>
                    </div>
                    <div className="text-sm text-gray-700/80">{isOpen ? '—' : '+'}</div>
                  </div>

                  {/* animated collapsible content */}
                  <div
                    ref={(el) => {
                      descRefs.current[i] = el;
                    }}
                    className="experience-card-description bg-[#1a1a1a] text-gray-200 px-6 overflow-hidden"
                    style={{
                      // animate height using measured scrollHeight to avoid CSS max-height guessing
                      height: isOpen ? (heights[i] ? `${heights[i]}px` : 'auto') : 0,
                      transition: 'height 320ms ease, opacity 220ms ease',
                      opacity: isOpen ? 1 : 0,
                      paddingTop: isOpen ? 24 : 0,
                      paddingBottom: isOpen ? 24 : 0,
                    }}
                    aria-hidden={!isOpen}
                  >
                    <p className="text-sm text-gray-300 italic mb-2">{exp.location}</p>
                    <p className="text-sm leading-relaxed mb-4">{exp.desc}</p>
                    <hr className="border-gray-500/30 mb-2" />
                    <p className="text-sm text-gray-400">{exp.tech}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* RIGHT SIDE – preview area */}
        <div className="relative flex justify-center items-start md:items-center min-h-112">
          {/* subtle “back card” */}
          <div className="absolute w-[90%] h-[90%] bg-[#1a1a1a] border border-white/10 rotate-3 translate-x-4 translate-y-4 overflow-hidden"></div>

          {/* main photo / preview */}
          <div
            className={`relative w-[80%] shadow-2xl transform transition-transform duration-500 ${
              openIndex !== null ? '-rotate-3 translate-y-0' : 'rotate-0 opacity-60 translate-y-8'
            }`}
            aria-hidden={activePreview ? false : true}
          >
            {/* center label that follows this box's transform; visible only when no preview image */}
            {!activePreview && <span className="preview-back-label">IMAGE</span>}
            {activePreview ? (
              <Image
                src={activePreview}
                alt={EXPERIENCES[openIndex ?? 0]?.title ?? 'Preview'}
                width={800}
                height={600}
                className="w-full h-auto rounded-sm object-cover border border-white/20 grayscale brightness-50"
              />
            ) : (
              // fallback empty box when no active preview
              <div className="w-full h-56 rounded-sm bg-white/5 border border-white/10" />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
