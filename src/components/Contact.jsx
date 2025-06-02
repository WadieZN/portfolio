function Contact() {
  return (
    <section id="contact">
      <h2 className="subtitle">﴾ Contact ﴿</h2>
      <form
        id="contact-form"
        action="https://formspree.io/f/xldbqelw"
        method="POST"
      >
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" required />
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" required />

        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" rows="2" required></textarea>

        <input type="text" name="_gotcha" style={{ display: "none" }} />

        <button type="submit">Send Message</button>
      </form>
    </section>
  );
}

export default Contact;
