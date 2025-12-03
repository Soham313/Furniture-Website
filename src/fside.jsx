import React from "react";
import "./fside.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";

import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content ">
        {/* About Us Section */}
        <div className="footer-section1 slide-up">
          <h4>About Us</h4>
          <p>We are a passionate team dedicated to</p>
          <p>bringing you the best designs and solutions.</p>
          <p> Explore our gallery for inspiration.</p>
        </div>

        {/* logo name */}
        <div className="footer-section2 slide-up">
          <h1 className=" brand-name glow-effect">Siddhivinayak</h1>
          <h1> Furnitures</h1>
        </div>

        {/* Social Links */}
        <div className="footer-section3 slide-up ">
          <div className="fsmedia">
            <h2>follow us ON</h2>
          </div>
          <div className="sicon">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faFacebookF} className="s1" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faTwitter} className="s2" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faInstagram} className="s3" />
            </a>
            <a
              href="https://wa.me/7414979966"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faWhatsapp} className="s4" />
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p>
          &copy; 2025. Created By <span className="owner"> Soham Bhalerao</span>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
