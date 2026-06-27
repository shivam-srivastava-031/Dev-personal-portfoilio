import { useEffect, useRef } from "react";

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const mouse = { x: -999, y: -999 };

    type Particle = {
      x: number; y: number;
      vx: number; vy: number;
      size: number; opacity: number;
      color: string;
      pulseOffset: number;
    };

    let particles: Particle[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener("mousemove", onMouseMove);

    // Web3/neural palette: teal, gold, violet
    const colors = [
      "0, 212, 170",    // teal primary
      "255, 215, 0",    // gold accent
      "139, 92, 246",   // violet AI
      "80, 220, 200",   // light teal
    ];

    const particleCount = Math.min(80, Math.floor(window.innerWidth / 20));
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2.5 + 0.5,
        opacity: Math.random() * 0.45 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
        pulseOffset: Math.random() * Math.PI * 2,
      });
    }

    let frame = 0;

    // Draw animated connection with optional data-packet dot
    const drawConnection = (
      p1: Particle,
      p2: Particle,
      dist: number,
      time: number
    ) => {
      const alpha = (1 - dist / 160) * 0.18;
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.strokeStyle = `rgba(0,212,170,${alpha})`;
      ctx.lineWidth = 0.6;
      ctx.stroke();

      // Traveling data packet every ~4 seconds per connection
      const period = 4000;
      const phase = ((time + p1.pulseOffset * 800) % period) / period;
      if (phase < 0.5) {
        const t = phase * 2;
        const px = p1.x + (p2.x - p1.x) * t;
        const py = p1.y + (p2.y - p1.y) * t;
        const packetAlpha = Math.sin(t * Math.PI) * 0.7;
        ctx.beginPath();
        ctx.arc(px, py, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,212,170,${packetAlpha})`;
        ctx.fill();
      }
    };

    const animate = () => {
      const time = performance.now();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame++;

      particles.forEach((p, i) => {
        // Mouse repulsion
        const dxm = p.x - mouse.x;
        const dym = p.y - mouse.y;
        const distM = Math.sqrt(dxm * dxm + dym * dym);
        if (distM < 140 && distM > 0) {
          const force = (140 - distM) / 140;
          p.vx += (dxm / distM) * force * 0.025;
          p.vy += (dym / distM) * force * 0.025;
        }

        // Velocity damping
        p.vx *= 0.985;
        p.vy *= 0.985;

        p.x += p.vx;
        p.y += p.vy;

        // Wrap
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Pulsing opacity
        const pulseOpacity = p.opacity * (0.7 + 0.3 * Math.sin(time * 0.001 + p.pulseOffset));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color},${pulseOpacity})`;
        ctx.fill();

        // Neural connections
        for (let j = i + 1; j < particles.length; j++) {
          const dx = p.x - particles[j].x;
          const dy = p.y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 160) {
            drawConnection(p, particles[j], dist, time + i * 137);
          }
        }
      });

      // Occasional bright neural flash
      if (frame % 180 === 0 && particles.length > 10) {
        const i = Math.floor(Math.random() * particles.length);
        const j = Math.floor(Math.random() * particles.length);
        if (i !== j) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = "rgba(0,212,170,0.6)";
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ opacity: 0.5 }}
    />
  );
};

export default ParticleBackground;
