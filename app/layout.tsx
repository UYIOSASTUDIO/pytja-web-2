import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import ClientLayout from "./components/layout/ClientLayout";

const fontSans = Inter({
    subsets: ["latin"],
    variable: "--font-geist-sans",
});

const fontMono = JetBrains_Mono({
    subsets: ["latin"],
    variable: "--font-geist-mono",
});

// --- VIEWPORT KONFIGURATION ---
export const viewport: Viewport = {
    themeColor: "#000000", // Zwingt die iOS/Android Statusleiste auf das Pytja-Schwarz
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    viewportFit: "cover",
};

// --- METADATA KONFIGURATION ---
export const metadata: Metadata = {
    title: "Pytja | Unified Data Layer",
    description: "Zero-trace native speed. Unify databases & extend via WASM.",
    appleWebApp: {
        capable: true,
        title: "Pytja",
        statusBarStyle: "black-translucent",
    },
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={`${fontSans.variable} ${fontMono.variable}`}>
        <body className="text-white selection:bg-white selection:text-black antialiased">
        <ClientLayout>
            {children}
        </ClientLayout>
        </body>
        </html>
    );
}