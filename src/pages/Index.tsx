import Redefining from "@/components/Redefining";
import ScrollContainer from "@/components/ScrollContainer";
import SectionContent from "@/components/SectionContent";
import Timeline from "@/components/Timeline";

const sections = [
  {
    id: "mission",
    label: "Mission",
    content: (
      <SectionContent
        title="Our Mission"
        description="To democratize global education by providing transparent, accessible, and fraud-free admission services. We empower students to take control of their academic journey with real-time information and 100% accuracy."
        gradient="gradient-section-1"
        icon="🎯"
      />
    ),
  },
  {
    id: "vision",
    label: "Vision",
    content: (
      <SectionContent
        title="Our Vision"
        description="A world where every aspiring student has equal access to quality education opportunities worldwide, regardless of their background or location. We envision a future without barriers to academic dreams."
        gradient="gradient-section-2"
        icon="🌟"
      />
    ),
  },
];

const Index = () => {
  return (
    <main className="bg-background">
      {/* Section 1: Redefining - Static with GSAP entrance animations */}
      <Redefining />

      {/* Section 2: Mission/Vision - Animated scroll section with tabs */}
      <div style={{ height: `${sections.length * 100}vh` }}>
        <ScrollContainer sections={sections} />
      </div>

      {/* Section 3: Timeline - Horizontal scroll with GSAP */}
      <Timeline />
    </main>
  );
};

export default Index;
