import { useEffect, useRef, useState } from "react";
import star from "./../assets/img/star.svg";
import NomadKnight from "./NomadKnight";

const Careers = () => {
  const timelineData = [
    {
      id: 1,
      title: "High School",
      date: "2017 - 2020",
      description:
        "Completed secondary education with a focus on general studies.",
    },
    {
      id: 2,
      title: "Post High School",
      date: "2020 - 2021",
      description:
        "Focused on personal growth through reading and life learning.",
    },
    {
      id: 3,
      title: "IT Diploma",
      date: "October 2021 - July 2023",
      description:
        "Pursued and obtained an IT Diploma with hands-on technical training.",
    },
    {
      id: 4,
      title: "First Job",
      date: "June 2022 - January 2025",
      description:
        "Worked as an Administrative Assistant at the Court of First Instance.",
    },
    {
      id: 5,
      title: "Self Learning",
      date: "2023 - 2024",
      description:
        "Dedicated one year to independently learning full stack web development.",
    },
    {
      id: 6,
      title: "Web Development Internship",
      date: "May 2024 - September 2024",
      description:
        "Completed a 4-month internship at an international company as a Front-End Developer.",
    },
    {
      id: 7,
      title: "Freelance Developer",
      date: "2024 - Present",
      description:
        "Delivering web development solutions for clients worldwide.",
    },
  ];

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
      <h2 className="subtitle">﴾ Career ﴿</h2>

      <h3 className="timeline-title">A timeline that represents my journey</h3>

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
          <p>
            Like many, my journey started with school, but my real passion for
            web development began after the classroom. Driven by curiosity and
            the desire to create, I taught myself, built many projects, and kept
            learning day by day. Coming from Morocco, I carry with me a mix of
            tradition and creativity. Along the way, I gained experience working
            with people from different parts of the world, growing not just as a
            developer, but as a person.
          </p>
        </div>
        <NomadKnight />
      </div>
    </section>
  );
};

export default Careers;
