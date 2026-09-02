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

      // Get original items
      const originalItems = [...track.children];
      const originalSetWidth = originalItems.reduce(
        (total, el) => total + el.offsetWidth,
        0,
      );

      // Clear track
      track.innerHTML = "";

      // Add original items back
      originalItems.forEach((el) => track.appendChild(el));

      // Calculate how many complete sets we need
      // We need at least 2 complete sets, but ensure the total width
      // is at least 2x container width for smooth looping
      const minSetsNeeded = Math.ceil((containerWidth * 2) / originalSetWidth);
      const totalSets = Math.max(2, minSetsNeeded * 2); // Always use an even number

      // Clone the original items to create totalSets number of sets
      for (let setIndex = 1; setIndex < totalSets; setIndex++) {
        originalItems.forEach((el) => {
          const clone = el.cloneNode(true);
          track.appendChild(clone);
        });
      }

      console.log(
        `Created ${totalSets} sets for container width ${containerWidth}px`,
      );
    };

    const setLoopDistance = () => {
      // Calculate width of a single set (one complete iteration of items)
      const itemsPerSet = items.length;
      const totalChildren = track.children.length;
      const numberOfSets = totalChildren / itemsPerSet;

      // Get the width of one complete set
      const singleSetWidth = track.scrollWidth / numberOfSets;

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
