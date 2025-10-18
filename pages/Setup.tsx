import { useState } from "react";
import { motion } from "framer-motion";
import { Shield, CheckCircle, Loader2 } from "lucide-react";
import { supabase } from "../src/lib/supabase";
import { Button } from "../components/ui/button";

interface SetupProps {
    onNavigate: (page: string) => void;
}

export function Setup({ onNavigate }: SetupProps) {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const createAdminUser = async () => {
        setLoading(true);
        setError("");

        const email = "admin@tamarsan.com";
        const password = "Tamarsan@2024!Secure";

        try {
            // Try to sign up
            const { error: signUpError } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    emailRedirectTo: `${window.location.origin}/admin`,
                }
            });

            if (signUpError) {
                // If user already exists, that's actually good!
                if (signUpError.message.includes("already registered")) {
                    setSuccess(true);
                    setError("User already exists! You can login now.");
                } else {
                    setError(signUpError.message);
                }
            } else {
                setSuccess(true);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to create user");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-indigo-950 dark:to-purple-950 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-md"
            >
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-200 dark:border-gray-700">
                    {/* Icon */}
                    <div className="flex justify-center mb-6">
                        <div className="w-20 h-20 bg-indigo-600 rounded-full flex items-center justify-center">
                            <Shield className="w-10 h-10 text-white" />
                        </div>
                    </div>

                    {/* Title */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                            First Time Setup
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            Create your admin account to get started
                        </p>
                    </div>

                    {!success ? (
                        <>
                            {/* Info Box */}
                            <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                                <p className="text-sm text-blue-800 dark:text-blue-300 mb-2">
                                    <strong>Admin Credentials:</strong>
                                </p>
                                <p className="text-sm text-blue-700 dark:text-blue-400">
                                    Email: admin@tamarsan.com<br />
                                    Password: Tamarsan@2024!Secure
                                </p>
                            </div>

                            {/* Error Message */}
                            {error && !error.includes("already exists") && (
                                <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                                    <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                                </div>
                            )}

                            {/* Create Button */}
                            <Button
                                onClick={createAdminUser}
                                disabled={loading}
                                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-6 text-lg"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                        Creating Admin User...
                                    </>
                                ) : (
                                    "Create Admin User"
                                )}
                            </Button>

                            <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-4">
                                This will create an admin account with the credentials shown above
                            </p>
                        </>
                    ) : (
                        /* Success State */
                        <div className="text-center space-y-6">
                            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto">
                                <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                    Setup Complete!
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    {error.includes("already exists")
                                        ? "Admin user already exists. You can login now!"
                                        : "Admin user created successfully!"}
                                </p>
                            </div>

                            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                                    <strong>Your Credentials:</strong>
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Email: admin@tamarsan.com<br />
                                    Password: Tamarsan@2024!Secure
                                </p>
                            </div>

                            <Button
                                onClick={() => onNavigate("login")}
                                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-6 text-lg"
                            >
                                Go to Login
                            </Button>
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
}
