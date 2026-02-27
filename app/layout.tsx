import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import ClientLayout from "./components/layout/ClientLayout";

const fontSans = Inter({
    subsets: ["latin"],
    variable: "--font-geist-sans",
    display: "swap",
});

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
    description: "Secure, in-memory database client built with Rust.",
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