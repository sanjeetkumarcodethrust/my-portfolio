import { useEffect, useState } from 'react';
import AboutSection from '../components/AboutSection';
import ContactSection from '../components/ContactSection';
import HeroSection from '../components/HeroSection';
import LoadingScreen from '../components/LoadingScreen';
import Navbar from '../components/Navbar';
import ProjectsSection from '../components/ProjectsSection';
import ResumeSection from '../components/ResumeSection';
import Seo from '../components/Seo';
import SkillsSection from '../components/SkillsSection';
import useActiveSection from '../hooks/useActiveSection';
import useProjects from '../hooks/useProjects';
import { navLinks } from '../data/portfolio';
import { getResumeUrl } from '../services/supabase';

const sectionIds = navLinks.map((item) => item.id);

export default function HomePage() {
  const activeSection = useActiveSection(sectionIds);
  const { projects, loading } = useProjects();
  const [showLoader, setShowLoader] = useState(true);
  const resumeUrl = getResumeUrl();

  useEffect(() => {
    const timeout = window.setTimeout(() => setShowLoader(false), 900);
    return () => window.clearTimeout(timeout);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (!element) {
      return;
    }

    const offset = 110;
    const top = element.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  useEffect(() => {
    if (!window.location.hash) {
      return undefined;
    }

    const sectionId = window.location.hash.replace('#', '');
    const timeout = window.setTimeout(() => scrollToSection(sectionId), 250);
    return () => window.clearTimeout(timeout);
  }, []);

  return (
    <>
      <Seo />
      {showLoader ? <LoadingScreen /> : null}
      <Navbar activeSection={activeSection} onNavClick={scrollToSection} resumeUrl={resumeUrl} />
      <main>
        <HeroSection
          onProjectClick={() => scrollToSection('projects')}
          resumeUrl={resumeUrl}
          onResumeClick={() => scrollToSection('resume')}
        />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection projects={projects} loading={loading} />
        <ResumeSection resumeUrl={resumeUrl} />
        <ContactSection />
      </main>
    </>
  );
}
