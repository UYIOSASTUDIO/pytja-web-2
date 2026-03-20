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
    metadataBase: new URL("https://pytja.com"),
    title: "Pytja | Unified Data Layer",
    description: "Zero-trace native speed. Unify databases & extend via WASM.",
    openGraph: {
        title: "Pytja | Unified Data Layer",
        description: "Zero-trace native speed. Unify databases & extend via WASM.",
        url: "https://pytja.com",
        siteName: "Pytja",
        images: [
            {
                url: "@/public/opengraph-image.png",
                width: 1200,
                height: 630,
                alt: "Pytja | Unified Data Layer",
            }
        ],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Pytja | Unified Data Layer",
        description: "Zero-trace native speed. Unify databases & extend via WASM.",
        images: ["@/public/opengraph-image.png"],
        creator: "@pytja",
    },
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