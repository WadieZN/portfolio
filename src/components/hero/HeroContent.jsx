import React, { useRef, useEffect, forwardRef } from "react";
import arrow from "../../assets/img/arrow-down.png";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const HeroContent = forwardRef(function HeroContent({ items }, ref) {
  const trackRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    const container = containerRef.current;

    // fill scroll text
    const populateTrack = () => {
      track.innerHTML = "";
      items.forEach((text) => {
        const span = document.createElement("span");
        span.className = "scroll-item";
        span.textContent = text;
        track.appendChild(span);
      });
    };

    const cloneUntilOverflow = () => {
      const containerWidth = container.offsetWidth;
      while (track.scrollWidth < containerWidth * 2) {
        const clones = [...track.children].map((el) => el.cloneNode(true));
        clones.forEach((clone) => track.appendChild(clone));
      }
    };

    populateTrack();
    cloneUntilOverflow();

    // horizontal infinite animation
    gsap.to(track, {
      xPercent: -50,
      ease: "none",
      repeat: -1,
      duration: 20,
    });

    let lastWidth = window.innerWidth;
    const handleResize = () => {
      if (window.innerWidth === lastWidth) return;
      lastWidth = window.innerWidth;
      populateTrack();
      cloneUntilOverflow();
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [items]);

  return (
    <div className="hero-content" ref={ref}>
      <h2>Wadie</h2>
      <div className="infinite-scroll" ref={containerRef}>
        <div className="scroll-track" ref={trackRef}></div>
      </div>
      <h2>Zaanoune</h2>
      <button
        id="scroll-down"
        onClick={(e) => {
          e.preventDefault();
          if (typeof window.smoother !== "undefined") {
            window.smoother.scrollTo("#about", true, "center center", {
              duration: 5,
              ease: "expo.inOut",
            });
          } else {
            document.querySelector("#about").scrollIntoView({
              behavior: "smooth",
            });
          }
        }}
      >
        <img src={arrow} alt="Scroll down" />
      </button>
    </div>
  );
});

export default HeroContent;
