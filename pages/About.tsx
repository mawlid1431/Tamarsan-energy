import { motion } from "framer-motion";
import { Leaf, Lightbulb, Award, Users, Shield } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function About() {
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
    {
      icon: Award,
      title: "Quality",
      description: "Striving for technical and operational excellence.",
    },
    {
      icon: Shield,
      title: "Integrity",
      description: "Transparent and ethical in all operations.",
    },
    {
      icon: Users,
      title: "Customer Focus",
      description: "Providing customized solutions for every client.",
    },
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1590944667245-8ad4c2abf8ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZW5ld2FibGUlMjBlbmVyZ3klMjBncmlkfGVufDF8fHx8MTc2MDc3NDUxNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Renewable energy grid"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-background/90" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl mb-6">Who We Are</h1>
            <div className="max-w-4xl mx-auto space-y-6 text-lg">
              <p className="text-muted-foreground">
                Tamarsan Company is a leading energy consultancy founded in
                2016. We specialize in power generation, transmission, and
                distribution — with deep expertise in solar, hybrid, and
                off-grid systems for homes, businesses, and public
                infrastructure.
              </p>
              <p className="text-muted-foreground">
                Our multidisciplinary team of engineers, technicians, analysts,
                and environmental experts is dedicated to delivering
                sustainable, high-quality, and cost-effective solutions that
                comply with international standards.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-20 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="mb-4">Our Core Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do at Tamarsan Company.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="bg-card rounded-2xl p-8 shadow-lg border border-border hover:shadow-xl transition-all"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-6"
                >
                  <value.icon className="w-8 h-8 text-primary" />
                </motion.div>
                <h3 className="mb-3">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { number: "9+", label: "Years of Experience" },
              { number: "100+", label: "Projects Completed" },
              { number: "50+", label: "Communities Empowered" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="text-5xl md:text-6xl text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
