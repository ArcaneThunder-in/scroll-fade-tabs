import { useState, useRef, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";

const BlueQuotes = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 11H6C6 7.5 7.5 6 10 6V4C6 4 4 7 4 11V18H10V11ZM20 11H16C16 7.5 17.5 6 20 6V4C16 4 14 7 14 11V18H20V11Z" fill="#3B82F6"/>
  </svg>
);

const MissionVisionSection = () => {
  const [activeTab, setActiveTab] = useState<"mission" | "vision">("mission");
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = useCallback(() => {
    if (!wrapperRef.current) return;

    const wrapper = wrapperRef.current;
    const wrapperRect = wrapper.getBoundingClientRect();
    const wrapperHeight = wrapper.offsetHeight;
    const viewportHeight = window.innerHeight;
    
    const scrolledIntoWrapper = -wrapperRect.top;
    const scrollableDistance = wrapperHeight - viewportHeight;
    
    const progress = Math.max(0, Math.min(1, scrolledIntoWrapper / scrollableDistance));

    if (progress < 0.5) {
      setActiveTab("mission");
    } else {
      setActiveTab("vision");
    }
  }, []);

  const handleTabClick = (tab: "mission" | "vision") => {
    if (!wrapperRef.current) return;

    const wrapper = wrapperRef.current;
    const wrapperTop = wrapper.offsetTop;
    const wrapperHeight = wrapper.offsetHeight;
    const viewportHeight = window.innerHeight;
    const scrollableDistance = wrapperHeight - viewportHeight;
    
    const targetScroll = tab === "mission" 
      ? wrapperTop 
      : wrapperTop + scrollableDistance;

    window.scrollTo({
      top: targetScroll,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (containerRef.current) {
      wrapperRef.current = containerRef.current.parentElement as HTMLDivElement;
    }
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div ref={containerRef} className="sticky top-0 flex flex-col h-screen overflow-hidden bg-background">
      {/* Tabs */}
      <div className="absolute max-w-[330px] top-[5%] md:top-[13%] 2xl:top-[11%] left-1/2 -translate-x-1/2 rounded-full bg-[linear-gradient(91.46deg,_#EB9757_0%,_#EB57E3_100%)] flex items-center justify-center shadow-[0px_4px_12px_0px_hsla(0,0%,0%,0.25)] z-30">
        <span className="w-[calc(100%-5px)] h-[calc(100%-5px)] absolute top-1/2 -translate-x-1/2 -translate-y-1/2 left-1/2 bg-white rounded-full z-10"></span>
        <button
          className="ff_poppins text-lg md:text-xl xl:text-2xl relative z-30 py-[6px] sm:py-[9px] px-[36px] m-2 cursor-pointer"
          onClick={() => handleTabClick("mission")}
        >
          <span
            className={`bg-[linear-gradient(100.2deg,_#EB57E3_0%,_#EB9757_96.32%)] rounded-full w-full h-full absolute top-1/2 -translate-y-1/2 left-1 z-20 duration-300 ease-in-out ${activeTab === "mission" ? "opacity-100" : "opacity-0"}`}
          ></span>
          <span
            className={`relative z-30 duration-300 ${activeTab === "mission" ? "text-white" : "text-black"}`}
          >
            Mission
          </span>
        </button>
        <button
          className="ff_poppins text-lg md:text-xl xl:text-2xl relative z-30 py-[6px] sm:py-[9px] px-[36px] m-2 cursor-pointer"
          onClick={() => handleTabClick("vision")}
        >
          <span
            className={`bg-[linear-gradient(100.2deg,_#EB57E3_0%,_#EB9757_96.32%)] rounded-full w-full h-full absolute top-1/2 -translate-y-1/2 right-1 z-20 duration-300 ease-in-out ${activeTab === "vision" ? "opacity-100" : "opacity-0"}`}
          ></span>
          <span
            className={`relative z-30 duration-300 ${activeTab === "vision" ? "text-white" : "text-black"}`}
          >
            Vision
          </span>
        </button>
      </div>

      {/* Sections container */}
      <div className="flex-1 relative">
        {/* Mission Section */}
        <section
          className={cn(
            "absolute inset-0 h-screen overflow-hidden w-full flex items-center justify-center flex-col transition-all duration-700 ease-out",
            activeTab === "mission"
              ? "opacity-100 z-10 scale-100"
              : "opacity-0 z-0 scale-95 pointer-events-none"
          )}
        >
          <div className="flex flex-col min-h-full w-full pb-5 justify-center items-center sm:items-start">
            <p className="2xl:mt-12 3xl:mt-0 text-center sm:text-start left_text font-semibold text-base md:text-lg xl:text-xl 3xl:text-2xl text-[#656565] md:leading-[32px] max-w-[338px] xl:max-w-[300px] 2xl:max-w-[340px] 3xl:max-w-[370px] 4xl:max-w-[455px] ml-0 md:ml-[30px] lg:ml-[40px] xl:ml-[70px] 2xl:ml-[100px] 3xl:ml-[120px] 4xl:ml-[142px] relative">
              <span className="absolute top-0 left-[-2%] sm:left-[-8%]">
                <BlueQuotes />
              </span>
              We don't just provide a map to global education; we equip the
              student with the full navigational command to reach any
              destination they choose.
            </p>
            <p className="py-[100px] sm:py-[130px] md:py-[180px] lg:py-0 our_vision text-[40px] sm:text-[50px] md:text-[70px] lg:text-[100px] xl:text-[140px] 2xl:text-[160px] 3xl:text-[180px] 4xl:text-[200px] text-[#606062] font-bold ff_poppins text-center flex items-center justify-between lg:max-w-[900px] xl:max-w-[1200px] 2xl:max-w-[1300px] 4xl:max-w-[1500px] mx-auto px-6 w-full">
              <span className="inline-block">Our</span>
              <span className="inline-block">Mission</span>
            </p>
            <p className="text-center sm:text-start right_text ff_poppins text-sm md:text-base lg:text-lg 3xl:text-xl text-black max-w-[325px] sm:max-w-[350px] md:max-w-[400px] lg:max-w-[450px] xl:max-w-[537px] 2xl:max-w-[600px] 4xl:max-w-[687px] sm:ml-auto mx-0 sm:mr-[30px] md:mr-[40px] xl:mr-[46px] 2xl:mr-[70px] 3xl:mr-[100px] 4xl:mr-[126px]">
              Our Mission is to use intelligent automation, AI driven
              insights, decision making to bridge the gap between students and
              universities worldwide. We are committed to providing a
              consultant free experience where students have access to proven
              facts & information, personalised recommendations, and global
              opportunities entirely at their fingertips.
            </p>
          </div>

          <div className="head max-w-[170px] sm:max-w-[250px] md:max-w-[300px] lg:max-w-[300px] xl:max-w-[454px] 3xl:max-w-[460px] 4xl:max-w-[470px] w-full absolute top-[34%] sm:top-[40%] lg:top-[60%] xl:top-[105%] 2xl:top-[135%] 4xl:top-[105%] left-[20%] sm:left-[27%] lg:left-[28%] 4xl:left-[28%] opacity-0">
            <img
              src="/assets/images/png/about-us/ourMission.png"
              alt="our-mission"
              className="w-full h-auto"
            />
          </div>
        </section>

        {/* Vision Section */}
        <section
          className={cn(
            "absolute inset-0 h-screen overflow-hidden w-full flex items-center justify-center flex-col transition-all duration-700 ease-out",
            activeTab === "vision"
              ? "opacity-100 z-10 scale-100"
              : "opacity-0 z-0 scale-95 pointer-events-none"
          )}
        >
          <div className="mt-20 sm:mt-20 flex flex-col min-h-full w-full pb-5 justify-center items-center sm:items-start relative z-20">
            <p className="sm:hidden text-center sm:text-start right_text ff_poppins text-sm 3xl:text-xl text-black max-w-[325px] sm:max-w-[350px] md:max-w-[400px] lg:max-w-[450px] xl:max-w-[537px] 2xl:max-w-[600px] 4xl:max-w-[687px] sm:ml-auto mx-0 sm:mr-[30px] md:mr-[40px] xl:mr-[46px] 2xl:mr-[70px] 3xl:mr-[100px] 4xl:mr-[126px]">
              Education's future isn't about opening doors; it's about
              removing the locks entirely
            </p>
            <p className="hidden sm:block text-center sm:text-start left_text font-semibold text-base md:text-lg xl:text-xl 3xl:text-2xl text-black max-w-[438px] lg:max-w-[700px] lg:mt-20 3xl:mt-0 2xl:max-w-[700px] 3xl:max-w-[670px] 4xl:max-w-[850px] ml-0 md:ml-[30px] lg:ml-[40px] xl:ml-[70px] 2xl:ml-[100px] 3xl:ml-[120px] 4xl:ml-[142px] relative">
              To build the most all encompassing, technologically advanced
              educational ecosystem in the world, enabling students from all
              over the world to access global opportunities, make informed
              decisions, and transition from learners to successful
              professionals without relying on conventional consultants.Edvia
              envisions a future in which the entire process, from education
              to employment, is coordinated, transparent, and accessible on a
              single platform, turning a fragmented billion-dollar industry
              into a smooth, global system that prioritizes students. choose.
            </p>
            <p className="py-[90px] sm:py-[150px] md:py-[200px] lg:py-0 our_mission text-[40px] sm:text-[50px] md:text-[70px] lg:text-[100px] xl:text-[140px] 2xl:text-[160px] 3xl:text-[180px] 4xl:text-[200px] text-[#606062] font-bold ff_poppins text-center flex items-center justify-between lg:max-w-[850px] 2xl:max-w-[1100px] 4xl:max-w-[1400px] mx-auto px-6 w-full mr-40 2xl:leading-[170px] 3xl:leading-[220px]">
              <span className="inline-block">Our</span>
              <span className="inline-block">Vision</span>
            </p>
            <p className="hidden sm:block text-center sm:text-start right_text 2xl:mt-10 3xl:mt-0 ff_poppins text-sm md:text-base lg:text-lg 3xl:text-xl text-black max-w-[306px] sm:max-w-[432px] 2xl:max-w-[450px] sm:ml-auto mx-0 sm:mr-[30px] md:mr-[40px] xl:mr-[46px] 2xl:mr-[70px] 3xl:mr-[100px] 4xl:mr-[126px]">
              Education's future isn't about opening doors; it's about
              removing the locks entirely
            </p>
            <p className="sm:hidden text-center sm:text-start left_text font-semibold text-base md:text-lg xl:text-xl 3xl:text-2xl text-black md:leading-[32px] max-w-[338px] xl:max-w-[300px] 2xl:max-w-[340px] 3xl:max-w-[370px] 4xl:max-w-[636px] ml-0 md:ml-[30px] lg:ml-[40px] xl:ml-[70px] 2xl:ml-[100px] 3xl:ml-[120px] 4xl:ml-[142px] relative">
              To build the most all encompassing, technologically advanced
              educational ecosystem in the world, enabling students from all
              over the world to access global opportunities, make informed
              decisions, and transition from learners to successful
              professionals without relying on conventional consultants.Edvia
              envisions a future in which the entire process, from education
              to employment, is coordinated, transparent, and accessible on a
              single platform, turning a fragmented billion-dollar industry
              into a smooth, global system that prioritizes students. choose.
            </p>
          </div>
          <div className="hand max-w-[250px] sm:max-w-[300px] md:max-w-[350px] lg:max-w-[450px] xl:max-w-[554px] 3xl:max-w-[660px] 4xl:max-w-[700px] w-full absolute top-[23%] lg:top-[60%] 2xl:top-[120%] 3xl:top-[100%] 4xl:top-[110%] left-[15%] sm:left-[27%] 4xl:left-[28%] opacity-0 z-10">
            <img
              src="/assets/images/png/about-us/boy.png"
              alt="our-mission"
              className="w-full h-auto opacity-90"
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default MissionVisionSection;
