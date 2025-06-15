import React, { useState, useEffect, useRef } from "react";
import ProjectLinks from "./ProjectLinks";

import project1 from "../assets/img/project1.png";
import project2 from "../assets/img/project2.png";
import project3 from "../assets/img/project3.png";
import project4 from "../assets/img/project4.png";
import project5 from "../assets/img/project5.png";

import github from "../assets/img/github.svg";
import linkIcon from "../assets/img/link.svg";

function Projects() {
  const projects = [
    {
      name: "Infinite Padel Courts",
      img: project1,
      text: "Custom 3D configurator and redesign for a padel court construction company.",
      stack: ["WordPress", "Three.js", "JavaScript", "Elementor", "CSS3"],
      links: { live: "https://infinitepadelcourts.com" },
      mediaType: "image",
      mediaSrc: project1,
    },
    {
      name: "Car Rental Management System",
      img: project2,
      text: "A full-featured platform for car rental businesses, including bookings, invoices, dashboards and more.",
      stack: ["React", "Express", "Node.js", "PostgreSQL"],
      links: { text: "Not available due to privacy" },
      mediaType: "image",
      mediaSrc: project2,
    },

    {
      name: "MH FITPRO",
      img: project5,
      text: "A modern, responsive website for a company that builds gyms and wellness spaces.",
      stack: ["WordPress", "Elementor", "CSS3", "PHP"],
      links: { live: "https://mhfitpro.net" },
      mediaType: "image",
      mediaSrc: project5,
    },
    {
      name: "CineZen",
      img: project3,
      text: "Discover and track your favorite movies and TV series with TMDb API integration.",
      stack: ["React", "JavaScript", "SCSS", "TMDb API"],
      links: {
        github: "https://github.com/WadieZN/CineZen",
        live: "https://cine-zen.netlify.app",
      },
      mediaType: "image",
      mediaSrc: project3,
    },
    {
      name: "Memory Cards Game",
      img: project4,
      text: "Responsive memory card game featuring anime characters. Great for all ages!",
      stack: ["React", "JavaScript", "SCSS", "Anilist API"],
      links: {
        github: "https://github.com/WadieZN/Memory-Card",
        live: "https://wadyzen-memory-game.netlify.app/",
      },
      mediaType: "image",
      mediaSrc: project4,
    },
  ];

  const projectRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "-45% 0px",
      threshold: Array.from({ length: 100 }, (_, i) => i * 0.01), // 100 thresholds (1% steps)
    };

    const observer = new IntersectionObserver((entries) => {
      let bestMatch = { index: null, distance: Infinity };

      entries.forEach((entry) => {
        const rect = entry.boundingClientRect;
        const viewportCenter = window.innerHeight / 2;
        const elementCenter = rect.top + rect.height / 2;

        // Distance from element center to viewport center
        const distance = Math.abs(elementCenter - viewportCenter);

        // Only consider elements whose center is in the BOTTOM half of the screen
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
      <h2 className="subtitle">﴾ Projects ﴿</h2>
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
              <h4>Links</h4>
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
