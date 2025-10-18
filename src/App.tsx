import { useState, useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Hero } from "../components/Hero";
import { ServiceCards } from "../components/ServiceCards";
import { MissionSection } from "../components/MissionSection";
import { ValuesPreview } from "../components/ValuesPreview";
import { ProjectsPreview } from "../components/ProjectsPreview";
import { TestimonialsPreview } from "../components/TestimonialsPreview";
import { CTASection } from "../components/CTASection";
import { WhatsAppButton } from "../components/WhatsAppButton";
import { About } from "../pages/About";
import { Services } from "../pages/Services";
import { Projects } from "../pages/Projects";
import { Testimonials } from "../pages/Testimonials";
import { Contact } from "../pages/Contact";
import { Admin } from "../pages/Admin";

export default function App() {
    const [currentPage, setCurrentPage] = useState(() => {
        const path = window.location.pathname.slice(1) || "home";
        return path;
    });

    const handleNavigate = (page: string) => {
        setCurrentPage(page);
        window.history.pushState({}, "", `/${page === "home" ? "" : page}`);
    };

    // Handle browser back/forward buttons
    useEffect(() => {
        const handlePopState = () => {
            const path = window.location.pathname.slice(1) || "home";
            setCurrentPage(path);
        };
        window.addEventListener("popstate", handlePopState);
        return () => window.removeEventListener("popstate", handlePopState);
    }, []);

    const renderPage = () => {
        switch (currentPage) {
            case "home":
                return (
                    <>
                        <Hero onNavigate={handleNavigate} />
                        <ServiceCards onNavigate={handleNavigate} />
                        <MissionSection />
                        <ValuesPreview onNavigate={handleNavigate} />
                        <ProjectsPreview onNavigate={handleNavigate} />
                        <TestimonialsPreview onNavigate={handleNavigate} />
                        <CTASection onNavigate={handleNavigate} />
                    </>
                );
            case "about":
                return <About />;
            case "services":
                return <Services onNavigate={handleNavigate} />;
            case "projects":
                return <Projects />;
            case "testimonials":
                return <Testimonials />;
            case "contact":
                return <Contact />;
            case "admin":
                return <Admin />;
            default:
                return (
                    <>
                        <Hero onNavigate={handleNavigate} />
                        <ServiceCards onNavigate={handleNavigate} />
                        <MissionSection />
                        <ValuesPreview onNavigate={handleNavigate} />
                        <ProjectsPreview onNavigate={handleNavigate} />
                        <TestimonialsPreview onNavigate={handleNavigate} />
                        <CTASection onNavigate={handleNavigate} />
                    </>
                );
        }
    };

    return (
        <div className="min-h-screen bg-background">
            {currentPage !== "admin" && <Navbar currentPage={currentPage} onNavigate={handleNavigate} />}
            <main>{renderPage()}</main>
            {currentPage !== "admin" && <Footer onNavigate={handleNavigate} />}
            {currentPage !== "admin" && (
                <WhatsAppButton
                    phoneNumber="+252638383838"
                    message="Hello! I'm interested in learning more about Tamarsan's renewable energy solutions."
                />
            )}
        </div>
    );
}