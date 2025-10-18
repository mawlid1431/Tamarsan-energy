import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Zap, ArrowRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Button } from "./ui/button";
import { ProjectDetail } from "./ProjectDetail";

interface ProjectsPreviewProps {
  onNavigate: (page: string) => void;
}

export function ProjectsPreview({ onNavigate }: ProjectsPreviewProps) {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const projects = [
    {
      title: "Hybrid Energy Systems",
      location: "Berbera, Burao, and Borama",
      description:
        "Integrated solar-diesel systems to reduce fuel use and provide reliable power.",
      image:
        "https://images.unsplash.com/photo-1630148180214-417337ce9652?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoeWJyaWQlMjBzb2xhciUyMHN5c3RlbXxlbnwxfHx8fDE3NjA3NzQ1MTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      impact: "60% reduction in fuel costs",
      date: "2023",
      capacity: "500 kW",
      beneficiaries: "2,000+ people",
      investment: "$750K",
      details: "This comprehensive hybrid energy project combines solar photovoltaic systems with diesel generators to create a reliable and cost-effective power solution for three major cities in Somaliland. The system intelligently switches between solar and diesel power based on availability and demand.",
      challenges: "The region faced high energy costs due to complete reliance on diesel generators, with fuel transportation adding significant expenses. Power outages were frequent, and CO2 emissions were a growing concern.",
      solution: "We designed and implemented a sophisticated hybrid system featuring 500kW solar capacity integrated with existing diesel infrastructure. Smart inverters and battery storage ensure seamless power delivery 24/7.",
      results: [
        "60% reduction in fuel consumption and operational costs",
        "Reliable 24/7 power supply with 99.5% uptime",
        "350 tons of CO2 emissions avoided annually",
        "Created 15 local jobs for system maintenance"
      ]
    },
    {
      title: "Off-grid Solar Electrification",
      location: "Togdheer, Sanaag, and Sool",
      description:
        "Brought renewable power to rural communities, enabling access to electricity.",
      image:
        "https://images.unsplash.com/photo-1737860648638-df5b075f73a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvZmYlMjBncmlkJTIwc29sYXJ8ZW58MXx8fHwxNzYwNzc0NTE1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      impact: "5,000+ households powered",
      date: "2022-2023",
      capacity: "750 kW",
      beneficiaries: "25,000+ people",
      investment: "$1.2M",
      details: "A transformative rural electrification program that brought clean, reliable electricity to remote villages across three regions for the first time. The project includes solar home systems, community mini-grids, and solar-powered street lighting.",
      challenges: "These remote communities had never had access to electricity. Traditional grid extension was economically unfeasible due to the dispersed population and difficult terrain.",
      solution: "We deployed a mix of 3kW-5kW solar home systems for individual households, 50kW mini-grids for village centers, and solar street lights. Each system includes battery storage for nighttime use and mobile payment integration for affordable access.",
      results: [
        "5,000+ households now have electricity for the first time",
        "150+ small businesses established using solar power",
        "Children can study after dark, improving education outcomes",
        "Healthcare facilities can refrigerate vaccines and operate at night"
      ]
    },
    {
      title: "Solar-Powered Water Pumping",
      location: "Ainabo, Badhan, and Buhodle",
      description:
        "Clean water supply systems that eliminate the need for diesel generators.",
      image:
        "https://images.unsplash.com/photo-1561115867-be8460fbebfe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2xhciUyMHdhdGVyJTIwcHVtcHxlbnwxfHx8fDE3NjA3NzQ1MTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      impact: "15,000+ people served",
      date: "2023-2024",
      capacity: "120 kW",
      beneficiaries: "15,000+ people",
      investment: "$450K",
      details: "Solar-powered water pumping systems that provide clean, reliable water to rural communities while eliminating expensive and polluting diesel generators. The systems pump water from deep wells to elevated storage tanks for gravity-fed distribution.",
      challenges: "Communities relied on diesel generators for water pumping, costing $800-1,200 per month in fuel. Frequent breakdowns left villages without water for days. Women and children walked hours daily to fetch water from distant sources.",
      solution: "We installed solar pumping systems with submersible pumps, elevated storage tanks (50,000L capacity), and distribution networks. Smart controllers optimize pumping during peak sunlight hours.",
      results: [
        "100% elimination of diesel fuel costs for water pumping",
        "Clean water available 24/7 within 500m of all households",
        "Women and girls save 3-4 hours daily previously spent fetching water",
        "Improved health outcomes due to access to clean water"
      ]
    },
  ];

  const handleProjectClick = (project: any) => {
    setSelectedProject(project);
    setIsDetailOpen(true);
  };

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
            Newest Projects
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Transforming Somaliland's energy landscape with innovative solutions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group cursor-pointer"
              onClick={() => handleProjectClick(project)}
            >
              <div className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300">
                {/* Project Image */}
                <div className="relative h-64 overflow-hidden">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6 }}
                    className="w-full h-full"
                  >
                    <ImageWithFallback
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mb-3">
                    <MapPin className="w-4 h-4" />
                    <span>{project.location}</span>
                  </div>

                  <h3 className="text-xl mb-3 text-gray-900 dark:text-white">{project.title}</h3>

                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                    <div className="flex items-center space-x-2 text-indigo-600 dark:text-indigo-400">
                      <Zap className="w-4 h-4" />
                      <span className="text-sm">{project.impact}</span>
                    </div>
                    <motion.button
                      whileHover={{ x: 5 }}
                      className="text-indigo-600 dark:text-indigo-400"
                    >
                      <ArrowRight className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Project Detail Modal */}
        <ProjectDetail
          isOpen={isDetailOpen}
          onClose={() => setIsDetailOpen(false)}
          project={selectedProject}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={() => onNavigate("projects")}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all group"
            >
              See All Projects
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
