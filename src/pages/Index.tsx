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
];

const Index = () => {
  return (
    <main className="bg-background">
      {/* Static Header Section */}
      <header className="h-screen flex flex-col items-center justify-center px-4 text-center border-b border-border">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
          Welcome to Our Platform
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Explore our amazing features by scrolling through the sections below.
        </p>
      </header>

      {/* Animated Scroll Section - height = 100vh per section */}
      <div style={{ height: `${sections.length * 100}vh` }}>
        <ScrollContainer sections={sections} />
      </div>

      {/* Static Footer Section */}
      <footer className="h-screen flex flex-col items-center justify-center px-4 text-center border-t border-border bg-muted/30">
        <h2 className="text-2xl font-semibold text-foreground mb-4">
          Ready to Get Started?
        </h2>
        <p className="text-muted-foreground mb-6">
          Join thousands of users who trust our platform.
        </p>
        <button className="px-8 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:opacity-90 transition-opacity">
          Get Started
        </button>
      </footer>
    </main>
  );
};

export default Index;
