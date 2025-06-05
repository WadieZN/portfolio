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
      links: { live: "https://infinitepadelcourts.com", caseStudy: "https://example.com/case-study" },
      mediaType: "image",
      mediaSrc: project1,
    },
    {
      name: "Car Rental Management System",
      img: project2,
      text: "A full-featured platform for car rental businesses, including bookings, invoices, dashboards and more.",
      stack: ["React", "Express", "Node.js", "PostgreSQL"],
      links: { caseStudy: "https://example.com/case-study" },
      mediaType: "image",
      mediaSrc: project2,
    },

    {
      name: "MH FITPRO",
      img: project5,
      text: "A modern, responsive website for a company that builds gyms and wellness spaces.",
      stack: ["WordPress", "Elementor", "CSS3", "PHP"],
      links: { live: "https://mhfitpro.net", caseStudy: "https://example.com/case-study" },
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
        caseStudy: "https://example.com/case-study",
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

  return (
    <section id="projects">
      <h2 className="subtitle">﴾ Projects ﴿</h2>
      <div className="projects-container">
        {projects.map((project, index) => (
          <div className="project" key={index}>
            <img src={project.mediaSrc} alt={project.name} />
            <div className="modal-details">
              <h3>{project.name}</h3>
              <ul className="project-stack">
                {project.stack.map((tech, i) => (
                  <>
                    <li key={i}>{tech}</li>
                    {i < project.stack.length - 1 && <span>&#9737;</span>}
                  </>
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
