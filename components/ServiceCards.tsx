import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Lightbulb, Sun, Wrench, ArrowRight, Zap, Battery, Wind, CheckCircle } from "lucide-react";
import { serviceStore } from "../src/data/store";

interface ServiceCardsProps {
  onNavigate?: (page: string) => void;
}

// Icon mapping
const iconMap: Record<string, any> = {
  Lightbulb, Sun, Wrench, Zap, Battery, Wind
};

export function ServiceCards({ onNavigate }: ServiceCardsProps = {}) {
  const [services, setServices] = useState<any[]>([]);

  useEffect(() => {
    const storedServices = serviceStore.getAll();
    if (storedServices.length > 0) {
      setServices(storedServices);
    } else {
      // Default services if none exist
      setServices([
        {
          id: "1",
          icon: "Lightbulb",
          title: "Renewable Energy Consultancy",
          description: "Expert guidance on sustainable energy solutions tailored to your needs.",
          features: [],
          stats: ""
        },
        {
          id: "2",
          icon: "Sun",
          title: "Solar PV & Hybrid Systems",
          description: "Design and installation of efficient solar and hybrid power systems.",
          features: [],
          stats: ""
        },
        {
          id: "3",
          icon: "Wrench",
          title: "Electrical Design & Maintenance",
          description: "Professional electrical engineering services and ongoing support.",
          features: [],
          stats: ""
        },
      ]);
    }
  }, []);

  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl mb-6 text-gray-900 dark:text-white">
            Excellent green-energy
            <br />
            power services.
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Comprehensive energy solutions designed to meet the unique
            challenges of Somaliland's energy landscape.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.slice(0, 3).map((service, index) => {
            const IconComponent = iconMap[service.icon] || Sun;
            return (
              <motion.div
                key={service.id || service.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 h-full shadow-sm hover:shadow-xl transition-all duration-300 border border-transparent hover:border-indigo-600">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="w-14 h-14 bg-indigo-600 rounded-xl flex items-center justify-center mb-6"
                  >
                    <IconComponent className="w-7 h-7 text-white" />
                  </motion.div>

                  <h3 className="text-xl mb-3 text-gray-900 dark:text-white font-semibold">{service.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4 text-sm">
                    {service.description}
                  </p>

                  {service.features && service.features.length > 0 && (
                    <ul className="space-y-2 mb-4">
                      {service.features.slice(0, 3).map((feature: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-gray-600 dark:text-gray-400">
                          <CheckCircle className="w-4 h-4 text-indigo-600 flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {service.stats && (
                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700 mb-4">
                      <p className="text-lg font-bold text-indigo-600 dark:text-indigo-400">{service.stats}</p>
                    </div>
                  )}

                  <motion.button
                    whileHover={{ x: 5 }}
                    className="flex items-center text-indigo-600 dark:text-indigo-400 group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition-colors"
                  >
                    <span className="text-sm">Learn more</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </motion.button>
                </div>
              </motion.div>
            );
          })}

          {/* Add a fourth card for "View All Services" */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="group cursor-pointer"
            onClick={() => onNavigate?.("services")}
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 h-full shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-center items-center text-center hover:bg-indigo-50 dark:hover:bg-indigo-950/30">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="w-14 h-14 bg-indigo-600 rounded-xl flex items-center justify-center mb-6"
              >
                <ArrowRight className="w-7 h-7 text-white" />
              </motion.div>

              <h3 className="text-xl mb-3 text-gray-900 dark:text-white">View All Services</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Discover our complete range of renewable energy solutions.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
