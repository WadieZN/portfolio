import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import sun from "../assets/img/sun.svg";
import moon from "../assets/img/moon.svg";

export default function PageLoader({ isDarkMode }) {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const isFirstRender = useRef(true);

  // Initial page load — unchanged.
  useEffect(() => {
    const minDisplay = new Promise((resolve) => setTimeout(resolve, 500));
    const pageLoaded =
      document.readyState === "complete"
        ? Promise.resolve()
        : new Promise((resolve) =>
            window.addEventListener("load", resolve, { once: true }),
          );

    Promise.all([minDisplay, pageLoaded]).then(() => setIsLoading(false));
  }, []);

  // Route changes: useLayoutEffect instead of useEffect so the loader
  // mounts BEFORE the browser paints the new route's content — this is
  // the fix for the "new page flashes, then loader appears" bug.
  useLayoutEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 700);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = isLoading ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLoading]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="page-loader"
          initial={false}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.5, ease: "easeInOut" },
          }}
        >
          <div className="page-loader-glow" />
          <motion.img
            key={isDarkMode ? "moon" : "sun"}
            src={isDarkMode ? moon : sun}
            alt={isDarkMode ? "Dark mode" : "Light mode"}
            className="page-loader-icon"
            initial={{ rotate: -90, scale: 0.4, opacity: 0 }}
            animate={{
              rotate: 360,
              scale: 1,
              opacity: 1,
              transition: {
                rotate: { duration: 2.2, repeat: Infinity, ease: "linear" },
                scale: { duration: 0.5, ease: "easeOut" },
                opacity: { duration: 0.5, ease: "easeOut" },
              },
            }}
            exit={{
              scale: 0.4,
              opacity: 0,
              transition: { duration: 0.4, ease: "easeIn" },
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
