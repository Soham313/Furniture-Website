import React from "react";
import "./Title.css";
import { gsap } from "gsap";
import { useEffect } from "react";

function Title() {
  useEffect(() => {
    gsap.to(".swipe-gsap", {
      x: 30,
      opacity: 1,
      repeat: -1,
      yoyo: true,
      duration: 1.2,
      ease: "power1.inOut",
    });
  }, []);
  return (
    <div className="title" id="explore">
      <p>our work</p>
      <h1>What We Made</h1>
      <div className="container">
        <div className="swipe">
          <div className="swipe-gsap">Swipe →</div>
        </div>
      </div>
    </div>
  );
}

export default Title;
