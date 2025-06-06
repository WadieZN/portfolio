import github from "../assets/img/github-brands.svg";
import instagram from "../assets/img/instagram.svg";
import linkedin from "../assets/img/linkedin.svg";
import mail from "../assets/img/mail.svg";

import { useState } from "react";

function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const data = new FormData(form);

    try {
      await fetch("https://getform.io/f/boloodja", {
        method: "POST",
        body: data,
        headers: {
          Accept: "application/json",
        },
      });

      setSubmitted(true);
      form.reset();
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  return (
    <section id="contact">
      <h2 className="subtitle">﴾ Contact ﴿</h2>

      <div className="contact-grid">
        <div className="contact-info">
          <h3>Let’s Build Something Great Together</h3>
          <p>
            Have an idea you’d like to bring to life? I’m always open to
            exciting collaborations, creative challenges, or simple
            conversations.
            <br />
            Fill out the form or reach out directly, and I’ll get back to you as
            soon as possible.
          </p>
          <h4>Stay in Touch</h4>
          <a id="email-link" href="mailto:wadiezaanoune@gmail.com">
            <img src={mail} alt="email" />
            wadiezaanoune@gmail.com
          </a>
          <div>
            <a
              href="https://www.linkedin.com/in/wadie-zaanoune/"
              target="_blank"
              rel="noreferrer"
              className="link-circle"
            >
              <img src={linkedin} alt="Linkedin" />
            </a>
            <a
              href="https://www.instagram.com/wadyzen/"
              target="_blank"
              rel="noreferrer"
              className="link-circle"
            >
              <img src={instagram} alt="Instagram" />
            </a>
            <a
              href="https://github.com/WadieZN"
              target="_blank"
              rel="noreferrer"
              className="link-circle"
            >
              <img src={github} alt="Github" />
            </a>
          </div>
        </div>

        {submitted ? (
          <div className="contact-thankyou">
            <h4>Thank you!</h4>
            <p>Your message has been successfully sent.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="contact-form">
            <label>Name</label>
            <input type="text" name="name" placeholder="Your name" required />
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Your email"
              required
            />
            <label>Message</label>
            <textarea
              name="message"
              rows="4"
              placeholder="Share your idea..."
              required
            ></textarea>
            <button type="submit" className="submit-button">
              Send Message
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

export default Contact;
