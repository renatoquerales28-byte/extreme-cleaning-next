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
        { name: "Leads", href: "/admin", icon: LayoutList },
        ...(FEATURE_FLAGS.ENABLE_CALENDAR ? [{ name: "Calendar", href: "/admin/calendar", icon: Calendar }] : []),
        { name: "Clients", href: "/admin/clients", icon: Users },
        { name: "Newsletter", href: "/admin/newsletter", icon: Mail },
        ...(FEATURE_FLAGS.ENABLE_CALENDAR ? [{ name: "Pricing", href: "/admin/pricing", icon: DollarSign }] : []),
        { name: "Locations", href: "/admin/locations", icon: MapPin },
        ...(FEATURE_FLAGS.ENABLE_PROMOTIONS ? [{ name: "Promotions", href: "/admin/promotions", icon: Tag }] : []),
        ...(FEATURE_FLAGS.ENABLE_SUPPORT ? [{ name: "Support", href: "/admin/support", icon: LifeBuoy }] : []),
    ];

    return (
        <div className="min-h-screen bg-background flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 flex flex-col transition-colors">
                <div className="p-6 flex justify-start">
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
                        const Icon = item.icon;
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
                                <Icon size={20} className={isActive ? "text-white dark:text-slate-900" : "text-slate-500"} />
                                <span className="font-medium">{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>


                <div className="p-4 space-y-2">
                    <ModeToggle />
                    <button
                        onClick={() => signOut({ callbackUrl: "/admin/login" })}
                        className="flex items-center gap-3 px-4 py-3 w-full text-left text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors border border-transparent hover:border-red-100 dark:hover:border-red-900/30"
                    >
                        <LogOut size={20} />
                        <span className="font-medium">Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto">
                <div className="px-8 pb-8 pt-[60px] max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
