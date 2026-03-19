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
    themeColor: "#ffffff",
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    viewportFit: "cover",
};

// --- METADATA KONFIGURATION ---
export const metadata: Metadata = {
    title: "Pytja | Enterprise Engine",
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
        {/* WICHTIG: Keine statische Hintergrundfarbe (bg-[...]) auf dem Body!
              Die Hintergrundlogik wird komplett über die globals.css (iOS-Fix)
              und die jeweiligen Seiten-Wrapper gesteuert.
            */}
        <body className="text-white selection:bg-white selection:text-black antialiased">
        <ClientLayout>
            {children}
        </ClientLayout>
        </body>
        </html>
    );
}