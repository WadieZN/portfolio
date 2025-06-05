import { useEffect, useRef, useState } from "react";
import wall from "../assets/img/moroccan-wall.png";

function About() {
  const imgRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const rotate = scrollY * 0.07; // Adjust multiplier for speed/sensitivity

      if (imgRef.current) {
        imgRef.current.style.transform = `rotateZ(${rotate}deg)`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="about">
      <h2 className="subtitle">﴾ About me ﴿</h2>
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
          <h3>A Moroccan Developer</h3>
          <p>
            I'm a web developer with a focus on clean design, interactive
            features, and user-centered functionality. Inspired by Moroccan
            patterns and textures, I blend cultural identity with modern
            development practices to create unique digital experiences. My work
            ranges from dynamic websites to custom 3D interfaces, always built
            with performance and usability in mind.
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;
