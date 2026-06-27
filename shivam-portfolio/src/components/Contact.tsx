import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, Github, MapPin, Send, User, MessageSquare, Linkedin } from "lucide-react";
import emailjs from '@emailjs/browser';

const Contact = () => {
  const ref = useRef(null);
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const contactInfo = [
    { icon: <Mail className="h-5 w-5" />, label: "Email", value: "shivamsrivastava@1307", href: "mailto:shivamsrivastava@1307", color: "text-primary" },
    { icon: <Phone className="h-5 w-5" />, label: "Phone", value: "+91-945-043-3061", href: "tel:+919450433061", color: "text-accent" },
    { icon: <Github className="h-5 w-5" />, label: "GitHub", value: "github.com/shivam-srivastava-031", href: "https://github.com/shivam-srivastava-031", color: "text-primary" },
    { icon: <Linkedin className="h-5 w-5" />, label: "LinkedIn", value: "Shivam Kumar Srivastava", href: "https://linkedin.com/in/shivam-kumar-srivastava-675893211", color: "text-accent" },
    { icon: <MapPin className="h-5 w-5" />, label: "Location", value: "Lucknow, India", href: "#", color: "text-primary" },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // NOTE: Replace these with your actual EmailJS credentials
      // You can get them by creating an account at emailjs.com
      const serviceId = "service_u1hinzb";
      const templateId = "template_1jo1r2f";
      const publicKey = "BWJ6IWb6zEqhPxK2r";

      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        to_email: "shivamsrivastava@1307",
        message: formData.message,
      };

      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      
      toast({ title: "Message sent successfully!", description: "Thank you for reaching out. I'll get back to you soon." });
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("EmailJS Error:", error);
      // Fallback for demo purposes if EmailJS isn't configured yet
      toast({ title: "Note:", description: "Form submitted. (Configure EmailJS to receive actual emails).", variant: "default" });
      setFormData({ name: "", email: "", message: "" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, filter: "blur(5px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
  };

  return (
    <section id="contact" className="py-24 px-6 relative">
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
            Get in Touch
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text-animated">
            Let's Connect
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ready to collaborate on your next project or discuss opportunities?
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold mb-4 text-foreground">Reach Out</h3>
              <p className="text-muted-foreground leading-relaxed">
                I'm always interested in discussing new opportunities in data analytics, software development, or technology-driven roles. Let's chat!
              </p>
            </div>

            <motion.div className="space-y-3" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              {contactInfo.map((info, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <a
                    href={info.href}
                    target={info.href.startsWith("http") ? "_blank" : "_self"}
                    rel={info.href.startsWith("http") ? "noopener noreferrer" : ""}
                    className="block"
                  >
                    <Card className="p-4 glass-card group hover:border-primary/20 transition-all duration-300">
                      <div className="flex items-center gap-4">
                        <div className={`${info.color} p-3 bg-card rounded-xl icon-glow group-hover:scale-110 transition-all duration-300`}>
                          {info.icon}
                        </div>
                        <div>
                          <p className="font-semibold text-foreground group-hover:text-primary transition-colors">{info.label}</p>
                          <p className="text-muted-foreground text-sm">{info.value}</p>
                        </div>
                      </div>
                    </Card>
                  </a>
                </motion.div>
              ))}
            </motion.div>

            {/* Status */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="glass-card rounded-xl p-5 border-primary/15"
            >
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-primary rounded-full animate-pulse-glow" />
                <p className="text-primary font-semibold">Available for new opportunities</p>
              </div>
              <p className="text-muted-foreground text-sm mt-2">
                Currently open to roles in Data Analytics, Software Development, and Technology-driven positions.
              </p>
            </motion.div>

            {/* Resume */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Button className="w-full bg-accent hover:bg-accent/90 text-background font-semibold py-6 group" asChild>
                <a href="/shivam-resume.docx" download>
                  📄 Download My Resume
                  <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </a>
              </Button>
            </motion.div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Card className="p-8 glass-card">
              <h3 className="text-2xl font-bold mb-6 text-foreground">Send a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="name" className="flex items-center gap-2 text-sm"><User className="h-4 w-4" />Your Name</Label>
                  <Input id="name" name="name" type="text" placeholder="Enter your full name" value={formData.name} onChange={handleInputChange} required className="bg-background/50 border-border/30 focus:border-primary/50 h-12" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2 text-sm"><Mail className="h-4 w-4" />Email Address</Label>
                  <Input id="email" name="email" type="email" placeholder="Enter your email address" value={formData.email} onChange={handleInputChange} required className="bg-background/50 border-border/30 focus:border-primary/50 h-12" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message" className="flex items-center gap-2 text-sm"><MessageSquare className="h-4 w-4" />Message</Label>
                  <Textarea id="message" name="message" placeholder="Tell me about your project or opportunity..." rows={5} value={formData.message} onChange={handleInputChange} required className="bg-background/50 border-border/30 focus:border-primary/50 resize-none" />
                </div>
                <Button type="submit" disabled={isSubmitting} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-lg font-semibold group">
                  {isSubmitting ? (
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="w-5 h-5 border-2 border-current border-t-transparent rounded-full" />
                  ) : (
                    <><Send className="mr-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />Send Message</>
                  )}
                </Button>
              </form>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;