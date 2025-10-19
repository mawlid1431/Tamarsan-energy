import { motion } from "framer-motion";
import { Star, ArrowRight, Quote } from "lucide-react";
import { Button } from "./ui/button";
import { useTestimonials } from "../src/hooks/useTestimonials";

interface TestimonialsPreviewProps {
  onNavigate: (page: string) => void;
}

export function TestimonialsPreview({ onNavigate }: TestimonialsPreviewProps) {
  const { testimonials: dbTestimonials, loading } = useTestimonials();

  const testimonials = dbTestimonials.map(t => ({
    rating: t.rate || 5,
    text: t.description,
    author: t.role,
    location: t.location,
  }));

  if (loading) {
    return (
      <section className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-400">Loading testimonials...</p>
          </div>
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) {
    return (
      <section className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl mb-6 text-gray-900 dark:text-white">
              Testimonials
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              No testimonials available yet. Check back soon!
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
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl mb-6 text-gray-900 dark:text-white">
            Testimonials
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Real feedback from the communities and businesses we've served.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 h-full shadow-sm hover:shadow-xl transition-all duration-300 relative">
                <Quote className="w-10 h-10 text-indigo-600/20 absolute top-6 right-6" />

                {/* Rating */}
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-indigo-600 text-indigo-600" />
                  ))}
                </div>

                {/* Text */}
                <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                  "{testimonial.text}"
                </p>

                {/* Author */}
                <div className="border-t border-gray-100 dark:border-gray-700 pt-4">
                  <div className="text-sm text-gray-900 dark:text-white">{testimonial.author}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-500">
                    {testimonial.location}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={() => onNavigate("testimonials")}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all group"
            >
              See All Testimonials
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
