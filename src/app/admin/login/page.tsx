"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { Lock, User, ArrowRight, AlertCircle, Eye, EyeOff } from "lucide-react";

export default function AdminLoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError("");

        try {
            const result = await signIn("credentials", {
                username,
                password,
                redirect: false,
            });

            if (result?.error) {
                setError("Invalid credentials. Please try again.");
            } else {
                router.push("/admin");
            }
        } catch (err) {
            setError("Something went wrong. Please check your connection.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white font-sans text-[#024653]">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="w-full max-w-[440px] px-6"
            >
                {/* Brand Logo */}
                <div className="flex justify-center mb-12">
                    <div className="relative w-48 h-12">
                        <Image
                            src="/brand/logo-full.png"
                            alt="ECS Logo"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                </div>

                {/* Login Card */}
                <div className="bg-white rounded-[2.5rem] p-10 shadow-[0_4px_24px_rgba(2,70,83,0.06)] border border-gray-100/50 space-y-8">
                    <div className="space-y-2 text-center">
                        <h1 className="text-3xl font-normal tracking-tight">
                            Admin <span className="italic font-light">portal</span>
                        </h1>
                        <p className="text-sm font-light opacity-60">Enter your credentials to manage ECS</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Username Input */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-4">Username / Email</label>
                            <div className="relative flex items-center group">
                                <div className="absolute left-5 text-[#024653]/30 group-focus-within:text-[#024653] transition-colors">
                                    <User size={18} />
                                </div>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Enter your username"
                                    className="w-full bg-[#f3f6f6] border-none focus:ring-2 focus:ring-[#05D16E]/20 rounded-2xl pl-14 pr-5 py-4 text-[#024653] font-medium placeholder:text-[#024653]/30 transition-all outline-none"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-4">Secret Password</label>
                            <div className="relative flex items-center group">
                                <div className="absolute left-5 text-[#024653]/30 group-focus-within:text-[#024653] transition-colors">
                                    <Lock size={18} />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full bg-[#f3f6f6] border-none focus:ring-2 focus:ring-[#05D16E]/20 rounded-2xl pl-14 pr-14 py-4 text-[#024653] font-medium placeholder:text-[#024653]/30 transition-all outline-none"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-5 text-[#024653]/30 hover:text-[#024653] transition-colors"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        {error && (
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="flex items-center gap-2 text-xs font-bold text-red-500 bg-red-50 p-3 rounded-xl border border-red-100"
                            >
                                <AlertCircle size={14} />
                                {error}
                            </motion.div>
                        )}

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full bg-[#05D16E] hover:bg-[#04bd63] text-[#024653] py-4 rounded-2xl font-black uppercase tracking-widest transition-all shadow-[0_8px_20px_rgba(5,209,110,0.15)] active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed`}
                        >
                            {isSubmitting ? (
                                <span className="flex items-center gap-2">
                                    <svg className="animate-spin h-5 w-5 text-[#024653]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Authenticating...
                                </span>
                            ) : (
                                <>
                                    Log In <ArrowRight size={18} className="stroke-[3px]" />
                                </>
                            )}
                        </button>
                    </form>
                </div>

                {/* Footer Link */}
                <p className="mt-12 text-center text-xs font-medium text-[#024653]/40">
                    &copy; {new Date().getFullYear()} Extreme Cleaning Service. All rights reserved.
                </p>
            </motion.div>
        </div>
    );
}
