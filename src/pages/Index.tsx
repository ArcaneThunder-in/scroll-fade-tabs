import Redefining from "@/components/Redefining";
import MissionVisionSection from "@/components/MissionVisionSection";
import Timeline from "@/components/Timeline";

const Index = () => {
  return (
    <main className="bg-background">
      {/* Section 1: Redefining - Static with GSAP entrance animations */}
      <Redefining />

      {/* Section 2: Mission/Vision - Animated scroll section with tabs */}
      <div style={{ height: "200vh" }}>
        <MissionVisionSection />
      </div>

      {/* Section 3: Timeline - Horizontal scroll with GSAP */}
      <Timeline />
    </main>
  );
};

export default Index;
