import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { timelineData } from "./common/Helper";

gsap.registerPlugin(ScrollTrigger);

const Timeline = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const ctx = useRef<gsap.Context | null>(null);

  const imageStackRef = useRef<HTMLDivElement>(null);
  const currentTween = useRef<gsap.core.Tween | null>(null);
  const lastIndex = useRef(0);

  const animateImageTransition = useCallback(
    (newIndex: number, oldIndex: number) => {
      const container = imageStackRef.current;
      if (!container) return;

      if (currentTween.current) {
        currentTween.current.kill();
        currentTween.current = null;
      }

      const isForward = newIndex > oldIndex;

      container.innerHTML = "";

      const bottomImg = document.createElement("div");
      bottomImg.className = "timeline-image absolute inset-0 h-full w-full";
      bottomImg.innerHTML = `<img class="h-full w-full object-cover" src="${timelineData[isForward ? oldIndex : newIndex].img}" alt="${timelineData[isForward ? oldIndex : newIndex].year}" />`;
      container.appendChild(bottomImg);

      const topImg = document.createElement("div");
      topImg.className = "timeline-image absolute inset-0 h-full w-full";
      topImg.innerHTML = `<img class="h-full w-full object-cover" src="${timelineData[isForward ? newIndex : oldIndex].img}" alt="${timelineData[isForward ? newIndex : oldIndex].year}" />`;
      container.appendChild(topImg);

      if (isForward) {
        gsap.set(topImg, { x: "100%" });
        currentTween.current = gsap.to(topImg, {
          x: "0%",
          duration: 1,
          ease: "power2.out",
          onComplete: () => {
            if (container.contains(bottomImg)) {
              container.removeChild(bottomImg);
            }
            currentTween.current = null;
          },
        });
      } else {
        gsap.set(topImg, { x: "0%" });
        currentTween.current = gsap.to(topImg, {
          x: "100%",
          duration: 0.4,
          ease: "power2.out",
          onComplete: () => {
            if (container.contains(topImg)) {
              container.removeChild(topImg);
            }
            currentTween.current = null;
          },
        });
      }
    },
    []
  );

  useLayoutEffect(() => {
    const container = containerRef.current;
    const horizontal = horizontalRef.current;
    const imageContainer = imageStackRef.current;

    if (!container || !horizontal || !imageContainer) return;

    imageContainer.innerHTML = `
      <div class="timeline-image absolute inset-0 h-full w-full">
        <img class="h-full w-full object-cover" src="${timelineData[0].img}" alt="${timelineData[0].year}" />
      </div>
    `;

    ctx.current = gsap.context(() => {
      const totalWidth = horizontal.scrollWidth - window.innerWidth;

      const scrollTween = gsap.to(horizontal, {
        x: -totalWidth,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => `+=${totalWidth + 100}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            setScrollProgress(progress);
            const newIndex = Math.min(
              Math.floor(progress * timelineData.length),
              timelineData.length - 1
            );

            if (newIndex !== lastIndex.current) {
              animateImageTransition(newIndex, lastIndex.current);
              lastIndex.current = newIndex;
              setActiveIndex(newIndex);
            }
          },
        },
      });

      const sections = gsap.utils.toArray<HTMLElement>(".timeline-section");
      sections.forEach((section) => {
        const content = section.querySelector(".timeline-content");
        const watermark = section.querySelector(".year-watermark");

        if (content) {
          gsap.to(content, {
            opacity: 1,
            duration: 0.5,
            scrollTrigger: {
              trigger: section,
              containerAnimation: scrollTween,
              start: "left center",
              end: "center center",
              scrub: 1,
            },
          });
        }

        if (watermark) {
          gsap.fromTo(
            watermark,
            { scale: 1 },
            {
              opacity: 1,
              scale: 1,
              duration: 0.5,
              scrollTrigger: {
                trigger: section,
                containerAnimation: scrollTween,
                start: "left center",
                end: "center center",
                scrub: 1,
              },
            }
          );
        }
      });
    }, containerRef);

    return () => {
      if (currentTween.current) {
        currentTween.current.kill();
      }
      ctx.current?.revert();
    };
  }, [animateImageTransition]);

  const progressWidth = `${scrollProgress * 100}%`;

  return (
    <div
      ref={containerRef}
      className="relative h-screen overflow-hidden bg-[hsl(252,30%,95%)]"
    >
      <div className="max-w-[327px] md:max-w-[500px] lg:max-w-[500px] xl:max-w-[600px] 2xl:max-w-[700px] w-full flex-shrink-0 rounded-lg bg-card shadow-2xl block absolute left-1/2 -translate-x-1/2 lg:left-[23%] xl:left-[25%] top-[25%] sm:top-[30%] lg:top-[50%] xl:top-1/2 -translate-y-1/2 z-10 overflow-hidden">
        <div
          ref={imageStackRef}
          className="h-full w-full overflow-hidden aspect-video relative"
        />
      </div>

      <div
        ref={horizontalRef}
        className="flex h-full will-change-transform z-20"
        style={{ width: `${timelineData.length * 100}vw` }}
      >
        {timelineData.map((item) => (
          <section
            key={item.year}
            className="timeline-section relative flex h-full w-screen flex-shrink-0 items-center justify-center px-8 md:px-16 lg:px-24 mt-28 sm:mt-14 md:mt-24 lg:mt-0"
          >
            <div className="year-watermark pointer-events-none -top-[10%] sm:top-1/2 -translate-y-1/2 absolute left-1/2 -translate-x-1/2 inset-0 flex items-center justify-end pr-8 md:pr-16">
              <span className="text-[150px] sm:text-[200px] md:text-[250px] lg:text-[300px] xl:text-[350px] 2xl:text-[450px] font-semibold text-[hsl(252,30%,92%)] absolute top-[90%] sm:top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                {item.year}
              </span>
            </div>

            <div className="timeline-content relative z-10 flex w-full justify-end sm:px-4 flex-col lg:flex-row items-center gap-8 md:gap-16">
              <div className="max-w-[500px] xl:max-w-[620px] 2xl:max-w-[650px] w-full">
                <h2 className="font-bold text-xl md:text-[24px] 2xl:text-[28px] text-foreground">
                  {item.title}
                </h2>
                <ul className="space-y-3">
                  {item.points.map((point, pointIndex) => (
                    <li
                      key={pointIndex}
                      className="flex items-start gap-3 text-base md:text-xl text-foreground"
                    >
                      <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-foreground" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        ))}
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-20 pb-4 md:pb-8 pt-16">
        <div className="px-5 md:px-[30px] lg:px-[50px] xl:px-[70px] 2xl:px-[80px] relative">
          <div className="absolute z-0 top-[15%] -translate-y-1/2 -translate-x-1/2 left-1/2 mb-4 h-1 w-full rounded-full">
            <span className="bg-[hsl(0,0%,86%)] absolute left-0 top-0 h-full rounded-full transition-all duration-150 ease-out w-full"></span>
            <div
              className="bg-gradient-to-r from-[hsl(303,80%,63%)] to-[hsl(27,82%,63%)] absolute left-0 top-0 h-full rounded-full transition-all duration-150 ease-out"
              style={{ width: progressWidth }}
            />
          </div>

          <div className="flex justify-between">
            {timelineData.map((item, index) => {
              const segmentProgress = index / (timelineData.length - 1);
              const isActive = scrollProgress >= segmentProgress;
              const isCurrent = index === activeIndex;

              return (
                <div key={item.year} className="flex flex-col items-center">
                  <div
                    className={`mb-2 size-3 md:size-4 xl:size-5 rounded-full border-2 transition-all duration-300 relative z-10 ${
                      isActive
                        ? isCurrent
                          ? "scale-150 border-[hsl(27,82%,63%)] bg-[hsl(27,82%,63%)] shadow-lg"
                          : "scale-125 border-transparent bg-[hsl(27,82%,63%)] shadow-md"
                        : "border-muted-foreground/30 bg-background"
                    }`}
                  />
                  <span
                    className={`font-medium transition-colors ease-in-out duration-300 ${
                      isCurrent
                        ? "text-sm md:text-base lg:text-xl 2xl:text-[24px] text-foreground"
                        : "text-xs md:text-sm lg:text-base 2xl:text-[20px] text-muted-foreground"
                    }`}
                  >
                    {item.year}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
