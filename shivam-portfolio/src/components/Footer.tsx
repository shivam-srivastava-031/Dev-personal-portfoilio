import { motion } from "framer-motion";
import { Heart, Github, Mail, Phone, Linkedin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: <Github className="h-5 w-5" />,
      href: "https://github.com/shivam-srivastava-031",
      label: "GitHub"
    },
    {
      icon: <Linkedin className="h-5 w-5" />,
      href: "https://linkedin.com/in/shivam-kumar-srivastava-675893211",
      label: "LinkedIn"
    },
    {
      icon: <Mail className="h-5 w-5" />,
      href: "mailto:shivamsrivastava1307@gmail.com",
      label: "Email"
    },
    {
      icon: <Phone className="h-5 w-5" />,
      href: "tel:+919450433061",
      label: "Phone"
    }
  ];

  return (
    <footer className="py-12 px-6 border-t border-border/50 bg-card/20">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Shivam Kumar Srivastava
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Full Stack Developer & Data Analyst passionate about building 
              scalable web applications and transforming data into actionable insights.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Quick Links</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {["About", "Skills", "Experience", "Projects", "Education", "Contact"].map((link) => (
                <button
                  key={link}
                  onClick={() => {
                    const element = document.getElementById(link.toLowerCase());
                    element?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-muted-foreground hover:text-primary transition-colors text-left"
                >
                  {link}
                </button>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Connect</h4>
            <div className="space-y-2">
              <p className="text-muted-foreground text-sm">
                <strong>Location:</strong> Lucknow, India
              </p>
              <p className="text-muted-foreground text-sm">
                <strong>Email:</strong> shivamsrivastava1307@gmail.com
              </p>
              <p className="text-muted-foreground text-sm">
                <strong>Phone:</strong> +91-945-043-3061
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border/30 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target={social.href.startsWith('http') ? '_blank' : '_self'}
                  rel={social.href.startsWith('http') ? 'noopener noreferrer' : ''}
                  aria-label={social.label}
                  className="p-2 bg-card hover:bg-primary/10 rounded-lg border border-border/50 hover:border-primary/30 transition-all duration-300 group"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="text-muted-foreground group-hover:text-primary transition-colors">
                    {social.icon}
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Copyright */}
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <span>&copy; {currentYear} Shivam Kumar Srivastava. Made with</span>
              <Heart className="h-4 w-4 text-red-500 animate-pulse" />
              <span>and lots of coffee.</span>
            </div>
          </div>
        </div>

        {/* Additional Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mt-8 pt-4 border-t border-border/20"
        >
          <p className="text-xs text-muted-foreground">
            Open to opportunities in Data Analytics, Software Development & Technology-driven roles. Let's build something amazing together!
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;