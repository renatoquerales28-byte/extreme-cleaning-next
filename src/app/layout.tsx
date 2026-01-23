import type { Metadata } from "next";
// import { Outfit } from "next/font/google"; // This requires internet access to download fonts!
import "./globals.css";

// const outfit = Outfit({
//     subsets: ["latin"],
//     variable: "--font-outfit",
// });

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
            {/* <body className={`${outfit.variable} font-outfit antialiased`}> */}
            <body className={`font-sans antialiased`}>
                <div className="sentient-vignette" />
                <div className="sentient-grain" />
                <main className="relative z-10 min-h-screen">
                    {children}
                </main>
            </body>
        </html>
    );
}
