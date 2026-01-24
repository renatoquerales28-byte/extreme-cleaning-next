"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AdminLoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = await signIn("credentials", {
            username,
            password,
            redirect: false,
        });

        if (result?.error) {
            setError("Invalid credentials");
        } else {
            router.push("/admin");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F9F8F2]">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-[#D1D5DB]">
                <div className="flex justify-center mb-6">
                    <div className="relative w-48 h-20">
                        <Image
                            src="/brand/logo-full.png"
                            alt="ECS Logo"
                            fill
                            className="object-contain"
                        />
                    </div>
                </div>
                <h1 className="text-2xl font-serif text-[#1C1C1C] text-center mb-6">
                    Admin Login
                </h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-[#4B5563] mb-1">
                            Username
                        </label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-2 border border-[#D1D5DB] rounded-lg focus:ring-2 focus:ring-[#0891B2] focus:border-transparent outline-none transition-all"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-[#4B5563] mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-[#D1D5DB] rounded-lg focus:ring-2 focus:ring-[#0891B2] focus:border-transparent outline-none transition-all"
                            required
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                    <button
                        type="submit"
                        className="w-full bg-[#1C1C1C] text-white py-2 rounded-lg hover:bg-[#333333] transition-colors font-semibold"
                    >
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
}
