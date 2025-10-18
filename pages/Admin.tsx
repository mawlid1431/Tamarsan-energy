import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Button } from "../components/ui/button";
import { ServiceManager } from "../components/admin/ServiceManager";
import { ProjectManager } from "../components/admin/ProjectManager";
import { TestimonialManager } from "../components/admin/TestimonialManager";
import { serviceStore, projectStore, testimonialStore } from "../src/data/store";
import { Briefcase, FolderKanban, MessageSquare, Sun, Moon, ArrowLeft, LogOut } from "lucide-react";

export function Admin() {
    const [activeTab, setActiveTab] = useState("overview");
    const [isDark, setIsDark] = useState(false);
    const [counts, setCounts] = useState({ services: 0, projects: 0, testimonials: 0 });

    useEffect(() => {
        const isDarkMode = document.documentElement.classList.contains("dark");
        setIsDark(isDarkMode);
        updateCounts();
    }, []);

    const updateCounts = () => {
        setCounts({
            services: serviceStore.getAll().length,
            projects: projectStore.getAll().length,
            testimonials: testimonialStore.getAll().length,
        });
    };

    const toggleTheme = () => {
        const newIsDark = !isDark;
        setIsDark(newIsDark);
        if (newIsDark) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    };

    const handleBackToSite = () => {
        window.location.href = "/";
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
            {/* Header */}
            <header className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                                Admin Dashboard
                            </h1>
                            <p className="text-sm text-gray-600 dark:text-slate-400">
                                Manage Tamarsan Charity operations
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <Button
                                onClick={toggleTheme}
                                variant="outline"
                                size="sm"
                                className="border-gray-300 dark:border-slate-600 hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-700 dark:text-white"
                            >
                                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                            </Button>
                            <Button
                                onClick={handleBackToSite}
                                variant="outline"
                                size="sm"
                                className="border-gray-300 dark:border-slate-600 hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-700 dark:text-white"
                            >
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back to Site
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                className="border-red-300 dark:border-red-600 hover:bg-red-50 dark:hover:bg-red-600 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-white"
                            >
                                <LogOut className="w-4 h-4 mr-2" />
                                Logout
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {/* Stats Card - Only show on overview */}
                {activeTab === "overview" && (
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 mb-6 border border-gray-200 dark:border-slate-700 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 dark:text-slate-400 mb-1">Total Projects</p>
                                <p className="text-4xl font-bold text-gray-900 dark:text-white">{counts.projects}</p>
                            </div>
                            <div className="w-14 h-14 bg-indigo-600 rounded-xl flex items-center justify-center">
                                <FolderKanban className="w-7 h-7 text-white" />
                            </div>
                        </div>
                    </div>
                )}

                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                    <TabsList className="bg-white dark:bg-slate-900 p-1 rounded-lg border border-gray-200 dark:border-slate-700 shadow-sm">
                        <TabsTrigger
                            value="projects"
                            className="flex items-center gap-2 data-[state=active]:bg-indigo-600 data-[state=active]:text-white text-gray-700 dark:text-gray-300"
                        >
                            <FolderKanban className="w-4 h-4" />
                            Projects
                        </TabsTrigger>
                        <TabsTrigger
                            value="services"
                            className="flex items-center gap-2 data-[state=active]:bg-indigo-600 data-[state=active]:text-white text-gray-700 dark:text-gray-300"
                        >
                            <Briefcase className="w-4 h-4" />
                            Services
                        </TabsTrigger>
                        <TabsTrigger
                            value="testimonials"
                            className="flex items-center gap-2 data-[state=active]:bg-indigo-600 data-[state=active]:text-white text-gray-700 dark:text-gray-300"
                        >
                            <MessageSquare className="w-4 h-4" />
                            Testimonials
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <button
                                onClick={() => setActiveTab("services")}
                                className="bg-white dark:bg-slate-900 p-8 rounded-lg border border-gray-200 dark:border-slate-700 hover:border-indigo-600 transition-all duration-300 text-left group cursor-pointer shadow-sm hover:shadow-md"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className="w-14 h-14 bg-indigo-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <Briefcase className="w-7 h-7 text-white" />
                                    </div>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-slate-400 mb-2">Total: {counts.services}</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">Services</p>
                            </button>

                            <button
                                onClick={() => setActiveTab("projects")}
                                className="bg-white dark:bg-slate-900 p-8 rounded-lg border border-gray-200 dark:border-slate-700 hover:border-indigo-600 transition-all duration-300 text-left group cursor-pointer shadow-sm hover:shadow-md"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className="w-14 h-14 bg-indigo-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <FolderKanban className="w-7 h-7 text-white" />
                                    </div>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-slate-400 mb-2">Total: {counts.projects}</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">Projects</p>
                            </button>

                            <button
                                onClick={() => setActiveTab("testimonials")}
                                className="bg-white dark:bg-slate-900 p-8 rounded-lg border border-gray-200 dark:border-slate-700 hover:border-indigo-600 transition-all duration-300 text-left group cursor-pointer shadow-sm hover:shadow-md"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className="w-14 h-14 bg-indigo-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <MessageSquare className="w-7 h-7 text-white" />
                                    </div>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-slate-400 mb-2">Total: {counts.testimonials}</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">Testimonials</p>
                            </button>
                        </div>
                    </TabsContent>

                    <TabsContent value="services">
                        <ServiceManager onUpdate={updateCounts} />
                    </TabsContent>

                    <TabsContent value="projects">
                        <ProjectManager onUpdate={updateCounts} />
                    </TabsContent>

                    <TabsContent value="testimonials">
                        <TestimonialManager onUpdate={updateCounts} />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
