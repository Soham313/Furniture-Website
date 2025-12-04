import React, { useEffect } from "react";
import "./home.css";
/* Components */
import Hero from "./hero";
import Title from "./Title";
import About from "./About";
import Nav from "./nav";
import Footer from "./fside";
import ThreeDImageRing from "./gallery";
import WaveBackground from "./wavebg";
import img1 from "./assets/h14.jpg";
import img2 from "./assets/h24.jpg";
import img3 from "./assets/h34.jpg";
import img4 from "./assets/h44.jpg";
import img5 from "./assets/h54.jpg";
import img6 from "./assets/h64.jpg";
import img7 from "./assets/h74.jpg";
import img8 from "./assets/h84.jpg";
import img9 from "./assets/h94.jpg";
import img10 from "./assets/h104.jpg";

const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10];

function Home() {
  useEffect(() => {
    const reveals = document.querySelectorAll(".reveal");

    const revealOnScroll = () => {
      for (const el of reveals) {
        const windowHeight = window.innerHeight;
        const elementTop = el.getBoundingClientRect().top;
        const revealPoint = 200;

        if (elementTop < windowHeight - revealPoint) {
          el.classList.add("active");
        } else {
          el.classList.remove("active");
        }
      }
    };

    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll(); // run once on load

    return () => window.removeEventListener("scroll", revealOnScroll);
  }, []);

  return (
    <>
      <Nav />
      <Hero />

      {/* 🔷 Animated Wave Background */}
      <WaveBackground backdropBlurAmount="none"></WaveBackground>

      <Title />
      <div data-aos="fade-up" className="gallery-section">
        <ThreeDImageRing images={images} backgroundColor="transparent" />
      </div>
      <About id="about-section" />

      <Footer />
    </>
  );
}

export default Home;
