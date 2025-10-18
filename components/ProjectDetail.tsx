import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, Calendar, Zap, Users, DollarSign } from "lucide-react";
// import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface ProjectDetailProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    title: string;
    description: string;
    location: string;
    image: string;
    impact: string;
    date?: string;
    capacity?: string;
    beneficiaries?: string;
    investment?: string;
    details?: string;
    challenges?: string;
    solution?: string;
    results?: string[];
  } | null;
}

export function ProjectDetail({ isOpen, onClose, project }: ProjectDetailProps) {
  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl max-w-5xl w-full my-8 relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="absolute top-6 right-6 z-10 w-10 h-10 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
              >
                <X className="w-5 h-5 text-gray-900 dark:text-white" />
              </motion.button>

              {/* Header Image */}
              <div className="relative h-80 rounded-t-3xl overflow-hidden">
                <ImageWithFallback
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                {/* Title Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-4xl text-white mb-2"
                  >
                    {project.title}
                  </motion.h2>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex items-center space-x-2 text-white/90"
                  >
                    <MapPin className="w-4 h-4" />
                    <span>{project.location}</span>
                  </motion.div>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 max-h-[60vh] overflow-y-auto">
                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  {project.date && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-4"
                    >
                      <Calendar className="w-5 h-5 text-indigo-600 mb-2" />
                      <div className="text-sm text-gray-500 dark:text-gray-400">Date</div>
                      <div className="text-gray-900 dark:text-white">{project.date}</div>
                    </motion.div>
                  )}

                  {project.capacity && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.45 }}
                      className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-4"
                    >
                      <Zap className="w-5 h-5 text-indigo-600 mb-2" />
                      <div className="text-sm text-gray-500 dark:text-gray-400">Capacity</div>
                      <div className="text-gray-900 dark:text-white">{project.capacity}</div>
                    </motion.div>
                  )}

                  {project.beneficiaries && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-4"
                    >
                      <Users className="w-5 h-5 text-indigo-600 mb-2" />
                      <div className="text-sm text-gray-500 dark:text-gray-400">Beneficiaries</div>
                      <div className="text-gray-900 dark:text-white">{project.beneficiaries}</div>
                    </motion.div>
                  )}

                  {project.investment && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.55 }}
                      className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-4"
                    >
                      <DollarSign className="w-5 h-5 text-indigo-600 mb-2" />
                      <div className="text-sm text-gray-500 dark:text-gray-400">Investment</div>
                      <div className="text-gray-900 dark:text-white">{project.investment}</div>
                    </motion.div>
                  )}
                </div>

                {/* Description */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="mb-6"
                >
                  <h3 className="text-xl mb-3 text-gray-900 dark:text-white">Project Overview</h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {project.details || project.description}
                  </p>
                </motion.div>

                {/* Challenge */}
                {project.challenges && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="mb-6"
                  >
                    <h3 className="text-xl mb-3 text-gray-900 dark:text-white">Challenge</h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {project.challenges}
                    </p>
                  </motion.div>
                )}

                {/* Solution */}
                {project.solution && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.75 }}
                    className="mb-6"
                  >
                    <h3 className="text-xl mb-3 text-gray-900 dark:text-white">Our Solution</h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {project.solution}
                    </p>
                  </motion.div>
                )}

                {/* Results */}
                {project.results && project.results.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="mb-6"
                  >
                    <h3 className="text-xl mb-3 text-gray-900 dark:text-white">Key Results</h3>
                    <ul className="space-y-2">
                      {project.results.map((result, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.85 + index * 0.05 }}
                          className="flex items-start space-x-2"
                        >
                          <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full mt-2 flex-shrink-0" />
                          <span className="text-gray-600 dark:text-gray-400">{result}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                )}

                {/* Impact Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  className="inline-flex items-center space-x-2 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 px-4 py-2 rounded-full"
                >
                  <Zap className="w-4 h-4" />
                  <span className="text-sm">{project.impact}</span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
