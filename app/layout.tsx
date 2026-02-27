import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import ClientLayout from "./components/layout/ClientLayout";

// 1. Inter als Sans-Serif laden
const fontSans = Inter({
    subsets: ["latin"],
    variable: "--font-geist-sans",
    display: "swap",
});

// 2. JetBrains Mono für den Terminal-Look laden
const fontMono = JetBrains_Mono({
    subsets: ["latin"],
    variable: "--font-geist-mono",
    display: "swap",
});

export const metadata: Metadata = {
    metadataBase: new URL('https://pytja.com'),
    title: {
        default: "Pytja - Database Exploration",
        template: "%s | Pytja"
    },
    description: "Secure, in-memory database client built with Rust. Zero-trace architecture for sensitive data handling.",
    keywords: ["Rust", "Database Client", "Security", "In-Memory", "CLI", "Developer Tool"],
    openGraph: {
        title: "Pytja - Database Exploration",
        description: "Secure, in-memory database client built with Rust.",
        url: 'https://pytja.com',
        siteName: 'Pytja',
        locale: 'en_US',
        type: 'website',
        images: [
            {
                url: '/og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'Pytja CLI Interface',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: "Pytja - Database Exploration",
        description: "Secure, in-memory database client built with Rust.",
        images: ['/og-image.jpg'],
    },
    icons: {
        icon: '/favicon.ico',
    },
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" className={`${fontSans.variable} ${fontMono.variable}`}>
        <body className="bg-[#0D0D0D] text-white selection:bg-white selection:text-black antialiased">
        <ClientLayout>
            {children}
        </ClientLayout>
        </body>
        </html>
    );
}