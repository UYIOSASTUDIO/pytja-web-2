import type { Metadata } from "next";
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

export const metadata: Metadata = {
    title: "Pytja - Database Exploration",
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