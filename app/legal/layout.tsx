"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

export default function LegalLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    const links = [
        { href: '/legal/imprint', label: 'Imprint' },
        { href: '/legal/privacy', label: 'Privacy' },
        { href: '/legal/terms', label: 'Terms' },
    ];

    return (
        // WICHTIG: pb-32 sorgt dafür, dass man den Text auch ganz unten noch lesen kann (hinter der Bar)
        <div className="relative min-h-screen bg-[#0D0D0D] text-white pt-32 pb-32 px-6 md:px-8">
            <div className="fixed inset-0 bg-grid opacity-20 pointer-events-none z-0" />

            <div className="max-w-6xl mx-auto relative z-10 grid lg:grid-cols-4 gap-12 lg:gap-24">

                {/* --- NAVIGATION COLUMN --- */}
                <aside className="lg:col-span-1">

                    {/* 1. MOBILE BOTTOM BAR (Floating) */}
                    {/* Fixed Bottom, zentriert, mit Glass-Effekt */}
                    <div className="lg:hidden fixed bottom-8 inset-x-6 z-50 flex justify-center">
                        <div className="flex w-full max-w-sm justify-between p-1.5 bg-[#0A0A0A]/90 backdrop-blur-xl border border-white/10 rounded-full shadow-[0_10px_40px_-10px_rgba(0,0,0,0.8)]">
                            {links.map((link) => {
                                const isActive = pathname === link.href;
                                return (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className={`relative flex-1 py-3 text-[10px] font-bold uppercase tracking-widest rounded-full transition-colors duration-300 text-center ${
                                            isActive ? 'text-black' : 'text-white/40 hover:text-white'
                                        }`}
                                    >
                                        {/* Der fliegende Hintergrund */}
                                        {isActive && (
                                            <motion.div
                                                layoutId="activeLegalMobile"
                                                className="absolute inset-0 bg-white rounded-full"
                                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                                style={{ zIndex: 0 }}
                                            />
                                        )}
                                        <span className="relative z-10">{link.label}</span>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    {/* 2. DESKTOP SIDEBAR (Visible >= lg) */}
                    <div className="hidden lg:block sticky top-32 space-y-8">
                        <div>
                            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white mb-6">Legal Documents</h3>
                            <nav className="flex flex-col space-y-1">
                                {links.map((link) => {
                                    const isActive = pathname === link.href;
                                    return (
                                        <Link
                                            key={link.href}
                                            href={link.href}
                                            className={`text-[10px] font-mono uppercase tracking-wider py-2 transition-colors border-l-2 pl-4 ${
                                                isActive
                                                    ? 'border-white text-white font-bold'
                                                    : 'border-white/10 text-white/40 hover:text-white hover:border-white/40'
                                            }`}
                                        >
                                            {link.label}
                                        </Link>
                                    );
                                })}
                            </nav>
                        </div>

                        <div className="p-4 bg-white/[0.02] border border-white/5 rounded text-[10px] text-white/30 font-mono leading-relaxed">
                            These documents govern the use of Pytja software and services.
                            <br/><br/>
                            Last Updated: <span className="text-white/60">2024-05-22</span>
                        </div>
                    </div>
                </aside>

                {/* --- CONTENT AREA --- */}
                <main className="lg:col-span-3 min-h-[50vh]">
                    <div className="prose prose-invert prose-sm max-w-none">
                        {children}
                    </div>
                </main>

            </div>
        </div>
    );
}