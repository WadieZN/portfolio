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
            I'm a web developer with a passion for creating visually
            stunning and highly functional websites. My journey in digital
            design and development has equipped me with a keen eye for
            aesthetics, a love for clean code, and a dedication to crafting
            seamless user experiences. Whether it's front-end development, UI/UX
            design, or digital branding, I thrive on transforming ideas into
            interactive, pixel-perfect realities. With a blend of creativity and
            technical expertise, I aim to build websites that not only look
            great but also perform flawlessly across all devices.
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;
