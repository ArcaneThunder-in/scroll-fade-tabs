import { cn } from "@/lib/utils";

interface SectionContentProps {
  title: string;
  description: string;
  gradient: string;
  icon: string;
}

const SectionContent = ({ title, description, gradient, icon }: SectionContentProps) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 max-w-4xl mx-auto">
      <div 
        className={cn(
          "w-24 h-24 rounded-3xl flex items-center justify-center text-5xl mb-8",
          "shadow-2xl transform transition-transform duration-500 hover:scale-110",
          gradient
        )}
      >
        {icon}
      </div>
      
      <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
        {title}
      </h2>
      
      <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
        {description}
      </p>

      <div className="mt-12 flex gap-4">
        <button className="px-8 py-4 bg-primary text-primary-foreground rounded-full font-medium shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 hover:-translate-y-1">
          Get Started
        </button>
        <button className="px-8 py-4 bg-secondary text-secondary-foreground rounded-full font-medium hover:bg-accent transition-all duration-300">
          Learn More
        </button>
      </div>
    </div>
  );
};

export default SectionContent;
