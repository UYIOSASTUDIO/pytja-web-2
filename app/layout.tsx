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
    metadataBase: new URL('https://pytja.com'), // Deine echte Domain hier eintragen!
    title: {
        default: "Pytja - Database Exploration",
        template: "%s | Pytja"
    },
    description: "Secure, in-memory database client built with Rust. Zero-trace architecture for sensitive data handling.",

    // Keywords für Suchmaschinen
    keywords: ["Rust", "Database Client", "Security", "In-Memory", "CLI", "Developer Tool"],

    // Open Graph (Facebook, Discord, LinkedIn Preview)
    openGraph: {
        title: "Pytja - Database Exploration",
        description: "Secure, in-memory database client built with Rust.",
        url: 'https://pytja.com',
        siteName: 'Pytja',
        locale: 'en_US',
        type: 'website',
        images: [
            {
                url: '/og-image.jpg', // Leg ein 1200x630px Bild in den public ordner
                width: 1200,
                height: 630,
                alt: 'Pytja CLI Interface',
            },
        ],
    },

    // Twitter Card
    twitter: {
        card: 'summary_large_image',
        title: "Pytja - Database Exploration",
        description: "Secure, in-memory database client built with Rust.",
        images: ['/og-image.jpg'], // Das gleiche Bild
    },

    // Icons
    icons: {
        icon: '/favicon.ico',
        // apple: '/apple-icon.png', // Optional: Für iPhones
    },
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        {/* HIER DIE SELECTION-KLASSEN HINZUFÜGEN */}
        <body className={`DeinFontName.className bg-[#0D0D0D] text-white selection:bg-white selection:text-black`}>
        <ClientLayout>
            {children}
        </ClientLayout>
        </body>
        </html>
    );
}