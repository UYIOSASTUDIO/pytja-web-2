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

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    // DAS IST DER WICHTIGE TEIL FÜR EDGE-TO-EDGE:
    viewportFit: 'cover',
    // ACHTUNG: themeColor wurde hier absichtlich komplett GELÖSCHT!
};

// --- METADATA KONFIGURATION ---
export const metadata: Metadata = {
    metadataBase: new URL("https://www.pytja.com"),
    title: "Pytja | Unified Data Layer",
    description: "Zero-trace native speed. Unify databases & extend via WASM.",
    // HIER NEU: Der Autor, den LinkedIn fordert
    authors: [{ name: "Pytja", url: "https://www.pytja.com" }],
    creator: "Pytja",
    publisher: "Pytja",
    openGraph: {
        title: "Pytja | Unified Data Layer",
        description: "Zero-trace native speed. Unify databases & extend via WASM.",
        url: "https://www.pytja.com",
        siteName: "Pytja",
        images: [
            {
                url: "https://www.pytja.com/opengraph-image.png",
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
        images: ["https://www.pytja.com/opengraph-image.png"],
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
        <body className="bg-black text-black selection:bg-black selection:text-white antialiased">
        <ClientLayout>
            {children}
        </ClientLayout>
        </body>
        </html>
    );
}