import { motion, useInView, animate, type Variants } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Code, BarChart3, Database, Brain } from "lucide-react";
import shivamPhoto from "@/assets/shivam-photo.jpg";
import SectionBackground from "./SectionBackground";
import MagneticCard from "./MagneticCard";
import TiltCard from "./TiltCard";
import LiveTerminal from "./LiveTerminal";

const AnimatedCounter = ({ target, suffix = "" }: { target: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, target, {
        duration: 2,
        ease: "easeOut",
        onUpdate: (v) => setCount(Math.floor(v)),
      });
      return () => controls.stop();
    }
  }, [isInView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const sweepVariants: Variants = {
  rest: { x: "-150%" },
  hover: { x: "150%", transition: { duration: 0.55 } },
};

const About = () => {
  const ref = useRef(null);

  const highlights = [
    { icon: <Code className="h-6 w-6" />, title: "Full Stack Development", description: "Building scalable web apps with React.js, Node.js, and modern frameworks" },
    { icon: <BarChart3 className="h-6 w-6" />, title: "Data Analytics", description: "Transforming raw data into actionable insights with Python, SQL & Power BI" },
    { icon: <Database className="h-6 w-6" />, title: "Database Management", description: "Designing efficient database architectures with SQL Server & MongoDB" },
    { icon: <Brain className="h-6 w-6" />, title: "Machine Learning", description: "Applying regression, classification, and model evaluation techniques" },
  ];

  const stats = [
    { value: 3, suffix: "+", label: "Projects Built" },
    { value: 6, suffix: "+", label: "Technologies" },
    { value: 2, suffix: "", label: "Work Experiences" },
    { value: 3, suffix: "", label: "Certifications" },
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 60, scale: 0.92, filter: "blur(12px)" },
    visible: {
      opacity: 1, y: 0, scale: 1, filter: "blur(0px)",
      transition: { duration: 0.75 },
    },
  };

  return (
    <section id="about" className="py-24 px-6 relative overflow-hidden">
      <SectionBackground orbCount={4} sparkleCount={12} />
      <div className="section-divider mb-24" />

      <div className="max-w-6xl mx-auto relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.94, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.85, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-16"
        >
          <motion.span
            className="inline-block text-sm font-semibold text-primary tracking-widest uppercase mb-4"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            About Me
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text-animated">
            Where Code Meets Data
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Building technology that drives decisions and creates impact
          </p>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {stats.map((stat, index) => (
            <motion.div key={index} variants={itemVariants}>
              <MagneticCard strength={0.2}>
                <motion.div whileHover="hover" initial="rest" className="h-full">
                  <Card className="p-6 text-center glass-card stat-card relative overflow-hidden h-full">
                    <motion.div
                      className="absolute inset-0 pointer-events-none z-0"
                      variants={sweepVariants}
                      style={{ background: "linear-gradient(105deg, transparent 30%, rgba(0,212,170,0.1) 50%, transparent 70%)" }}
                    />
                    <div className="relative z-10">
                      <div className="text-3xl md:text-4xl font-bold text-primary mb-1">
                        <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                      </div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                    </div>
                  </Card>
                </motion.div>
              </MagneticCard>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -60, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="space-y-6"
          >
            <div className="prose prose-lg text-foreground max-w-none">
              <p className="text-lg leading-relaxed text-muted-foreground">
                I'm a final-year{" "}
                <span className="text-primary font-semibold">B.Tech Computer Science</span> student
                at BBD Engineering College, Lucknow, with a passion for building technology that
                solves real-world problems.
              </p>
              <p className="text-lg leading-relaxed text-muted-foreground">
                My expertise spans{" "}
                <span className="text-primary font-semibold">full-stack web development</span>,
                <span className="text-accent font-semibold"> data analytics & visualization</span>,
                and <span className="text-primary font-semibold"> machine learning</span>. I build
                analytics platforms, scalable web applications, and work with Python, SQL,
                JavaScript, and modern development tools.
              </p>

              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <motion.div whileHover="hover" initial="rest">
                  <div className="glass-card rounded-xl p-6 mt-8 relative overflow-hidden">
                    <motion.div
                      className="absolute inset-0 pointer-events-none z-0"
                      variants={sweepVariants}
                      style={{ background: "linear-gradient(105deg, transparent 30%, rgba(0,212,170,0.07) 50%, transparent 70%)" }}
                    />
                    <div className="relative z-10">
                      <h3 className="text-xl font-semibold text-primary mb-3 flex items-center gap-2">
                        <div className="w-1.5 h-6 bg-gradient-to-b from-primary to-accent rounded-full" />
                        Career Objective
                      </h3>
                      <p className="text-muted-foreground italic leading-relaxed">
                        "Seeking opportunities in Data Analytics, Software Development, or
                        Technology-driven roles where I can leverage my technical skills in Python, SQL,
                        JavaScript, and data visualization to deliver impactful solutions."
                      </p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>

            {/* Live code terminal */}
            <LiveTerminal />
          </motion.div>

          {/* Digital Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: 60, scale: 0.93, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, x: 0, scale: 1, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.9 }}
            className="relative group"
          >
            <TiltCard intensity={8} className="relative">
            <div className="glass-card rounded-2xl overflow-hidden border border-primary/15 circuit-tl circuit-br relative">
              {/* Terminal header bar */}
              <div className="flex items-center gap-2 px-4 py-2.5 bg-primary/5 border-b border-border/20">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/70" />
                </div>
                <span className="text-xs font-mono text-primary/60 ml-2 tracking-wide">~/profile/shivam.json</span>
                <div className="ml-auto flex items-center gap-1.5">
                  <motion.div
                    className="w-2 h-2 rounded-full bg-emerald-400"
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  <span className="text-[10px] font-mono font-bold text-emerald-400 tracking-widest">ONLINE</span>
                </div>
              </div>

              {/* Photo */}
              <div className="relative overflow-hidden">
                <motion.img
                  src={shivamPhoto}
                  alt="Shivam Kumar Srivastava"
                  className="w-full object-cover object-center"
                  style={{ aspectRatio: "3/4", objectPosition: "50% 15%" }}
                  whileHover={{ scale: 1.04 }}
                  transition={{ duration: 0.5 }}
                />
                {/* Gradient fade to footer */}
                <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-transparent to-transparent" />
                {/* Holographic shimmer */}
                <div className="holographic absolute inset-0" />
                {/* Scanlines */}
                <div className="photo-scanlines absolute inset-0" />
              </div>

              {/* JSON identity footer */}
              <div className="px-5 py-4 bg-card/70 font-mono text-xs space-y-1.5">
                <div>
                  <span className="text-primary">name</span>
                  <span className="text-muted-foreground">: </span>
                  <span className="text-foreground">"Shivam Kumar Srivastava"</span>
                </div>
                <div>
                  <span className="text-accent">role</span>
                  <span className="text-muted-foreground">: </span>
                  <span className="text-foreground">"Full Stack Developer"</span>
                </div>
                <div>
                  <span className="text-primary">location</span>
                  <span className="text-muted-foreground">: </span>
                  <span className="text-foreground">"Lucknow, India"</span>
                </div>
                <div>
                  <span className="text-accent">status</span>
                  <span className="text-muted-foreground">: </span>
                  <span className="text-emerald-400 font-semibold">"open_to_opportunities"</span>
                </div>
              </div>
            </div>

            {/* Ambient glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl -z-10 blur-sm group-hover:blur-md transition-all duration-500" />
            </TiltCard>
          </motion.div>
        </div>

        {/* Highlights Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {highlights.map((highlight, index) => (
            <motion.div key={index} variants={itemVariants}>
              <MagneticCard strength={0.18} className="h-full">
                <motion.div whileHover="hover" initial="rest" className="h-full">
                  <Card className="p-6 h-full glass-card group cursor-default relative overflow-hidden">
                    <motion.div
                      className="absolute inset-0 pointer-events-none z-0"
                      variants={sweepVariants}
                      style={{ background: "linear-gradient(105deg, transparent 30%, rgba(0,212,170,0.09) 50%, transparent 70%)" }}
                    />
                    <div className="relative z-10">
                      <div className="text-primary mb-4 p-3 bg-primary/10 rounded-xl w-fit group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                        {highlight.icon}
                      </div>
                      <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors duration-300">
                        {highlight.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {highlight.description}
                      </p>
                    </div>
                  </Card>
                </motion.div>
              </MagneticCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;
