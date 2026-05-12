import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Code, Globe, Cloud, BarChart3, Brain, Wrench } from "lucide-react";

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [animateProgress, setAnimateProgress] = useState(false);

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setAnimateProgress(true), 500);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  const skillCategories = [
    {
      icon: <Code className="h-6 w-6" />,
      title: "Programming Languages",
      color: "text-primary",
      skills: [
        { name: "Python", level: 90 },
        { name: "SQL", level: 85 },
        { name: "JavaScript", level: 88 },
        { name: "Java", level: 75 }
      ]
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Data Analysis & Visualization",
      color: "text-accent",
      skills: [
        { name: "Pandas / NumPy", level: 88 },
        { name: "Matplotlib / Seaborn", level: 85 },
        { name: "Power BI", level: 80 },
        { name: "Excel / EDA", level: 90 }
      ]
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Web Development",
      color: "text-primary",
      skills: [
        { name: "React.js", level: 88 },
        { name: "Node.js", level: 85 },
        { name: "HTML / CSS", level: 95 },
        { name: "REST APIs", level: 85 }
      ]
    },
    {
      icon: <Brain className="h-6 w-6" />,
      title: "Machine Learning",
      color: "text-accent",
      skills: [
        { name: "Regression", level: 78 },
        { name: "Classification", level: 78 },
        { name: "Model Evaluation", level: 75 },
        { name: "Data Preprocessing", level: 85 }
      ]
    },
    {
      icon: <Cloud className="h-6 w-6" />,
      title: "Databases",
      color: "text-primary",
      skills: [
        { name: "SQL Server", level: 85 },
        { name: "MongoDB", level: 80 },
        { name: "Data Modeling", level: 78 },
        { name: "Query Optimization", level: 75 }
      ]
    },
    {
      icon: <Wrench className="h-6 w-6" />,
      title: "Tools & Platforms",
      color: "text-accent",
      skills: [
        { name: "Jupyter Notebook", level: 90 },
        { name: "Git / GitHub", level: 88 },
        { name: "VS Code", level: 92 },
        { name: "Data Cleaning", level: 87 }
      ]
    }
  ];

  return (
    <section id="skills" className="py-20 px-6 bg-card/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Technical Skills
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A comprehensive toolkit spanning data analytics, web development, and machine learning
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.15 }}
            >
              <Card className="p-8 h-full bg-gradient-card border-border/50 hover:shadow-hover transition-all duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className={category.color}>{category.icon}</div>
                  <h3 className="text-lg font-semibold">{category.title}</h3>
                </div>
                
                <div className="space-y-5">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skillIndex}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ 
                        duration: 0.5, 
                        delay: categoryIndex * 0.15 + skillIndex * 0.1 + 0.3 
                      }}
                      className="space-y-2"
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-foreground text-sm">{skill.name}</span>
                        <span className="text-xs text-muted-foreground">{skill.level}%</span>
                      </div>
                      
                      <div className="relative">
                        <Progress 
                          value={animateProgress ? skill.level : 0} 
                          className="h-2"
                        />
                        <motion.div
                          initial={{ width: 0 }}
                          animate={animateProgress ? { width: `${skill.level}%` } : { width: 0 }}
                          transition={{ 
                            duration: 1.5, 
                            delay: categoryIndex * 0.15 + skillIndex * 0.1 + 0.5,
                            ease: "easeOut"
                          }}
                          className="absolute top-0 left-0 h-2 bg-gradient-to-r from-primary to-accent rounded-full"
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Additional Strengths */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-12 text-center"
        >
          <Card className="p-8 bg-gradient-card border-border/50 max-w-4xl mx-auto">
            <h3 className="text-2xl font-semibold mb-4 text-primary">Core Competencies</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                "Exploratory Data Analysis", 
                "Data Cleaning & Preprocessing", 
                "Problem Solving", 
                "Full-Stack Architecture", 
                "API Development",
                "Analytical Thinking",
                "Team Collaboration",
                "Project Management"
              ].map((skill, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.4, delay: 1.2 + index * 0.1 }}
                  className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium border border-primary/20"
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