"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { ModeToggle } from "@/components/mode-toggle";
import { 
    LayoutList, 
    Calendar, 
    Users, 
    Mail, 
    DollarSign, 
    MapPin, 
    Tag, 
    LifeBuoy, 
    LogOut 
} from "lucide-react";

import { FEATURE_FLAGS } from "@/lib/config/features";
import { AuthProvider } from "@/components/providers/AuthProvider";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <AuthProvider>
            <AdminLayoutContent>{children}</AdminLayoutContent>
        </AuthProvider>
    );
}

function AdminLayoutContent({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const router = useRouter();
    const { status } = useSession();

    useEffect(() => {
        if (status === "unauthenticated" && pathname !== "/admin/login") {
            router.push("/admin/login");
        }
    }, [status, pathname, router]);

    if (status === "loading") return <div className="flex h-screen items-center justify-center">Loading...</div>;

    if (pathname === "/admin/login") {
        return <>{children}</>;
    }

    const navItems = [
        { name: "Leads", href: "/admin" },
        ...(FEATURE_FLAGS.ENABLE_CALENDAR ? [{ name: "Calendar", href: "/admin/calendar" }] : []),
        { name: "Clients", href: "/admin/clients" },
        { name: "Newsletter", href: "/admin/newsletter" },
        ...(FEATURE_FLAGS.ENABLE_CALENDAR ? [{ name: "Pricing", href: "/admin/pricing" }] : []),
        { name: "Locations", href: "/admin/locations" },
        ...(FEATURE_FLAGS.ENABLE_PROMOTIONS ? [{ name: "Promotions", href: "/admin/promotions" }] : []),
        ...(FEATURE_FLAGS.ENABLE_SUPPORT ? [{ name: "Support", href: "/admin/support" }] : []),
    ];

    return (
        <div className="min-h-screen bg-background flex">
            {/* Sidebar */}
            <aside className="w-48 bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 flex flex-col transition-colors">
                <div className="p-4 flex justify-start">
                    <div className="relative w-32 h-12">
                        <Image
                            src="/brand/logo-full.png"
                            alt="ECS Logo"
                            fill
                            priority
                            className="object-contain dark:brightness-0 dark:invert transition-all"
                        />
                    </div>
                </div>

                <nav className="flex-1 space-y-0 pt-[48px]">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                prefetch={true}
                                className={`flex items-center px-6 py-4 transition-all ${isActive
                                    ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                                    }`}
                            >
                                <span className={`${isActive ? "font-bold" : "font-medium"}`}>{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>


                <div className="space-y-0">
                    <ModeToggle />
                    <button
                        onClick={() => signOut({ callbackUrl: "/admin/login" })}
                        className="flex items-center px-6 py-4 w-full text-left font-bold text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    >
                        <span>Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto">
                <div className="px-8 pb-8 pt-[128px] max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
