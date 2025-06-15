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
            I’m a web developer who loves building websites that look amazing
            and work smoothly. Since diving into this world, I’ve developed a sharp eye for
            design, a knack for clean code, and a real obsession with making
            sure users have the best experience possible. Whether it’s front-end
            development, UI/UX design, or digital branding, I get excited about
            turning ideas into polished, fully functional sites. For me, it’s
            all about mixing creativity with technical skill, <em>so that</em>{" "}
            the end result isn’t just beautiful, but also fast, responsive, and
            easy to use.
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;
