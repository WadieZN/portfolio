import { useEffect, useRef, useState } from "react";
import star from "./../assets/img/star.svg";
import NomadKnight from "./NomadKnight";
import { useTranslation } from "react-i18next";

const Careers = () => {
  const { t } = useTranslation();
  const timelineData = t("career.timeline", { returnObjects: true });

  const containerRef = useRef(null);
  const fillRef = useRef(null);
  const dotRefs = useRef([]);

  const [activeItems, setActiveItems] = useState([]);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !fillRef.current) return;

      const container = containerRef.current;
      const fill = fillRef.current;
      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const scrollProgress = windowHeight / 2 - rect.top;
      const maxFill = container.offsetHeight;

      const fillHeight = Math.min(Math.max(0, scrollProgress), maxFill);
      fill.style.height = `${fillHeight}px`;

      const newActiveItems = [];

      dotRefs.current.forEach((ref, index) => {
        if (!ref) return;
        const dotRect = ref.getBoundingClientRect();
        const dotTopRelativeToContainer = dotRect.top - rect.top;

        if (dotTopRelativeToContainer <= fillHeight) {
          newActiveItems.push(index);
        }
      });

      setActiveItems(newActiveItems);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="careers-section">
      <h2 className="subtitle">{t("career.subtitle")}</h2>
      <h3 className="timeline-title">{t("career.title")}</h3>

      <div className="timeline-container" ref={containerRef}>
        <div className="timeline">
          <div className="timeline-line"></div>
          <div className="timeline-fill-container">
            <div className="timeline-fill" ref={fillRef}></div>
          </div>

          <div className="timeline-columns">
            {timelineData.map((item, index) => (
              <div key={item.id} className="timeline-row">
                <div className="timeline-side left">
                  {index % 2 === 0 && (
                    <div
                      className={`timeline-card ${
                        activeItems.includes(index) ? "active" : ""
                      }`}
                    >
                      <div className="timeline-card-content">
                        <h3>{item.title}</h3>
                        <span className="timeline-date">{item.date}</span>
                        {item.description && <p>{item.description}</p>}
                      </div>
                    </div>
                  )}
                </div>

                <div className="timeline-center">
                  <div
                    className={`timeline-dot ${
                      activeItems.includes(index) ? "active" : ""
                    }`}
                    ref={(el) => (dotRefs.current[index] = el)}
                  ></div>
                </div>

                <div className="timeline-side right">
                  {index % 2 !== 0 && (
                    <div
                      className={`timeline-card ${
                        activeItems.includes(index) ? "active" : ""
                      }`}
                    >
                      <div className="timeline-card-content">
                        <h3>{item.title}</h3>
                        <span className="timeline-date">{item.date}</span>
                        {item.description && <p>{item.description}</p>}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="career-description">
        <div>
          <img src={star} alt="Moroccan star icon" />
          <p>{t("career.description")}</p>
        </div>
        <NomadKnight />
      </div>
    </section>
  );
};

export default Careers;
