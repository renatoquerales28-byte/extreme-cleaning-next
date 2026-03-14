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
    description: "Spokane's top-rated premium cleaning service. Expert residential and commercial cleaning specialized in restoration services.",
    keywords: ["cleaning services Spokane", "residential cleaning", "commercial cleaning", "post-construction cleaning", "restoration cleaning"],
    authors: [{ name: "Extreme Cleaning Spokane" }],
    creator: "Extreme Cleaning Spokane",
    publisher: "Extreme Cleaning Spokane",
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    metadataBase: new URL('https://extremecleaning509.com'),
    alternates: {
        canonical: '/',
    },
    openGraph: {
        title: "Extreme Cleaning | Premium Cleaning Services in Spokane",
        description: "Spokane's top-rated premium cleaning service. Expert residential and commercial cleaning.",
        url: 'https://extremecleaning509.com',
        siteName: 'Extreme Cleaning',
        images: [
            {
                url: '/brand/logo-full.png',
                width: 1200,
                height: 630,
                alt: 'Extreme Cleaning Spokane',
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: "Extreme Cleaning | Premium Cleaning Services in Spokane",
        description: "Spokane's top-rated premium cleaning service. Expert residential and commercial cleaning.",
        images: ['/brand/logo-full.png'],
    },
    icons: {
        icon: "/brand/logo.png",
        apple: "/brand/logo.png",
    }
};

import { ThemeProvider } from "@/components/theme-provider"
import JsonLd from "@/components/landing/JsonLd";

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
                    <JsonLd />
                    <main className="relative z-10 w-full">
                        {children}
                    </main>
                </ThemeProvider>
            </body>
        </html>
    );
}
