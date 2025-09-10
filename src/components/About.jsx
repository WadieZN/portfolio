import { useEffect, useRef } from "react";
import wall from "../assets/img/moroccan-wall.png";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function About() {
  const { t } = useTranslation();
  const imgRef = useRef(null);

  useEffect(() => {
    if (!imgRef.current) return;

    gsap.to(imgRef.current, {
      rotationZ: 160,
      ease: "none",
      scrollTrigger: {
        trigger: "#about",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  }, []);

  return (
    <section id="about">
      <h2 className="subtitle">{t("about.subtitle")}</h2>
      <div className="about-container">
        <div className="about-img">
          <img
            src={wall}
            alt="Moroccan wall texture rotating"
            ref={imgRef}
            style={{
              willChange: "transform",
            }}
          />
        </div>
        <div>
          <h3>{t("about.title")}</h3>
          <p>{t("about.description")}</p>
        </div>
      </div>
    </section>
  );
}

export default About;
