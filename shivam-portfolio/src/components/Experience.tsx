import { motion } from "framer-motion";
import { useRef } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Building, Heart, Wrench, Users, Globe, Target, BarChart3 } from "lucide-react";

const Experience = () => {
  const ref = useRef(null);

  const experiences = [
    {
      id: 1, company: "ListenInn Foundation", role: "Founder & Technical Head", type: "NGO / Leadership",
      period: "2025 – Present", location: "India", icon: <Heart className="h-6 w-6" />,
      responsibilities: [
        { icon: <Globe className="h-5 w-5" />, title: "Organizational Leadership", description: "Founded and managed a technology-driven NGO focused on community development and social impact initiatives", color: "text-primary" },
        { icon: <Users className="h-5 w-5" />, title: "Volunteer Coordination", description: "Led volunteer coordination, strategic planning, and execution of awareness campaigns and outreach programs", color: "text-accent" },
        { icon: <BarChart3 className="h-5 w-5" />, title: "Data-Driven Operations", description: "Managed organizational data, reports, and operational workflows to improve decision-making efficiency", color: "text-primary" },
        { icon: <Target className="h-5 w-5" />, title: "Digital Strategy & Analytics", description: "Utilized digital tools and analytical approaches to optimize communication, engagement, and campaign performance", color: "text-accent" },
      ],
      impactStatement: "Coordinated cross-functional teams and collaborated with stakeholders to drive project execution and organizational growth.",
    },
    {
      id: 2, company: "Arka Build Constructions", role: "Technical Head", type: "Full-Time · 6 Months",
      period: "6 Months", location: "India", icon: <Building className="h-6 w-6" />,
      responsibilities: [
        { icon: <Wrench className="h-5 w-5" />, title: "Technical Operations", description: "Led technical operations and managed digital workflows for organizational projects and internal systems", color: "text-primary" },
        { icon: <Users className="h-5 w-5" />, title: "Team Coordination", description: "Coordinated with teams to streamline project execution, reporting, and technical communication processes", color: "text-accent" },
        { icon: <Globe className="h-5 w-5" />, title: "System Management", description: "Managed web-based tools, data handling processes, and technical documentation for operational efficiency", color: "text-primary" },
        { icon: <Target className="h-5 w-5" />, title: "Technology Integration", description: "Assisted in technology integration, system optimization, and digital process management across projects", color: "text-accent" },
      ],
      impactStatement: "Applied problem-solving, analytical thinking, and technical management skills in a professional work environment.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: "blur(5px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
  };

  return (
    <section id="experience" className="py-24 px-6 relative">
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
            Career
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text-animated">
            Professional Experience
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Leadership roles combining technical expertise with strategic execution
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Animated Timeline Line */}
          <motion.div
            className="absolute left-1/2 transform -translate-x-1/2 w-[2px] bg-gradient-to-b from-primary via-accent to-primary hidden lg:block"
            initial={{ height: 0, opacity: 0 }}
            whileInView={{ height: "100%", opacity: 0.3 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />

          <motion.div
            className="space-y-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {experiences.map((exp, expIndex) => (
              <motion.div key={exp.id} variants={itemVariants} className="relative">
                {/* Timeline Dot with Pulse */}
                <div className="absolute left-1/2 transform -translate-x-1/2 hidden lg:flex items-center justify-center z-10">
                  <div className="w-4 h-4 bg-primary rounded-full animate-pulse-glow" />
                  <div className="absolute w-8 h-8 bg-primary/20 rounded-full animate-ping" style={{ animationDuration: "2s" }} />
                </div>

                <div className={`lg:w-[45%] ${expIndex % 2 === 0 ? "lg:pr-12" : "lg:pl-12 lg:ml-auto"}`}>
                  <Card className="p-8 glass-card group hover:border-primary/20 transition-all duration-500">
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className="p-3 bg-primary/10 rounded-xl icon-glow text-primary group-hover:scale-110 transition-transform duration-300">
                          {exp.icon}
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-foreground">{exp.company}</h3>
                          <p className="text-lg font-semibold text-primary">{exp.role}</p>
                        </div>
                      </div>
                      <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20 whitespace-nowrap">
                        {exp.type}
                      </Badge>
                    </div>

                    <div className="flex flex-wrap gap-4 mb-6 text-muted-foreground text-sm">
                      <div className="flex items-center gap-2"><Calendar className="h-4 w-4" /><span>{exp.period}</span></div>
                      <div className="flex items-center gap-2"><MapPin className="h-4 w-4" /><span>{exp.location}</span></div>
                    </div>

                    <div className="space-y-3 mb-6">
                      <h4 className="text-base font-semibold text-foreground">Key Responsibilities</h4>
                      {exp.responsibilities.map((r, i) => (
                        <motion.div
                          key={i}
                          className="flex gap-3 p-3 rounded-lg bg-card/30 border border-border/20 hover:border-primary/15 transition-all duration-300"
                          initial={{ opacity: 0, x: expIndex % 2 === 0 ? -20 : 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: i * 0.1 }}
                        >
                          <div className={`${r.color} flex-shrink-0 mt-0.5`}>{r.icon}</div>
                          <div>
                            <h5 className="font-semibold text-foreground text-sm mb-0.5">{r.title}</h5>
                            <p className="text-muted-foreground text-xs leading-relaxed">{r.description}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    <div className="bg-primary/5 border border-primary/10 rounded-xl p-4">
                      <p className="text-sm text-muted-foreground italic">"{exp.impactStatement}"</p>
                    </div>
                  </Card>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Skills Tags */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-16 text-center"
        >
          <h3 className="text-xl font-semibold mb-6 text-foreground">Skills Applied & Enhanced</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {["Technical Leadership", "Strategic Planning", "Data-Driven Decisions", "Digital Operations", "Team Collaboration", "Project Management", "Stakeholder Engagement", "System Optimization"].map((skill, index) => (
              <motion.span
                key={index}
                className="tag-pill px-4 py-2 bg-secondary/30 text-secondary-foreground rounded-full text-sm font-medium border border-border/30"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;