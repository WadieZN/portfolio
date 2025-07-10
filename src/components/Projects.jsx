import React, { useState, useEffect, useRef } from "react";
import ProjectLinks from "./ProjectLinks";
import { useTranslation } from "react-i18next";

import project1 from "../assets/img/project1.png";
import project2 from "../assets/img/project2.png";
import project2dark from "../assets/img/project2dark.png";
import project3 from "../assets/img/project3.png";
import project4 from "../assets/img/project4.png";
import project5 from "../assets/img/project5.png";
import project6 from "../assets/img/project6.png";

function Projects({ isDarkMode }) {
  const { t } = useTranslation();
  const translatedProjects = t("projects.list", { returnObjects: true });

  const images = [
    project6,
    project1,
    isDarkMode ? project2dark : project2,
    project5,
    project3,
    project4,
  ];

  const projects = translatedProjects.map((project, index) => ({
    ...project,
    mediaSrc: images[index],
  }));
  const projectRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "-45% 0px",
      threshold: Array.from({ length: 100 }, (_, i) => i * 0.01),
    };

    const observer = new IntersectionObserver((entries) => {
      let bestMatch = { index: null, distance: Infinity };

      entries.forEach((entry) => {
        const rect = entry.boundingClientRect;
        const viewportCenter = window.innerHeight / 2;
        const elementCenter = rect.top + rect.height / 2;

        const distance = Math.abs(elementCenter - viewportCenter);

        if (elementCenter > viewportCenter && distance < bestMatch.distance) {
          const index = projectRefs.current.findIndex(
            (ref) => ref === entry.target
          );
          if (index !== -1) {
            bestMatch = { index, distance };
          }
        }
      });

      if (bestMatch.index !== null) {
        setActiveIndex(bestMatch.index);
      }
    }, options);

    projectRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      projectRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  const addToRefs = (el, index) => {
    if (el && !projectRefs.current.includes(el)) {
      projectRefs.current[index] = el;
    }
  };

  return (
    <section id="projects">
      <h2 className="subtitle">{t("projects.subtitle")}</h2>
      <div className="projects-container">
        {projects.map((project, index) => (
          <div
            className={`project ${activeIndex === index ? "active" : ""}`}
            key={index}
            ref={(el) => addToRefs(el, index)}
          >
            <img src={project.mediaSrc} alt={project.name} />
            <div className="modal-details">
              <h3>{project.name}</h3>
              <ul className="project-stack">
                {project.stack.map((tech, i) => (
                  <React.Fragment key={i}>
                    <li>{tech}</li>
                    {i < project.stack.length - 1 && <span>&#9737;</span>}
                  </React.Fragment>
                ))}
              </ul>
              <p>{project.text}</p>
              <h4>{t("projects.linkTitle")}</h4>
              <ul className="project-links">
                <ProjectLinks links={project.links} />
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Projects;
