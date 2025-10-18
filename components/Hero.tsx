import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { TypingAnimation } from "./TypingAnimation";

interface HeroProps {
  onNavigate: (page: string) => void;
}

export function Hero({ onNavigate }: HeroProps) {
  return (
    <section className="relative min-h-screen bg-white dark:bg-gray-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 80 }}
          >
            <motion.h1
              className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl mb-6 leading-tight text-gray-900 dark:text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <TypingAnimation
                phrases={[
                  "POWERING SOMALILAND.",
                  "RENEWABLE ENERGY EXPERTS.",
                  "SOLAR. HYBRID. OFF-GRID.",
                  "CLEAN ENERGY FOR ALL."
                ]}
                typingSpeed={200}
                deletingSpeed={150}
                pauseDuration={3000}
              />
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-lg leading-relaxed"
            >
              Empowering communities with clean, affordable, and sustainable energy solutions across Somaliland.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap items-center gap-4"
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={() => onNavigate("projects")}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all group text-base"
                >
                  Get Started
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={() => onNavigate("about")}
                  variant="ghost"
                  className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 px-6 py-6 rounded-full group text-base"
                >
                  <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center mr-3 group-hover:bg-indigo-700 transition-colors">
                    <Play className="w-4 h-4 text-white fill-white ml-0.5" />
                  </div>
                  Watch Video
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, type: "spring", stiffness: 80 }}
            className="relative"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="relative rounded-3xl overflow-hidden shadow-2xl"
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1509391366360-2e959784a276?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800"
                alt="Solar panels installation"
                className="w-full h-[500px] object-cover"
              />

              {/* Floating play button */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1, type: "spring", stiffness: 200 }}
                className="absolute bottom-8 left-8"
              >
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center shadow-xl hover:bg-indigo-700 transition-colors"
                >
                  <Play className="w-6 h-6 text-white fill-white ml-1" />
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Decorative elements */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
              className="absolute -top-6 -right-6 w-32 h-32 bg-indigo-100 dark:bg-indigo-900/30 rounded-3xl -z-10"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 }}
              className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary/10 rounded-3xl -z-10"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
