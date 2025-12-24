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
    <div className="absolute max-w-[330px] top-[5%] md:top-[13%] 2xl:top-[11%] left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-[hsl(27,82%,63%)] to-[hsl(303,80%,63%)] flex items-center justify-center shadow-[0px_4px_12px_0px_hsla(0,0%,0%,0.25)] z-30">
      <span className="w-[calc(100%-5px)] h-[calc(100%-5px)] absolute top-1/2 -translate-x-1/2 -translate-y-1/2 left-1/2 bg-white rounded-full z-10"></span>
      {tabs.map((tab, index) => (
        <button
          key={tab.id}
          className="text-lg md:text-xl xl:text-2xl relative z-30 py-[6px] sm:py-[9px] px-[36px] m-2 cursor-pointer"
          onClick={() => onTabClick(tab.id)}
        >
          <span
            className={`bg-gradient-to-r from-[hsl(303,80%,63%)] to-[hsl(27,82%,63%)] rounded-full w-full h-full absolute top-1/2 -translate-y-1/2 ${index === 0 ? "left-1" : "right-1"} z-20 duration-300 ease-in-out ${activeTab === tab.id ? "opacity-100" : "opacity-0"}`}
          ></span>
          <span
            className={`relative z-30 duration-300 ${activeTab === tab.id ? "text-white" : "text-black"}`}
          >
            {tab.label}
          </span>
        </button>
      ))}
    </div>
  );
};

export default ScrollTabs;
