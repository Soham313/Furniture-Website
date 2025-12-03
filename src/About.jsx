import React, { useEffect } from "react";

import "./About.css";
import ab1 from "./assets/ab1 (1).jpg";
import ab2 from "./assets/ab2 (1).jpg";
import ab3 from "./assets/ab3 (1).jpg";
import ab4 from "./assets/ab4 (1).jpg";
import ab5 from "./assets/ab5 (1).jpg";

const items = [
  {
    title: "Premium Cupboards",
    desc: "Custom-made cupboards designed to fit your space perfectly with modern finishes and long-lasting durability.",
    img: ab1,
  },
  {
    title: "Comfortable Beds",
    desc: "Beautifully crafted beds with strong frames and stylish designs that transform your bedroom.",
    img: ab2,
  },
  {
    title: "Showcase Cupboards",
    desc: "Elegant showcase cupboards for displaying artwork, awards, or luxury décor pieces.",
    img: ab3,
  },
  {
    title: "Modern Sofas",
    desc: "Soft, durable, and stylish sofas available in multiple fabric and color options.",
    img: ab4,
  },
  {
    title: "Dining Tables",
    desc: "Premium-quality dining tables designed with precision and style for your home.",
    img: ab5,
  },
];

function About() {
  return (
    <div className="about-container">
      <div class="about-background">
        <div class="blob b1"></div>
        <div class="blob b2"></div>
        <div class="blob b3"></div>
        <div class="wave1 w1"></div>
        <div class="wave1 w2"></div>
        <div class="wave1 w3"></div>
        <div class="lines"></div>

        {/* Dynamic alternating section */}
        <div className="items-section" id="about">
          <div className="about-title">
            <h1>About Us</h1>
            <p>
              We create premium furniture built with quality, passion, and
              creativity.
            </p>
          </div>
          {items.map((item, index) => (
            <div
              data-aos="fade-up"
              className={`item-row ${index % 2 === 0 ? "normal" : "reverse"}`}
              key={index}
            >
              <div className="item-img" data-aos="fade-up">
                <img src={item.img} alt={item.title} />
              </div>

              <div className="item-info" data-aos="fade-up">
                <h2>{item.title}</h2>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default About;
