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
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const tabs = sections.map((s) => ({ id: s.id, label: s.label }));

  const handleScroll = useCallback(() => {
    if (!wrapperRef.current) return;

    const wrapper = wrapperRef.current;
    const wrapperRect = wrapper.getBoundingClientRect();
    const wrapperHeight = wrapper.offsetHeight;
    const viewportHeight = window.innerHeight;
    
    // Calculate how much we've scrolled through the wrapper
    const scrolledIntoWrapper = -wrapperRect.top;
    const scrollableDistance = wrapperHeight - viewportHeight;
    
    const progress = Math.max(0, Math.min(1, scrolledIntoWrapper / scrollableDistance));
    
    setScrollProgress(progress);

    // Calculate which section should be active
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
    if (index === -1 || !wrapperRef.current) return;

    const wrapper = wrapperRef.current;
    const wrapperTop = wrapper.offsetTop;
    const wrapperHeight = wrapper.offsetHeight;
    const viewportHeight = window.innerHeight;
    const scrollableDistance = wrapperHeight - viewportHeight;
    
    const targetScroll = wrapperTop + (index / (sections.length - 1 || 1)) * scrollableDistance;

    window.scrollTo({
      top: targetScroll,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    // Find the parent wrapper div
    if (containerRef.current) {
      wrapperRef.current = containerRef.current.parentElement as HTMLDivElement;
    }
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial call
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
