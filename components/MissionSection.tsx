import { motion } from "framer-motion";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function MissionSection() {
  return (
    <section className="py-24 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left - Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative order-2 lg:order-1"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="relative rounded-3xl overflow-hidden shadow-2xl"
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800"
                alt="Solar panel installation"
                className="w-full h-[600px] object-cover"
              />
            </motion.div>

            {/* Decorative blob */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="absolute -bottom-8 -right-8 w-40 h-40 bg-indigo-100 dark:bg-indigo-900/30 rounded-full -z-10 blur-3xl"
            />
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-1 lg:order-2"
          >
            <motion.h2
              className="text-4xl sm:text-5xl lg:text-6xl mb-6 text-gray-900 dark:text-white leading-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Welcome to our energy
              <br />
              company's illumination.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-lg text-gray-600 dark:text-gray-400 mb-6 leading-relaxed"
            >
              Tamarsan Company is a leading energy consultancy founded in 2016.
              We specialize in power generation, transmission, and distribution
              — with deep expertise in solar, hybrid, and off-grid systems for
              homes, businesses, and public infrastructure.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed"
            >
              Our multidisciplinary team of engineers, technicians, analysts,
              and environmental experts is dedicated to delivering sustainable,
              high-quality, and cost-effective solutions.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-2 gap-6"
            >
              <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6">
                <div className="text-4xl mb-2 text-indigo-600">65+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Delivered Projects</div>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">Successfully completed across Somaliland</p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6">
                <div className="text-4xl mb-2 text-indigo-600">25+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Happy Clients</div>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">Satisfied businesses and communities</p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6">
                <div className="text-4xl mb-2 text-indigo-600">30+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Ongoing Projects</div>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">Currently in development phase</p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6">
                <div className="text-4xl mb-2 text-indigo-600">100%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Renewable Energy</div>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">Clean and sustainable solutions</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
