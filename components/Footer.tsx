// import { Mail, Phone, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { Logo } from "./Logo";

interface FooterProps {
  onNavigate: (page: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const handleNavClick = (page: string) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Logo className="h-10 w-auto mb-4" />
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Pioneering energy solutions in Somaliland.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="text-sm mb-4 text-gray-900 dark:text-white">Home</h4>
            <ul className="space-y-2">
              {["About", "Services", "Project"].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => handleNavClick(item.toLowerCase())}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Additional Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="text-sm mb-4 text-gray-900 dark:text-white">Privacy</h4>
            <ul className="space-y-2">
              {["FAQ", "Testimonials", "Your Social DNA"].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => handleNavClick(item.toLowerCase())}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h4 className="text-sm mb-4 text-gray-900 dark:text-white">Contact</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => handleNavClick("projects")}
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Projects
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick("contact")}
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Get in Touch
                </button>
              </li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="border-t border-border mt-8 pt-8 text-center"
        >
          <p className="text-muted-foreground">
            © 2025 Tamarsan Company – All Rights Reserved
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
