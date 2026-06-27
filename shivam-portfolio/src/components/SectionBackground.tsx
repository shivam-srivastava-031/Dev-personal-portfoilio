import { motion } from "framer-motion";
import { useMemo } from "react";

interface Props {
  orbCount?: number;
  sparkleCount?: number;
}

const SectionBackground = ({ orbCount = 4, sparkleCount = 12 }: Props) => {
  const orbs = useMemo(
    () =>
      Array.from({ length: orbCount }, (_, i) => ({
        width: 160 + Math.random() * 280,
        top: Math.random() * 85,
        left: Math.random() * 88,
        isPrimary: i % 2 === 0,
        duration: 7 + Math.random() * 6,
        delay: Math.random() * 3,
        dx: (Math.random() - 0.5) * 40,
        dy: (Math.random() - 0.5) * 30,
      })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [orbCount]
  );

  const sparkles = useMemo(
    () =>
      Array.from({ length: sparkleCount }, (_, i) => ({
        size: 1.5 + Math.random() * 3,
        top: 5 + Math.random() * 90,
        left: 2 + Math.random() * 96,
        opacity: 0.15 + Math.random() * 0.4,
        isPrimary: i % 3 !== 1,
        duration: 2.5 + Math.random() * 4,
        delay: Math.random() * 4,
      })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [sparkleCount]
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full blur-[90px] ${
            orb.isPrimary
              ? "bg-gradient-to-br from-primary/8 to-accent/4"
              : "bg-gradient-to-br from-accent/6 to-primary/5"
          }`}
          style={{
            width: orb.width,
            height: orb.width,
            top: `${orb.top}%`,
            left: `${orb.left}%`,
          }}
          animate={{ scale: [1, 1.18, 1], x: [0, orb.dx, 0], y: [0, orb.dy, 0] }}
          transition={{ duration: orb.duration, repeat: Infinity, ease: "easeInOut", delay: orb.delay }}
        />
      ))}
      {sparkles.map((sp, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full ${sp.isPrimary ? "bg-primary" : "bg-accent"}`}
          style={{
            width: sp.size,
            height: sp.size,
            top: `${sp.top}%`,
            left: `${sp.left}%`,
            opacity: sp.opacity,
          }}
          animate={{ y: [0, -20, 0], opacity: [sp.opacity * 0.35, sp.opacity, sp.opacity * 0.35] }}
          transition={{ duration: sp.duration, repeat: Infinity, ease: "easeInOut", delay: sp.delay }}
        />
      ))}
    </div>
  );
};

export default SectionBackground;
