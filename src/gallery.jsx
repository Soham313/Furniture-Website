import React, { useEffect, useRef, useState, useMemo } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  animate,
  easeOut,
} from "framer-motion";
import "./gallery.css"; // create this file for styling

const cn = (...classes) => classes.filter(Boolean).join(" ");

const ThreeDImageRing = ({
  images,
  width = 300,
  perspective = 2000,
  imageDistance = 800,
  initialRotation = 180,
  animationDuration = 1.2,
  staggerDelay = 0.1,
  backgroundColor = "transparent",
  draggable = true,
  mobileBreakpoint = 768,
  mobileScaleFactor = 0.8,
}) => {
  const containerRef = useRef(null);
  const ringRef = useRef(null);

  const rotationY = useMotionValue(initialRotation);
  const startX = useRef(0);
  const currentRotationY = useRef(initialRotation);
  const isDragging = useRef(false);
  const velocity = useRef(0);
  const [showImages, setShowImages] = useState(false);
  const [currentScale, setCurrentScale] = useState(1);

  const angle = useMemo(() => 360 / images.length, [images.length]);

  const getBgPos = (i, currentRot, scale) => {
    const scaledDist = imageDistance * scale;
    const effRot = currentRot - 180 - i * angle;
    const parallaxOffset = (((effRot % 360) + 360) % 360) / 360;
    return `${-(parallaxOffset * (scaledDist / 1.5))}px 0px`;
  };

  // Update image positions dynamically
  useEffect(() => {
    const unsub = rotationY.on("change", (latestRotation) => {
      if (ringRef.current) {
        Array.from(ringRef.current.children).forEach((imgEl, i) => {
          imgEl.style.backgroundPosition = getBgPos(
            i,
            latestRotation,
            currentScale
          );
        });
      }
      currentRotationY.current = latestRotation;
    });
    return () => unsub();
  }, [rotationY, currentScale, angle]);

  // Responsive scaling
  useEffect(() => {
    const handleResize = () => {
      const vw = window.innerWidth;
      const newScale = vw <= mobileBreakpoint ? mobileScaleFactor : 1;
      setCurrentScale(newScale);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [mobileBreakpoint, mobileScaleFactor]);

  useEffect(() => {
    setShowImages(true);
  }, []);

  const handleDragStart = (e) => {
    if (!draggable) return;
    isDragging.current = true;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    startX.current = clientX;
    rotationY.stop();
    velocity.current = 0;
    document.body.style.cursor = "grabbing";
    document.addEventListener("mousemove", handleDrag);
    document.addEventListener("mouseup", handleDragEnd);
    document.addEventListener("touchmove", handleDrag);
    document.addEventListener("touchend", handleDragEnd);
  };

  const handleDrag = (e) => {
    if (!isDragging.current) return;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const deltaX = clientX - startX.current;
    velocity.current = -deltaX * 0.3;
    rotationY.set(currentRotationY.current + velocity.current);
    startX.current = clientX;
  };

  const handleDragEnd = () => {
    isDragging.current = false;
    document.body.style.cursor = "default";
    currentRotationY.current = rotationY.get();

    const initial = rotationY.get();
    const velocityBoost = velocity.current * 10;
    const target = initial + velocityBoost;

    animate(initial, target, {
      type: "inertia",
      power: 0.6,
      timeConstant: 400,
      restDelta: 0.5,
      onUpdate: (latest) => rotationY.set(latest),
    });

    velocity.current = 0;
    document.removeEventListener("mousemove", handleDrag);
    document.removeEventListener("mouseup", handleDragEnd);
    document.removeEventListener("touchmove", handleDrag);
    document.removeEventListener("touchend", handleDragEnd);
  };

  const imageVariants = {
    hidden: { y: 200, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <div
      data-aos="fade-up"
      ref={containerRef}
      className={cn("gallery-3d-container", "relative")}
      style={{
        backgroundColor,
        transform: `scale(${currentScale})`,
        transformOrigin: "center center",
      }}
      onMouseDown={handleDragStart}
      onTouchStart={handleDragStart}
    >
      <div
        style={{
          perspective: `${perspective}px`,
          width: `${width}px`,
          height: `${width * 1.33}px`,
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <motion.div
          ref={ringRef}
          className="gallery-3d-ring"
          style={{
            transformStyle: "preserve-3d",
            rotateY: rotationY,
            cursor: "pointer",
          }}
        >
          <AnimatePresence>
            {showImages &&
              images.map((src, index) => (
                <motion.div
                  key={index}
                  className="gallery-3d-card"
                  style={{
                    backgroundImage: `url(${src})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "repeat",
                    backfaceVisibility: "hidden",
                    rotateY: index * -angle,
                    z: -imageDistance * currentScale,
                    transformOrigin: `50% 50% ${imageDistance * currentScale}px`,
                    backgroundPosition: getBgPos(
                      index,
                      currentRotationY.current,
                      currentScale
                    ),
                  }}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={imageVariants}
                  transition={{
                    delay: index * staggerDelay,
                    duration: animationDuration,
                    ease: easeOut,
                  }}
                  whileHover={{ scale: 1.05, opacity: 1 }}
                />
              ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default ThreeDImageRing;
