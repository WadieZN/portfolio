import { useEffect, useRef } from "react";
import lottie from "lottie-web";
import animationData from "../assets/NOMAD-TAIL-SWISH-ANIMATION.json";

function NomadKnight() {
  const containerRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    animationRef.current = lottie.loadAnimation({
      container: containerRef.current,
      renderer: "canvas",
      loop: false,
      autoplay: false,
      animationData,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid meet",
      },
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animationRef.current?.goToAndPlay(0, true);
          }
        });
      },
      { threshold: 0.9 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
      animationRef.current?.destroy();
    };
  }, []);

  const handleHover = () => {
    animationRef.current?.goToAndPlay(0, true);
  };

  return (
    <div
      id="knight"
      className="nomad-knight"
      ref={containerRef}
      onMouseEnter={handleHover}
      style={{ width: "450px", height: "450px" }}
    />
  );
}

export default NomadKnight;
