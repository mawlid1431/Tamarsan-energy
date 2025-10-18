import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Zap, ArrowRight } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { ProjectDetail } from "../components/ProjectDetail";
import { useProjects } from "../src/hooks/useProjects";

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const { projects: dbProjects, loading } = useProjects();

  const projects = dbProjects.map(p => ({
    title: p.name,
    location: p.location,
    description: p.description,
    image: p.image_url || "https://images.unsplash.com/photo-1630148180214-417337ce9652?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoeWJyaWQlMjBzb2xhciUyMHN5c3RlbXxlbnwxfHx8fDE3NjA3NzQ1MTZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    impact: p.rate ? `${p.rate}/5 rating` : "New project",
    date: p.date,
  }));

  if (loading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <p className="text-gray-600 dark:text-gray-400">Loading projects...</p>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="pt-20 min-h-screen">
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl mb-6">
              Our <span className="text-primary">Projects</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
              No projects available yet. Add projects from the admin panel to display them here.
            </p>
            <a href="/admin" className="text-primary hover:underline">
              Go to Admin Panel →
            </a>
          </div>
        </section>
      </div>
    );
  }

  const oldDefaultProjects = [
    {
      title: "Hybrid Energy Systems",
      location: "Berbera, Burao, and Borama",
      description:
        "Integrated solar-diesel systems to reduce fuel use and provide reliable power to businesses and communities.",
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
        "Brought renewable power to rural communities, enabling access to electricity for the first time.",
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
      title: "Solar-Powered Water Pumping Systems",
      location: "Ainabo, Badhan, and Buhodle",
      description:
        "Installed clean water supply systems that eliminate the need for diesel generators.",
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
    {
      title: "Solar Street Lighting Projects",
      location: "Erigavo, Las Anod, and Oodweyne",
      description:
        "Deployed solar lighting for safer streets and improved community security.",
      image:
        "https://images.unsplash.com/photo-1705608824192-cf13d2ef19d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2xhciUyMHN0cmVldCUyMGxpZ2h0c3xlbnwxfHx8fDE3NjA3NzQ1MTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      impact: "500+ solar lights installed",
      date: "2022",
      capacity: "45 kW",
      beneficiaries: "30,000+ people",
      investment: "$280K",
      details: "Solar street lighting project bringing safety and security to three communities through autonomous, maintenance-free lighting systems. Each light operates independently with integrated solar panels, batteries, and LED fixtures.",
      challenges: "Streets were completely dark at night, creating safety concerns and limiting economic activity after sunset. No grid infrastructure existed for public lighting.",
      solution: "Installed 500+ high-efficiency LED street lights with integrated solar panels and lithium batteries. Motion sensors reduce power consumption during low-traffic hours. Lights automatically turn on at dusk and off at dawn.",
      results: [
        "500+ solar street lights illuminating key roads and public spaces",
        "40% reduction in nighttime incidents",
        "Extended business hours for local shops and restaurants",
        "Zero ongoing electricity costs for municipalities"
      ]
    },
  ];

  const handleProjectClick = (project: any) => {
    setSelectedProject(project);
    setIsDetailOpen(true);
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-muted/20 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl mb-6">
              Real Projects. <span className="text-primary">Real Impact.</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Discover how Tamarsan is transforming Somaliland's energy
              landscape, one community at a time.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group bg-card rounded-2xl overflow-hidden shadow-lg border border-border hover:shadow-2xl transition-all cursor-pointer"
                onClick={() => handleProjectClick(project)}
              >
                {/* Project Image */}
                <div className="relative h-64 overflow-hidden">
                  <ImageWithFallback
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center space-x-2 text-primary-foreground">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{project.location}</span>
                    </div>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <h3 className="mb-3">{project.title}</h3>
                  <p className="text-muted-foreground mb-4">
                    {project.description}
                  </p>
                  <div className="flex items-center space-x-2 text-primary">
                    <Zap className="w-5 h-5" />
                    <span>{project.impact}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Detail Modal */}
      <ProjectDetail
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        project={selectedProject}
      />

      {/* Impact Summary */}
      <section className="py-20 bg-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="mb-6">Transforming Somaliland's Energy Future</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Through innovative renewable energy solutions, we're helping
              Somaliland transition to a sustainable, clean energy future. Our
              projects demonstrate the real-world impact of solar and hybrid
              systems in improving lives and building resilient communities.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
