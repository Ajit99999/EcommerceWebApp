import { Link } from "react-router-dom";
import heroImg from "../images/hero.png";
const Hero = () => {
  return (
    <div className="hero-container">
      <div className="hero-container-details">
        <h2>Welcome To Ecommerce Kart</h2>
        <p>
          Lorem ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s.as opposed to using 'Content here, content here making it look like readable English. Many desktop publishing packages
          and web page editors now use Lorem Ipsum as their default model text,
          and a search for 'lorem ipsum' will uncover many web sites still in
          their infancy. Various versions have evolved over the years, sometimes
          by accident, sometimes on purpose
        </p>
        <Link to="/products">
          <button> Shop Now </button>
        </Link>
      </div>
      <div className="hero-container-img">
        <img src={heroImg} alt="not" />
      </div>
    </div>
  );
};

export default Hero;
