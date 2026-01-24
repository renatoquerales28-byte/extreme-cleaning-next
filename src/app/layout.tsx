import type { Metadata } from "next";
import { Open_Sans } from "next/font/google"; // Using Open Sans as requested
import "./globals.css";

const openSans = Open_Sans({
    subsets: ["latin"],
    variable: "--font-opensans",
});

export const metadata: Metadata = {
    title: "Extreme Cleaning | Spokane's Premium Cleaning Service",
    description: "Experience the next level of clean with our premium residential and commercial cleaning wizard.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${openSans.variable} font-opensans antialiased`}>
                <main className="relative z-10 min-h-screen">
                    {children}
                </main>
            </body>
        </html>
    );
}
