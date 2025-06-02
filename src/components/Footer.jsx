import image from './../assets/img/journey.png'

function Footer() {
  return (
    <>
    <div className="footer-img">
      <img src={image} alt="Journey of camels and arabians in a Sahara" draggable={false} />
    </div>
      <footer>
        <span>wadyzen &copy; {new Date().getFullYear()}</span>
      </footer>
    </>
  );
}

export default Footer;
