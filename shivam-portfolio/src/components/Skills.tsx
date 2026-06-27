import { motion, useMotionValue, useSpring, useTransform, useScroll, useInView } from "framer-motion";
import { useRef, useState, useCallback, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Globe, Server, Zap, Shield, Code2, BarChart3 } from "lucide-react";

/* ── Data ─────────────────────────────────────────────────── */
const marqueeRow1 = ["Python", "Django", "REST APIs", "React.js", "SQL", "Supabase", "OAuth 2.0", "Google Ads API", "JavaScript", "Java", "Git & GitHub", "Postman"];
const marqueeRow2 = ["HTML / CSS", "Pandas", "NumPy", "Power BI", "TypeScript", "MongoDB", "Data Analysis", "ML Concepts", "Google Sign-In", "Tailwind CSS", "Node.js", "Jupyter"];

const featuredSkills = [
  { name: "Python",   emoji: "🐍", level: "Advanced",     glow: "14,165,233",   gradient: "from-sky-500/25 via-sky-500/10 to-sky-500/5",     border: "border-sky-500/30",     badge: "bg-sky-500/15 text-sky-400 border-sky-500/30",     desc: "Backend, automation & data science workflows." },
  { name: "Django",   emoji: "🎸", level: "Advanced",     glow: "16,185,129",   gradient: "from-emerald-500/25 via-emerald-500/10 to-emerald-500/5", border: "border-emerald-500/30", badge: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30", desc: "REST APIs, OAuth 2.0 & production web platforms." },
  { name: "React.js", emoji: "⚛️", level: "Intermediate", glow: "6,182,212",    gradient: "from-cyan-500/25 via-cyan-500/10 to-cyan-500/5",     border: "border-cyan-500/30",    badge: "bg-cyan-500/15 text-cyan-400 border-cyan-500/30",    desc: "Component UIs, hooks & full-stack frontends." },
  { name: "SQL",      emoji: "🗄️", level: "Advanced",     glow: "245,158,11",   gradient: "from-amber-500/25 via-amber-500/10 to-amber-500/5",   border: "border-amber-500/30",   badge: "bg-amber-500/15 text-amber-400 border-amber-500/30",  desc: "Complex queries, DB design & data analytics." },
];

const skillGroups = [
  { label: "Backend",    icon: <Server  className="h-3.5 w-3.5" />, pill: "bg-primary/10 border-primary/25 text-primary hover:bg-primary/25 hover:border-primary/50",   skills: ["Django", "REST APIs", "OAuth 2.0", "Supabase", "Google Ads API"] },
  { label: "Frontend",   icon: <Globe   className="h-3.5 w-3.5" />, pill: "bg-accent/10 border-accent/25 text-accent hover:bg-accent/25 hover:border-accent/50",         skills: ["React.js", "HTML / CSS", "Tailwind CSS", "TypeScript", "JavaScript"] },
  { label: "Languages",  icon: <Code2   className="h-3.5 w-3.5" />, pill: "bg-primary/10 border-primary/25 text-primary hover:bg-primary/25 hover:border-primary/50",   skills: ["Python", "SQL", "JavaScript", "Java"] },
  { label: "Data & AI",  icon: <BarChart3 className="h-3.5 w-3.5" />, pill: "bg-accent/10 border-accent/25 text-accent hover:bg-accent/25 hover:border-accent/50",      skills: ["Pandas", "NumPy", "Power BI", "EDA", "Data Analysis", "ML Concepts"] },
  { label: "Auth & APIs",icon: <Shield  className="h-3.5 w-3.5" />, pill: "bg-primary/10 border-primary/25 text-primary hover:bg-primary/25 hover:border-primary/50",   skills: ["OAuth 2.0", "Google Sign-In", "Google Ads API", "3rd-party APIs"] },
  { label: "Tools",      icon: <Zap     className="h-3.5 w-3.5" />, pill: "bg-accent/10 border-accent/25 text-accent hover:bg-accent/25 hover:border-accent/50",         skills: ["Git / GitHub", "Postman", "VS Code", "Jupyter", "Supabase Studio"] },
];


/* ── Radar chart ─────────────────────────────────────────── */
const RADAR_AXES = [
  { label: "Backend",   score: 92 },
  { label: "Data & AI", score: 85 },
  { label: "APIs",      score: 80 },
  { label: "Tools",     score: 78 },
  { label: "Frontend",  score: 75 },
  { label: "Problem\nSolving", score: 88 },
];
const N = RADAR_AXES.length;
const CX = 130, CY = 130, R = 94;
const radarPt = (i: number, pct: number): [number, number] => {
  const a = (i * (2 * Math.PI) / N) - Math.PI / 2;
  return [CX + (pct / 100) * R * Math.cos(a), CY + (pct / 100) * R * Math.sin(a)];
};

const RadarChart = () => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const inView = useInView(wrapRef, { once: true, margin: "-80px" });
  const [scores, setScores] = useState(RADAR_AXES.map(() => 0));

  useEffect(() => {
    if (!inView) return;
    const targets = RADAR_AXES.map((a) => a.score);
    const dur = 1400;
    const t0 = performance.now();
    let raf: number;
    const step = (now: number) => {
      const t = Math.min((now - t0) / dur, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      setScores(targets.map((s) => s * ease));
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView]);

  const poly   = scores.map((s, i) => radarPt(i, s).join(",")).join(" ");
  const rings  = [20, 40, 60, 80, 100].map((p) =>
    RADAR_AXES.map((_, i) => radarPt(i, p).join(",")).join(" ")
  );

  return (
    <div ref={wrapRef} className="flex justify-center items-center w-full">
      <svg viewBox="0 0 260 260" className="w-full max-w-[260px]">
        {/* Grid rings */}
        {rings.map((pts, ri) => (
          <polygon key={ri} points={pts}
            fill={ri === 4 ? "rgba(0,212,170,0.03)" : "none"}
            stroke="rgba(0,212,170,0.10)" strokeWidth="1" />
        ))}
        {/* Axis lines */}
        {RADAR_AXES.map((_, i) => {
          const [x2, y2] = radarPt(i, 100);
          return <line key={i} x1={CX} y1={CY} x2={x2} y2={y2}
            stroke="rgba(0,212,170,0.13)" strokeWidth="1" />;
        })}
        {/* Glow polygon */}
        <polygon points={poly} fill="none"
          stroke="rgba(0,212,170,0.22)" strokeWidth="5"
          strokeLinejoin="round" style={{ filter: "blur(3px)" }} />
        {/* Filled polygon */}
        <polygon points={poly}
          fill="rgba(0,212,170,0.11)" stroke="rgba(0,212,170,0.65)"
          strokeWidth="1.5" strokeLinejoin="round" />
        {/* Vertex dots */}
        {scores.map((s, i) => {
          const [x, y] = radarPt(i, s);
          return (
            <g key={i}>
              <circle cx={x} cy={y} r="5" fill="rgba(0,212,170,0.2)"
                style={{ filter: "blur(3px)" }} />
              <circle cx={x} cy={y} r="3" fill="#00D4AA"
                style={{ filter: "drop-shadow(0 0 4px rgba(0,212,170,0.9))" }} />
            </g>
          );
        })}
        {/* Axis labels */}
        {RADAR_AXES.map((ax, i) => {
          const [lx, ly] = radarPt(i, 118);
          return (
            <text key={i} x={lx} y={ly} textAnchor="middle"
              dominantBaseline="middle" fill="rgba(255,255,255,0.5)"
              fontSize="8" fontFamily="monospace" fontWeight="500">
              {ax.label}
            </text>
          );
        })}
        <circle cx={CX} cy={CY} r="2" fill="rgba(0,212,170,0.5)" />
      </svg>
    </div>
  );
};

/* ── 3D Tilt + Holographic Card ──────────────────────────── */
const TiltCard = ({ s, index }: { s: typeof featuredSkills[0]; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotX = useSpring(useTransform(my, [-0.5, 0.5], [14, -14]), { stiffness: 300, damping: 28 });
  const rotY = useSpring(useTransform(mx, [-0.5, 0.5], [-14, 14]), { stiffness: 300, damping: 28 });
  const [shine, setShine] = useState({ x: 50, y: 50, active: false });

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const r = cardRef.current!.getBoundingClientRect();
    const nx = (e.clientX - r.left) / r.width - 0.5;
    const ny = (e.clientY - r.top) / r.height - 0.5;
    mx.set(nx); my.set(ny);
    setShine({ x: (nx + 0.5) * 100, y: (ny + 0.5) * 100, active: true });
  }, [mx, my]);

  const onLeave = useCallback(() => {
    mx.set(0); my.set(0);
    setShine({ x: 50, y: 50, active: false });
  }, [mx, my]);

  return (
    <motion.div
      ref={cardRef}
      style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d", perspective: 800 }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      initial={{ opacity: 0, y: 40, scale: 0.92 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.12 }}
      className="cursor-default"
    >
      <Card
        className={`relative p-6 h-full bg-gradient-to-br ${s.gradient} ${s.border} border backdrop-blur-sm overflow-hidden`}
        style={{ boxShadow: shine.active ? `0 0 32px 6px rgba(${s.glow},0.22), 0 0 0 1px rgba(${s.glow},0.15)` : `0 0 0 0 transparent`, transition: "box-shadow 0.3s" }}
      >
        {/* Holographic shimmer overlay */}
        <div
          className="absolute inset-0 pointer-events-none rounded-[inherit] transition-opacity duration-300"
          style={{
            opacity: shine.active ? 1 : 0,
            background: `radial-gradient(circle at ${shine.x}% ${shine.y}%, rgba(255,255,255,0.12) 0%, rgba(${s.glow},0.08) 40%, transparent 70%)`,
          }}
        />

        {/* Animated background orb */}
        <motion.div
          className="absolute -top-8 -right-8 w-28 h-28 rounded-full blur-2xl pointer-events-none"
          style={{ background: `rgba(${s.glow},0.18)` }}
          animate={{ scale: [1, 1.35, 1], opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 4 + index, repeat: Infinity, ease: "easeInOut", delay: index * 0.6 }}
        />

        {/* Corner accent lines */}
        <div className="absolute top-0 left-0 w-8 h-8 pointer-events-none">
          <div className="absolute top-3 left-0 w-4 h-px" style={{ background: `rgba(${s.glow},0.6)` }} />
          <div className="absolute top-0 left-3 w-px h-4" style={{ background: `rgba(${s.glow},0.6)` }} />
        </div>
        <div className="absolute bottom-0 right-0 w-8 h-8 pointer-events-none">
          <div className="absolute bottom-3 right-0 w-4 h-px" style={{ background: `rgba(${s.glow},0.6)` }} />
          <div className="absolute bottom-0 right-3 w-px h-4" style={{ background: `rgba(${s.glow},0.6)` }} />
        </div>

        <div style={{ transform: "translateZ(20px)" }}>
          <div className="text-4xl mb-4 select-none">{s.emoji}</div>
          <div className="flex items-center justify-between mb-3 gap-2">
            <h3 className="text-lg font-bold text-foreground">{s.name}</h3>
            <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border shrink-0 ${s.badge}`}>
              {s.level}
            </span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
        </div>
      </Card>
    </motion.div>
  );
};

/* ── Magnetic Pill ───────────────────────────────────────── */
const MagneticPill = ({ skill, pillClass, delay }: { skill: string; pillClass: string; delay: number }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 18 });
  const sy = useSpring(y, { stiffness: 200, damping: 18 });
  const [clicked, setClicked] = useState(false);

  const onMove = (e: React.MouseEvent<HTMLSpanElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * 0.18);
    y.set((e.clientY - r.top - r.height / 2) * 0.18);
  };
  const onLeave = () => { x.set(0); y.set(0); };
  const onClick = () => { setClicked(true); setTimeout(() => setClicked(false), 400); };

  return (
    <motion.span
      style={{ x: sx, y: sy }}
      className={`relative px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors duration-200 cursor-default overflow-hidden select-none ${pillClass}`}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={onClick}
    >
      {/* Ripple on click */}
      {clicked && (
        <motion.span
          className="absolute inset-0 rounded-full bg-white/20 pointer-events-none"
          initial={{ scale: 0, opacity: 0.6 }}
          animate={{ scale: 2.5, opacity: 0 }}
          transition={{ duration: 0.4 }}
        />
      )}
      {skill}
    </motion.span>
  );
};

/* ── Main Component ───────────────────────────────────────── */
const Skills = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const outerRef   = useRef<HTMLElement>(null);
  const [activeGroup, setActiveGroup] = useState<string | null>(null);

  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ["start end", "end start"],
  });
  const progressScaleY = useSpring(scrollYProgress, { stiffness: 80, damping: 25 });

  return (
    <section id="skills" ref={outerRef} className="py-24 px-6 relative overflow-hidden">
      <div className="section-divider mb-24" />

      {/* Scroll progress — glowing vertical line on the left edge */}
      <div className="absolute left-3 top-0 bottom-0 w-[2px] bg-border/10 hidden md:block pointer-events-none">
        <motion.div
          className="absolute inset-x-0 top-0 h-full rounded-full"
          style={{
            scaleY: progressScaleY,
            transformOrigin: "top",
            background: "linear-gradient(180deg, transparent 0%, #00D4AA 35%, #FFD700 70%, #8B5CF6 100%)",
            boxShadow: "0 0 8px rgba(0,212,170,0.5)",
          }}
        />
      </div>

      {/* ── Section background: floating orbs ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[
          { top: "10%",  left: "5%",  size: 340, color: "rgba(0,212,170,0.06)",  dur: 9  },
          { top: "55%",  right: "4%", size: 280, color: "rgba(255,215,0,0.05)",  dur: 12 },
          { top: "80%",  left: "30%", size: 200, color: "rgba(0,212,170,0.04)",  dur: 7  },
          { top: "20%",  right: "20%",size: 160, color: "rgba(255,215,0,0.06)",  dur: 10 },
        ].map((orb, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full blur-3xl"
            style={{ width: orb.size, height: orb.size, background: orb.color, top: orb.top, ...(orb.left ? { left: orb.left } : { right: (orb as any).right }) }}
            animate={{ scale: [1, 1.25, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: orb.dur, repeat: Infinity, ease: "easeInOut", delay: i * 1.5 }}
          />
        ))}

        {/* Floating sparkle dots */}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={`dot-${i}`}
            className="absolute w-1 h-1 rounded-full bg-primary/40"
            style={{ top: `${10 + i * 9}%`, left: `${5 + i * 10}%` }}
            animate={{ y: [0, -18, 0], opacity: [0.2, 0.7, 0.2] }}
            transition={{ duration: 3 + i * 0.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto relative" ref={sectionRef}>

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <span className="inline-block text-sm font-semibold text-primary tracking-widest uppercase mb-4">
            Expertise
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-5 gradient-text-animated">
            Technical Skills
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Backend engineering, full-stack development, data analytics, and AI — built through real projects
          </p>
        </motion.div>

        {/* ── Dual Marquee ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-14 space-y-3"
        >
          {/* Row 1 → left */}
          <div className="relative overflow-hidden py-1">
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
            <motion.div className="flex gap-3" style={{ width: "max-content" }}
              animate={{ x: ["0%", "-50%"] }} transition={{ duration: 28, repeat: Infinity, ease: "linear" }}>
              {[...marqueeRow1, ...marqueeRow1].map((t, i) => (
                <span key={i} className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/8 border border-primary/15 rounded-full text-sm text-primary font-medium shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/70" />{t}
                </span>
              ))}
            </motion.div>
          </div>
          {/* Row 2 → right */}
          <div className="relative overflow-hidden py-1">
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
            <motion.div className="flex gap-3" style={{ width: "max-content" }}
              animate={{ x: ["-50%", "0%"] }} transition={{ duration: 32, repeat: Infinity, ease: "linear" }}>
              {[...marqueeRow2, ...marqueeRow2].map((t, i) => (
                <span key={i} className="inline-flex items-center gap-2 px-4 py-1.5 bg-accent/8 border border-accent/15 rounded-full text-sm text-accent font-medium shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent/70" />{t}
                </span>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* ── Featured 3D Tilt Cards ── */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14" style={{ perspective: 1200 }}>
          {featuredSkills.map((s, i) => <TiltCard key={s.name} s={s} index={i} />)}
        </div>

        {/* ── Radar Chart + Domain Competency ── */}
        <motion.div
          initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.85 }}
          className="mb-14"
        >
          <Card className="p-8 glass-card relative overflow-hidden">
            <motion.div
              className="absolute inset-0 pointer-events-none opacity-20"
              style={{ background: "linear-gradient(105deg, transparent 30%, rgba(0,212,170,0.07) 50%, transparent 70%)" }}
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 7, repeat: Infinity, ease: "linear", repeatDelay: 4 }}
            />
            <div className="grid md:grid-cols-2 gap-8 items-center relative z-10">
              <RadarChart />
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  Domain Competency
                </h3>
                <div className="space-y-4">
                  {RADAR_AXES.map((ax, i) => (
                    <motion.div
                      key={ax.label}
                      className="flex items-center gap-3"
                      initial={{ opacity: 0, x: 24 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.07 }}
                    >
                      <span className="text-xs font-mono text-muted-foreground/70 w-24 shrink-0">
                        {ax.label.replace("\n", " ")}
                      </span>
                      <div className="flex-1 h-[3px] rounded-full bg-border/25 overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ background: "linear-gradient(90deg, rgba(0,212,170,0.7), #00D4AA)" }}
                          initial={{ scaleX: 0, originX: 0 }}
                          whileInView={{ scaleX: ax.score / 100 }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.1, delay: 0.25 + i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
                        />
                      </div>
                      <span className="text-xs font-mono font-semibold text-primary w-8 text-right">{ax.score}%</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* ── Full Tech Stack with Magnetic Pills ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-14"
        >
          <Card className="p-8 glass-card relative overflow-hidden">
            {/* Subtle animated gradient sweep */}
            <motion.div
              className="absolute inset-0 pointer-events-none opacity-30"
              style={{ background: "linear-gradient(105deg, transparent 30%, rgba(0,212,170,0.06) 50%, transparent 70%)" }}
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear", repeatDelay: 3 }}
            />

            <h3 className="text-lg font-semibold text-foreground mb-8 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Full Tech Stack
            </h3>

            {activeGroup && (
              <p className="text-[10px] text-muted-foreground/50 mb-6 font-mono tracking-wide">
                Filtering: <span className="text-primary">{activeGroup}</span> — click label again to clear
              </p>
            )}

            <div className="space-y-6">
              {skillGroups.map((group, gi) => {
                const isActive = activeGroup === group.label;
                const isDimmed = !!activeGroup && !isActive;
                return (
                  <motion.div
                    key={group.label}
                    className="flex flex-wrap gap-x-5 gap-y-2 items-start"
                    initial={{ opacity: 0, x: -24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: gi * 0.08 }}
                    style={{ opacity: isDimmed ? 0.25 : 1, transition: "opacity 0.3s" }}
                  >
                    <button
                      onClick={() => setActiveGroup((g) => g === group.label ? null : group.label)}
                      className="flex items-center gap-1.5 w-28 shrink-0 pt-1 text-left select-none"
                    >
                      <span className={`transition-colors duration-200 ${isActive ? "text-primary" : "text-muted-foreground/60"}`}>
                        {group.icon}
                      </span>
                      <span className={`text-xs font-bold uppercase tracking-widest transition-colors duration-200 ${isActive ? "text-primary" : "text-muted-foreground"}`}>
                        {group.label}
                      </span>
                      {isActive && (
                        <motion.span layoutId="filterDot" className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 ml-0.5" />
                      )}
                    </button>
                    <div className="flex flex-wrap gap-2">
                      {group.skills.map((skill, si) => (
                        <MagneticPill
                          key={skill}
                          skill={skill}
                          pillClass={group.pill}
                          delay={gi * 0.07 + si * 0.05}
                        />
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </Card>
        </motion.div>


      </div>
    </section>
  );
};

export default Skills;
