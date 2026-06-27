import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const CustomCursor = () => {
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);

  const rawX = useMotionValue(-200);
  const rawY = useMotionValue(-200);

  // Outer ring lags behind with spring
  const ringX = useSpring(rawX, { stiffness: 140, damping: 18, mass: 0.6 });
  const ringY = useSpring(rawY, { stiffness: 140, damping: 18, mass: 0.6 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      if (!visible) setVisible(true);
    };
    const onDown = () => setClicking(true);
    const onUp = () => setClicking(false);

    const attachHover = () => {
      document
        .querySelectorAll("a, button, [role=button], input, textarea, label, select, [data-cursor-hover]")
        .forEach((el) => {
          el.addEventListener("mouseenter", () => setHovering(true));
          el.addEventListener("mouseleave", () => setHovering(false));
        });
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    attachHover();

    // Refresh hover targets for dynamically rendered elements
    const id = setInterval(attachHover, 2000);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      clearInterval(id);
    };
  }, [rawX, rawY, visible]);

  if (!visible) return null;

  return (
    <>
      {/* Outer ring — spring lag, mix-blend-difference inverts underlying colors */}
      <motion.div
        style={{
          left: ringX,
          top: ringY,
          translateX: "-50%",
          translateY: "-50%",
          position: "fixed",
          zIndex: 9999,
          pointerEvents: "none",
          mixBlendMode: "difference",
        }}
        animate={{
          width: hovering ? 54 : clicking ? 18 : 36,
          height: hovering ? 54 : clicking ? 18 : 36,
        }}
        transition={{ type: "spring", stiffness: 320, damping: 26 }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            border: "2px solid white",
            opacity: 0.9,
          }}
        />
      </motion.div>

      {/* Inner dot — snappy follow */}
      <motion.div
        style={{
          left: rawX,
          top: rawY,
          translateX: "-50%",
          translateY: "-50%",
          position: "fixed",
          zIndex: 9999,
          pointerEvents: "none",
          mixBlendMode: "difference",
        }}
        animate={{
          width: clicking ? 4 : hovering ? 8 : 7,
          height: clicking ? 4 : hovering ? 8 : 7,
        }}
        transition={{ duration: 0.1 }}
      >
        <div style={{ width: "100%", height: "100%", borderRadius: "50%", background: "white" }} />
      </motion.div>
    </>
  );
};

export default CustomCursor;
