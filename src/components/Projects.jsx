import React, { useState } from "react";
import ProjectLinks from "./ProjectLinks";
import { useTranslation } from "react-i18next";
import SandDivider from "./SandDivider";

import project1 from "../assets/img/project1.png";
import project2 from "../assets/img/project2.png";
import project3 from "../assets/img/project3.png";
import project4 from "../assets/img/project4.png";
import project5 from "../assets/img/project5.png";
import project6 from "../assets/img/project6.png";

function Projects({ isDarkMode }) {
  const { t } = useTranslation();
  const translatedProjects = t("projects.list", { returnObjects: true });

  const images = [project2, project6, project1, project5, project3, project4];

  const projects = translatedProjects.map((project, index) => ({
    ...project,
    mediaSrc: images[index],
  }));
  
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <>
      <SandDivider />

      <section id="projects">
        <h2 className="subtitle">{t("projects.subtitle")}</h2>
        <div className="projects-container">
          {projects.map((project, index) => (
            <div
              className={`project ${hoveredIndex === index ? "active" : ""}`}
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="project-frame">
                <span className="project-corner project-corner--tl" />
                <span className="project-corner project-corner--br" />
                <img src={project.mediaSrc} alt={project.name} />
              </div>

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
    </>
  );
}

export default Projects;