import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Particle = { angle: number; distance: number; color: string; size: number };
type Burst = { id: number; x: number; y: number; particles: Particle[] };

const COLORS = ["#00D4AA", "#FFD700", "#8B5CF6", "#50DCC8", "#34D399", "#F59E0B"];

let nextId = 0;

const ClickBurst = () => {
  const [bursts, setBursts] = useState<Burst[]>([]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const id = nextId++;
      const burst: Burst = {
        id,
        x: e.clientX,
        y: e.clientY,
        particles: Array.from({ length: 10 }, (_, i) => ({
          angle: (i / 10) * Math.PI * 2 + (Math.random() - 0.5) * 0.7,
          distance: 30 + Math.random() * 60,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          size: 2.5 + Math.random() * 3.5,
        })),
      };
      setBursts((prev) => [...prev, burst]);
      setTimeout(() => setBursts((prev) => prev.filter((b) => b.id !== id)), 750);
    };

    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, []);

  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 9997 }}>
      <AnimatePresence>
        {bursts.flatMap((burst) =>
          burst.particles.map((p, i) => (
            <motion.div
              key={`${burst.id}-${i}`}
              style={{
                position: "absolute",
                left: burst.x,
                top: burst.y,
                width: p.size,
                height: p.size,
                borderRadius: "50%",
                background: p.color,
                boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
                translateX: "-50%",
                translateY: "-50%",
              }}
              initial={{ scale: 1.8, x: 0, y: 0, opacity: 1 }}
              animate={{
                scale: 0,
                x: Math.cos(p.angle) * p.distance,
                y: Math.sin(p.angle) * p.distance,
                opacity: 0,
              }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            />
          ))
        )}
      </AnimatePresence>
    </div>
  );
};

export default ClickBurst;
