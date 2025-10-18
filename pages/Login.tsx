import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Mail, Eye, EyeOff, HelpCircle, ArrowLeft } from "lucide-react";
import { useAuth } from "../src/contexts/AuthContext";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Logo } from "../components/Logo";

interface LoginProps {
    onNavigate: (page: string) => void;
}

export function Login({ onNavigate }: LoginProps) {
    const { signIn } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showForgotPassword, setShowForgotPassword] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        const { error: signInError } = await signIn(email, password);

        if (signInError) {
            setError(signInError);
            setLoading(false);
        } else {
            // Redirect to admin
            onNavigate("admin");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-indigo-950 dark:to-purple-950 flex items-center justify-center p-4">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative w-full max-w-md"
            >
                {/* Back to Site Button */}
                <button
                    onClick={() => onNavigate("home")}
                    className="absolute -top-16 left-0 flex items-center text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Site
                </button>

                {/* Login Card */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-200 dark:border-gray-700">
                    {/* Logo */}
                    <div className="flex justify-center mb-8">
                        <Logo className="h-12" />
                    </div>

                    {/* Title */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                            Admin Login
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            Sign in to manage your content
                        </p>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
                        >
                            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                        </motion.div>
                    )}

                    {!showForgotPassword ? (
                        /* Login Form */
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Email Field */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <Input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="admin@tamarsan.com"
                                        className="pl-10 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Password Field */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <Input
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Enter your password"
                                        className="pl-10 pr-10 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            {/* Forgot Password Link */}
                            <div className="flex items-center justify-between">
                                <button
                                    type="button"
                                    onClick={() => setShowForgotPassword(true)}
                                    className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300"
                                >
                                    Forgot password?
                                </button>
                                <button
                                    type="button"
                                    onClick={() => onNavigate("help")}
                                    className="flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                                >
                                    <HelpCircle className="w-4 h-4 mr-1" />
                                    Help Center
                                </button>
                            </div>

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-6 text-lg"
                            >
                                {loading ? "Signing in..." : "Sign In"}
                            </Button>
                        </form>
                    ) : (
                        /* Forgot Password Form */
                        <ForgotPasswordForm
                            onBack={() => setShowForgotPassword(false)}
                            onNavigate={onNavigate}
                        />
                    )}

                    {/* Help Text */}
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Default credentials are in your .env.local file
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

function ForgotPasswordForm({ onBack, onNavigate }: { onBack: () => void; onNavigate: (page: string) => void }) {
    const { resetPassword } = useAuth();
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        const { error: resetError } = await resetPassword(email);

        if (resetError) {
            setError(resetError);
            setLoading(false);
        } else {
            setSuccess(true);
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto">
                    <Mail className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Check Your Email
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                    We've sent a password reset link to {email}
                </p>
                <Button onClick={onBack} variant="outline" className="w-full">
                    Back to Login
                </Button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Reset Password
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    Enter your email and we'll send you a reset link
                </p>
            </div>

            {error && (
                <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                    <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                </div>
            )}

            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address
                </label>
                <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="admin@tamarsan.com"
                        className="pl-10 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                        required
                    />
                </div>
            </div>

            <div className="flex gap-3">
                <Button
                    type="button"
                    onClick={onBack}
                    variant="outline"
                    className="flex-1"
                >
                    Back
                </Button>
                <Button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700"
                >
                    {loading ? "Sending..." : "Send Reset Link"}
                </Button>
            </div>

            <div className="text-center">
                <button
                    type="button"
                    onClick={() => onNavigate("help")}
                    className="flex items-center justify-center text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 mx-auto"
                >
                    <HelpCircle className="w-4 h-4 mr-1" />
                    Need help? Visit Help Center
                </button>
            </div>
        </form>
    );
}
