import { useState, useRef, useEffect, useCallback, ReactNode } from "react";
import ScrollTabs from "./ScrollTabs";
import ScrollSection from "./ScrollSection";

interface Section {
  id: string;
  label: string;
  content: ReactNode;
}

interface ScrollContainerProps {
  sections: Section[];
}

const ScrollContainer = ({ sections }: ScrollContainerProps) => {
  const [activeSection, setActiveSection] = useState(sections[0]?.id || "");
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const tabs = sections.map((s) => ({ id: s.id, label: s.label }));

  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const parentScrollArea = containerRef.current.closest('main');
    if (!parentScrollArea) return;

    // Calculate progress based on how far we've scrolled through the container's scroll range
    const scrollTop = window.scrollY;
    const containerTop = containerRef.current.offsetTop;
    const containerHeight = containerRef.current.offsetHeight;
    const scrollableHeight = containerHeight * (sections.length - 1);
    
    const relativeScroll = scrollTop - containerTop;
    const progress = Math.max(0, Math.min(1, relativeScroll / scrollableHeight));
    
    setScrollProgress(progress);

    // Calculate which section should be active based on scroll position
    const sectionIndex = Math.min(
      Math.floor(progress * sections.length),
      sections.length - 1
    );
    
    const newActiveSection = sections[sectionIndex]?.id;
    if (newActiveSection && newActiveSection !== activeSection) {
      setActiveSection(newActiveSection);
    }
  }, [sections, activeSection]);

  const handleTabClick = (id: string) => {
    const index = sections.findIndex((s) => s.id === id);
    if (index === -1 || !containerRef.current) return;

    const containerTop = containerRef.current.offsetTop;
    const containerHeight = containerRef.current.offsetHeight;
    const scrollableHeight = containerHeight * (sections.length - 1);
    const targetScroll = containerTop + (index / sections.length) * scrollableHeight;

    window.scrollTo({
      top: targetScroll,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div ref={containerRef} className="sticky top-0 flex flex-col h-screen overflow-hidden bg-background">
      <ScrollTabs tabs={tabs} activeTab={activeSection} onTabClick={handleTabClick} />
      
      {/* Progress indicator */}
      <div className="h-1 bg-muted relative">
        <div 
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-accent transition-all duration-150"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>

      {/* Sections container */}
      <div className="flex-1 relative">
        {sections.map((section) => (
          <ScrollSection
            key={section.id}
            id={section.id}
            isActive={activeSection === section.id}
          >
            {section.content}
          </ScrollSection>
        ))}
      </div>
    </div>
  );
};

export default ScrollContainer;
