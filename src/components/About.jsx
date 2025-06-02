import wall from "../assets/img/moroccan-wall.png";

function About() {
  return (
    <section id="about">
      <h2 className="subtitle">﴾ About me ﴿</h2>
      <div className="about-container">
        <div className="about-img">
          <img src={wall} alt="Moroccan wall texture rotating" />
        </div>
        <div>
          <h3>A Moroccan Developer</h3>
          <p>
            I'm a web developer with a focus on clean design, interactive
            features, and user-centered functionality. Inspired by Moroccan
            patterns and textures, I blend cultural identity with modern
            development practices to create unique digital experiences. My work
            ranges from dynamic websites to custom 3D interfaces, always built
            with performance and usability in mind.
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;
