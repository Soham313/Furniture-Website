import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./nav.css";
import "./nav-menu.css";
import logo from "./assets/i4.png";

function Nav() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const elements = document.querySelectorAll(".scroll-fade");

      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight * 0.8;

        // Scrolling DOWN → Fade In
        if (currentScroll > lastScrollY && isVisible) {
          el.classList.add("visible");
        }

        // Scrolling UP → Fade Out
        if (currentScroll < lastScrollY) {
          el.classList.remove("visible");
        }
      });

      lastScrollY = currentScroll;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth Scroll Detection
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 50) {
        setIsVisible(false); // Hide navbar when scrolling down
      } else {
        setIsVisible(true); // Show navbar when scrolling up
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <div className={`navbar ${isVisible ? "show" : "hidden"}`}>
      <img src={logo} alt="" className="logo" />

      {/* ✅ Fixed Hamburger Button */}
      <button
        className={`hamburger ${isMobileMenuOpen ? "open" : ""}`}
        onClick={toggleMobileMenu}
      ></button>

      {/* ✅ Navigation Links */}
      <ul className={`nav-links ${isMobileMenuOpen ? "active" : ""}`}>
        <li>
          <Link to="/" onClick={toggleMobileMenu}>
            <button
              className="home-btn"
              data-aos="fade-down"
              data-aos-duration="500"
            >
              Home
            </button>
          </Link>
        </li>
        <li>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              const About = document.getElementById("about");
              if (About) {
                About.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            <button
              className="about-btn"
              data-aos="fade-down"
              data-aos-duration="1000"
            >
              About Us
            </button>
          </a>
        </li>
        <li>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              const gallery = document.getElementById("explore");
              if (gallery) {
                gallery.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            <button
              className="gallery-btn"
              data-aos="fade-down"
              data-aos-duration="1500"
            >
              Gallery
            </button>
          </a>
        </li>
        <li>
          <Link to="/contact" onClick={toggleMobileMenu}>
            <button
              className="btn"
              data-aos="fade-down"
              data-aos-duration="2000"
            >
              <span>Contact US</span>
              <span>Thanks!</span>
            </button>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Nav;
