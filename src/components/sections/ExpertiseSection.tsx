'use client';
import React from 'react';
import Sparkle from '../ui/decorations/Sparkle';

interface HeroSectionProps {
  className?: string;
}

const ExpertiseSection = ({ className = '' }: HeroSectionProps) => {
  return (
    <section
      id="expertise"
      className={`expertise-section select-none bg-white text-black relative overflow-hidden py-16 px-12 bg-paper ${className}`}
      data-theme="expertise"
      data-bg="#ffffff"
      style={{ '--paper-bg': '#fff' } as React.CSSProperties}
    >
      {/* Decorative sparkles */}
      <Sparkle top="10%" left="20%" size={30} color="#000" />
      <Sparkle top="50%" right="15%" size={50} color="#555" delay={0.8} />
      <Sparkle bottom="15%" left="40%" size={24} color="#000" rotate={20} delay={1.2} />

      <h2 className="section-title uppercase font-alkatra text-center text-6xl my-4 mb-12">
        My Expertise
      </h2>

      <div className="relative z-10 max-w-6xl mx-auto px-6 font-architects-daughter">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-12 md:gap-x-16 lg:gap-x-20">
          {/* Card 1 */}
          <article className="expertise-card">
            <div className="grid grid-cols-1 md:grid-cols-[56px_1fr] md:grid-rows-[auto_1fr] gap-4">
              <div className="md:col-start-2 md:row-start-1">
                <h3 className="text-lg md:text-xl font-semibold mb-2">{`< Web Dev />`}</h3>
              </div>
              <div className="md:col-start-1 md:row-start-2 flex flex-col items-center md:h-full md:justify-between">
                <span className="tag-open text-xs font-architects-daughter">&lt;h3&gt;</span>
                <div className="w-0.5 bg-black flex-1 my-3 md:my-6 mx-auto self-stretch will-change-transform" />
                <span className="tag-close text-xs font-architects-daughter">&lt;/h3&gt;</span>
              </div>
              <div className="md:col-start-2 md:row-start-2">
                <div className="card-body pl-2 md:py-6 md:min-h-32">
                  <p className="m-0 max-w-[40ch] text-base leading-relaxed text-[rgba(0,0,0,0.85)]">
                    I craft responsive and dynamic user interfaces using React, Tailwind CSS, and
                    JavaScript — turning ideas into smooth, beautiful experiences.
                  </p>
                </div>
              </div>
            </div>
          </article>

          {/* Card 2 */}
          <article className="expertise-card">
            <div className="grid grid-cols-1 md:grid-cols-[56px_1fr] md:grid-rows-[auto_1fr] gap-4">
              <div className="md:col-start-2 md:row-start-1">
                <h3 className="text-lg md:text-xl font-semibold mb-2">{`< Backend Dev />`}</h3>
              </div>

              <div className="md:col-start-1 md:row-start-2 flex flex-col items-center md:h-full md:justify-between">
                <span className="tag-open text-xs font-architects-daughter">&lt;h3&gt;</span>
                <div className="w-0.5 bg-black flex-1 my-3 md:my-6 mx-auto self-stretch will-change-transform" />
                <span className="tag-close text-xs font-architects-daughter">&lt;/h3&gt;</span>
              </div>

              <div className="md:col-start-2 md:row-start-2">
                <div className="card-body pl-2 md:py-6 md:min-h-32">
                  <p className="m-0 max-w-[40ch] text-base leading-relaxed text-[rgba(0,0,0,0.85)]">
                    I build robust APIs and server logic using Node.js and Express, making sure the
                    systems behind the scenes run fast and secure.
                  </p>
                </div>
              </div>
            </div>
          </article>

          {/* Card 3 */}
          <article className="expertise-card">
            <div className="grid grid-cols-1 md:grid-cols-[56px_1fr] md:grid-rows-[auto_1fr] gap-4">
              <div className="md:col-start-2 md:row-start-1">
                <h3 className="text-lg md:text-xl font-semibold mb-2">{`< Unity Dev />`}</h3>
              </div>

              <div className="md:col-start-1 md:row-start-2 flex flex-col items-center md:h-full md:justify-between">
                <span className="tag-open text-xs font-architects-daughter">&lt;h3&gt;</span>
                <div className="w-0.5 bg-black flex-1 my-3 md:my-6 mx-auto self-stretch will-change-transform" />
                <span className="tag-close text-xs font-architects-daughter">&lt;/h3&gt;</span>
              </div>

              <div className="md:col-start-2 md:row-start-2">
                <div className="card-body pl-2 md:py-6 md:min-h-32">
                  <p className="m-0 max-w-[40ch] text-base leading-relaxed text-[rgba(0,0,0,0.85)]">
                    I create immersive experiences with Unity — designing and developing engaging
                    games and interactive experiences using Unity and C# — combining code, physics
                    and art.
                  </p>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>

      <div className="absolute bottom-5 left-10 w-96 text-[0.8rem] leading-relaxed font-mono text-white bg-black p-3 rotate-2 z-10">
        <p className="mb-3">
          I design, I code, I break things — then I fix them better. Every project is a small
          rebellion against boring interfaces and clunky experiences.
        </p>
        <p className="italic opacity-80">
          Sleeping is the best solutions of fixing bugs. Trust me, I&apos;ve tried...
        </p>
      </div>

      <div
        className="absolute font-bebas-neue -right-6 -bottom-10 pointer-events-none select-none z-0 hidden md:block"
        aria-hidden
      >
        <div
          className="absolute right-3 bottom-0 pointer-events-none select-none z-0 hidden md:block"
          aria-hidden
        >
          {/* filled layer */}
          <div className="absolute right-0 bottom-0 leading-none text-[clamp(5rem,24vw,16rem)] text-black/10">
            DESIGN
          </div>

          {/* outlined layer */}
          <div className="absolute right-0 bottom-0 leading-none text-[clamp(5rem,24vw,16rem)] text-transparent z-10 expertise-bg-outline-text">
            DESIGN
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExpertiseSection;
