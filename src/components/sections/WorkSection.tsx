'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

interface HeroSectionProps {
  className?: string;
}

const WorkSection = ({ className = '' }: HeroSectionProps) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            section.classList.add('visible');
          } else {
            section.classList.remove('visible');
          }
        });
      },
      { threshold: 0.1 }, // adjust how early it fades in
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="work"
      ref={sectionRef}
      className={`py-20 ${className}`}
      data-theme="work"
      data-bg="#0a0908"
    >
      {/* big repeated outline words (visual background) */}
      <div
        aria-hidden
        className="absolute font-bebas-neue inset-0 pointer-events-none select-none z-0"
      >
        <div className="work-bg-word-wrap -left-3 top-4">
          <span className="work-bg-word work-bg-front">MY</span>
          <span className="work-bg-word work-bg-back-top">MY</span>
        </div>

        <div className="work-bg-word-wrap -left-3 top-58">
          <span className="work-bg-word work-bg-front">WORK</span>
          <span className="work-bg-word work-bg-back-bottom">WORK</span>
        </div>

        <div className="work-bg-word-wrap -right-3 top-86">
          <span className="work-bg-word work-bg-front">AIN&apos;T</span>
          <span className="work-bg-word work-bg-back-top">AIN&apos;T</span>
        </div>

        <div className="work-bg-word-wrap -right-3 top-135">
          <span className="work-bg-word work-bg-front">MUCH</span>
          <span className="work-bg-word work-bg-back-bottom">MUCH</span>
        </div>

        <div className="work-bg-word-wrap -left-3 bottom-45">
          <span className="work-bg-word work-bg-front">BUT</span>
          <span className="work-bg-word work-bg-back-top">BUT</span>
        </div>

        <div className="work-bg-word-wrap -left-3 -bottom-3">
          <span className="work-bg-word work-bg-front">AIGHT</span>
          <span className="work-bg-word work-bg-back-bottom">AIGHT</span>
        </div>
      </div>

      <div className="container font-architects-daughter mx-auto px-6 relative z-10 select-none">
        <div className="flex flex-col gap-16">
          {/* 1 - image right */}
          <div className="flex flex-col md:flex-row-reverse items-center md:items-center gap-6">
            <div className="work-image group w-[536px] aspect-536/217 md:w-1/2 overflow-hidden rounded-sm shadow-sm grayscale brightness-50 bg-[#0a0908] cursor-pointer">
              <div className="work-image-inner w-full h-full transition-transform duration-500 ease-out">
                <Image
                  src="../images/image1.svg"
                  alt="work 1"
                  fill
                  className="object-cover w-full h-full transition-transform duration-700 ease-out"
                />
              </div>
            </div>

            <p className="work-description w-full md:w-1/2 text-sm text-white/80 max-w-prose text-center md:text-right">
              A VR + Digital Twin simulation of a UHT milk machine, <br />
              created for Innowork 2025 at Effortech to visualize real-time industrial processes.
            </p>
          </div>

          {/* 2 - image left */}
          <div className="flex flex-col md:flex-row items-center md:items-center gap-6">
            <div className="work-image group w-[536px] aspect-536/217 md:w-1/2 overflow-hidden rounded-sm shadow-sm grayscale brightness-50 bg-[#0a0908] cursor-pointer">
              <div className="work-image-inner w-full h-full transition-transform duration-500 ease-out">
                <Image
                  src="../images/image2.svg"
                  alt="work 2"
                  fill
                  className="object-cover w-full h-full transition-transform duration-700 ease-out"
                />
              </div>
            </div>

            <p className="work-description w-full md:w-1/2 text-sm text-white/80 max-w-prose text-center md:text-left">
              A virtual art gallery built with A-Frame, <br />
              showcasing interactive 3D spaces for exploring digital artworks online.
            </p>
          </div>

          {/* 3 - image right again */}
          <div className="flex flex-col md:flex-row-reverse items-center md:items-center gap-6">
            <div className="work-image group w-[536px] aspect-536/217 md:w-1/2 overflow-hidden rounded-sm shadow-sm grayscale brightness-50 bg-[#0a0908] cursor-pointer">
              <div className="work-image-inner w-full h-full transition-transform duration-500 ease-out">
                <Image
                  src="../images/image3.svg"
                  alt="work 3"
                  fill
                  className="object-cover w-full h-full transition-transform duration-700 ease-out"
                />
              </div>
            </div>
            <p className="work-description w-full md:w-1/2 text-sm text-white/80 max-w-prose text-center md:text-right">
              A responsive web app built with Bootstrap, <br />
              featuring a clean interface for browsing and discovering trending music.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkSection;
