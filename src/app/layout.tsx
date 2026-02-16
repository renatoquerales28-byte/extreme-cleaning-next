import type { Metadata } from "next";
import { Open_Sans } from "next/font/google"; // Using Open Sans as requested
import "./globals.css";

const openSans = Open_Sans({
    subsets: ["latin"],
    variable: "--font-opensans",
});

export const metadata: Metadata = {
    title: {
        default: "Extreme Cleaning | Premium Cleaning Services in Spokane",
        template: "%s | Extreme Cleaning"
    },
    description: "Spokane's top-rated premium cleaning service. Expert residential, commercial, and property management cleaning specialized in deep restoration and turnover services.",
    keywords: ["cleaning services Spokane", "residential cleaning", "commercial cleaning", "deep cleaning", "post-construction cleaning", "property management turnover"],
    icons: {
        icon: "/brand/logo.png",
        apple: "/brand/logo.png",
    }
};

import { ThemeProvider } from "@/components/theme-provider"

// ... imports

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning className="scroll-smooth">
            <body className={`${openSans.variable} font-opensans antialiased snap-y snap-mandatory overflow-x-hidden`}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <main className="relative z-10 w-full">
                        {children}
                    </main>
                </ThemeProvider>
            </body>
        </html>
    );
}
