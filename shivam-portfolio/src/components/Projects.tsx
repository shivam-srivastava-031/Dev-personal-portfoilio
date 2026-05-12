import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, BarChart3, AudioLines, TrendingUp } from "lucide-react";
import devAnalyticsImage from "@/assets/project-dev-analytics.png";
import devAudioImage from "@/assets/project-dev-audio.png";
import salesAnalysisImage from "@/assets/project-sales-analysis.png";

const Projects = () => {
  const ref = useRef(null);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  const projects = [
    {
      id: 1, title: "Dev Analytics", subtitle: "Data Analytics Platform",
      description: "A full-stack analytics web platform for data visualization, reporting, and performance tracking with EDA workflows and REST API integration.",
      image: devAnalyticsImage, icon: <BarChart3 className="h-6 w-6" />,
      techStack: ["React.js", "Node.js", "MongoDB", "REST APIs"],
      features: ["Full-stack analytics platform for data visualization", "EDA & structured data handling", "Responsive frontend with efficient data management", "REST APIs & scalable architecture", "Analytical dashboards for data-driven insights"],
      githubUrl: "https://github.com/shivam-srivastava-031/Dev-analytics",
      color: "from-primary to-primary/70",
    },
    {
      id: 2, title: "Dev Audio", subtitle: "AI/Audio Processing App",
      description: "Audio-based web application focused on audio processing and intelligent system integration with full-stack architecture.",
      image: devAudioImage, icon: <AudioLines className="h-6 w-6" />,
      techStack: ["JavaScript", "APIs", "Audio Processing", "Full-Stack"],
      features: ["Audio processing & intelligent system integration", "Full-stack audio workflows", "API integration & structured logic", "Git/GitHub version control", "Scalable multimedia processing"],
      githubUrl: "https://github.com/shivam-srivastava-031/Dev-audio",
      color: "from-accent to-accent/70",
    },
    {
      id: 3, title: "Sales Analysis", subtitle: "Data Analysis Project",
      description: "Comprehensive sales data analysis with Python — data cleaning, trend analysis, seasonal patterns, and actionable business insights.",
      image: salesAnalysisImage, icon: <TrendingUp className="h-6 w-6" />,
      techStack: ["Python", "Pandas", "Matplotlib", "Seaborn"],
      features: ["Data cleaning & preprocessing", "Trend & seasonal pattern analysis", "Visual reports with Matplotlib & Seaborn", "Actionable business insights", "Revenue optimization recommendations"],
      githubUrl: "https://github.com/shivam-srivastava-031",
      color: "from-primary to-accent",
    },
  ];

  const selectedProjectData = projects.find((p) => p.id === selectedProject);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
  };

  return (
    <section id="projects" className="py-24 px-6 relative">
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
            Portfolio
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text-animated">
            Featured Projects
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Building data-driven platforms and intelligent web applications
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {projects.map((project) => (
            <motion.div key={project.id} variants={itemVariants}>
              <Card className="overflow-hidden h-full group cursor-pointer glass-card border-border/20 hover:border-primary/25 transition-all duration-500 hover:shadow-hover hover:-translate-y-3">
                {/* Image */}
                <div className="relative overflow-hidden">
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-52 object-cover"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.6 }}
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-60 transition-all duration-500`} />

                  {/* Icon Badge */}
                  <div className="absolute top-4 left-4 p-2.5 bg-background/80 rounded-xl backdrop-blur-md border border-border/20">
                    <div className="text-primary">{project.icon}</div>
                  </div>

                  {/* Hover Title */}
                  <motion.div
                    className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <span className="text-white text-xs font-semibold bg-background/50 backdrop-blur-md px-3 py-1.5 rounded-full">
                      Click to explore →
                    </span>
                  </motion.div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="mb-1">
                    <h3 className="text-xl font-bold group-hover:text-primary transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-sm text-primary/70 font-medium">{project.subtitle}</p>
                  </div>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2 leading-relaxed mt-2">
                    {project.description}
                  </p>

                  {/* Tech */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.techStack.map((tech, i) => (
                      <Badge key={i} variant="secondary" className="text-xs bg-secondary/50 border-border/30 hover:bg-primary/10 hover:text-primary transition-colors">
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => setSelectedProject(project.id)}
                      className="flex-1 bg-primary hover:bg-primary/90 group/btn"
                    >
                      <span className="group-hover/btn:translate-x-0.5 transition-transform">View Details</span>
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => window.open(project.githubUrl, "_blank")}
                      className="px-3 hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition-all"
                    >
                      <Github className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Modal */}
        <Dialog open={selectedProject !== null} onOpenChange={(open) => !open && setSelectedProject(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto glass-card border-border/30">
            {selectedProjectData && (
              <>
                <DialogHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="text-primary p-2 bg-primary/10 rounded-xl">{selectedProjectData.icon}</div>
                    <div>
                      <DialogTitle className="text-2xl">{selectedProjectData.title}</DialogTitle>
                      <p className="text-sm text-primary/70 font-medium">{selectedProjectData.subtitle}</p>
                    </div>
                  </div>
                  <DialogDescription className="text-base">{selectedProjectData.description}</DialogDescription>
                </DialogHeader>

                <div className="space-y-6">
                  <div className="relative overflow-hidden rounded-xl">
                    <img src={selectedProjectData.image} alt={selectedProjectData.title} className="w-full h-64 object-cover" />
                    <div className={`absolute inset-0 bg-gradient-to-br ${selectedProjectData.color} opacity-15`} />
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Key Features</h3>
                    <ul className="grid md:grid-cols-2 gap-2">
                      {selectedProjectData.features.map((f, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0 mt-1.5" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Technology Stack</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProjectData.techStack.map((t, i) => (
                        <Badge key={i} variant="secondary">{t}</Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button onClick={() => window.open(selectedProjectData.githubUrl, "_blank")} className="flex-1">
                      <Github className="mr-2 h-4 w-4" /> View on GitHub
                    </Button>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default Projects;