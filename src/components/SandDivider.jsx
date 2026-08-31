import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Sand-dune transition, sitting between Career and Projects.
 *
 * Mirrors Hero's Waves.jsx technique (3 SVG layers pushed by GSAP
 * ScrollTrigger scrub) but reversed: Hero's back/middle layers get
 * pushed DOWN as you scroll past it; these dune layers get pulled UP
 * instead, since the divider is being scrolled *past* rather than
 * scrolled *away from* at the top of the page. Grains fall in a layer
 * sandwiched between the back/middle dunes and the front one, so they
 * visually vanish behind the nearest dune as they land.
 */
function SandDivider() {
  const grains = useMemo(() => {
    return Array.from({ length: 22 }, (_, i) => ({
      id: i,
      left: Math.round(Math.random() * 100),
      size: (Math.random() * 3 + 5).toFixed(1),
      duration: (Math.random() * 4 + 5).toFixed(1),
      delay: (Math.random() * -9).toFixed(1),
      drift: Math.round(Math.random() * 40 - 20),
    }));
  }, []);

  const backDuneRef = useRef(null);
  const middleDuneRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(backDuneRef.current, {
        y: -60,
        ease: "none",
        scrollTrigger: {
          trigger: ".sand-divider",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(middleDuneRef.current, {
        y: -35,
        ease: "none",
        scrollTrigger: {
          trigger: ".sand-divider",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="sand-divider" aria-hidden="true">
      <div className="sand-dune-layer sand-dune-layer--back" ref={backDuneRef}>
        <div className="sand-dune-flip">
          <svg
            viewBox="0 0 1200 220"
            preserveAspectRatio="none"
            className="sand-dune-svg"
          >
            <path d="M0 150 C 160 90, 320 190, 520 130 C 740 65, 920 175, 1200 110 L1200 220 L0 220 Z" />
          </svg>
        </div>
      </div>

      <div className="sand-grains">
        {grains.map((g) => (
          <span
            key={g.id}
            className="sand-grain"
            style={{
              left: `${g.left}%`,
              width: `${g.size}px`,
              height: `${g.size}px`,
              animationDuration: `${g.duration}s`,
              animationDelay: `${g.delay}s`,
              "--drift": `${g.drift}px`,
            }}
          />
        ))}
      </div>

      <div
        className="sand-dune-layer sand-dune-layer--middle"
        ref={middleDuneRef}
      >
        <div className="sand-dune-flip">
          <svg
            viewBox="0 0 1200 220"
            preserveAspectRatio="none"
            className="sand-dune-svg"
          >
            <path d="M0 170 C 200 120, 380 200, 600 150 C 820 100, 980 190, 1200 140 L1200 220 L0 220 Z" />
          </svg>
        </div>
      </div>

      <div className="sand-dune-layer sand-dune-layer--front">
        <div className="sand-dune-flip">
          <svg
            viewBox="0 0 1200 220"
            preserveAspectRatio="none"
            className="sand-dune-svg"
          >
            <path d="M0 190 C 220 160, 400 210, 620 175 C 840 140, 1000 205, 1200 170 L1200 220 L0 220 Z" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default SandDivider;
