import { motion } from "framer-motion";
import { useInView } from "framer-motion";
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
  const isInView = useInView(ref, { once: true });
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  const projects = [
    {
      id: 1,
      title: "Dev Analytics — Data Analytics Platform",
      description: "A full-stack analytics web platform for data visualization, reporting, and performance tracking. Includes EDA workflows, analytical dashboards, and REST API integration.",
      image: devAnalyticsImage,
      icon: <BarChart3 className="h-6 w-6" />,
      techStack: ["React.js", "Node.js", "MongoDB", "REST APIs"],
      features: [
        "Full-stack analytics web platform for data visualization & reporting",
        "Data processing, exploratory data analysis (EDA), and structured data handling",
        "Responsive frontend components with efficient data management",
        "REST APIs, database integration, and scalable application architecture",
        "Analytical dashboards and visual reports for data-driven insights"
      ],
      githubUrl: "https://github.com/shivam-srivastava-031/Dev-analytics",
      demoUrl: "#",
      color: "from-primary to-primary/70"
    },
    {
      id: 2,
      title: "Dev Audio — AI/Audio Processing App",
      description: "An audio-based web application focused on audio processing and intelligent system integration, with frontend and backend development for audio workflows.",
      image: devAudioImage,
      icon: <AudioLines className="h-6 w-6" />,
      techStack: ["JavaScript", "APIs", "Audio Processing", "Full-Stack"],
      features: [
        "Audio processing and intelligent system integration",
        "Frontend and backend development for audio workflows",
        "Structured application logic and API integration",
        "Modern web technologies with Git & GitHub for version control",
        "Scalable application architecture and multimedia processing"
      ],
      githubUrl: "https://github.com/shivam-srivastava-031/Dev-audio",
      demoUrl: "#",
      color: "from-accent to-accent/70"
    },
    {
      id: 3,
      title: "Sales Data Analysis Project",
      description: "Comprehensive sales data analysis using Python with data cleaning, preprocessing, trend analysis, seasonal pattern identification, and actionable business insights.",
      image: salesAnalysisImage,
      icon: <TrendingUp className="h-6 w-6" />,
      techStack: ["Python", "Pandas", "Matplotlib", "Seaborn"],
      features: [
        "Data cleaning and preprocessing on sales datasets",
        "Trend analysis and seasonal pattern identification using EDA",
        "Dashboards and visual reports using Matplotlib & Seaborn",
        "Actionable insights for business decision-making",
        "Revenue optimization recommendations"
      ],
      githubUrl: "https://github.com/shivam-srivastava-031",
      demoUrl: "#",
      color: "from-primary to-accent"
    }
  ];

  const openProject = (id: number) => {
    setSelectedProject(id);
  };

  const closeProject = () => {
    setSelectedProject(null);
  };

  const selectedProjectData = projects.find(p => p.id === selectedProject);

  return (
    <section id="projects" className="py-20 px-6 bg-card/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Building data-driven platforms and intelligent web applications
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Card className="project-card overflow-hidden cursor-pointer h-full group">
                {/* Project Image */}
                <div className="relative overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-70 transition-opacity duration-300`} />
                  <div className="absolute top-4 left-4 p-2 bg-background/90 rounded-lg backdrop-blur-sm">
                    <div className="text-primary">{project.icon}</div>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.techStack.slice(0, 3).map((tech, techIndex) => (
                      <Badge key={techIndex} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                    {project.techStack.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{project.techStack.length - 3}
                      </Badge>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="default"
                      onClick={() => openProject(project.id)}
                      className="flex-1 bg-primary hover:bg-primary/90"
                    >
                      View Details
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => window.open(project.githubUrl, '_blank')}
                      className="px-3"
                    >
                      <Github className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Project Modal */}
        <Dialog open={selectedProject !== null} onOpenChange={(open) => !open && closeProject()}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            {selectedProjectData && (
              <>
                <DialogHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="text-primary">{selectedProjectData.icon}</div>
                    <DialogTitle className="text-2xl">{selectedProjectData.title}</DialogTitle>
                  </div>
                  <DialogDescription className="text-base">
                    {selectedProjectData.description}
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-6">
                  {/* Project Image */}
                  <div className="relative overflow-hidden rounded-lg">
                    <img 
                      src={selectedProjectData.image} 
                      alt={selectedProjectData.title}
                      className="w-full h-64 object-cover"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-br ${selectedProjectData.color} opacity-20`} />
                  </div>

                  {/* Features */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Key Features</h3>
                    <ul className="grid md:grid-cols-2 gap-2">
                      {selectedProjectData.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech Stack */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Technology Stack</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProjectData.techStack.map((tech, index) => (
                        <Badge key={index} variant="secondary">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4">
                    <Button 
                      onClick={() => window.open(selectedProjectData.githubUrl, '_blank')}
                      className="flex-1"
                    >
                      <Github className="mr-2 h-4 w-4" />
                      View on GitHub
                    </Button>
                    {selectedProjectData.demoUrl !== "#" && (
                      <Button 
                        variant="outline"
                        onClick={() => window.open(selectedProjectData.demoUrl, '_blank')}
                        className="flex-1"
                      >
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Live Demo
                      </Button>
                    )}
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