import gsap from "gsap";
import { useLayoutEffect } from "react";

const Redefining = () => {
  useLayoutEffect(() => {
    const globeX =
      window.innerWidth >= 1536
        ? -120
        : window.innerWidth >= 1280
          ? -80
          : window.innerWidth >= 1024
            ? -50
            : window.innerWidth >= 768
              ? -30
              : -10;

    const tl1 = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl1.to(".video_globe", {
      xPercent: globeX,
      opacity: 1,
      duration: 1.8,
    });

    tl1.fromTo(
      ".content_box",
      { opacity: 0, x: -100 },
      {
        x: 0,
        opacity: 1,
        duration: 1.2,
      },
      "-=1.0"
    );

    tl1.fromTo(
      ".daljeet_sir",
      { opacity: 0, x: 120 },
      {
        x: 0,
        opacity: 1,
        duration: 1.3,
      },
      "-=0.8"
    );
  }, []);

  return (
    <section className="h-screen w-full relative overflow-hidden bg-background">
      {/* GLOBE */}
      <div className="video_globe opacity-0 absolute top-[40%] lg:top-[50%] xl:top-[53%] -translate-y-1/2 right-[-20%] md:right-[-50%] lg:right-[-40%] xl:right-[-40%] 2xl:right-[-70%] max-w-[700px] lg:max-w-[600px] 2xl:max-w-[700px] w-full">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full pointer-events-none"
        >
          <source src="/assets/mp4/globe_new.mp4" type="video/mp4" />
        </video>
      </div>

      {/* CONTENT */}
      <div className="content_box absolute top-[30%] lg:top-[40%] xl:top-[40%] -translate-y-1/2 translate-x-1/2 lg:translate-x-0 right-[50%] lg:right-[5%] xl:right-[10%] 2xl:right-[15%] max-w-[600px] md:max-w-[600px] w-full py-[40px] md:py-[55px] px-5 md:px-[40px]">
        <span className="absolute top-0 left-0 w-full h-full about_us_blur"></span>
        <div className="relative z-20 max-w-[760px]">
          <h2 className="font-semibold text-xl sm:text-2xl md:text-3xl lg:text-[32px] text-center lg:text-start mb-2 text-foreground">
            Redefining Global Education
          </h2>
          <p className="text-sm sm:text-base lg:text-lg font-normal max-w-[677px] text-center lg:text-start text-muted-foreground">
            Edvia is the edtech solution that empowers you to handle your own
            admissions, doing away with the need for traditional consultants,
            unnecessary fees, and the risk of fraud. Here the platform delivers
            100% accuracy, real time eligibility check and details program
            views.
          </p>
        </div>
      </div>

      <span className="left-[22%] xl:left-[15%] daljeet_sir top-0 w-[14%] h-full z-10 absolute bg-muted hidden lg:block"></span>
      {/* DALJEET SIR */}
      <div className="daljeet_sir absolute bottom-0 left-[0%] max-w-[650px] md:max-w-[550px] w-full z-20">
        <img
          src="/assets/images/png/about-us/daljeetSir.webp"
          alt="daljeet"
          className="w-full h-full object-contain"
        />
      </div>
    </section>
  );
};

export default Redefining;
