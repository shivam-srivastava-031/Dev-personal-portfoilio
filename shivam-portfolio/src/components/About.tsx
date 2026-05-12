import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Card } from "@/components/ui/card";
import { Code, BarChart3, Database, Brain } from "lucide-react";
import aboutImage from "@/assets/about-image.jpg";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const highlights = [
    {
      icon: <Code className="h-6 w-6" />,
      title: "Full Stack Development",
      description: "Building scalable web apps with React.js, Node.js, and modern frameworks"
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Data Analytics",
      description: "Transforming raw data into actionable insights with Python, SQL & Power BI"
    },
    {
      icon: <Database className="h-6 w-6" />,
      title: "Database Management",
      description: "Designing efficient database architectures with SQL Server & MongoDB"
    },
    {
      icon: <Brain className="h-6 w-6" />,
      title: "Machine Learning",
      description: "Applying regression, classification, and model evaluation techniques"
    }
  ];

  return (
    <section id="about" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            About Me
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Where code meets data — building technology that drives decisions
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="prose prose-lg text-foreground max-w-none">
              <p className="text-lg leading-relaxed text-muted-foreground">
                I'm a final-year <span className="text-primary font-semibold">B.Tech Computer Science</span> student 
                at BBD Engineering College, Lucknow, with a passion for building technology that solves real-world problems.
              </p>
              
              <p className="text-lg leading-relaxed text-muted-foreground">
                My expertise spans <span className="text-primary font-semibold">full-stack web development</span>, 
                <span className="text-accent font-semibold"> data analytics & visualization</span>, and 
                <span className="text-primary font-semibold"> machine learning</span>. I build analytics platforms, 
                scalable web applications, and work with Python, SQL, JavaScript, and modern development tools.
              </p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="bg-card border border-border rounded-lg p-6 mt-8"
              >
                <h3 className="text-xl font-semibold text-primary mb-3">Career Objective</h3>
                <p className="text-muted-foreground italic">
                  "Seeking opportunities in Data Analytics, Software Development, or Technology-driven roles 
                  where I can leverage my technical skills in Python, SQL, JavaScript, and data visualization 
                  to deliver impactful solutions."
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-2xl">
              <img 
                src={aboutImage} 
                alt="Professional workspace" 
                className="w-full h-auto rounded-2xl shadow-card"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20 rounded-2xl" />
            </div>
          </motion.div>
        </div>

        {/* Highlights Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16"
        >
          {highlights.map((highlight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
            >
              <Card className="p-6 h-full bg-gradient-card border-border/50 interactive-hover">
                <div className="text-primary mb-4">{highlight.icon}</div>
                <h3 className="font-semibold text-lg mb-2">{highlight.title}</h3>
                <p className="text-muted-foreground text-sm">{highlight.description}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;