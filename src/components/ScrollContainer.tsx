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
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const tabs = sections.map((s) => ({ id: s.id, label: s.label }));

  const handleScroll = useCallback(() => {
    if (!scrollAreaRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = scrollAreaRef.current;
    const maxScroll = scrollHeight - clientHeight;
    const progress = maxScroll > 0 ? scrollTop / maxScroll : 0;
    
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
    if (index === -1 || !scrollAreaRef.current) return;

    const { scrollHeight, clientHeight } = scrollAreaRef.current;
    const maxScroll = scrollHeight - clientHeight;
    const targetScroll = (index / sections.length) * maxScroll;

    scrollAreaRef.current.scrollTo({
      top: targetScroll,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const scrollArea = scrollAreaRef.current;
    if (!scrollArea) return;

    scrollArea.addEventListener("scroll", handleScroll, { passive: true });
    return () => scrollArea.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div ref={containerRef} className="flex flex-col h-screen overflow-hidden bg-background">
      <ScrollTabs tabs={tabs} activeTab={activeSection} onTabClick={handleTabClick} />
      
      {/* Progress indicator */}
      <div className="h-1 bg-muted relative">
        <div 
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-accent transition-all duration-150"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>

      {/* Scrollable area - this creates the scroll height */}
      <div 
        ref={scrollAreaRef}
        className="flex-1 overflow-y-auto relative"
      >
        {/* Spacer content to create scroll height */}
        <div style={{ height: `${sections.length * 100}vh` }} />
        
        {/* Fixed sections container */}
        <div className="fixed inset-0 top-[73px] pointer-events-none">
          <div className="relative w-full h-full">
            {sections.map((section) => (
              <ScrollSection
                key={section.id}
                id={section.id}
                isActive={activeSection === section.id}
              >
                <div className="pointer-events-auto">
                  {section.content}
                </div>
              </ScrollSection>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrollContainer;
