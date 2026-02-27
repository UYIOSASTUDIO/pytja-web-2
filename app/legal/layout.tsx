"use client";
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, LayoutGroup } from 'framer-motion'; // <--- LayoutGroup importieren

export default function LegalLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [mounted, setMounted] = useState(false);

    const links = [
        { href: '/legal/imprint', label: 'Imprint' },
        { href: '/legal/privacy', label: 'Privacy' },
        { href: '/legal/terms', label: 'Terms' },
    ];

    useEffect(() => {
        setMounted(true);
    }, []);

    // --- DAS PORTAL MENÜ ---
    const mobileBottomBar = (
        <div className="lg:hidden fixed bottom-6 left-0 right-0 z-[9999] flex justify-center pointer-events-none px-6">
            <div className="pointer-events-auto flex w-full max-w-sm justify-between p-1.5 bg-[#0A0A0A]/90 backdrop-blur-xl border border-white/10 rounded-full shadow-[0_10px_40px_-10px_rgba(0,0,0,0.8)]">

                {/* LayoutGroup isoliert die Animationen, damit sie sich nicht mit Page-Transitions stören */}
                <LayoutGroup id="legal-mobile-nav">
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
                                {isActive && (
                                    <motion.div
                                        layoutId="activeLegalMobile"
                                        initial={false} // <--- WICHTIG: Verhindert den Sprung beim Laden/Scrollen
                                        className="absolute inset-0 bg-white rounded-full"
                                        // "Snappy" Settings statt weicher Duration
                                        transition={{
                                            type: "spring",
                                            stiffness: 300,
                                            damping: 30
                                        }}
                                        style={{ zIndex: 0 }}
                                    />
                                )}
                                <span className="relative z-10">{link.label}</span>
                            </Link>
                        );
                    })}
                </LayoutGroup>

            </div>
        </div>
    );

    return (
        <div className="relative min-h-screen bg-[#0D0D0D] text-white pt-32 pb-32 px-6 md:px-8">
            <div className="fixed inset-0 bg-grid opacity-20 pointer-events-none z-0" />

            {mounted && createPortal(mobileBottomBar, document.body)}

            <div className="max-w-6xl mx-auto relative z-10 grid lg:grid-cols-4 gap-12 lg:gap-24">

                {/* --- DESKTOP SIDEBAR --- */}
                <aside className="hidden lg:col-span-1 lg:block">
                    <div className="sticky top-32 space-y-8">
                        <div>
                            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white mb-6">Legal Documents</h3>

                            <nav className="flex flex-col relative space-y-2">
                                <LayoutGroup id="legal-desktop-nav">
                                    {links.map((link) => {
                                        const isActive = pathname === link.href;
                                        return (
                                            <Link
                                                key={link.href}
                                                href={link.href}
                                                className={`relative block px-4 py-3 text-[10px] font-mono uppercase tracking-widest transition-colors ${
                                                    isActive ? 'text-white' : 'text-white/40 hover:text-white'
                                                }`}
                                            >
                                                {/* Der fliegende Hintergrund für Desktop */}
                                                {isActive && (
                                                    <motion.div
                                                        layoutId="activeLegalDesktop"
                                                        initial={false}
                                                        className="absolute inset-0 bg-white/[0.03] border border-white/10 rounded-sm"
                                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                                        style={{ zIndex: 0 }}
                                                    />
                                                )}
                                                {/* Text ohne den Pfeil */}
                                                <span className="relative z-10">
                                                    {link.label}
                                                </span>
                                            </Link>
                                        );
                                    })}
                                </LayoutGroup>
                            </nav>
                        </div>

                        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-sm text-[10px] text-white/30 font-mono leading-relaxed mt-12">
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