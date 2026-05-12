import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Building, Heart, Wrench, Users, Globe, Target, BarChart3 } from "lucide-react";

const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const experiences = [
    {
      id: 1,
      company: "ListenInn Foundation",
      role: "Founder & Technical Head",
      type: "NGO / Leadership",
      period: "2025 – Present",
      location: "India",
      icon: <Heart className="h-6 w-6" />,
      responsibilities: [
        {
          icon: <Globe className="h-5 w-5" />,
          title: "Organizational Leadership",
          description: "Founded and managed a technology-driven NGO focused on community development and social impact initiatives",
          color: "text-primary"
        },
        {
          icon: <Users className="h-5 w-5" />,
          title: "Volunteer Coordination",
          description: "Led volunteer coordination, strategic planning, and execution of awareness campaigns and outreach programs",
          color: "text-accent"
        },
        {
          icon: <BarChart3 className="h-5 w-5" />,
          title: "Data-Driven Operations",
          description: "Managed organizational data, reports, and operational workflows to improve decision-making efficiency",
          color: "text-primary"
        },
        {
          icon: <Target className="h-5 w-5" />,
          title: "Digital Strategy & Analytics",
          description: "Utilized digital tools and analytical approaches to optimize communication, engagement, and campaign performance",
          color: "text-accent"
        }
      ],
      impactStatement: "Coordinated cross-functional teams and collaborated with stakeholders to drive project execution and organizational growth."
    },
    {
      id: 2,
      company: "Arka Build Constructions",
      role: "Technical Head",
      type: "Full-Time · 6 Months",
      period: "6 Months",
      location: "India",
      icon: <Building className="h-6 w-6" />,
      responsibilities: [
        {
          icon: <Wrench className="h-5 w-5" />,
          title: "Technical Operations",
          description: "Led technical operations and managed digital workflows for organizational projects and internal systems",
          color: "text-primary"
        },
        {
          icon: <Users className="h-5 w-5" />,
          title: "Team Coordination",
          description: "Coordinated with teams to streamline project execution, reporting, and technical communication processes",
          color: "text-accent"
        },
        {
          icon: <Globe className="h-5 w-5" />,
          title: "System Management",
          description: "Managed web-based tools, data handling processes, and technical documentation for operational efficiency",
          color: "text-primary"
        },
        {
          icon: <Target className="h-5 w-5" />,
          title: "Technology Integration",
          description: "Assisted in technology integration, system optimization, and digital process management across projects",
          color: "text-accent"
        }
      ],
      impactStatement: "Applied problem-solving, analytical thinking, and technical management skills in a professional work environment."
    }
  ];

  return (
    <section id="experience" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Professional Experience
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Leadership roles combining technical expertise with strategic execution
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary to-accent opacity-30 hidden lg:block" />

          <div className="space-y-16">
            {experiences.map((exp, expIndex) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.8, delay: expIndex * 0.3 }}
                className="relative"
              >
                {/* Timeline Dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-primary rounded-full border-4 border-background z-10 hidden lg:block" />
                
                <div className={`lg:w-1/2 ${expIndex % 2 === 0 ? 'lg:pr-12' : 'lg:pl-12 lg:ml-auto'}`}>
                  <Card className="p-8 bg-gradient-card border-border/50 hover:shadow-hover transition-all duration-500 interactive-hover">
                    {/* Company Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className="p-3 bg-primary/10 rounded-lg">
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

                    {/* Duration and Location */}
                    <div className="flex flex-wrap gap-4 mb-6 text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{exp.period}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{exp.location}</span>
                      </div>
                    </div>

                    {/* Key Responsibilities */}
                    <div className="space-y-4 mb-6">
                      <h4 className="text-lg font-semibold text-foreground">Key Responsibilities</h4>
                      <div className="grid gap-4">
                        {exp.responsibilities.map((responsibility, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                            transition={{ duration: 0.6, delay: 0.4 + expIndex * 0.3 + index * 0.1 }}
                            className="flex gap-4 p-4 rounded-lg bg-card/50 border border-border/30"
                          >
                            <div className={`${responsibility.color} flex-shrink-0 mt-1`}>
                              {responsibility.icon}
                            </div>
                            <div>
                              <h5 className="font-semibold text-foreground mb-1">{responsibility.title}</h5>
                              <p className="text-muted-foreground text-sm">{responsibility.description}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Impact Statement */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ duration: 0.8, delay: 0.8 + expIndex * 0.3 }}
                      className="bg-primary/5 border border-primary/20 rounded-lg p-4"
                    >
                      <p className="text-sm text-muted-foreground italic">
                        "{exp.impactStatement}"
                      </p>
                    </motion.div>
                  </Card>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Skills Gained */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-12 text-center"
        >
          <h3 className="text-xl font-semibold mb-6 text-foreground">Skills Applied & Enhanced</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "Technical Leadership",
              "Strategic Planning",
              "Data-Driven Decisions",
              "Digital Operations",
              "Team Collaboration",
              "Project Management",
              "Stakeholder Engagement",
              "System Optimization"
            ].map((skill, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4, delay: 1.2 + index * 0.1 }}
                className="px-3 py-2 bg-secondary/50 text-secondary-foreground rounded-full text-sm font-medium border border-border/50 hover:bg-secondary/70 transition-colors"
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