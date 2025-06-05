import { useEffect, useRef } from "react";
import lottie from "lottie-web";
import animationData from "../assets/Walking_Nomads.json";

function Footer() {
  const container = useRef(null);
  const animRef = useRef(null);

  useEffect(() => {
    animRef.current = lottie.loadAnimation({
      container: container.current,
      renderer: "canvas",
      loop: true,
      autoplay: true,
      animationData,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid meet",
      },
    });

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        animRef.current.play();
      } else {
        animRef.current.pause();
      }
    });

    observer.observe(container.current);

    return () => {
      observer.disconnect();
      animRef.current.destroy();
    };
  }, []);

  return (
    <>
      <div className="footer-nomads">
        <div
          className="nomads_image desktop"
          ref={container}
          style={{ width: "100%", height: "200px" }}
        />
      </div>

      <footer>
        <span>wadyzen &copy; {new Date().getFullYear()}</span>
      </footer>
    </>
  );
}

export default Footer;
