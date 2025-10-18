import { motion } from "framer-motion";
import { HelpCircle, Mail, Lock, Key, Shield, ArrowLeft, Book, MessageCircle } from "lucide-react";
import { Button } from "../components/ui/button";

interface HelpCenterProps {
    onNavigate: (page: string) => void;
}

export function HelpCenter({ onNavigate }: HelpCenterProps) {
    const faqs = [
        {
            icon: Lock,
            question: "How do I log in to the admin panel?",
            answer: "Use the email and password stored in your .env.local file. Default credentials are: admin@tamarsan.com"
        },
        {
            icon: Key,
            question: "I forgot my password, what should I do?",
            answer: "Click 'Forgot password?' on the login page. Enter your email and we'll send you a reset link. Check your spam folder if you don't see it."
        },
        {
            icon: Shield,
            question: "How do I change my admin password?",
            answer: "Go to Supabase Dashboard → Authentication → Users → Click on your user → Reset password. Or use the forgot password feature."
        },
        {
            icon: Mail,
            question: "What email should I use?",
            answer: "Use the email specified in your .env.local file (VITE_ADMIN_EMAIL). This is your admin email address."
        },
        {
            icon: Book,
            question: "Where can I find the admin credentials?",
            answer: "Check your .env.local file in the project root. Look for VITE_ADMIN_EMAIL and VITE_ADMIN_PASSWORD."
        },
        {
            icon: MessageCircle,
            question: "How do I get support?",
            answer: "Contact your system administrator or check the README.md file for documentation and setup instructions."
        }
    ];

    return (
        <div className="min-h-screen bg-background pt-20">
            {/* Hero Section */}
            <section className="py-20 bg-gradient-to-b from-muted/20 to-background">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center"
                    >
                        <button
                            onClick={() => onNavigate("login")}
                            className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors mb-8"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Login
                        </button>

                        <div className="inline-flex items-center justify-center w-20 h-20 bg-indigo-600 rounded-full mb-6">
                            <HelpCircle className="w-10 h-10 text-white" />
                        </div>

                        <h1 className="text-4xl md:text-6xl mb-6">
                            Help <span className="text-primary">Center</span>
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                            Find answers to common questions about logging in and managing your admin panel.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* FAQs Section */}
            <section className="py-12">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="space-y-6">
                        {faqs.map((faq, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-card rounded-xl p-6 border border-border shadow-sm hover:shadow-md transition-all"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <faq.icon className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold text-foreground mb-2">
                                            {faq.question}
                                        </h3>
                                        <p className="text-muted-foreground leading-relaxed">
                                            {faq.answer}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Quick Links Section */}
            <section className="py-20 bg-muted/20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center"
                    >
                        <h2 className="text-3xl font-bold mb-8">Quick Actions</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-card rounded-xl p-8 border border-border">
                                <Lock className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
                                <h3 className="text-xl font-semibold mb-3">Login Issues?</h3>
                                <p className="text-muted-foreground mb-4">
                                    Having trouble logging in? Try resetting your password.
                                </p>
                                <Button
                                    onClick={() => onNavigate("login")}
                                    className="bg-indigo-600 hover:bg-indigo-700"
                                >
                                    Go to Login
                                </Button>
                            </div>

                            <div className="bg-card rounded-xl p-8 border border-border">
                                <Book className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
                                <h3 className="text-xl font-semibold mb-3">Documentation</h3>
                                <p className="text-muted-foreground mb-4">
                                    Check the README file for complete setup instructions.
                                </p>
                                <Button
                                    onClick={() => window.open('/README.md', '_blank')}
                                    variant="outline"
                                >
                                    View Documentation
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl font-bold mb-4">Still Need Help?</h2>
                        <p className="text-muted-foreground mb-8">
                            Contact your system administrator for additional support.
                        </p>
                        <Button
                            onClick={() => onNavigate("home")}
                            variant="outline"
                            className="inline-flex items-center"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Home
                        </Button>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
