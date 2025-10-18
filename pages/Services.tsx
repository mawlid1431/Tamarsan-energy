import { motion } from "framer-motion";
import {
  Sun,
  Zap,
  Battery,
  Settings,
  Lightbulb,
  Wrench,
  TrendingUp,
  Shield,
  Users,
  CheckCircle2,
  ArrowRight,
  Gauge,
  Power,
  Cpu,
  Wind,
} from "lucide-react";
import { useServices } from "../src/hooks/useServices";

interface ServicesProps {
  onNavigate?: (page: string) => void;
}

export function Services({ onNavigate }: ServicesProps = {}) {
  const { services, loading } = useServices();

  // Map icon names to components
  const getIconComponent = (iconName: string) => {
    const icons: Record<string, any> = {
      Sun, Zap, Battery, Lightbulb, Settings, Wrench, Wind, Cpu, Power, Gauge
    };
    return icons[iconName] || Sun;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background pt-20 flex items-center justify-center">
        <p className="text-gray-600 dark:text-gray-400">Loading services...</p>
      </div>
    );
  }

  if (services.length === 0) {
    return (
      <div className="min-h-screen bg-background pt-20">
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl mb-6">
              Our <span className="text-primary">Services</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
              No services available yet. Add services from the admin panel to display them here.
            </p>
            <a href="/admin" className="text-primary hover:underline">
              Go to Admin Panel →
            </a>
          </div>
        </section>
      </div>
    );
  }

  const processSteps = [
    {
      number: "01",
      title: "Consultation",
      description:
        "We begin with a thorough understanding of your energy needs and requirements.",
      icon: Users,
    },
    {
      number: "02",
      title: "Assessment",
      description:
        "Our experts conduct detailed site surveys and energy audits to design the optimal solution.",
      icon: Gauge,
    },
    {
      number: "03",
      title: "Design",
      description:
        "We create a customized system design with detailed specifications and financial projections.",
      icon: Cpu,
    },
    {
      number: "04",
      title: "Implementation",
      description:
        "Professional installation by certified technicians ensuring quality and safety.",
      icon: Power,
    },
    {
      number: "05",
      title: "Support",
      description:
        "Ongoing maintenance and support to keep your system running at peak performance.",
      icon: Shield,
    },
  ];

  const whyChooseUs = [
    {
      icon: CheckCircle2,
      title: "Local Expertise",
      description:
        "Deep understanding of Somaliland's unique energy challenges and opportunities.",
    },
    {
      icon: TrendingUp,
      title: "Proven Track Record",
      description:
        "Over 100 successful projects delivered across Somaliland.",
    },
    {
      icon: Shield,
      title: "Quality Assurance",
      description:
        "International standards with locally adapted solutions for maximum reliability.",
    },
    {
      icon: Users,
      title: "Customer Focus",
      description:
        "Dedicated support team committed to your long-term success.",
    },
  ];

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-indigo-950 dark:to-purple-950 opacity-50" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="inline-block mb-6"
            >
              <span className="px-4 py-2 bg-indigo-600/10 dark:bg-indigo-400/10 text-indigo-600 dark:text-indigo-400 rounded-full text-sm">
                Our Services
              </span>
            </motion.div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl mb-8 text-gray-900 dark:text-white">
              Comprehensive Renewable
              <br />
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Energy Solutions
              </span>
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              From initial consultation to ongoing support, we provide end-to-end
              renewable energy solutions tailored to Somaliland's unique energy landscape.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Services Grid */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const ServiceIcon = getIconComponent(service.icon);
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="group"
                >
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 h-full border border-gray-200 dark:border-gray-700 hover:border-indigo-600 dark:hover:border-indigo-400 transition-all duration-300 hover:shadow-xl">
                    {/* Icon */}
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg"
                    >
                      <ServiceIcon className="w-8 h-8 text-white" />
                    </motion.div>

                    {/* Title */}
                    <h3 className="text-2xl mb-4 text-gray-900 dark:text-white">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                      {service.description}
                    </p>

                    {/* Hover Arrow */}
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      whileHover={{ opacity: 1, x: 0 }}
                      className="mt-6 flex items-center text-indigo-600 dark:text-indigo-400"
                    >
                      <span className="text-sm">Learn more</span>
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-24 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl mb-6 text-gray-900 dark:text-white">
              Our Process
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              A streamlined approach to delivering exceptional renewable energy solutions
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                {/* Connector Line (desktop only) */}
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-20 z-0" />
                )}

                <div className="relative z-10 text-center">
                  {/* Number Badge */}
                  <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full mb-6 shadow-lg">
                    <step.icon className="w-10 h-10 text-white" />
                  </div>

                  {/* Step Number */}
                  <div className="text-sm text-indigo-600 dark:text-indigo-400 mb-2">
                    Step {step.number}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl mb-3 text-gray-900 dark:text-white">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl mb-6 text-gray-900 dark:text-white">
              Why Choose Tamarsan?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Your trusted partner for renewable energy solutions in Somaliland
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="inline-flex items-center justify-center w-20 h-20 bg-indigo-600/10 dark:bg-indigo-400/10 rounded-full mb-6"
                >
                  <item.icon className="w-10 h-10 text-indigo-600 dark:text-indigo-400" />
                </motion.div>

                <h3 className="text-xl mb-3 text-gray-900 dark:text-white">
                  {item.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-400">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-600" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl sm:text-5xl lg:text-6xl mb-6 text-white">
              Ready to Power Your Future?
            </h2>
            <p className="text-xl text-indigo-100 mb-10 max-w-2xl mx-auto">
              Let's discuss how our renewable energy solutions can transform your
              energy infrastructure and reduce costs.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigate?.("contact")}
                className="px-8 py-4 bg-white text-indigo-600 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center group"
              >
                <span className="mr-2">Get a Free Consultation</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigate?.("projects")}
                className="px-8 py-4 bg-transparent text-white border-2 border-white rounded-xl hover:bg-white/10 transition-all duration-300"
              >
                View Our Projects
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
