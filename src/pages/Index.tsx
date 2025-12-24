import ScrollContainer from "@/components/ScrollContainer";
import SectionContent from "@/components/SectionContent";

const sections = [
  {
    id: "features",
    label: "Features",
    content: (
      <SectionContent
        title="Powerful Features"
        description="Discover a comprehensive suite of tools designed to streamline your workflow and boost productivity. Our features are crafted with precision to meet your every need."
        gradient="gradient-section-1"
        icon="✨"
      />
    ),
  },
  {
    id: "design",
    label: "Design",
    content: (
      <SectionContent
        title="Beautiful Design"
        description="Experience pixel-perfect interfaces that combine aesthetics with functionality. Every element is thoughtfully designed to create an intuitive and delightful user experience."
        gradient="gradient-section-2"
        icon="🎨"
      />
    ),
  },
  {
    id: "performance",
    label: "Performance",
    content: (
      <SectionContent
        title="Lightning Fast"
        description="Built for speed without compromising quality. Our optimized architecture ensures blazing-fast load times and smooth interactions across all devices."
        gradient="gradient-section-3"
        icon="⚡"
      />
    ),
  },
  {
    id: "security",
    label: "Security",
    content: (
      <SectionContent
        title="Enterprise Security"
        description="Your data is protected with industry-leading security measures. We employ end-to-end encryption and rigorous security protocols to keep your information safe."
        gradient="gradient-section-4"
        icon="🔒"
      />
    ),
  },
];

const Index = () => {
  return (
    <main className="min-h-screen">
      <ScrollContainer sections={sections} />
    </main>
  );
};

export default Index;
