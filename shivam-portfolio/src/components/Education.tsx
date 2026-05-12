import { motion } from "framer-motion";
import { useRef } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Calendar, BookOpen, Award, ShieldCheck } from "lucide-react";

const Education = () => {
  const ref = useRef(null);

  const educationData = [
    { id: 1, degree: "Bachelor of Technology", field: "Computer Science and Engineering", institution: "BBD Engineering College, Lucknow", period: "2022 - 2026 (Expected)", status: "In Progress", description: "Focused on software engineering, data analytics, algorithms, data structures, and modern development practices.", icon: <GraduationCap className="h-6 w-6" />, color: "primary", achievements: ["Strong foundation in programming, data structures & algorithms", "Hands-on experience with full-stack development & data analytics", "Active participation in technical workshops and seminars", "Multiple projects in web development and data science"] },
    { id: 2, degree: "Intermediate (Class XII)", field: "Science Stream", institution: "RPM Children's Academy", period: "2022", status: "Completed", description: "Completed intermediate education with focus on mathematics, physics, and chemistry.", icon: <BookOpen className="h-6 w-6" />, color: "accent", achievements: ["Solid foundation in mathematics and analytical thinking", "Developed problem-solving and logical reasoning skills"] },
    { id: 3, degree: "High School (Class X)", field: "General Studies", institution: "RPM Children's Academy", period: "2020", status: "Completed", description: "Completed secondary education with strong academic performance.", icon: <Award className="h-6 w-6" />, color: "primary", achievements: ["Strong academic performance across all subjects", "Built foundation for higher education in science & technology"] },
  ];

  const certifications = [
    { title: "Data Science Certification", issuer: "ShapeMySkills", icon: <ShieldCheck className="h-5 w-5" /> },
    { title: "Web Technologies", issuer: "Softpro India Ltd.", icon: <ShieldCheck className="h-5 w-5" /> },
    { title: "Java Programming", issuer: "Softpro India Ltd.", icon: <ShieldCheck className="h-5 w-5" /> },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, filter: "blur(5px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
  };

  return (
    <section id="education" className="py-24 px-6 relative">
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
            Learning
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text-animated">
            Education & Certifications
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Academic journey and professional certifications building the foundation for technical excellence
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          <motion.div
            className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-[2px] bg-gradient-to-b from-primary via-accent to-primary hidden md:block"
            initial={{ height: 0, opacity: 0 }}
            whileInView={{ height: "100%", opacity: 0.3 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />

          <motion.div
            className="space-y-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {educationData.map((education, index) => (
              <motion.div
                key={education.id}
                variants={itemVariants}
                className={`relative flex items-center ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} flex-col`}
              >
                <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 hidden md:flex items-center justify-center z-10">
                  <div className="w-4 h-4 bg-gradient-to-r from-primary to-accent rounded-full" />
                  <div className="absolute w-8 h-8 bg-primary/15 rounded-full animate-ping" style={{ animationDuration: "3s" }} />
                </div>

                <div className={`w-full md:w-5/12 ml-12 md:ml-0 ${index % 2 === 0 ? "md:pr-12" : "md:pl-12"}`}>
                  <Card className="p-6 glass-card group hover:border-primary/20 transition-all duration-500">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-xl text-primary group-hover:scale-110 transition-transform duration-300">
                          {education.icon}
                        </div>
                        <div>
                          <h3 className="text-lg font-bold">{education.degree}</h3>
                          <p className="text-sm text-muted-foreground">{education.field}</p>
                        </div>
                      </div>
                      <Badge variant={education.status === "In Progress" ? "default" : "secondary"} className={education.status === "In Progress" ? "bg-primary/10 text-primary border-primary/20" : ""}>
                        {education.status}
                      </Badge>
                    </div>

                    <div className="space-y-2 mb-4">
                      <p className="font-semibold text-foreground">{education.institution}</p>
                      <div className="flex items-center gap-2 text-muted-foreground text-sm">
                        <Calendar className="h-4 w-4" /><span>{education.period}</span>
                      </div>
                    </div>

                    <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{education.description}</p>

                    <div>
                      <h4 className="font-semibold text-sm mb-2 text-foreground">Key Highlights:</h4>
                      <ul className="space-y-1">
                        {education.achievements.map((a, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0 mt-1.5" />
                            {a}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Card>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-20"
        >
          <h3 className="text-2xl font-bold text-center mb-8 text-foreground">Professional Certifications</h3>
          <motion.div
            className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {certifications.map((cert, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="p-6 glass-card text-center h-full group hover:border-primary/20 transition-all duration-500 stat-card">
                  <div className="text-primary mb-3 flex justify-center">
                    <div className="p-3 bg-primary/10 rounded-xl group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
                      {cert.icon}
                    </div>
                  </div>
                  <h4 className="font-bold text-foreground mb-2">{cert.title}</h4>
                  <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-12 text-center"
        >
          <Card className="p-8 glass-card max-w-4xl mx-auto">
            <h3 className="text-xl font-semibold mb-6 text-primary">Academic Focus Areas</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center"><div className="text-3xl font-bold text-accent mb-2">2026</div><p className="text-sm text-muted-foreground">Expected Graduation</p></div>
              <div className="text-center"><div className="text-3xl font-bold text-primary mb-2">CSE</div><p className="text-sm text-muted-foreground">Computer Science & Engineering</p></div>
              <div className="text-center"><div className="text-3xl font-bold text-accent mb-2">3</div><p className="text-sm text-muted-foreground">Professional Certifications</p></div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default Education;