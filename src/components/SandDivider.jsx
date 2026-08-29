import { useMemo } from "react";

/**
 * Sand-dune transition, sitting between Career and Projects.
 *
 * Background starts at the same --sky color used in the hero, easing
 * down into a dune silhouette in --sand. A handful of small grains
 * drift down continuously. Everything here is CSS transform/opacity
 * animation — no particle engine, no per-frame JS.
 */
function SandDivider() {
  // Randomize each grain's position/timing once per mount, not per render.
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

  return (
    <div className="sand-divider" aria-hidden="true">
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

      <svg
        className="sand-dune"
        viewBox="0 0 1200 220"
        preserveAspectRatio="none"
        style={{transform: "rotate(180deg)"}}
      >
        <path d="M0 140 C 180 40, 340 190, 540 110 C 760 20, 900 170, 1200 90 L1200 220 L0 220 Z" />
      </svg>
    </div>
  );
}

export default SandDivider;
