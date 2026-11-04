'use client';

// sections for the home page
import HeroSection from '@/components/sections/HeroSection';
import ExpertiseSection from '@/components/sections/ExpertiseSection';
import WorkSection from '@/components/sections/WorkSection';
import ContactSection from '@/components/sections/ContactSection';

// hooks for page effects
import useHeaderTheme from './hooks/useRandomTheme';
import { useBackgroundTransition } from './hooks/useBackgroundTransition';
import { useScrollReveal } from './hooks/useScrollReveal';

export default function Home() {
  useHeaderTheme();
  useBackgroundTransition();
  useScrollReveal();

  return (
    <main className="page-scroll transition-colors duration-1000 ease-in-out">
      <HeroSection className="stack-section" />
      <ExpertiseSection className="stack-section" />
      <WorkSection className="stack-section" />
      <ContactSection className="stack-section" />
    </main>
  );
}
