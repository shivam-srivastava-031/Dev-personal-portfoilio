import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Code, BarChart3, Database, Brain } from "lucide-react";
import aboutImage from "@/assets/about-image.jpg";

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

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const highlights = [
    {
      icon: <Code className="h-6 w-6" />,
      title: "Full Stack Development",
      description: "Building scalable web apps with React.js, Node.js, and modern frameworks",
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Data Analytics",
      description: "Transforming raw data into actionable insights with Python, SQL & Power BI",
    },
    {
      icon: <Database className="h-6 w-6" />,
      title: "Database Management",
      description: "Designing efficient database architectures with SQL Server & MongoDB",
    },
    {
      icon: <Brain className="h-6 w-6" />,
      title: "Machine Learning",
      description: "Applying regression, classification, and model evaluation techniques",
    },
  ];

  const stats = [
    { value: 3, suffix: "+", label: "Projects Built" },
    { value: 6, suffix: "+", label: "Technologies" },
    { value: 2, suffix: "", label: "Work Experiences" },
    { value: 3, suffix: "", label: "Certifications" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: "blur(5px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  return (
    <section id="about" className="py-24 px-6 relative">
      {/* Section divider */}
      <div className="section-divider mb-24" />

      <div className="max-w-6xl mx-auto" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7 }}
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
              <Card className="p-6 text-center glass-card stat-card">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-1">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
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
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="glass-card rounded-xl p-6 mt-8"
              >
                <h3 className="text-xl font-semibold text-primary mb-3 flex items-center gap-2">
                  <div className="w-1.5 h-6 bg-gradient-to-b from-primary to-accent rounded-full" />
                  Career Objective
                </h3>
                <p className="text-muted-foreground italic leading-relaxed">
                  "Seeking opportunities in Data Analytics, Software Development, or
                  Technology-driven roles where I can leverage my technical skills in Python, SQL,
                  JavaScript, and data visualization to deliver impactful solutions."
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative group"
          >
            <div className="relative overflow-hidden rounded-2xl">
              <motion.img
                src={aboutImage}
                alt="Professional workspace"
                className="w-full h-auto rounded-2xl shadow-card"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.5 }}
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/10 rounded-2xl" />

              {/* Floating label */}
              <motion.div
                className="absolute bottom-6 left-6 glass-card rounded-xl px-4 py-3"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <p className="text-sm font-semibold text-foreground">🚀 Always Building</p>
                <p className="text-xs text-muted-foreground">Code · Data · Impact</p>
              </motion.div>
            </div>

            {/* Decorative border */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl -z-10 blur-sm group-hover:blur-md transition-all duration-500" />
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
              <Card className="p-6 h-full glass-card group cursor-default">
                <div className="text-primary mb-4 p-3 bg-primary/10 rounded-xl w-fit group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                  {highlight.icon}
                </div>
                <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors duration-300">
                  {highlight.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {highlight.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;