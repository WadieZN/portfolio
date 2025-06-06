import { useEffect, useState } from "react";
import Footer from "./components/Footer";
import Hero from "./components/hero/Hero";
import sun from "./assets/img/sun.svg";
import moon from "./assets/img/moon.svg";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Career from "./components/Career";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  const [isHiding, setIsHiding] = useState(false);
  const [currentIcon, setCurrentIcon] = useState(isDarkMode ? moon : sun);
  const [currentAlt, setCurrentAlt] = useState(
    isDarkMode ? "Dark mode" : "Light mode"
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
      <button className="mode-toggle" onClick={handleToggle}>
        <div>
          <img
            src={currentIcon}
            alt={currentAlt}
            className={isHiding ? "hide" : ""}
          />
        </div>
      </button>
      <Hero />
      <main>
        <About />
        <Career />
        <Projects />
        <Contact />
        <Footer />
      </main>
    </>
  );
}

export default App;
