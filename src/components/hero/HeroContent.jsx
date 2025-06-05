// components/home/HeroContent.js
import React, { useRef, useEffect } from "react";

function HeroContent({ items }) {
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
      while (track.scrollWidth < containerWidth * 2) {
        const clones = [...track.children].map((el) => el.cloneNode(true));
        clones.forEach((clone) => track.appendChild(clone));
      }
    };

    const handleResize = () => {
      populateTrack();
      cloneUntilOverflow();
    };

    populateTrack();
    cloneUntilOverflow();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [items]);

  return (
    <div className="hero-content">
      <h2>Wadie</h2>
      <div className="infinite-scroll" ref={containerRef}>
        <div className="scroll-track" ref={trackRef}></div>
      </div>
      <h2>Zaanoune</h2>
    </div>
  );
}

export default HeroContent;
