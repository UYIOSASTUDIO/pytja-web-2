import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";

const geistMono = Geist_Mono({
    subsets: ["latin"],
    variable: "--font-geist-mono",
});

export const metadata: Metadata = {
    title: "PYTJA | Isolated Database Sandbox",
    description: "Enterprise Rust-powered security engine.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="de" className="scroll-smooth">
        <body
            className={`${geistMono.variable} font-mono antialiased selection:bg-[#F46623] selection:text-white min-h-screen overflow-x-hidden`}
        >
        {children}
        </body>
        </html>
    );
}
