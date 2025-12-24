import { cn } from "@/lib/utils";

interface Tab {
  id: string;
  label: string;
}

interface ScrollTabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabClick: (id: string) => void;
}

const ScrollTabs = ({ tabs, activeTab, onTabClick }: ScrollTabsProps) => {
  return (
    <div className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-center gap-2 py-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabClick(tab.id)}
              className={cn(
                "relative px-6 py-3 text-sm font-medium transition-all duration-300 rounded-full",
                "hover:bg-accent/50",
                activeTab === tab.id
                  ? "text-primary-foreground bg-primary shadow-lg shadow-primary/25"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {tab.label}
              {activeTab === tab.id && (
                <span className="absolute inset-0 rounded-full bg-primary/20 animate-pulse" />
              )}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default ScrollTabs;
