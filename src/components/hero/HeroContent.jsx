import React, { useRef, useEffect, forwardRef } from "react";
import arrow from "../../assets/img/arrow-down.png";

const HeroContent = forwardRef(function HeroContent({ items }, ref) {
  const trackRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    const container = containerRef.current;

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
      // Remove any existing clones first
      const originalItems = [...track.children];
      const itemCount = originalItems.length;

      // Clear and repopulate with only original items
      track.innerHTML = "";
      originalItems.forEach((el) => track.appendChild(el));

      // Clone until we have enough content for seamless loop
      // Use Math.max to ensure we have at least 2x container width
      const targetWidth = Math.max(containerWidth * 2, 1000);
      let cloneCount = 0;
      const maxClones = 20; // Safety limit

      while (track.scrollWidth < targetWidth && cloneCount < maxClones) {
        const currentItems = [...track.children];
        currentItems.forEach((el) => {
          const clone = el.cloneNode(true);
          track.appendChild(clone);
        });
        cloneCount++;

        // Break if we're not adding more content (infinite loop protection)
        if (track.scrollWidth === 0) break;
      }
    };

    const setLoopDistance = () => {
      // Get the width of a single set of items
      const singleSetWidth =
        track.scrollWidth /
        Math.max(1, Math.floor(track.children.length / items.length));
      track.style.setProperty("--marquee-distance", `${singleSetWidth}px`);
    };

    populateTrack();
    cloneUntilOverflow();
    setLoopDistance();

    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        populateTrack();
        cloneUntilOverflow();
        setLoopDistance();
      }, 250); // Debounce resize events
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimeout);
    };
  }, [items.join("|")]);

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
