import Navigation from "@/components/Navigation";
import ScrollProgress from "@/components/ScrollProgress";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import FluidSimulation from "@/components/FluidSimulation";
import CursorGlow from "@/components/CursorGlow";
import CustomCursor from "@/components/CustomCursor";
import ClickBurst from "@/components/ClickBurst";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <CustomCursor />
      <ClickBurst />
      <FluidSimulation />
      <CursorGlow />
      <ScrollProgress />
      <Navigation />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Education />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
