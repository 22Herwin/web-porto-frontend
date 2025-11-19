'use client';

import Image from 'next/image';

interface HeroSectionProps {
  className?: string;
}

const ContactSection = ({ className = '' }: HeroSectionProps) => {
  return (
    <section
      id="contact"
      className={`contact-section min-h-screen py-20 px-4 md:px-12 lg:px-20 relative bg-[#0a0908] text-white select-none ${className}`}
      data-theme="contact"
      data-bg="#0a0908"
    >
      {/* background big vertical word */}
      <div aria-hidden className="absolute inset-0 pointer-events-none select-none z-0">
        <div className="contact-bg-wrap font-bebas-neue w-full h-full flex items-center">
          <div className="contact-bg-left ml-4">
            <span className="contact-bg-word contact-bg-fill">CONTACT</span>
            <span className="contact-bg-word contact-bg-outline">CONTACT</span>
          </div>
        </div>
      </div>

      {/* main content */}
      <div className="container mx-auto relative z-10 h-full">
        <div className="relative w-full h-full flex items-center justify-between px-8 py-12">
          {/* Left: stacked polaroid */}
          <div className="relative">
            {/* Polaroid area with explicit size so Next/Image fill works */}
            <div className="relative w-72 h-72">
              {/* back white card (slightly offset & rotated) */}
              <div
                className="absolute -left-4 -top-4 w-72 h-72 bg-[#1a1a1a] border border-white/10 shadow-sm transform rotate-3 z-10"
                aria-hidden="true"
              />

              {/* main photo card */}
              <div className="absolute left-0 top-0 w-72 h-72 bg-white overflow-hidden shadow-lg transform -rotate-6 z-20">
                <div className="relative w-full h-full">
                  <Image src="/images/fich.gif" alt="me" fill className="object-cover" priority />
                </div>
              </div>
            </div>
          </div>

          {/* circle + arrow + "This is me" */}
          <div className="absolute left-60 top-10 flex items-center space-x-3">
            <div className="relative">
              <span className="px-3 py-1 text-white text-3xl font-architects-daughter">
                This is me btw...
              </span>
            </div>
            {/* Circle svg */}
            <svg className="absolute left-25 -top-2" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M4.66 4.442C19.968 3.87 51.687 7.98 59.806 10.15c8.119 2.17 42.004 11.335 42.193 22.216.19 10.881-23.966 21.44-51.095 18.938C23.775 48.802 2.174 36.415 2.001 25.7 1.828 14.986 19.498 5.55 42.092 2.767c22.595-2.785 62.01 7.677 49.853 28.879"
                stroke="#F3DBC7"
                strokeWidth="3"
                fill="none"
                fillRule="evenodd"
              ></path>
            </svg>
            {/* curved arrow svg */}
            <svg
              className="absolute rotate-90 scale-y-[-1] left-10 top-30"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.791 49.777c-.154 4.195-.626 7.827.954 11.852C7.36 73.39 17.485 82.682 29.442 85.955c6.397 1.75 13.576 2.803 20.193 1.89C62.927 86.012 76.9 76.609 87.222 68.784c20.494-15.536 36.094-38.7 35.837-65.222-.256 2.407 2.277 5.37 3.358 7.347 3.17 5.796 5.405 12.093 8.129 18.101.294-2.43-1.167-8.517-1.441-9.82a58.697 58.697 0 0 0-4.824-15.298 6.762 6.762 0 0 1-1.419-2.863c-3.007-.098-5.698.975-8.074 3.217-7.107 4.072-13.72 9.399-19.817 14.854"
                stroke="#fff"
                strokeWidth="2"
                fill="none"
                fillRule="evenodd"
                opacity="0.95"
              />
            </svg>
          </div>

          {/* Right: tilted note card */}
          <div className="absolute right-8 top-10 transform rotate-3">
            <div className="w-72 bg-white text-black font-architects-daughter py-4 px-6 shadow-2xl text-center -rotate-6">
              <p className="text-xl">Leave me a message!!!</p>
            </div>
          </div>
        </div>
      </div>

      {/* socials fixed to bottom center of the section */}
      <div className="font-alkatra absolute left-0 right-0 bottom-8">
        <div className="max-w-5xl mx-auto px-4">
          <div className="border-t border-white/20 pt-6 flex items-center justify-center gap-12">
            <a className="social-link" href="#" target="blank" aria-label="LinkedIn">
              LinkedIn
            </a>
            <a
              className="social-link"
              href="https://github.com/22Herwin"
              target="blank"
              aria-label="Github"
            >
              Github
            </a>
            <a
              className="social-link"
              href="https://www.instagram.com/hrwn._.me"
              target="blank"
              aria-label="Instagram"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-25 right-10 w-96 text-[0.8rem] leading-relaxed font-mono text-black bg-white p-3 rotate-2 z-10">
        <p className="mb-3">
          Sorry if the ui looks a bit messy, I&apos;m still working on and don&apos;t have a proper
          time for working on this portfolio, college got me busy most of the time.
        </p>
        <p className="italic opacity-80">
          Sorry if I&apos;m a bit unresponsive, I might be sleeping... I code late into the night
          and sometimes I just crash.
        </p>
      </div>
    </section>
  );
};

export default ContactSection;
