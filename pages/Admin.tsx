import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Button } from "../components/ui/button";
import { ServiceManager } from "../components/admin/ServiceManager";
import { ProjectManager } from "../components/admin/ProjectManager";
import { TestimonialManager } from "../components/admin/TestimonialManager";
import { SettingsManager } from "../components/admin/SettingsManager";
import { useServices } from "../src/hooks/useServices";
import { useProjects } from "../src/hooks/useProjects";
import { useTestimonials } from "../src/hooks/useTestimonials";
import { useAuth } from "../src/contexts/AuthContext";
import { Briefcase, FolderKanban, MessageSquare, Settings, Sun, Moon, ArrowLeft, LogOut } from "lucide-react";

interface AdminProps {
    onNavigate: (page: string) => void;
}

export function Admin({ onNavigate }: AdminProps) {
    const { user, signOut, loading: authLoading } = useAuth();

    // Redirect to login if not authenticated
    if (authLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-600 dark:text-gray-400">Loading...</p>
            </div>
        );
    }

    if (!user) {
        onNavigate("login");
        return null;
    }

    return <AdminDashboard onNavigate={onNavigate} signOut={signOut} />;
}

function AdminDashboard({ onNavigate, signOut }: { onNavigate: (page: string) => void; signOut: () => Promise<void> }) {
    const [activeTab, setActiveTab] = useState("overview");
    const [isDark, setIsDark] = useState(false);
    const { services } = useServices();
    const { projects } = useProjects();
    const { testimonials } = useTestimonials();

    useEffect(() => {
        const isDarkMode = document.documentElement.classList.contains("dark");
        setIsDark(isDarkMode);
    }, []);

    const counts = {
        services: services.length,
        projects: projects.length,
        testimonials: testimonials.length,
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
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-1">
                                Admin Dashboard
                            </h1>
                            <p className="text-xs sm:text-sm text-gray-600 dark:text-slate-400">
                                Manage Tamarsan Charity operations
                            </p>
                        </div>
                        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
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
                                className="border-gray-300 dark:border-slate-600 hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-700 dark:text-white text-xs sm:text-sm"
                            >
                                <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-2" />
                                <span className="hidden sm:inline">Back to Site</span>
                            </Button>
                            <Button
                                onClick={async () => {
                                    await signOut();
                                    onNavigate("login");
                                }}
                                variant="outline"
                                size="sm"
                                className="border-red-300 dark:border-red-600 hover:bg-red-50 dark:hover:bg-red-600 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-white text-xs sm:text-sm"
                            >
                                <LogOut className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-2" />
                                <span className="hidden sm:inline">Logout</span>
                                <span className="sm:hidden">Out</span>
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {/* Stats Card - Only show on overview */}
                {activeTab === "overview" && (
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-4 sm:p-6 mb-4 sm:mb-6 border border-gray-200 dark:border-slate-700 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs sm:text-sm text-gray-600 dark:text-slate-400 mb-1">Total Projects</p>
                                <p className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">{counts.projects}</p>
                            </div>
                            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-indigo-600 rounded-xl flex items-center justify-center">
                                <FolderKanban className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                            </div>
                        </div>
                    </div>
                )}

                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                    <TabsList className="bg-white dark:bg-slate-900 p-1 rounded-lg border border-gray-200 dark:border-slate-700 shadow-sm grid grid-cols-2 sm:grid-cols-4 gap-1">
                        <TabsTrigger
                            value="projects"
                            className="flex items-center justify-center gap-1 sm:gap-2 data-[state=active]:bg-indigo-600 data-[state=active]:text-white text-gray-700 dark:text-gray-300 text-xs sm:text-sm px-2 sm:px-4"
                        >
                            <FolderKanban className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span className="hidden sm:inline">Projects</span>
                            <span className="sm:hidden">Projects</span>
                        </TabsTrigger>
                        <TabsTrigger
                            value="services"
                            className="flex items-center justify-center gap-1 sm:gap-2 data-[state=active]:bg-indigo-600 data-[state=active]:text-white text-gray-700 dark:text-gray-300 text-xs sm:text-sm px-2 sm:px-4"
                        >
                            <Briefcase className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span className="hidden sm:inline">Services</span>
                            <span className="sm:hidden">Services</span>
                        </TabsTrigger>
                        <TabsTrigger
                            value="testimonials"
                            className="flex items-center justify-center gap-1 sm:gap-2 data-[state=active]:bg-indigo-600 data-[state=active]:text-white text-gray-700 dark:text-gray-300 text-xs sm:text-sm px-2 sm:px-4"
                        >
                            <MessageSquare className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span className="hidden sm:inline">Testimonials</span>
                            <span className="sm:hidden">Reviews</span>
                        </TabsTrigger>
                        <TabsTrigger
                            value="settings"
                            className="flex items-center justify-center gap-1 sm:gap-2 data-[state=active]:bg-indigo-600 data-[state=active]:text-white text-gray-700 dark:text-gray-300 text-xs sm:text-sm px-2 sm:px-4"
                        >
                            <Settings className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span className="hidden sm:inline">Settings</span>
                            <span className="sm:hidden">Settings</span>
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                            <button
                                onClick={() => setActiveTab("services")}
                                className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-lg border border-gray-200 dark:border-slate-700 hover:border-indigo-600 transition-all duration-300 text-left group cursor-pointer shadow-sm hover:shadow-md"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-indigo-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <Briefcase className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                                    </div>
                                </div>
                                <p className="text-xs sm:text-sm text-gray-600 dark:text-slate-400 mb-2">Total: {counts.services}</p>
                                <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Services</p>
                            </button>

                            <button
                                onClick={() => setActiveTab("projects")}
                                className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-lg border border-gray-200 dark:border-slate-700 hover:border-indigo-600 transition-all duration-300 text-left group cursor-pointer shadow-sm hover:shadow-md"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-indigo-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <FolderKanban className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                                    </div>
                                </div>
                                <p className="text-xs sm:text-sm text-gray-600 dark:text-slate-400 mb-2">Total: {counts.projects}</p>
                                <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Projects</p>
                            </button>

                            <button
                                onClick={() => setActiveTab("testimonials")}
                                className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-lg border border-gray-200 dark:border-slate-700 hover:border-indigo-600 transition-all duration-300 text-left group cursor-pointer shadow-sm hover:shadow-md"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-indigo-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <MessageSquare className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                                    </div>
                                </div>
                                <p className="text-xs sm:text-sm text-gray-600 dark:text-slate-400 mb-2">Total: {counts.testimonials}</p>
                                <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Testimonials</p>
                            </button>
                        </div>
                    </TabsContent>

                    <TabsContent value="services">
                        <ServiceManager />
                    </TabsContent>

                    <TabsContent value="projects">
                        <ProjectManager />
                    </TabsContent>

                    <TabsContent value="testimonials">
                        <TestimonialManager />
                    </TabsContent>

                    <TabsContent value="settings">
                        <SettingsManager />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
