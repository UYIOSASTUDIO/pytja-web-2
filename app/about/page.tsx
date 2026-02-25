"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function AboutPage() {
    const [mounted, setMounted] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        setMounted(true);
        const handleResize = () => {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    if (!mounted) return null;

    return (
        <div className="relative min-h-screen bg-[#0D0D0D] text-white font-mono overflow-x-hidden selection:bg-white/20">
            <style jsx global>{`
                html { overflow-y: auto; overflow-x: hidden; height: auto; }
                body { background-color: #0D0D0D; min-height: 100vh; position: relative; }
            `}</style>

            <div className="fixed inset-0 bg-grid opacity-20 pointer-events-none z-0" />

            {/* --- MOBILE OVERLAY --- */}
            <div className={`fixed inset-0 z-[140] bg-[#050505] lg:hidden transition-all duration-500 ease-in-out flex flex-col ${isMobileMenuOpen ? 'opacity-100 translate-y-0 pointer-events-auto visible' : 'opacity-0 -translate-y-4 pointer-events-none invisible'}`} style={{ height: 'calc(var(--vh, 1vh) * 100)' }}>
                <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none z-0" />
                <div className="relative z-10 flex flex-col h-full pt-32 px-10 gap-12 overflow-y-auto">
                    <nav className="flex flex-col gap-8 shrink-0">
                        {['Home', 'Architecture', 'Modularity', 'Stats'].map((item) => (
                            <Link key={item} href={`/#${item.toLowerCase()}`} onClick={() => setIsMobileMenuOpen(false)} className="text-3xl font-bold tracking-tighter text-white/40 hover:text-white flex items-baseline gap-4">
                                <span className="text-[10px] font-mono text-white/10">01</span>{item}
                            </Link>
                        ))}
                    </nav>
                    <div className="mt-auto pb-24 flex flex-col gap-4 shrink-0">
                        <Link href="/contact" className="w-full py-4 text-center text-[10px] font-bold uppercase border border-white/5 text-white/40">Contact Support</Link>
                        <Link href="/dashboard" className="w-full py-5 text-center text-[10px] font-bold uppercase bg-white text-black">Open Terminal</Link>
                    </div>
                </div>
            </div>

            {/* --- MAIN CONTENT --- */}
            <main className="relative z-10 pt-32 pb-20 px-6 md:px-8 max-w-5xl mx-auto min-h-[90vh]">

                {/* 1. PROJECT SECTION */}
                <div className="space-y-24">

                    {/* Header */}
                    <div className="text-center space-y-6">
                        <div className="inline-flex items-center gap-2 border border-white/10 bg-white/[0.02] px-3 py-1 rounded-full">
                            {/* NEW ANIMATION: White Square Pulse */}
                            <div className="relative flex items-center justify-center w-2 h-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-sm bg-white/40 opacity-75"></span>
                                <span className="relative inline-flex rounded-sm h-1.5 w-1.5 bg-white/80"></span>
                            </div>
                            <span className="text-[9px] uppercase tracking-[0.3em] text-white/60">Mission Brief</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase text-white">
                            The Pytja <span className="text-white/30">Manifesto</span>
                        </h1>
                    </div>

                    {/* Mission Text */}
                    <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start border-l border-white/10 pl-4 md:pl-16 ml-0 md:ml-0">
                        <div className="space-y-6">
                            <h3 className="text-xl font-bold text-white uppercase tracking-widest">The Problem</h3>
                            <p className="text-sm text-[#888] leading-relaxed font-light">
                                Modern database clients are bloated. They cache gigabytes of data on your local SSD, leave temporary files in hidden directories, and rely on heavy Electron wrappers. In high-security environments, every written byte is a potential liability.
                            </p>
                        </div>
                        <div className="space-y-6">
                            <h3 className="text-xl font-bold text-white uppercase tracking-widest">The Solution</h3>
                            <p className="text-sm text-[#888] leading-relaxed font-light">
                                Pytja is built on a single premise: <span className="text-white font-medium">Memory is the only safe storage.</span> We utilize Rust's strict ownership model to ensure that data fetched from your production DB exists solely in RAM. When you close the terminal, the data is gone. Forever. Zero trace.
                            </p>
                        </div>
                    </div>

                    {/* Tech Stack Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 border border-white/10">
                        {[
                            { name: "Rust", role: "Core Logic" },
                            { name: "Tokio", role: "Async Runtime" },
                            { name: "gRPC", role: "Transport" },
                            { name: "Next.js", role: "Frontend" }
                        ].map((tech) => (
                            <div key={tech.name} className="bg-[#0A0A0A] p-8 flex flex-col justify-between h-32 group hover:bg-[#111] transition-colors">
                                <span className="text-[10px] text-white/30 uppercase tracking-widest group-hover:text-white/60">{tech.role}</span>
                                <span className="text-lg font-bold text-white tracking-tight">{tech.name}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 2. AUTHOR SECTION */}
                <div className="mt-40 space-y-16">
                    <div className="flex items-center gap-4">
                        <div className="h-px flex-1 bg-white/10" />
                        <span className="text-[10px] uppercase tracking-[0.3em] text-white/40">The Architect</span>
                        <div className="h-px flex-1 bg-white/10" />
                    </div>

                    <div className="max-w-3xl mx-auto bg-[#0A0A0A] border border-white/10 p-8 md:p-12 relative overflow-hidden group">
                        {/* Decorative Background Pattern */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/[0.02] rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                        <div className="relative z-10 flex flex-col md:flex-row gap-10 items-center md:items-start text-center md:text-left">

                            {/* Avatar Placeholder */}
                            <div className="w-24 h-24 shrink-0 rounded-full border-2 border-white/10 bg-white/[0.02] flex items-center justify-center">
                                <span className="text-2xl font-bold text-white/20">ES</span>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <h2 className="text-2xl font-bold text-white uppercase tracking-tight">Elias Schmolke</h2>
                                    <p className="text-[10px] text-white/40 uppercase tracking-widest mt-1">Full Stack Engineer & Security Researcher</p>
                                </div>

                                <p className="text-sm text-[#888] leading-relaxed font-light">
                                    Ich entwickle Software an der Schnittstelle zwischen Performance und Sicherheit. Pytja entstand aus dem Bedürfnis heraus, Datenbanken in sensiblen Umgebungen ohne digitalen Fußabdruck zu analysieren.
                                </p>

                                {/* Social Links */}
                                <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-4">
                                    <a href="https://github.com/uyiosastudio" target="_blank" rel="noopener noreferrer" className="px-4 py-2 border border-white/10 bg-white/[0.02] text-[10px] font-bold uppercase tracking-widest text-white/60 hover:text-white hover:bg-white/5 transition-all rounded-sm flex items-center gap-2">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                                        GitHub
                                    </a>
                                    <a href="mailto:contact@pytja.com" className="px-4 py-2 border border-white/10 bg-white/[0.02] text-[10px] font-bold uppercase tracking-widest text-white/60 hover:text-white hover:bg-white/5 transition-all rounded-sm flex items-center gap-2">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                                        Email
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </main>
        </div>
    );
}