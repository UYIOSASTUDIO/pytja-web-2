"use client";
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, LayoutGroup } from 'framer-motion';

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

    // --- MOBILE PORTAL NAV ---
    const mobileBottomBar = (
        <div className="lg:hidden fixed bottom-6 left-0 right-0 z-[9999] flex justify-center pointer-events-none px-6">
            <div className="pointer-events-auto flex w-full max-w-sm justify-between p-1.5 bg-white/90 backdrop-blur-xl border border-black/10 rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
                <LayoutGroup id="legal-mobile-toggle">
                    {links.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`relative flex-1 py-3 text-[10px] font-bold uppercase tracking-widest rounded-full transition-colors duration-300 text-center ${
                                    isActive ? 'text-black' : 'text-gray-400 hover:text-black'
                                }`}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="activeLegalMobile"
                                        className="absolute inset-0 bg-black/5 rounded-full"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
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

    if (!mounted) return null;

    return (
        <div className="relative min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white">

            {createPortal(mobileBottomBar, document.body)}

            <main className="relative z-10 pt-32 pb-48 md:pt-40">

                {/* --- 1. HERO HEADER (Analog zur Manual Page) --- */}
                <div className="w-full">
                    <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24">
                        <div className="py-16 md:py-8 md:px-8 lg:px-12">
                            <h1 className="text-4xl md:text-5xl lg:text-[56px] font-medium tracking-tight text-black mb-6 leading-[1.1]">
                                Legal Documents
                            </h1>
                            <p className="text-[15px] md:text-[16px] text-gray-500 max-w-2xl font-light leading-relaxed">
                                Pytja operates under a strict transparency protocol. Our legal framework ensures zero-trust compliance and protects sovereign data integrity.
                            </p>
                        </div>
                    </div>
                </div>

                {/* --- 2. GRID SPLIT ROW (Sidebar & Content) --- */}
                {/* border-y erzeugt die durchgehende horizontale Linie unter dem Hero UND als Abschluss unten */}
                <section className="w-full border-y border-black/10 relative z-20 mt-8" style={{ clipPath: 'inset(0)' }}>
                    <div className="max-w-[1600px] mx-auto px-0 md:px-12 lg:px-24 flex flex-col md:flex-row md:divide-x divide-black/10">

                        {/* LEFT COLUMN: Sticky Navigation Sidebar */}
                        {/* Der 'before' Trick sorgt dafür, dass der Hintergrund links endlos weiterläuft */}
                        <div className="hidden md:block md:w-1/3 lg:w-1/4 p-6 md:p-8 lg:p-12 relative border-b md:border-b-0 border-black/10 z-0 before:absolute before:inset-y-0 before:right-0 before:w-[100vw] before:bg-black/[0.01] before:-z-10">
                            <div className="md:sticky md:top-32 flex flex-col gap-12 transform-gpu">
                                <span className="text-[10px] text-gray-400 font-mono uppercase tracking-widest">
                                    Document Index
                                </span>

                                <nav className="flex flex-col gap-6">
                                    <LayoutGroup id="legal-desktop-nav">
                                        {links.map((link) => {
                                            const isActive = pathname === link.href;
                                            return (
                                                <Link
                                                    key={link.href}
                                                    href={link.href}
                                                    className="group flex items-center gap-4 cursor-pointer"
                                                >
                                                    <div className="w-1.5 flex items-center justify-center h-6 shrink-0">
                                                        {isActive ? (
                                                            <motion.div
                                                                layoutId="activeLegalIndicator"
                                                                className="w-1.5 bg-black rounded-full"
                                                                initial={{ height: "6px" }}
                                                                animate={{ height: "24px" }}
                                                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                                            />
                                                        ) : (
                                                            <div className="w-1 h-1 bg-black/10 rounded-full group-hover:bg-black/20 transition-colors" />
                                                        )}
                                                    </div>
                                                    <span className={`text-[12px] md:text-[13px] font-bold uppercase tracking-widest transition-colors duration-300 ${
                                                        isActive ? 'text-black' : 'text-gray-400 group-hover:text-black'
                                                    }`}>
                                                        {link.label}
                                                    </span>
                                                </Link>
                                            );
                                        })}
                                    </LayoutGroup>
                                </nav>

                                {/* Sidebar Status Badge */}
                                <div className="pt-12 border-t border-black/10">
                                    <div className="p-4 bg-white border border-black/5 rounded-xl shadow-sm overflow-hidden relative">
                                        <div className="absolute top-0 right-0 p-2">
                                            <div className="relative flex items-center justify-center w-2 h-2 shrink-0">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                                                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-rose-500"></span>
                                            </div>
                                        </div>
                                        <div className="text-[9px] text-gray-500 font-mono leading-relaxed uppercase tracking-widest">
                                            <span className="text-black font-bold">Standard Protocol</span><br/>
                                            Verified: March 2026<br/>
                                            Status: Active
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT COLUMN: Content Area */}
                        <div className="w-full md:w-2/3 lg:w-3/4 flex flex-col p-6 md:p-8 lg:p-12">
                            <div className="max-w-3xl animate-in fade-in slide-in-from-bottom-4 duration-700">
                                {children}
                            </div>
                        </div>

                    </div>
                </section>
            </main>
        </div>
    );
}