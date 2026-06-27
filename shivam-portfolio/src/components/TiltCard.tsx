import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface Props {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  glare?: boolean;
}

const TiltCard = ({ children, className = "", intensity = 10, glare = true }: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rawRotateX = useTransform(mouseY, [-0.5, 0.5], [intensity, -intensity]);
  const rawRotateY = useTransform(mouseX, [-0.5, 0.5], [-intensity, intensity]);

  const rotateX = useSpring(rawRotateX, { stiffness: 200, damping: 24 });
  const rotateY = useSpring(rawRotateY, { stiffness: 200, damping: 24 });

  // Glare highlight follows mouse position
  const glareX = useTransform(mouseX, [-0.5, 0.5], ["25%", "75%"]);
  const glareY = useTransform(mouseY, [-0.5, 0.5], ["25%", "75%"]);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const onMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 900,
      }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {children}

      {/* Glare reflection */}
      {glare && (
        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "inherit",
            pointerEvents: "none",
            zIndex: 10,
            background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.07) 0%, transparent 55%)`,
          }}
        />
      )}
    </motion.div>
  );
};

export default TiltCard;
