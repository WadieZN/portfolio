import { useState } from "react";
import project1 from "../../assets/img/project1.png";
import project2 from "../../assets/img/project2.png";
import project3 from "../../assets/img/project3.png";
import project4 from "../../assets/img/project4.png";
import project5 from "../../assets/img/project5.png";

import github from "../../assets/img/github.svg";
import linkIcon from "../../assets/img/link.svg";

function Projects() {
  const projects = [
    {
      name: "MH FITPRO",
      img: project5,
      text: "MH FITPRO is a company specializing in the creation and maintenance of sports facilities such as gyms, fitness centers, and wellness spaces, ensuring top-notch environments for athletes and fitness enthusiasts.",
      stack: ["React", "Node.js", "Express", "MongoDB"],
      links: {
        github: "https://github.com/yourusername/mh-fitpro",
        live: "https://mhfitpro.example.com",
      },
      mediaType: "image",
      mediaSrc: project5,
    },
    {
      name: "Infinite Padel Courts",
      img: project1,
      text: "Infinite Padel Courts focuses on building and managing courts specifically for Padel and Pickleball sports, providing scalable solutions for enthusiasts and clubs to enjoy these popular racket sports.",
      stack: ["React", "Three.js", "CSS"],
      links: {
        github: "https://github.com/yourusername/infinite-padel",
        live: "https://padel.example.com",
      },
      mediaType: "image",
      mediaSrc: project1,
    },
    {
      name: "Car Rental Management System",
      img: project2,
      text: "A comprehensive platform for managing car rental operations, including vehicle inventory, booking management, customer profiles, and payment processing, designed for rental agencies.",
      stack: ["Java", "Spring Boot", "MySQL"],
      links: {
        github: "https://github.com/yourusername/car-rental-system",
        live: "",
      },
      mediaType: "image",
      mediaSrc: project2,
    },
    {
      name: "CineZen - Movies & TV Series Explorer",
      img: project3,
      text: "CineZen is an interactive web app that allows users to discover, search, and track movies and TV series, with personalized recommendations and detailed information on titles and actors.",
      stack: ["React", "Redux", "TMDb API"],
      links: {
        github: "https://github.com/yourusername/cinezen",
        live: "https://cinezen.example.com",
      },
      mediaType: "image",
      mediaSrc: project3,
    },
    {
      name: "Memory Cards Game",
      img: project4,
      text: "A classic memory matching card game built for entertainment and cognitive exercise, featuring multiple difficulty levels and a responsive design for all devices.",
      stack: ["JavaScript", "HTML5", "CSS3"],
      links: {
        github: "https://github.com/yourusername/memory-cards-game",
        live: "https://memorycards.example.com",
      },
      mediaType: "image",
      mediaSrc: project4,
    },
  ];

  const [selectedProject, setSelectedProject] = useState(null);

  function openModal(project) {
    setSelectedProject(project);
  }

  function closeModal() {
    setSelectedProject(null);
  }

  return (
    <section id="projects">
      <h2 className="subtitle">﴾ Projects ﴿</h2>
      <div className="projects-container">
        {projects.map((project, index) => (
          <div
            className="project"
            key={index}
            onClick={() => openModal(project)}
            style={{ cursor: "pointer" }}
          >
            <img src={project.img} alt={project.name} />
            <h4>{project.name}</h4>
          </div>
        ))}
      </div>

      {selectedProject && (
        <div className="modal-overlay" onClick={closeModal}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()} // Prevent closing modal on inner click
          >
            {/* Left side: Image or Video */}
            <div className="modal-media">
              {selectedProject.mediaType === "video" ? (
                <video
                  src={selectedProject.mediaSrc}
                  controls
                  className="modal-media-content"
                />
              ) : (
                <img
                  src={selectedProject.mediaSrc}
                  alt={selectedProject.name}
                  className="modal-media-content"
                />
              )}
            </div>

            {/* Right side: Description, stack, links */}
            <div className="modal-details">
              <h3>{selectedProject.name}</h3>
              <p>{selectedProject.text}</p>
              <h4>Stack Used:</h4>
              <ul className="project-stack">
                {selectedProject.stack.map((tech, i) => (
                  <li key={i}>{tech}</li>
                ))}
              </ul>
              <h4>Links:</h4>
              <ul className="project-links">
                {selectedProject.links.github && (
                  <li>
                    <a
                      href={selectedProject.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="github"
                    >
                      <img src={github} alt="" />
                      GitHub
                    </a>
                  </li>
                )}
                {selectedProject.links.live && (
                  <li>
                    <a
                      href={selectedProject.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="live-demo"
                    >
                      <img src={linkIcon} alt="" />
                      Live Demo
                    </a>
                  </li>
                )}
              </ul>
              <button onClick={closeModal} className="modal-close-btn">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Projects;
