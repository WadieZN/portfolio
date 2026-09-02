import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Hero from "./components/hero/Hero";
import sun from "./assets/img/sun.svg";
import moon from "./assets/img/moon.svg";
import About from "./components/About";
import Projects from "./components/Projects";
import ProjectCaseStudy from "./components/ProjectCaseStudy";
import Contact from "./components/Contact";
import Career from "./components/Career";
import { useGoogleAnalytics } from "./analytics";
import SmoothScroll from "./components/SmoothScroll";
import PageLoader from "./components/PageLoader";

function App() {
  useGoogleAnalytics();

  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("darkMode") === "true",
  );
  const [isHiding, setIsHiding] = useState(false);
  const [currentIcon, setCurrentIcon] = useState(isDarkMode ? moon : sun);
  const [currentAlt, setCurrentAlt] = useState(
    isDarkMode ? "Dark mode" : "Light mode",
  );

  useEffect(() => {
    const htmlEl = document.documentElement;
    htmlEl.classList.toggle("dark", isDarkMode);
    localStorage.setItem("darkMode", isDarkMode);
  }, [isDarkMode]);

  const handleToggle = () => {
    setIsHiding(true);
    setTimeout(() => {
      const newMode = !isDarkMode;
      setIsDarkMode(newMode);
      setCurrentIcon(newMode ? moon : sun);
      setCurrentAlt(newMode ? "Dark mode" : "Light mode");
      setIsHiding(false);
    }, 400);
  };

  return (
    <>
      <PageLoader isDarkMode={isDarkMode} />

      <SmoothScroll>
        <button className="mode-toggle" onClick={handleToggle}>
          <div>
            <img
              src={currentIcon}
              alt={currentAlt}
              className={isHiding ? "hide" : ""}
            />
          </div>
        </button>

        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <main>
                  <div
                    style={{
                      background: "var(--bg-color)",
                    }}
                  >
                    <About />
                    <Career />
                  </div>
                  <div style={{ background: "var(--sky)" }}>
                    <Projects isDarkMode={isDarkMode} />
                    <Contact />
                    <Footer />
                  </div>
                </main>
              </>
            }
          />
          <Route
            path="/projects/:slug"
            element={
              <main>
                <ProjectCaseStudy />
                <Footer />
              </main>
            }
          />
        </Routes>
      </SmoothScroll>
    </>
  );
}

export default App;
