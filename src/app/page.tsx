'use client';

import { useState } from 'react';
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Blog from "@/components/Blog";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { useTheme } from '@/context/ThemeContext';
import dynamic from 'next/dynamic';

const ResumeViewer = dynamic(() => import('@/components/ResumeViewer'), {
  ssr: false,
});

export default function Home() {
  const [showResume, setShowResume] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const NavItem = ({ id, label }: { id: string, label: string }) => (
    <button
      onClick={() => scrollTo(id)}
      className="text-left py-2 px-4 rounded-lg text-muted-foreground hover:text-primary hover:bg-muted/10 transition-colors font-medium w-full"
    >
      {label}
    </button>
  );

  return (
    <div className="h-screen bg-background text-foreground flex flex-col lg:flex-row overflow-hidden">

      {/* Mobile Header (Visible only on lg hidden) */}
      <div className="lg:hidden flex-shrink-0 bg-card border-b border-border w-full z-50">
        <Header />
      </div>

      {/* Sidebar Navigation (Desktop Only) */}
      <aside className="hidden lg:flex w-64 h-full flex-col border-r border-border bg-background/95 backdrop-blur p-6 flex-shrink-0 z-30">
        <div className="mb-8 px-4">
          <span className="text-xl font-bold tracking-tight">HK.</span>
        </div>

        <nav className="flex-1 flex flex-col gap-2 overflow-y-auto">
          <NavItem id="hero" label="Home" />
          <NavItem id="about" label="About" />
          <NavItem id="skills" label="Skills" />
          <NavItem id="experience" label="Experience" />
          <NavItem id="projects" label="Projects" />
          <NavItem id="blog" label="Blog" />
          <NavItem id="contact" label="Contact" />
        </nav>

        <div className="mt-auto px-4 pt-6 border-t border-border">
          <button
            onClick={toggleTheme}
            className="flex items-center gap-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            {theme === 'light' ? (
              <>
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" /></svg>
                <span>Dark Mode</span>
              </>
            ) : (
              <>
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" /></svg>
                <span>Light Mode</span>
              </>
            )}
          </button>
        </div>
      </aside>

      {/* Main Content Area - Independently Scrollable */}
      <main className="flex-1 h-full overflow-y-auto relative scroll-smooth bg-card">
        <div className="w-full max-w-5xl mx-auto p-6 lg:p-12 space-y-20">
          {/* Hero Section at Top of Content */}
          <div id="hero" className="scroll-mt-24 pt-8 lg:pt-12">
            <Hero onResumeClick={() => setShowResume(!showResume)} showResume={showResume} />
          </div>

          <About />
          <Skills />
          <Experience />
          <Projects />
          <Blog />
          <Education />
          <Contact />
          <Footer />
        </div>
      </main>

      {/* Resume Pane - Flex Sibling (Right) */}
      {showResume && (
        <div className="hidden lg:flex h-full border-l border-border bg-background z-40 transition-all duration-300">
          <ResumeViewer isOpen={showResume} onClose={() => setShowResume(false)} />
        </div>
      )}

      {/* Mobile Resume Modal (if needed, but user requirement is mostly desktop split) */}
      {/* Keeping existing download button on mobile hero helps avoid complex mobile modals */}
    </div>
  );
}
