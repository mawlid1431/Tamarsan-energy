import { motion } from "framer-motion";
import { Lightbulb, Sun, Wrench, ArrowRight, Zap, Battery, Wind, Settings, Cpu, Power, Gauge } from "lucide-react";
import { useServices } from "../src/hooks/useServices";

interface ServiceCardsProps {
  onNavigate?: (page: string) => void;
}

export function ServiceCards({ onNavigate }: ServiceCardsProps = {}) {
  const { services, loading } = useServices();

  if (loading) {
    return (
      <section className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-400">Loading services...</p>
          </div>
        </div>
      </section>
    );
  }

  if (services.length === 0) {
    return (
      <section className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl mb-6 text-gray-900 dark:text-white">
              Our Services
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              No services available yet. Check back soon!
            </p>
          </div>
        </div>
      </section>
    );
  }

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.slice(0, 3).map((service, index) => {
            const IconComponent = service.icon === "Sun" ? Sun :
              service.icon === "Zap" ? Zap :
                service.icon === "Battery" ? Battery :
                  service.icon === "Lightbulb" ? Lightbulb :
                    service.icon === "Settings" ? Settings :
                      service.icon === "Wrench" ? Wrench :
                        service.icon === "Wind" ? Wind :
                          service.icon === "Cpu" ? Cpu :
                            service.icon === "Power" ? Power :
                              service.icon === "Gauge" ? Gauge : Sun;
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
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <button
              onClick={() => onNavigate?.("services")}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all group inline-flex items-center"
            >
              View All Services
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
