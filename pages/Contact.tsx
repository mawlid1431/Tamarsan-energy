import { motion } from "framer-motion";
import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simulate form submission
    setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });

      // Reset status after 5 seconds
      setTimeout(() => setStatus("idle"), 5000);
    }, 1000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-muted/20 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl mb-6">
              Get in <span className="text-primary">Touch</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Get in touch with Tamarsan to learn how we can help you design and
              implement sustainable energy solutions for your home, business, or
              community.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="mb-6">Get in Touch</h2>
              <p className="text-muted-foreground mb-8">
                Have a question or ready to start your renewable energy project?
                We're here to help. Reach out to us and let's discuss how we can
                power your future.
              </p>

              <div className="space-y-6">
                {/* Email */}
                <motion.div
                  whileHover={{ x: 8 }}
                  className="flex items-start space-x-4"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="mb-1">Email</h3>
                    <a
                      href="mailto:info@tamarsanco.com"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      info@tamarsanco.com
                    </a>
                  </div>
                </motion.div>

                {/* Phone */}
                <motion.div
                  whileHover={{ x: 8 }}
                  className="flex items-start space-x-4"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="mb-1">Phone</h3>
                    <a
                      href="tel:+252638383838"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      +252 638 383 838
                    </a>
                  </div>
                </motion.div>

                {/* Location */}
                <motion.div
                  whileHover={{ x: 8 }}
                  className="flex items-start space-x-4"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="mb-1">Location</h3>
                    <p className="text-muted-foreground">Hargeisa, Somaliland</p>
                  </div>
                </motion.div>
              </div>

              {/* Office Hours */}
              <div className="mt-8 p-6 bg-muted/20 rounded-2xl border border-border">
                <h3 className="mb-4">Office Hours</h3>
                <div className="space-y-2 text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Saturday - Thursday</span>
                    <span>8:00 AM - 5:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Friday</span>
                    <span>Closed</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-card rounded-2xl p-8 shadow-lg border border-border">
                <h2 className="mb-6">Send us a Message</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="w-full"
                    />
                  </div>

                  {/* Subject */}
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Project inquiry"
                      className="w-full"
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your project..."
                      rows={6}
                      className="w-full resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground group"
                  >
                    Send Message
                    <Send className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>

                  {/* Status Messages */}
                  {status === "success" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-primary/10 text-primary rounded-lg text-center"
                    >
                      Thank you! Your message has been sent successfully. We'll get
                      back to you soon.
                    </motion.div>
                  )}

                  {status === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-destructive/10 text-destructive rounded-lg text-center"
                    >
                      Oops! Something went wrong. Please try again.
                    </motion.div>
                  )}
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Title */}
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl mb-3">Visit Our Office</h2>
              <p className="text-muted-foreground">Hargeisa, Somaliland</p>
            </div>

            {/* Map Container */}
            <div className="relative rounded-2xl overflow-hidden border border-border h-[500px] shadow-lg">
              {/* Overlay with reduced opacity */}
              <div className="absolute inset-0 bg-background/10 dark:bg-background/20 pointer-events-none z-10 rounded-2xl" />

              {/* Embedded Google Map */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126080.64387687796!2d44.01516089726562!3d9.560274700000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1628bf2a1fc5fb57%3A0x5c92443d51fbe1fa!2sHargeisa%2C%20Somalia!5e0!3m2!1sen!2s!4v1729265000000!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Tamarsan Office Location - Hargeisa, Somaliland"
                className="grayscale-[30%] dark:grayscale-[50%] dark:invert-[90%] dark:hue-rotate-180"
              />
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
