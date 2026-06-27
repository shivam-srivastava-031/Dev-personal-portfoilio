import { motion } from "framer-motion";
import { useRef } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Building, Code2, Globe, Target, BarChart3, Server, GitBranch, Brain, Layers } from "lucide-react";

const Experience = () => {
  const ref = useRef(null);

  const experiences = [
    {
      id: 1,
      company: "Gravityer",
      role: "Software Developer Intern",
      type: "Internship · Present",
      period: "2026 – Present",
      location: "India",
      icon: <Server className="h-6 w-6" />,
      responsibilities: [
        { icon: <Code2 className="h-5 w-5" />,    title: "Backend Development",          description: "Building API-driven backend solutions using Python, Django, REST APIs, and database technologies with focus on clean architecture.", color: "text-primary" },
        { icon: <Globe className="h-5 w-5" />,     title: "Google Ads API Integration",   description: "Implementing OAuth 2.0 authentication, campaign workflows, lead synchronization, and analytics tracking via Google Ads API.", color: "text-accent" },
        { icon: <Target className="h-5 w-5" />,    title: "Automation & Integrations",    description: "Developing third-party integrations and automation workflows to streamline business processes and reduce manual effort.", color: "text-primary" },
        { icon: <GitBranch className="h-5 w-5" />, title: "Production Engineering",       description: "Collaborating via Git workflows, debugging production issues, and delivering maintainable, scalable backend modules.", color: "text-accent" },
      ],
      impactStatement: "Delivering production-level features for real-world business workflows, with hands-on experience in API ecosystems and OAuth-based authentication.",
    },
    {
      id: 2,
      company: "Arka Build Constructions",
      role: "Web Developer Intern",
      type: "Internship",
      period: "Internship Experience",
      location: "India",
      icon: <Building className="h-6 w-6" />,
      responsibilities: [
        { icon: <Globe className="h-5 w-5" />,     title: "Responsive Web Development",  description: "Developed and maintained company web solutions to improve online presence and user engagement across devices.", color: "text-primary" },
        { icon: <Layers className="h-5 w-5" />,    title: "Frontend UI & Optimization",   description: "Built responsive interfaces with focus on usability and performance, including UI improvements and website optimization.", color: "text-accent" },
        { icon: <Server className="h-5 w-5" />,    title: "Backend Integration",          description: "Integrated backend services and managed website-related technical updates to keep systems functional and up-to-date.", color: "text-primary" },
        { icon: <Target className="h-5 w-5" />,    title: "Digital Workflows",            description: "Collaborated with the team to implement design requirements and improve digital workflows across the web platform.", color: "text-accent" },
      ],
      impactStatement: "Improved the company's digital presence through responsive design and backend integrations, contributing to better user engagement.",
    },
    {
      id: 3,
      company: "Listenin Foundation",
      role: "Founder & Senior Developer",
      type: "Founder · Tech Leadership",
      period: "Founder Experience",
      location: "India",
      icon: <Layers className="h-6 w-6" />,
      responsibilities: [
        { icon: <Target className="h-5 w-5" />,    title: "Product Leadership",           description: "Founded and led end-to-end product development including planning, architecture design, development, and deployment.", color: "text-primary" },
        { icon: <Code2 className="h-5 w-5" />,     title: "Full Stack Development",       description: "Built and maintained web applications with focus on scalability, performance, and user experience across frontend and backend.", color: "text-accent" },
        { icon: <Server className="h-5 w-5" />,    title: "Database & API Integration",   description: "Handled database management, API integrations, and technical decision-making for platform functionality.", color: "text-primary" },
        { icon: <GitBranch className="h-5 w-5" />, title: "Team & Stakeholder Sync",      description: "Collaborated with teams and stakeholders to convert ideas into functional software solutions and manage feature delivery.", color: "text-accent" },
      ],
      impactStatement: "Built an impactful technology-driven platform from the ground up — managing both technical execution and organizational leadership.",
    },
    {
      id: 4,
      company: "Full Stack & AI Projects",
      role: "Independent Developer",
      type: "Projects · Self-Driven",
      period: "Ongoing",
      location: "Remote",
      icon: <Brain className="h-6 w-6" />,
      responsibilities: [
        { icon: <Code2 className="h-5 w-5" />,    title: "Full Stack Applications",      description: "Built web apps with authentication systems, database management, REST APIs, and AI-based features using Django and Supabase.", color: "text-primary" },
        { icon: <Globe className="h-5 w-5" />,     title: "OAuth & Auth Systems",         description: "Implemented OAuth 2.0 and Google Sign-In authentication flows in production-grade web applications.", color: "text-accent" },
        { icon: <Brain className="h-5 w-5" />,     title: "AI Chatbot Development",       description: "Built AI chatbot solutions for automated responses and catalog-based information retrieval in real-world scenarios.", color: "text-primary" },
        { icon: <BarChart3 className="h-5 w-5" />, title: "Data Science & AI Research",   description: "Explored Artificial Intelligence and Data Science applications through research and practical implementations.", color: "text-accent" },
      ],
      impactStatement: "Applied full-stack and AI skills to solve real problems — bridging backend engineering, data, and intelligent automation.",
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
            Backend engineering, full-stack development, and AI — building real products in real environments
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
          <h3 className="text-xl font-semibold mb-6 text-foreground">Technologies & Skills Used</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {["Python", "Django", "REST APIs", "Google Ads API", "OAuth 2.0", "Supabase", "SQL", "JavaScript", "React.js", "Git & GitHub", "Postman", "AI & Data Science", "Full Stack Dev", "Backend Architecture"].map((skill, index) => (
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