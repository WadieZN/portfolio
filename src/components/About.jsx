import { useEffect, useRef, useState } from "react";
import wall from "../assets/img/moroccan-wall.png";
import { useTranslation } from "react-i18next";

function About() {
  const { t } = useTranslation();

  const imgRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const rotate = scrollY * 0.07;

      if (imgRef.current) {
        imgRef.current.style.transform = `rotateZ(${rotate}deg)`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
              transition: "transform 0.1s ease-out",
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
