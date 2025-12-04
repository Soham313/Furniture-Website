import React from "react";
import "./hero.css";
import i7 from "./assets/i7.jpg";

function Hero() {
  const handleExploreClick = () => {
    window.scrollBy({
      top: 750, // Adjust value for more or less scroll
      behavior: "smooth",
    });
  };

  return (
    <div
      className="hero"
      style={{
        backgroundImage: `linear-gradient(rgba(16,14,28,0.7), rgba(2,53,81,0.7)), url(${i7})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="text-hero">
        <h1 data-aos="fade-up" data-aos-duration="3000">
          We ensure better work for better world{" "}
        </h1>
        <p data-aos="fade-up" data-aos-duration="3000">
          Elevate your living experience with furniture that combines design,
          durability, and distinction. Explore our website and let us assist you
          in finding the perfect pieces for your home.
        </p>
        <button
          class="button"
          button
          onClick={handleExploreClick}
          data-aos="fade-up"
          data-aos-duration="3000"
        >
          Explore MORE
          <div class="hoverEffect">
            <div></div>
          </div>
        </button>
      </div>
    </div>
  );
}

export default Hero;
