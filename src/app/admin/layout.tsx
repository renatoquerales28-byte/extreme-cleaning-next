"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { ModeToggle } from "@/components/mode-toggle";

import { FEATURE_FLAGS } from "@/lib/config/features";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const router = useRouter();

    if (pathname === "/admin/login") {
        return <>{children}</>;
    }

    const navItems = [
        { name: "Leads", href: "/admin", icon: "📋" },
        { name: "Calendar", href: "/admin/calendar", icon: "📅" },
        { name: "Clients", href: "/admin/clients", icon: "👤" },
        { name: "Pricing", href: "/admin/pricing", icon: "💲" },
        { name: "Locations", href: "/admin/locations", icon: "📍" },
        ...(FEATURE_FLAGS.ENABLE_PROMOTIONS ? [{ name: "Promotions", href: "/admin/promotions", icon: "🏷️" }] : []),
        { name: "Support", href: "/admin/support", icon: "🆘" },
    ];

    return (
        <div className="min-h-screen bg-background flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 flex flex-col transition-colors">
                <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-center">
                    <div className="relative w-40 h-16">
                        <Image
                            src="/brand/logo-full.png"
                            alt="ECS Logo"
                            fill
                            priority
                            className="object-contain dark:brightness-0 dark:invert transition-all"
                        />
                    </div>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                prefetch={true}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive
                                    ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-md"
                                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                                    }`}
                            >
                                <span className="text-xl">{item.icon}</span>
                                <span className="font-medium">{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>


                <div className="p-4 border-t border-slate-200 dark:border-slate-800 space-y-2">
                    <ModeToggle />
                    <button
                        onClick={() => signOut({ callbackUrl: "/admin/login" })}
                        className="flex items-center gap-3 px-4 py-3 w-full text-left text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    >
                        <span className="text-xl">🚪</span>
                        <span className="font-medium">Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto">
                <div className="p-8 max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
