import { motion } from "framer-motion";
import { Leaf, Lightbulb, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

interface ValuesPreviewProps {
  onNavigate: (page: string) => void;
}

export function ValuesPreview({ onNavigate }: ValuesPreviewProps) {
  const values = [
    {
      icon: Leaf,
      title: "Sustainability",
      description: "Committed to eco-friendly energy practices.",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "Always improving through modern technology.",
    },
  ];

  return (
    <section className="py-24 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl mb-6 text-gray-900 dark:text-white">
            Renewable energy
            <br />
            solar panels.
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            The principles that guide everything we do at Tamarsan Company.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-gray-50 dark:bg-gray-900 rounded-3xl p-8 h-full hover:shadow-xl transition-all duration-300">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="w-14 h-14 bg-indigo-600 rounded-xl flex items-center justify-center mb-6"
                >
                  <value.icon className="w-7 h-7 text-white" />
                </motion.div>
                <h3 className="text-xl mb-3 text-gray-900 dark:text-white">{value.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{value.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
