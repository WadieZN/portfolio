import { useEffect, useRef } from "react";
import lottie from "lottie-web";
import animationData from "../assets/Walking_Nomads.json";
import { useTranslation } from "react-i18next";

function Footer() {
  const container = useRef(null);
  const animRef = useRef(null);
  const { i18n } = useTranslation();

  useEffect(() => {
    animRef.current = lottie.loadAnimation({
      container: container.current,
      renderer: "canvas",
      loop: true,
      autoplay: true,
      animationData,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid meet",
      },
    });

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        animRef.current.play();
      } else {
        animRef.current.pause();
      }
    });

    observer.observe(container.current);

    return () => {
      observer.disconnect();
      animRef.current.destroy();
    };
  }, []);

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "fr" : "en";
    i18n.changeLanguage(newLang);
  };

  return (
    <>
      <div className="footer-nomads">
        <div
          className="nomads_image desktop"
          ref={container}
          style={{ width: "100%" }}
        />
      </div>

      <footer>
        <span>WadyZen &copy; {new Date().getFullYear()}</span>
        <button onClick={toggleLanguage} className="lang-toggle">
          {i18n.language === "en" ? "FR" : "EN"}
        </button>
      </footer>
    </>
  );
}

export default Footer;
