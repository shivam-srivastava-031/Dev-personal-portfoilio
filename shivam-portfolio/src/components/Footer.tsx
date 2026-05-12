import { motion } from "framer-motion";
import { Heart, Github, Mail, Phone, Linkedin, ArrowUp } from "lucide-react";
import { useState, useEffect } from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 500);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const socialLinks = [
    { icon: <Github className="h-5 w-5" />, href: "https://github.com/shivam-srivastava-031", label: "GitHub" },
    { icon: <Linkedin className="h-5 w-5" />, href: "https://linkedin.com/in/shivam-kumar-srivastava-675893211", label: "LinkedIn" },
    { icon: <Mail className="h-5 w-5" />, href: "mailto:shivamsrivastava@1307", label: "Email" },
    { icon: <Phone className="h-5 w-5" />, href: "tel:+919450433061", label: "Phone" },
  ];

  return (
    <>
      <footer className="py-16 px-6 border-t border-border/20 bg-card/10 relative">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-10 mb-10">
            {/* Brand */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-xl font-bold gradient-text-animated">
                Shivam Kumar Srivastava
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Full Stack Developer & Data Analyst crafting scalable web applications
                and transforming data into actionable insights.
              </p>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h4 className="font-semibold text-foreground">Quick Links</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                {["About", "Skills", "Experience", "Projects", "Education", "Contact"].map((link) => (
                  <button
                    key={link}
                    onClick={() => document.getElementById(link.toLowerCase())?.scrollIntoView({ behavior: "smooth" })}
                    className="text-muted-foreground hover:text-primary transition-colors text-left animated-underline w-fit"
                  >
                    {link}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Contact */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h4 className="font-semibold text-foreground">Connect</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p><strong className="text-foreground">Location:</strong> Lucknow, India</p>
                <p><strong className="text-foreground">Email:</strong> shivamsrivastava@1307</p>
                <p><strong className="text-foreground">Phone:</strong> +91-945-043-3061</p>
              </div>
            </motion.div>
          </div>

          <div className="section-divider" />

          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8">
            {/* Social */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : "_self"}
                  rel={social.href.startsWith("http") ? "noopener noreferrer" : ""}
                  aria-label={social.label}
                  className="p-2.5 rounded-xl glass-card icon-glow text-muted-foreground hover:text-primary transition-all duration-300"
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>

            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <span>&copy; {currentYear} Shivam Kumar Srivastava. Made with</span>
              <Heart className="h-4 w-4 text-red-500 animate-pulse" />
              <span>and lots of coffee.</span>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mt-8 pt-4"
          >
            <p className="text-xs text-muted-foreground/60">
              Open to opportunities in Data Analytics, Software Development & Technology-driven roles.
            </p>
          </motion.div>
        </div>
      </footer>

      {/* Scroll to Top */}
      <motion.button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-6 right-6 z-50 p-3 rounded-xl bg-primary text-primary-foreground shadow-lg icon-glow"
        initial={{ opacity: 0, scale: 0 }}
        animate={showScrollTop ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.9 }}
        transition={{ duration: 0.3 }}
      >
        <ArrowUp className="h-5 w-5" />
      </motion.button>
    </>
  );
};

export default Footer;