import type { Metadata } from "next";
// import localFont from "next/font/local"; // <-- Das entfernen wir vorerst
import { Inter, JetBrains_Mono } from "next/font/google"; // <-- Google Fonts Import
import "./globals.css";
import ClientLayout from "./components/layout/ClientLayout";

// 1. Wir laden "Inter" als Sans-Serif (Standard Text)
// Wir nennen die Variable aber weiterhin "--font-geist-sans", damit Tailwind nicht kaputt geht.
const fontSans = Inter({
    subsets: ["latin"],
    variable: "--font-geist-sans",
    display: "swap",
});

// 2. Wir laden "JetBrains Mono" als Monospace (Code/Terminal)
// Das passt perfekt zum "Pytja"-Hacker-Look.
const fontMono = JetBrains_Mono({
    subsets: ["latin"],
    variable: "--font-geist-mono",
    display: "swap",
});

export const metadata: Metadata = {
    title: "Pytja - Database Exploration",
    description: "Secure, in-memory database client built with Rust.",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        {/* Hier fügen wir die Google-Font Variablen in den Body ein */}
        <body className={`${fontSans.variable} ${fontMono.variable} antialiased bg-[#0D0D0D] text-white`}>
        <ClientLayout>
            {children}
        </ClientLayout>
        </body>
        </html>
    );
}