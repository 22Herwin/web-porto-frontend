'use client';

// sections for the home page
import HeroSection from '@/components/sections/HeroSection';
import ExpertiseSection from '@/components/sections/ExpertiseSection';
import WorkSection from '@/components/sections/WorkSection';
import ExperienceSection from '@/components/sections/ExperienceSection';
import ContactSection from '@/components/sections/ContactSection';

// hooks for page effects
import useHeaderTheme from './hooks/useRandomTheme';
import { useBackgroundTransition } from './hooks/useBackgroundTransition';
import { useStackScroll } from './hooks/useStackScroll';

export default function Home() {
  useHeaderTheme();
  useBackgroundTransition();
  useStackScroll('.stack-section');

  return (
    <main className="page-scroll transition-colors duration-1000 ease-in-out">
      <HeroSection className="stack-section" />
      <ExpertiseSection className="stack-section" />
      <WorkSection className="stack-section" />
      <ExperienceSection className="stack-section" />
      <ContactSection className="stack-section" />
    </main>
  );
}
