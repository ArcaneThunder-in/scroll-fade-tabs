import { forwardRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ScrollSectionProps {
  id: string;
  isActive: boolean;
  children: ReactNode;
  className?: string;
}

const ScrollSection = forwardRef<HTMLDivElement, ScrollSectionProps>(
  ({ id, isActive, children, className }, ref) => {
    return (
      <div
        ref={ref}
        id={id}
        className={cn(
          "absolute inset-0 flex items-center justify-center transition-all duration-700 ease-out",
          isActive 
            ? "opacity-100 z-10 scale-100" 
            : "opacity-0 z-0 scale-95 pointer-events-none",
          className
        )}
      >
        {children}
      </div>
    );
  }
);

ScrollSection.displayName = "ScrollSection";

export default ScrollSection;
