import React, { useEffect, useRef, useState, useMemo } from "react";
import HeroContent from "./HeroContent";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { loadSlim } from "@tsparticles/slim";

gsap.registerPlugin(ScrollTrigger);

function Waves() {
  const { t } = useTranslation();
  const items = t("hero.roles", { returnObjects: true });

  const backWaveRef = useRef(null);
  const middleWaveRef = useRef(null);
  const heroContentRef = useRef(null);



  useEffect(() => {
    gsap.to(backWaveRef.current, {
      y: 150,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        scrub: true,
      },
    });

    gsap.to(middleWaveRef.current, {
      y: 100,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        scrub: true,
      },
    });

    gsap.to(heroContentRef.current, {
      y: 500,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        scrub: true,
      },
    });
  }, []);

  return (
    <div className="waves relative">
      <div className="back-wave" ref={backWaveRef}>
        <svg
          viewBox="0 0 900 600"
          preserveAspectRatio="none"
          className="wave-svg"
        >
          <path d="M0 384L50 398.8C100 413.7 200 443.3 300 439.2C400 435 500 397 600 390C700 383 800 407 850 419L900 431L900 601L0 601Z" />
        </svg>
      </div>

      <HeroContent items={items} ref={heroContentRef} />

      <div className="middle-wave" ref={middleWaveRef}>
        <svg
          viewBox="0 0 900 600"
          preserveAspectRatio="none"
          className="wave-svg"
        >
          <path d="M0 441L30 451.5C60 462 120 483 180 484.2C240 485.3 300 466.7 360 462.8C420 459 480 470 540 484.8C600 499.7 660 518.3 720 517.7C780 517 840 497 870 487L900 477L900 601L0 601Z" />
        </svg>
      </div>


      <div className="front-wave">
        <svg
          viewBox="0 0 900 600"
          preserveAspectRatio="none"
          className="wave-svg"
        >
          <path d="M0 527L10.7 527C21.3 527 42.7 527 64.2 526.2C85.7 525.3 107.3 523.7 128.8 524C150.3 524.3 171.7 526.7 193 531.5C214.3 536.3 235.7 543.7 257 545.7C278.3 547.7 299.7 544.3 321.2 539.7C342.7 535 364.3 529 385.8 529.7C407.3 530.3 428.7 537.7 450 542.8C471.3 548 492.7 551 514.2 548.2C535.7 545.3 557.3 536.7 578.8 532.3C600.3 528 621.7 528 643 530.3C664.3 532.7 685.7 537.3 707 536.5C728.3 535.7 749.7 529.3 771.2 529.8C792.7 530.3 814.3 537.7 835.8 541.2C857.3 544.7 878.7 544.3 889.3 544.2L900 544L900 601L889.3 601C878.7 601 857.3 601 835.8 601C814.3 601 792.7 601 771.2 601C749.7 601 728.3 601 707 601C685.7 601 664.3 601 643 601C621.7 601 600.3 601 578.8 601C557.3 601 535.7 601 514.2 601C492.7 601 471.3 601 450 601C428.7 601 407.3 601 385.8 601C364.3 601 342.7 601 321.2 601C299.7 601 278.3 601 257 601C235.7 601 214.3 601 193 601C171.7 601 150.3 601 128.8 601C107.3 601 85.7 601 64.2 601C42.7 601 21.3 601 10.7 601L0 601Z" />
        </svg>
      </div>
    </div>
  );
}

export default Waves;
