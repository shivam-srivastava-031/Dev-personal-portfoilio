import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Code, Globe, Cloud, BarChart3, Brain, Wrench } from "lucide-react";

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [animateProgress, setAnimateProgress] = useState(false);

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setAnimateProgress(true), 300);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  const skillCategories = [
    { icon: <Code className="h-6 w-6" />, title: "Programming Languages", color: "text-primary", bgColor: "bg-primary/10", skills: [{ name: "Python", level: 90 }, { name: "SQL", level: 85 }, { name: "JavaScript", level: 88 }, { name: "Java", level: 75 }] },
    { icon: <BarChart3 className="h-6 w-6" />, title: "Data Analysis & Viz", color: "text-accent", bgColor: "bg-accent/10", skills: [{ name: "Pandas / NumPy", level: 88 }, { name: "Matplotlib / Seaborn", level: 85 }, { name: "Power BI", level: 80 }, { name: "Excel / EDA", level: 90 }] },
    { icon: <Globe className="h-6 w-6" />, title: "Web Development", color: "text-primary", bgColor: "bg-primary/10", skills: [{ name: "React.js", level: 88 }, { name: "Node.js", level: 85 }, { name: "HTML / CSS", level: 95 }, { name: "REST APIs", level: 85 }] },
    { icon: <Brain className="h-6 w-6" />, title: "Machine Learning", color: "text-accent", bgColor: "bg-accent/10", skills: [{ name: "Regression", level: 78 }, { name: "Classification", level: 78 }, { name: "Model Evaluation", level: 75 }, { name: "Data Preprocessing", level: 85 }] },
    { icon: <Cloud className="h-6 w-6" />, title: "Databases", color: "text-primary", bgColor: "bg-primary/10", skills: [{ name: "SQL Server", level: 85 }, { name: "MongoDB", level: 80 }, { name: "Data Modeling", level: 78 }, { name: "Query Optimization", level: 75 }] },
    { icon: <Wrench className="h-6 w-6" />, title: "Tools & Platforms", color: "text-accent", bgColor: "bg-accent/10", skills: [{ name: "Jupyter Notebook", level: 90 }, { name: "Git / GitHub", level: 88 }, { name: "VS Code", level: 92 }, { name: "Data Cleaning", level: 87 }] },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: "blur(5px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
  };

  return (
    <section id="skills" className="py-24 px-6 relative">
      <div className="section-divider mb-24" />
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-sm font-semibold text-primary tracking-widest uppercase mb-4">
            Expertise
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text-animated">
            Technical Skills
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A comprehensive toolkit spanning data analytics, web development, and machine learning
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {skillCategories.map((category, categoryIndex) => (
            <motion.div key={categoryIndex} variants={itemVariants}>
              <Card className="p-7 h-full glass-card group hover:border-primary/20 transition-all duration-500">
                <div className="flex items-center gap-3 mb-6">
                  <div className={`${category.bgColor} ${category.color} p-2.5 rounded-xl group-hover:scale-110 transition-transform duration-300`}>
                    {category.icon}
                  </div>
                  <h3 className="text-lg font-semibold">{category.title}</h3>
                </div>

                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex} className="space-y-1.5">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-foreground text-sm">{skill.name}</span>
                        <motion.span
                          className="text-xs font-semibold text-primary"
                          initial={{ opacity: 0 }}
                          animate={animateProgress ? { opacity: 1 } : { opacity: 0 }}
                          transition={{ delay: categoryIndex * 0.1 + skillIndex * 0.08 + 0.5 }}
                        >
                          {skill.level}%
                        </motion.span>
                      </div>

                      <div className="relative h-2 bg-secondary/50 rounded-full overflow-hidden">
                        <motion.div
                          className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-accent rounded-full"
                          initial={{ width: 0 }}
                          animate={animateProgress ? { width: `${skill.level}%` } : { width: 0 }}
                          transition={{
                            duration: 1.2,
                            delay: categoryIndex * 0.1 + skillIndex * 0.08 + 0.3,
                            ease: [0.25, 0.46, 0.45, 0.94],
                          }}
                        />
                        {/* Glow effect at bar end */}
                        <motion.div
                          className="absolute top-0 bottom-0 w-3 bg-primary/50 rounded-full blur-sm"
                          initial={{ left: "0%" }}
                          animate={animateProgress ? { left: `${skill.level - 1}%` } : { left: "0%" }}
                          transition={{
                            duration: 1.2,
                            delay: categoryIndex * 0.1 + skillIndex * 0.08 + 0.3,
                            ease: [0.25, 0.46, 0.45, 0.94],
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Core Competencies */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-16 text-center"
        >
          <Card className="p-8 glass-card max-w-4xl mx-auto">
            <h3 className="text-2xl font-semibold mb-6 text-primary">Core Competencies</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                "Exploratory Data Analysis",
                "Data Cleaning & Preprocessing",
                "Problem Solving",
                "Full-Stack Architecture",
                "API Development",
                "Analytical Thinking",
                "Team Collaboration",
                "Project Management",
              ].map((skill, index) => (
                <motion.span
                  key={index}
                  className="tag-pill px-4 py-2 bg-primary/8 text-primary rounded-full text-sm font-medium border border-primary/15"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;