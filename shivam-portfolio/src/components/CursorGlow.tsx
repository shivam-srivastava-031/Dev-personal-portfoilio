import { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

// Soft radial glow that follows the cursor with spring lag.
// Sits above the fluid canvas (z-index 3) but below all interactive UI.
const CursorGlow = () => {
  const rawX = useMotionValue(-200);
  const rawY = useMotionValue(-200);

  const x = useSpring(rawX, { damping: 28, stiffness: 120, mass: 0.6 });
  const y = useSpring(rawY, { damping: 28, stiffness: 120, mass: 0.6 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => { rawX.set(e.clientX); rawY.set(e.clientY); };
    const onLeave = () => { rawX.set(-200); rawY.set(-200); };
    window.addEventListener('mousemove', onMove);
    document.documentElement.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('mousemove', onMove);
      document.documentElement.removeEventListener('mouseleave', onLeave);
    };
  }, [rawX, rawY]);

  return (
    <motion.div
      style={{
        x, y,
        translateX: '-50%',
        translateY: '-50%',
        position: 'fixed',
        top: 0, left: 0,
        zIndex: 3,
        pointerEvents: 'none',
        width: 380,
        height: 380,
        borderRadius: '50%',
        background:
          'radial-gradient(circle, rgba(0,212,170,0.10) 0%, rgba(0,212,170,0.04) 40%, transparent 70%)',
        mixBlendMode: 'screen',
      }}
    />
  );
};

export default CursorGlow;
