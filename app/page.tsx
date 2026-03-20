"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { changelogData } from '@/lib/changelog';

// --- DATEN FÜR DIE ARCHITEKTUR ---
const archSteps = [
    {
        id: 1,
        title: "Unify Your Storage.",
        desc: "Link various database types and object storages into one unified, high-performance CLI. Pytja acts as a universal bridge, allowing you to manage disparate data sources from a single environment without complex local configurations.",
        stepTitle: "Connect Source",
        link: { text: "View supported databases", href: "/about" }
    },
    {
        id: 2,
        title: "Explore with Native Speed.",
        desc: "Navigate, query, and stream your data instantly. Backed by a concurrent Rust engine, Pytja transfers files via gRPC in optimized 64-KB chunks for absolute memory stability.",
        stepTitle: "Operate Data"
    },
    {
        id: 3,
        title: "Absolute Host Isolation.",
        desc: "Run operations without cluttering your local machine. Every command executes in a deterministic sandbox, ensuring zero disk traces, no temporary hidden files, and complete environment safety.",
        stepTitle: "Stateless Execution"
    }
];

export default function PytjaLanding() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Fix für mobile Adressleiste (Buttons sichtbar machen)
    useEffect(() => {
        const handleResize = () => {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        };
        handleResize(); // Initial aufrufen
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="relative min-h-screen bg-white font-sans selection:bg-black selection:text-white">

            {/* GRID ENTFERNT FÜR ABSOLUT CLEANEN LOOK */}

            {/* MOBILE DROPDOWN OVERLAY */}
            <div
                className={`fixed inset-0 z-[140] bg-white lg:hidden transition-all duration-500 ease-in-out flex flex-col ${
                    isMobileMenuOpen
                        ? 'opacity-100 translate-y-0 pointer-events-auto visible'
                        : 'opacity-0 -translate-y-4 pointer-events-none invisible'
                }`}
                style={{ height: 'calc(var(--vh, 1vh) * 100)' }}
            >
                {/* GRID AUCH HIER ENTFERNT */}

                <div className="relative z-10 flex flex-col h-full pt-32 px-10 gap-12 overflow-y-auto">
                    <nav className="flex flex-col gap-8 shrink-0">
                        {[
                            { name: 'Home', id: 'home' },
                            { name: 'Architecture', id: 'architecture' },
                            { name: 'Modularity', id: 'modularity' },
                            { name: 'Stats', id: 'stats' }
                        ].map((item, i) => (
                            <a
                                key={item.id}
                                href={`#${item.id}`}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`text-3xl font-bold tracking-tighter transition-all duration-700 delay-100 flex items-baseline gap-4 ${
                                    isMobileMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
                                }`}
                                style={{ transitionDelay: `${i * 50 + 200}ms` }}
                            >
                                <span className="text-[10px] font-mono text-black/20">0{i+1}</span>
                                <span className="text-black/60 hover:text-black">{item.name}</span>
                            </a>
                        ))}
                    </nav>
                    <div className={`mt-auto pb-24 flex flex-col gap-4 shrink-0 transition-all duration-700 delay-500 ${
                        isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                    }`}>
                        <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="w-full py-4 text-center text-[10px] font-bold uppercase tracking-[0.3em] text-black/60 border border-black/10">
                            Contact Support
                        </Link>
                        <Link href="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="w-full py-5 text-center text-[10px] font-bold uppercase tracking-[0.3em] bg-black text-white relative">
                            Open Terminal
                        </Link>
                    </div>
                </div>
            </div>

            <main className="relative z-10">

                {/* --- HERO SECTION (Responsive Layout) --- */}
                <section id="home" className="pt-32 md:pt-48 pb-20 md:pb-32 px-6 md:px-8 max-w-6xl mx-auto min-h-[90vh] flex flex-col items-center justify-center text-center">
                    <div className="w-full flex flex-col items-center">

                        {/* --- 3D VISUAL MOBILE (Animiert, OBEN) --- */}
                        <div className="relative flex items-center justify-center h-[300px] w-full lg:hidden mb-8 z-10">
                            <div className="transform scale-[0.7] sm:scale-[0.85] z-10">
                                <Hero3DVisualMobile />
                            </div>
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.03)_0%,transparent_60%)] pointer-events-none z-0" />
                        </div>

                        {/* --- CONTENT (Zentral) --- */}
                        {/* w-full hinzugefügt, damit der Container die volle Breite nutzt */}
                        <div className="space-y-6 md:space-y-8 flex flex-col items-center relative z-20 w-full">

                            {/* Prerelease Tag */}
                            <div className="text-[9px] md:text-[10px] text-gray-500 font-mono tracking-[0.4em] uppercase flex items-center justify-center gap-4">
                                <div className="relative flex items-center justify-center w-2 h-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-sm bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-sm h-1.5 w-1.5 bg-emerald-500"></span>
                                </div>
                                <span>Prerelease V1 [Stable]</span>
                            </div>

                            {/* Haupt-Statement: Kleinere Schrift auf Mobile (text-3xl) und text-balance für perfekte Zeilenumbrüche */}
                            <h1 className="w-full text-3xl sm:text-5xl lg:text-[56px] font-bold leading-[1.1] tracking-tight text-black max-w-5xl mx-auto text-balance px-2 md:px-0">
                                Zero-trace native speed. <br className="hidden md:block" /> Unify databases & extend via WASM.
                            </h1>

                            {/* Subtext für den zusätzlichen Kontext: px-4 entfernt, max-w leicht erhöht für besseren Umbruch */}
                            <p className="w-full text-sm md:text-base text-gray-500 max-w-2xl font-light leading-relaxed mx-auto">
                                Pytja is a universal, high-performance CLI to manage disparate data sources from a single, isolated environment.
                            </p>
                        </div>

                        {/* --- BUTTON --- */}
                        <div className="flex justify-center pt-10 relative z-20">
                            <Link
                                href="/download"
                                // HIER NEU: rounded-md für die leicht abgerundeten Ecken
                                className="group flex items-center border border-black/10 bg-black/[0.02] px-8 md:px-12 py-4 md:py-5 transition-all duration-500 hover:bg-black/[0.05] hover:border-black/30 w-fit cursor-pointer relative overflow-hidden rounded-md"
                            >
                                <div className="absolute inset-0 bg-gradient-to-tr from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <span className="text-[10px] text-black font-bold tracking-[0.3em] uppercase relative z-10">
                                    Download Now
                                </span>
                                <div className="flex items-center justify-end w-0 opacity-0 overflow-hidden transition-all duration-500 group-hover:w-6 group-hover:opacity-100 group-hover:ml-3 relative z-10">
                                    <svg className="w-3 h-3 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="square" strokeWidth="2" d="M5 12h14m-7-7 7 7-7 7" />
                                    </svg>
                                </div>
                            </Link>
                        </div>

                        {/* --- 3D VISUAL DESKTOP (Statisch mit Labels, UNTEN) --- */}
                        <div className="hidden lg:flex relative items-center justify-center h-[400px] w-full mt-24 z-10">
                            <Hero3DVisualDesktop />
                        </div>

                    </div>
                </section>

                {/* --- TERMINAL DEMO SECTION --- */}
                <section id="demo" className="py-24 md:py-32 w-full bg-white relative z-20 border-t border-black/10">
                    <div className="max-w-5xl mx-auto px-6 md:px-8 flex flex-col items-center">

                        <div className="text-[10px] text-gray-400 tracking-[0.3em] mb-6 uppercase font-bold text-center">
                            Live Environment
                        </div>

                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-black text-center mb-16 max-w-3xl">
                            Operate disparate data like a local file system.
                        </h2>

                        {/* Der Terminal Container */}
                        <div className="w-full max-w-3xl rounded-xl overflow-hidden bg-[#0a0a0a] border border-black/10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)]">
                            {/* Mac-Style Header des Terminals */}
                            <div className="h-10 bg-[#1a1a1a] flex items-center px-4 gap-2 border-b border-white/5">
                                <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                                <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                                <div className="ml-4 text-[10px] font-mono text-gray-400">pytja-core — bash — 80x24</div>
                            </div>

                            {/* Das eigentliche Terminal Fenster */}
                            <div className="p-6 md:p-8 min-h-[350px] font-mono text-xs md:text-sm">
                                <TerminalSimulator />
                            </div>
                        </div>

                    </div>
                </section>

                {/* --- ARCHITECTURE SECTION (Kompaktes Enterprise Layout) --- */}
                <section id="architecture" className="w-full bg-white relative z-20">

                    <div className="w-full border-y border-black/10">

                        {/* HIER GEÄNDERT: px-0 auf Mobile (das Padding kommt durch die inneren Boxen). md:px-12 und lg:px-24 bleiben für Desktop. */}
                        <div className="grid grid-cols-1 lg:grid-cols-10 divide-y lg:divide-y-0 lg:divide-x divide-black/10 max-w-[1600px] mx-auto px-0 md:px-12 lg:px-24">

                            {/* LINKE BOX */}
                            {/* HIER GEÄNDERT: p-6 auf Mobile, ab md:p-8 und lg:p-12 */}
                            <div className="lg:col-span-4 p-6 md:p-8 lg:p-12 flex flex-col justify-between min-h-[280px] lg:min-h-[340px]">
                                <div className="mb-8 lg:mb-0">
                                    <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-black/[0.03] to-transparent border border-black/10 rounded-lg shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
                                        <svg className="w-5 h-5 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                            <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                                            <polyline points="2 12 12 17 22 12"></polyline>
                                            <polyline points="2 17 12 22 22 17"></polyline>
                                        </svg>
                                    </div>
                                </div>

                                <div>
                                    <h2 className="text-2xl md:text-3xl font-medium tracking-tight text-black mb-3">
                                        Unify Your Storage
                                    </h2>

                                    <p className="text-[14px] md:text-[15px] text-gray-500 leading-relaxed max-w-md mb-6">
                                        Link various databases and object storages into one unified, high-performance CLI without complex local configurations.
                                    </p>

                                    <Link href="/about" className="group inline-flex items-center gap-2 text-[13px] font-medium text-black transition-all w-fit border-b border-black/20 pb-0.5 hover:text-gray-600 hover:border-gray-600">
                                        View supported databases
                                        <span className="transform transition-transform duration-300 group-hover:translate-x-1">→</span>
                                    </Link>
                                </div>
                            </div>

                            {/* MITTLERE BOX */}
                            {/* HIER GEÄNDERT: p-6 auf Mobile, ab md:p-8 und lg:p-12 */}
                            <div className="lg:col-span-3 p-6 md:p-8 lg:p-12 flex flex-col justify-between min-h-[220px] lg:min-h-[340px]">
                                <div className="mb-8 lg:mb-0">
                                    <svg className="w-5 h-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-[16px] font-medium tracking-tight text-black mb-2">
                                        Native Speed
                                    </h3>
                                    <p className="text-[14px] text-gray-500 leading-relaxed">
                                        Navigate and query instantly. Backed by Redis session validation and a concurrent Rust engine, transferring data via gRPC in 64-KB chunks.
                                    </p>
                                </div>
                            </div>

                            {/* RECHTE BOX */}
                            {/* HIER GEÄNDERT: p-6 auf Mobile, ab md:p-8 und lg:p-12 */}
                            <div className="lg:col-span-3 p-6 md:p-8 lg:p-12 flex flex-col justify-between min-h-[220px] lg:min-h-[340px]">
                                <div className="mb-8 lg:mb-0">
                                    <svg className="w-5 h-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-[16px] font-medium tracking-tight text-black mb-2">
                                        Host Isolation
                                    </h3>
                                    <p className="text-[14px] text-gray-500 leading-relaxed">
                                        Deterministic execution guarantees zero disk traces. Operations run in a strict WASI sandbox, ensuring no hidden temporary files and absolute host safety.
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>

                {/* --- MODULARITY SECTION (VoidZero Style / 10-Col Grid) --- */}
                <section data-theme="dark" id="modularity" className="w-full bg-[#0a0a0a] relative z-20 border-t border-white/10">
                    <div className="w-full max-w-[1600px] mx-auto">

                        {/* Oberer Bereich: Großer Header (Padding massiv vergrößert für maximalen Fokus) */}
                        <div className="px-6 md:px-12 lg:px-36 pt-32 pb-24 lg:pt-48 lg:pb-32">
                            <h2 className="text-4xl md:text-5xl lg:text-[64px] font-medium tracking-tight text-white mb-6 leading-[1.05]">
                                Modular by Design.
                            </h2>
                            <p className="text-[16px] md:text-[18px] text-gray-400 max-w-2xl leading-relaxed font-light">
                                Bring your own logic to the data. Pytja’s WebAssembly architecture allows you to extend the CLI with custom, ephemeral plugins that process information on the fly.
                            </p>
                        </div>

                        {/* Unterer Bereich: 2-Spalten Grid (Text links, Bild rechts) */}
                        {/* HIER GEÄNDERT: grid-cols-10 und identisches Padding zur Architecture-Section */}
                        <div className="grid grid-cols-1 lg:grid-cols-10 border-t border-white/10 divide-y lg:divide-y-0 lg:divide-x divide-white/10 px-0 md:px-12 lg:px-24">

                            {/* LINKE SPALTE: Text & Button (4 von 10 Spalten) */}
                            {/* Inneres Padding exakt wie in der linken Architecture-Box (p-6 md:p-8 lg:p-12) */}
                            <div className="lg:col-span-4 p-6 md:p-8 lg:p-12 flex flex-col justify-between min-h-[350px]">
                                <div>
                                    <div className="text-[10px] text-gray-500 tracking-[0.2em] uppercase mb-6 font-mono">
                                        WASM Execution
                                    </div>
                                    <h3 className="text-2xl md:text-3xl font-medium tracking-tight text-white mb-4">
                                        Transform on the fly
                                    </h3>
                                    <p className="text-[14px] md:text-[15px] text-gray-400 leading-relaxed">
                                        Compile your business logic to WebAssembly and inject it directly into the data stream. Pytja executes your hooks in a strict sandbox, guaranteeing absolute memory safety and zero host leakage.
                                    </p>
                                </div>

                                <div className="mt-12 lg:mt-0">
                                    <Link
                                        href="/modules"
                                        className="group inline-flex items-center gap-2 text-[13px] font-medium text-white transition-all w-fit border-b border-white/30 pb-0.5 hover:text-gray-300 hover:border-gray-300"
                                    >
                                        Explore Ecosystem
                                        <span className="transform transition-transform duration-300 group-hover:translate-x-1">→</span>
                                    </Link>
                                </div>
                            </div>

                            {/* RECHTE SPALTE: Grafik / Bild Area (6 von 10 Spalten) */}
                            <div className="lg:col-span-6 relative min-h-[300px] lg:min-h-[450px] bg-gradient-to-br from-[#111] to-[#050505] overflow-hidden flex items-center justify-center p-8">

                                {/* Temporärer Platzhalter für Spline-3D oder Bild */}
                                <div className="text-center relative z-10">
                                    <div className="w-16 h-16 border border-white/10 border-dashed rounded-lg flex items-center justify-center mx-auto mb-4 bg-white/[0.02]">
                                        <svg className="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <p className="text-[11px] font-mono text-gray-600 uppercase tracking-widest">
                                        3D Graphic Placeholder
                                    </p>
                                </div>

                                {/* Subtiles Grid-Muster als Hintergrund */}
                                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
                            </div>

                        </div>
                    </div>
                </section>

                {/* --- OPEN SOURCE SECTION (Architecture-Style / Dark Mode) --- */}
                <section data-theme="dark" id="opensource" className="w-full bg-[#050505] relative z-20">

                    <div className="w-full border-y border-white/10">

                        <div className="grid grid-cols-1 lg:grid-cols-10 divide-y lg:divide-y-0 lg:divide-x divide-white/10 max-w-[1600px] mx-auto px-0 md:px-12 lg:px-24">

                            {/* LINKE BOX (Groß, 4 von 10 Spalten) */}
                            <div className="lg:col-span-4 p-6 md:p-8 lg:p-12 flex flex-col justify-between min-h-[280px] lg:min-h-[340px]">
                                <div className="mb-8 lg:mb-0">
                                    <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-white/[0.05] to-transparent border border-white/10 rounded-lg shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
                                        <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                                            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                </div>

                                <div>
                                    <h2 className="text-2xl md:text-3xl font-medium tracking-tight text-white mb-3">
                                        Transparent by Default
                                    </h2>

                                    {/* GEÄNDERT: Das "We believe" wurde entfernt. Es ist jetzt ein starkes Statement. */}
                                    <p className="text-[14px] md:text-[15px] text-gray-400 leading-relaxed max-w-md mb-6">
                                        Foundational data infrastructure must be entirely auditable. Pytja is built in the open, allowing you to inspect the core architecture and verify the security model yourself.
                                    </p>

                                    <Link href="https://github.com/pytja" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 text-[13px] font-medium text-white transition-all w-fit border-b border-white/20 pb-0.5 hover:text-gray-300 hover:border-gray-500">
                                        View Source on GitHub
                                        <span className="transform transition-transform duration-300 group-hover:translate-x-1">→</span>
                                    </Link>
                                </div>
                            </div>

                            {/* MITTLERE BOX (3 von 10 Spalten) */}
                            <div className="lg:col-span-3 p-6 md:p-8 lg:p-12 flex flex-col justify-between min-h-[220px] lg:min-h-[340px]">
                                <div className="mb-8 lg:mb-0">
                                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-[16px] font-medium tracking-tight text-white mb-2">
                                        100% Rust Core
                                    </h3>
                                    {/* GEÄNDERT: Fokus liegt jetzt auf Performance und Ressourcen, nicht nur auf Segfaults */}
                                    <p className="text-[14px] text-gray-400 leading-relaxed">
                                        Engineered for bare-metal performance. Pytja processes massive data streams with a predictable, ultra-low memory footprint and absolute execution safety.
                                    </p>
                                </div>
                            </div>

                            {/* RECHTE BOX (3 von 10 Spalten) */}
                            <div className="lg:col-span-3 p-6 md:p-8 lg:p-12 flex flex-col justify-between min-h-[220px] lg:min-h-[340px]">
                                <div className="mb-8 lg:mb-0">
                                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-[16px] font-medium tracking-tight text-white mb-2">
                                        MIT Licensed
                                    </h3>
                                    {/* GEÄNDERT: Betont den Community-Aspekt und fehlenden Vendor Lock-in */}
                                    <p className="text-[14px] text-gray-400 leading-relaxed">
                                        Free, open, and community-driven. Pytja is distributed under the highly permissive MIT license, ensuring no vendor lock-in and frictionless adoption.
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>

                {/* --- MASSIVE CTA SECTION (Light Mode / Wake-Up Effect) --- */}
                <section id="cta" className="w-full bg-white relative z-20 py-32 md:py-48 flex flex-col items-center justify-center border-t border-black/10">

                    <h2 className="text-4xl md:text-5xl lg:text-[64px] font-medium tracking-tight text-black mb-10 text-center max-w-4xl px-6 leading-[1.05]">
                        Ready to inspect the core architecture?
                    </h2>

                    <Link
                        href="/download"
                        className="group flex items-center gap-3 px-6 py-3 bg-black border border-black/10 rounded-full hover:bg-gray-800 transition-all shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
                    >
                        <div className="w-5 h-5 flex items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <span className="text-white text-[13px] font-bold tracking-[0.2em] uppercase">
                            Explore Pytja
                        </span>
                    </Link>
                </section>

                {/* --- CHANGELOG / UPDATES SECTION (Light Mode 10-Col Grid) --- */}
                <section id="updates" className="w-full bg-white relative z-20">

                    <div className="w-full border-y border-black/10">

                        {/* HIER GEÄNDERT: pl (Padding Left) bleibt, pr-0 entfernt den weißen Rand rechts */}
                        <div className="grid grid-cols-1 lg:grid-cols-10 divide-y lg:divide-y-0 lg:divide-x divide-black/10 max-w-[1600px] mx-auto pl-0 md:pl-12 lg:pl-24 pr-0">

                            {/* LINKE SPALTE: Text & Link */}
                            <div className="lg:col-span-4 p-6 md:p-8 lg:p-12 flex flex-col justify-between min-h-[240px] lg:min-h-[280px]">
                                <div>
                                    <h2 className="text-2xl md:text-3xl font-medium tracking-tight text-black mb-3">
                                        Recent Shipments
                                    </h2>
                                    <p className="text-[14px] text-gray-500 leading-relaxed max-w-sm mb-8">
                                        Track the latest features, patches, and core optimizations. Pytja is in active early development, continuously evolving to serve as the bare-metal foundation for a much larger data infrastructure.
                                    </p>
                                </div>

                                <div>
                                    <Link
                                        href="/changelog"
                                        className="group inline-flex items-center gap-2 text-[13px] font-medium text-black transition-all w-fit border-b border-black/20 pb-0.5 hover:text-gray-600 hover:border-gray-500"
                                    >
                                        View all updates
                                        <span className="transform transition-transform duration-300 group-hover:translate-x-1">→</span>
                                    </Link>
                                </div>
                            </div>

                            {/* RECHTE SPALTE: Changelog Slider */}
                            <div className="lg:col-span-6 flex flex-col justify-center relative overflow-hidden bg-black/[0.02] min-h-[240px] lg:min-h-[280px]">
                                <ChangelogSlider />
                            </div>

                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}

// --- HILFSKOMPONENTEN FÜR DIE DUNKLEN SEKTIONEN (Unten) ---
// (Bleiben unverändert, da sie in den dunklen Abschnitten verwendet werden)

// --- ULTRA-SMOOTH LIGHT FADE & SEQUENCE ---
function BlockClusterScene() {
    const [isAnimating, setIsAnimating] = useState(false);
    const [litSatelliteId, setLitSatelliteId] = useState<number | null>(null);
    const satellites = [
        { id: 1, x: 180, y: 40, z: 60 },
        { id: 2, x: -180, y: -40, z: 30 },
        { id: 3, x: 0, y: -200, z: 0 },
        { id: 4, x: -60, y: 160, z: 120 },
        { id: 5, x: 200, y: 0, z: -150 },
    ];
    const triggerAnimation = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        satellites.forEach((sat, index) => {
            setTimeout(() => {
                setLitSatelliteId(sat.id);
                setTimeout(() => {
                    setLitSatelliteId((current) => current === sat.id ? null : current);
                }, 1200);
            }, index * 400 + 400);
        });
        setTimeout(() => {
            setIsAnimating(false);
        }, 3500);
    };

    return (
        <div className="relative w-full h-full flex items-center justify-center perspective-[1200px]">
            <div className="relative preserve-3d" style={{ transform: 'rotateX(-20deg) rotateY(-30deg)', transformStyle: 'preserve-3d' }}>
                <div className={`absolute top-0 left-0 preserve-3d cursor-pointer ${isAnimating ? 'animate-core-ultra-jump' : 'animate-float-core'}`} onClick={triggerAnimation}>
                    <div className={`preserve-3d ${isAnimating ? 'animate-core-ultra-spin' : ''}`}>
                        <True3DCube size={100} x={0} y={0} z={0} isCore={true} />
                    </div>
                </div>
                {satellites.map((sat) => (
                    <div key={sat.id} className={`absolute top-0 left-0 preserve-3d animate-float-${sat.id} will-change-transform`} style={{ animationDuration: `${6 + sat.id}s` }}>
                        <True3DCube size={50} x={sat.x} y={sat.y} z={sat.z} isLit={litSatelliteId === sat.id} />
                    </div>
                ))}
            </div>
            <style>{`
                .preserve-3d { transform-style: preserve-3d; }
                @keyframes float-y { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-20px); } }
                .animate-float-core { animation: float-y 8s ease-in-out infinite; }
                .animate-float-1 { animation: float-y 5s ease-in-out infinite; }
                .animate-float-2 { animation: float-y 6s ease-in-out infinite; animation-delay: 1s; }
                .animate-float-3 { animation: float-y 7s ease-in-out infinite; animation-delay: 2s; }
                .animate-float-4 { animation: float-y 5.5s ease-in-out infinite; animation-delay: 0.5s; }
                .animate-float-5 { animation: float-y 8s ease-in-out infinite; animation-delay: 1.5s; }
                @keyframes core-ultra-jump { 0% { transform: translateY(0px); animation-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1); } 45% { transform: translateY(-65px); animation-timing-function: cubic-bezier(0.45, 0, 0.55, 1); } 75% { transform: translateY(4px); animation-timing-function: ease-out; } 100% { transform: translateY(0px); } }
                @keyframes core-ultra-spin { 0% { transform: rotateY(0deg); } 100% { transform: rotateY(360deg); } }
                .animate-core-ultra-jump { animation: core-ultra-jump 3s forwards; }
                .animate-core-ultra-spin { animation: core-ultra-spin 3s cubic-bezier(0.45, 0.05, 0.55, 0.95) forwards; }
            `}</style>
        </div>
    );
}

// --- FINAL PERFECT CUBE (Solid rotation with visible back) ---
function True3DCube({ size, x, y, z, isCore, isLit }: { size: number, x: number, y: number, z: number, isCore?: boolean, isLit?: boolean }) {
    const half = size / 2;
    const active = isCore || isLit;
    const shadow = active ? (isLit ? "shadow-[0_0_60px_rgba(255,255,255,0.18)]" : "shadow-[0_0_40px_rgba(255,255,255,0.12)]") : "shadow-none";
    const border = active ? "border-white/50" : "border-white/10";
    const borderSubtle = active ? "border-white/20" : "border-white/5";
    const faceBase = "absolute flex items-center justify-center border transition-all duration-[1000ms] cubic-bezier(0.4, 0, 0.2, 1)";
    const bgFront = active ? "bg-white/15" : "bg-white/5";
    const bgMid = active ? "bg-white/10" : "bg-white/[0.01]";
    const bgBack = active ? "bg-white/[0.03]" : "bg-transparent";
    return (
        <div className="absolute preserve-3d" style={{ width: size, height: size, transform: `translate3d(${x - half}px, ${y - half}px, ${z}px)` }}>
            <div className={`${faceBase} ${bgFront} ${border} ${shadow}`} style={{ width: size, height: size, transform: `translateZ(${half}px)` }}>
                {isCore && <div className="w-3 h-3 bg-white rounded-full animate-pulse shadow-[0_0_15px_white]" />}
            </div>
            <div className={`${faceBase} ${borderSubtle} ${bgBack}`} style={{ width: size, height: size, transform: `rotateY(180deg) translateZ(${half}px)` }} />
            <div className={`${faceBase} ${bgMid} ${border}`} style={{ width: size, height: size, transform: `rotateY(90deg) translateZ(${half}px)` }} />
            <div className={`${faceBase} ${bgMid} ${border}`} style={{ width: size, height: size, transform: `rotateY(-90deg) translateZ(${half}px)` }} />
            <div className={`${faceBase} ${bgMid} ${border}`} style={{ width: size, height: size, transform: `rotateX(90deg) translateZ(${half}px)` }} />
            <div className={`${faceBase} ${borderSubtle} ${bgBack}`} style={{ width: size, height: size, transform: `rotateX(-90deg) translateZ(${half}px)` }} />
        </div>
    );
}

// --- MOBILE HERO VISUAL (Animiert) ---

function Hero3DVisualMobile() {
    // Refs für direkten, performanten DOM-Zugriff (ohne Re-Render)
    const containerRef = useRef<HTMLDivElement>(null);
    const topCubeRef = useRef<HTMLDivElement>(null);
    const midCubeRef = useRef<HTMLDivElement>(null);
    const botCubeRef = useRef<HTMLDivElement>(null);

    const timeRef = useRef(0);
    const requestRef = useRef<number>(0);

    useEffect(() => {
        const animate = () => {
            timeRef.current += 0.008;
            const t = timeRef.current;
            const sinWave = Math.sin(t);
            const normalizedWave = (sinWave + 1) / 2;

            // Globales Schweben
            if (containerRef.current) {
                const floatY = normalizedWave * -20;
                containerRef.current.style.transform = `translateY(${floatY}px) rotateX(60deg) rotateZ(-45deg)`;
            }

            // Atmen (Z-Achse) - Jetzt wieder flüssig animiert!
            if (topCubeRef.current) {
                topCubeRef.current.style.transform = `translateZ(${45 + normalizedWave * 60}px)`;
            }
            if (midCubeRef.current) {
                midCubeRef.current.style.transform = `translateZ(0px)`;
            }
            if (botCubeRef.current) {
                botCubeRef.current.style.transform = `translateZ(${-45 - normalizedWave * 60}px)`;
            }

            requestRef.current = requestAnimationFrame(animate);
        };
        requestRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(requestRef.current);
    }, []);

    return (
        <div className="relative w-72 h-72 preserve-3d will-change-transform pointer-events-none" ref={containerRef}>
            <HeroWireframeCubeMobile id={1} label="WASM Sandbox" cubeRef={topCubeRef} />
            <HeroWireframeCubeMobile id={2} label="gRPC Streaming" cubeRef={midCubeRef} />
            <HeroWireframeCubeMobile id={3} label="Rust Core" cubeRef={botCubeRef} />
        </div>
    );
}

function HeroWireframeCubeMobile({ id, label, cubeRef }: { id: number, label: string, cubeRef: React.RefObject<HTMLDivElement | null> }) {
    // Alle Ebenen sehen exakt gleich aus: Kein "Active" State mehr
    const styleTop = "border-black/20 bg-gradient-to-br from-black/[0.03] to-transparent shadow-[0_0_20px_rgba(0,0,0,0.02)]";
    const styleSide = "border-black/10 bg-black/[0.02]";
    const styleHidden = "border-black/5 bg-transparent";

    return (
        <div ref={cubeRef} className="absolute inset-0 preserve-3d will-change-transform" style={{ zIndex: 10 - id }}>
            <div className="absolute inset-0 preserve-3d">
                <div className={`absolute inset-0 flex items-center justify-center z-10 border ${styleTop}`}>
                    <span className="text-[10px] font-bold tracking-[0.5em] text-center uppercase text-black/60">
                        {label}
                    </span>
                </div>
                <div className={`absolute inset-0 border ${styleHidden}`} style={{ transform: 'translateZ(-30px)' }} />
                <div className={`absolute top-0 left-0 w-full h-[30px] origin-top border ${styleHidden}`} style={{ transform: 'rotateX(-90deg)' }} />
                <div className={`absolute bottom-0 left-0 w-full h-[30px] origin-bottom border ${styleSide}`} style={{ transform: 'rotateX(90deg)' }} />
                <div className={`absolute top-0 right-0 w-[30px] h-full origin-right border ${styleHidden}`} style={{ transform: 'rotateY(-90deg)' }} />
                <div className={`absolute top-0 left-0 w-[30px] h-full origin-left border ${styleSide}`} style={{ transform: 'rotateY(90deg)' }} />
            </div>
        </div>
    );
}


// --- DESKTOP HERO VISUAL (Statisch, Längere Linien, Beschriftung auf den Ebenen) ---

function Hero3DVisualDesktop() {
    return (
        <div className="relative w-full max-w-4xl h-full flex items-center justify-center pointer-events-none">

            {/* 1. DER STATISCHE 3D CORE (Jetzt mit den Text-Labels AUF den Ebenen) */}
            <div
                className="relative w-72 h-72 preserve-3d"
                style={{ transform: 'rotateX(60deg) rotateZ(-45deg)' }}
            >
                <HeroWireframeCubeDesktop id={1} zPos={100} label={<div className="text-center">WASM Compute <br /> Sandbox</div>} />
                <HeroWireframeCubeDesktop id={2} zPos={0} label="GRPC STREAMING" />
                <HeroWireframeCubeDesktop id={3} zPos={-100} label={<div className="text-center">RUST & TOKIO <br /> CORE</div>} />
            </div>

            {/* 2. DIE 2D LABELS (Mit verlängerten Linien für mehr Abstand) */}
            <div className="absolute inset-0 flex items-center justify-center">

                {/* TOP LAYER LABEL (Links) */}
                <div className="absolute top-[calc(50%-86px)] left-0 w-[50%] flex items-center justify-end pr-[104px]">
                    <div className="text-right pr-4">
                        <div className="text-[11px] font-bold tracking-[0.2em] text-black uppercase">Compute</div>
                        <div className="text-[9px] font-mono text-black/50 uppercase mt-1">Isolated Sandbox</div>
                    </div>
                    {/* Linie deutlich verlängert (w-24 bis w-48) */}
                    <div className="w-24 xl:w-48 h-px bg-black/20" />
                    <div className="w-2 h-2 border-[1.5px] border-black/50 rounded-full bg-white" />
                </div>

                {/* MID LAYER LABEL (Rechts) */}
                <div className="absolute top-[50%] right-0 w-[50%] flex items-center justify-start pl-[104px]">
                    <div className="w-2 h-2 border-[1.5px] border-black/50 rounded-full bg-white" />
                    {/* Linie deutlich verlängert */}
                    <div className="w-24 xl:w-48 h-px bg-black/20" />
                    <div className="text-left pl-4">
                        <div className="text-[11px] font-bold tracking-[0.2em] text-black uppercase">Streaming</div>
                        <div className="text-[9px] font-mono text-black/50 uppercase mt-1">Zero-Copy Transfer</div>
                    </div>
                </div>

                {/* BOT LAYER LABEL (Links) */}
                <div className="absolute top-[calc(50%+86px)] left-0 w-[50%] flex items-center justify-end pr-[104px]">
                    <div className="text-right pr-4">
                        <div className="text-[11px] font-bold tracking-[0.2em] text-black uppercase">Engine</div>
                        <div className="text-[9px] font-mono text-black/50 uppercase mt-1">Tokio Async I/O</div>
                    </div>
                    {/* Linie deutlich verlängert */}
                    <div className="w-24 xl:w-48 h-px bg-black/20" />
                    <div className="w-2 h-2 border-[1.5px] border-black/50 rounded-full bg-white" />
                </div>

            </div>
        </div>
    );
}

function HeroWireframeCubeDesktop({ id, zPos, label }: { id: number, zPos: number, label: React.ReactNode }) {
    // Alle Ebenen sehen exakt gleich aus: Kein "Active" State mehr
    const styleTop = "border-black/20 bg-gradient-to-br from-black/[0.03] to-transparent shadow-[0_0_20px_rgba(0,0,0,0.02)]";
    const styleSide = "border-black/10 bg-black/[0.02]";
    const styleHidden = "border-black/5 bg-transparent";

    return (
        <div className="absolute inset-0 preserve-3d" style={{ zIndex: 10 - id, transform: `translateZ(${zPos}px)` }}>
            <div className={`absolute inset-0 flex items-center justify-center z-10 border ${styleTop}`}>
                <span className="text-[10px] font-bold tracking-[0.5em] text-center uppercase text-black/60">
                    {label}
                </span>
            </div>

            <div className={`absolute inset-0 border ${styleHidden}`} style={{ transform: 'translateZ(-30px)' }} />
            <div className={`absolute top-0 left-0 w-full h-[30px] origin-top border ${styleHidden}`} style={{ transform: 'rotateX(-90deg)' }} />
            <div className={`absolute bottom-0 left-0 w-full h-[30px] origin-bottom border ${styleSide}`} style={{ transform: 'rotateX(90deg)' }} />
            <div className={`absolute top-0 right-0 w-[30px] h-full origin-right border ${styleHidden}`} style={{ transform: 'rotateY(-90deg)' }} />
            <div className={`absolute top-0 left-0 w-[30px] h-full origin-left border ${styleSide}`} style={{ transform: 'rotateY(90deg)' }} />
        </div>
    );
}

// --- ECHTER TERMINAL SIMULATOR (Basierend auf Pytja's Terminal.rs) ---

// NEU: 'progress' als Type hinzugefügt
type TerminalStep = {
    type: 'cmd' | 'out' | 'progress';
    text: string;
    path?: string; // Der Pfad, der im Prompt angezeigt wird, WÄHREND dieser Befehl getippt wird
};

const terminalScript: TerminalStep[] = [
    { type: 'cmd', text: 'mounts', path: '/' },
    { type: 'out', text: `
MOUNT NAME      TYPE            CONNECTION           STATUS    
-----------------------------------------------------------------
s3_bucket       AWS_S3          HIDDEN               \x1b[32mONLINE\x1b[0m
postgres_db     POSTGRES        HIDDEN               \x1b[32mONLINE\x1b[0m
sqlite_local    SQLITE          HIDDEN               \x1b[32mONLINE\x1b[0m
` },
    { type: 'cmd', text: 'cd s3_bucket/exports', path: '/' },
    { type: 'cmd', text: 'ls', path: '/s3_bucket/exports' },
    { type: 'out', text: `
TYPE   PERM     SIZE       OWNER           DATE               NAME
---------------------------------------------------------------------------
FILE   \x1b[33mPUB-R\x1b[0m    1.42 GB    system          2026-03-10 14:30   \x1b[32musers_2026.csv\x1b[0m
FILE   \x1b[31mPRIV\x1b[0m     84.00 KB   root            2026-03-09 09:15   \x1b[32mconfig.json\x1b[0m

[TOTAL: 2 (REMOTE)]
` },
    { type: 'cmd', text: 'cp users_2026.csv ../../postgres_db/public/users', path: '/s3_bucket/exports' },

    // NEU: Den Kopiervorgang in 3 Schritte aufgeteilt: Start -> Progress Animation -> Success + Performance Metric
    { type: 'out', text: '\x1b[36m[RADAR]\x1b[0m Streaming file directly into MemFS...\n\x1b[32m[OK]\x1b[0m Initializing gRPC stream...' },
    { type: 'progress', text: '64-KB chunks (Zero-Copy)' },
    { type: 'out', text: '\x1b[32m[OK]\x1b[0m File streamed and target table populated.\n\x1b[33m[PERFORMANCE]\x1b[0m Transferred 1.42 GB in 0.84s (1.69 GB/s)' },

    { type: 'cmd', text: 'cd ../../postgres_db/public/users', path: '/s3_bucket/exports' },
    { type: 'cmd', text: 'ls', path: '/postgres_db/public/users' },
    { type: 'out', text: `
TYPE   PERM     SIZE       OWNER           DATE               NAME
---------------------------------------------------------------------------
FILE   \x1b[33mPUB-R\x1b[0m    1.42 GB    elias           2026-03-11 13:12   \x1b[32musers_2026.csv\x1b[0m

[TOTAL: 1 (REMOTE)]
` },
    { type: 'cmd', text: 'clear', path: '/postgres_db/public/users' } // Clear als Loop-Reset
];

// Hilfsfunktion, um ANSI-Escape-Codes in Tailwind-Span-Tags umzuwandeln
function renderAnsiString(text: string) {
    const parts = text.split(/(\x1b\[\d+m)/);
    let currentColor = 'text-gray-300';
    let isBold = false;

    return parts.map((part, i) => {
        if (part === '\x1b[31m') { currentColor = 'text-red-400'; return null; }
        if (part === '\x1b[32m') { currentColor = 'text-green-400'; return null; }
        if (part === '\x1b[33m') { currentColor = 'text-yellow-400'; return null; }
        if (part === '\x1b[34m') { currentColor = 'text-blue-400'; return null; }
        if (part === '\x1b[36m') { currentColor = 'text-white'; return null; }
        if (part === '\x1b[1m') { isBold = true; return null; }
        if (part === '\x1b[0m') { currentColor = 'text-gray-300'; isBold = false; return null; }

        return <span key={i} className={`${currentColor} ${isBold ? 'font-bold' : ''}`}>{part}</span>;
    });
}

function TerminalSimulator() {
    const [history, setHistory] = useState<TerminalStep[]>([]);
    const [typingText, setTypingText] = useState('');
    const [stepIndex, setStepIndex] = useState(0);
    const [progressValue, setProgressValue] = useState<number | null>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    // NEU: State, der kontrolliert, ob das Terminal schon im Sichtfeld war
    const [hasStarted, setHasStarted] = useState(false);

    // NEU: IntersectionObserver prüft, ob der Nutzer zum Terminal gescrollt hat
    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setHasStarted(true);
                observer.disconnect(); // Sobald es einmal gestartet ist, ignorieren wir weiteres Scrollen
            }
        }, { threshold: 0.3 }); // Startet, wenn 30% des Terminals im Viewport sind

        if (scrollRef.current) {
            observer.observe(scrollRef.current);
        }

        return () => observer.disconnect();
    }, []);

    // Auto-Scroll nach unten
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [history, progressValue, stepIndex]);

    useEffect(() => {
        // WICHTIG: Die gesamte Tipp-Logik pausiert, bis hasStarted auf true springt
        if (!hasStarted) return;

        let timeout: ReturnType<typeof setTimeout>;

        if (stepIndex >= terminalScript.length) {
            timeout = setTimeout(() => {
                setHistory([]);
                setTypingText('');
                setProgressValue(null);
                setStepIndex(0);
            }, 500);
            return () => clearTimeout(timeout);
        }

        const currentStep = terminalScript[stepIndex];

        if (currentStep.type === 'cmd' && currentStep.text === 'clear') {
            timeout = setTimeout(() => {
                setHistory([]);
                setTypingText('');
                setProgressValue(null);
                setStepIndex((prev) => prev + 1);
            }, 1500);
            return () => clearTimeout(timeout);
        }

        if (currentStep.type === 'cmd') {
            if (typingText.length < currentStep.text.length) {
                const nextChar = currentStep.text[typingText.length];

                let typingSpeed = Math.random() * 60 + 30;

                if (typingText.length === 0) {
                    const prevStep = stepIndex > 0 ? terminalScript[stepIndex - 1] : null;
                    typingSpeed = 1500;

                    if (prevStep && prevStep.type === 'out') {
                        if (prevStep.text.includes('[PERFORMANCE]')) typingSpeed = 4500;
                        else if (prevStep.text.includes('TOTAL')) typingSpeed = 3000;
                    } else if (stepIndex === 0) {
                        typingSpeed = 1000; // Kurze Pause, bevor der allererste Befehl getippt wird
                    }
                }

                timeout = setTimeout(() => {
                    setTypingText((prev) => prev + nextChar);
                }, typingSpeed);
            } else {
                timeout = setTimeout(() => {
                    setHistory((prev) => [...prev, { ...currentStep }]);
                    setTypingText('');
                    setStepIndex((prev) => prev + 1);
                }, 800);
            }
        } else if (currentStep.type === 'progress') {
            if (progressValue === null) {
                setProgressValue(0);
            } else if (progressValue < 100) {
                const increment = Math.floor(Math.random() * 15) + 5;
                timeout = setTimeout(() => {
                    setProgressValue(Math.min(100, progressValue + increment));
                }, 50);
            } else {
                timeout = setTimeout(() => {
                    const barStr = `\x1b[36m[${'█'.repeat(20)}]\x1b[0m 100% | ${currentStep.text}`;
                    setHistory((prev) => [...prev, { type: 'out', text: barStr }]);
                    setProgressValue(null);
                    setStepIndex((prev) => prev + 1);
                }, 200);
            }
        } else {
            setHistory((prev) => [...prev, currentStep]);
            setStepIndex((prev) => prev + 1);
        }

        return () => clearTimeout(timeout);
    }, [stepIndex, typingText, progressValue, hasStarted]);

    const Prompt = ({ path }: { path: string }) => (
        <div className="flex flex-col">
            <div>
                <span className="text-gray-400">┌──(</span>
                <span className="text-red-400">user@pytja</span>
                <span className="text-gray-400">)-[</span>
                <span className="text-blue-400">{path}</span>
                <span className="text-gray-400">]</span>
            </div>
            <div className="flex">
                <span className="text-gray-400">└─$ </span>
            </div>
        </div>
    );

    const currentPath = stepIndex < terminalScript.length ? (terminalScript[stepIndex].path || '/') : '/';

    return (
        <div ref={scrollRef} className="flex flex-col w-full h-[400px] text-gray-300 font-mono text-sm overflow-y-auto overflow-x-auto custom-scrollbar">

            <div className="min-w-max pr-6 pb-2">

                {history.map((line, i) => (
                    <div key={i} className="mb-2">
                        {line.type === 'cmd' ? (
                            <div>
                                <Prompt path={line.path || '/'} />
                                <div className="pl-10 -mt-5">{line.text}</div>
                            </div>
                        ) : (
                            <div className="whitespace-pre leading-relaxed mt-1">
                                {renderAnsiString(line.text)}
                            </div>
                        )}
                    </div>
                ))}

                {progressValue !== null && stepIndex < terminalScript.length && terminalScript[stepIndex].type === 'progress' && (
                    <div className="mb-2 mt-1 whitespace-pre">
                        <span className="text-white">
                            {`[${'█'.repeat(Math.floor(progressValue / 5))}${' '.repeat(20 - Math.floor(progressValue / 5))}]`}
                        </span>
                        <span className="text-gray-300">
                            {` ${progressValue}% | ${terminalScript[stepIndex].text}`}
                        </span>
                    </div>
                )}

                {/* Der leere Prompt wartet hier, bis hasStarted true wird und das Tippen beginnt */}
                {stepIndex < terminalScript.length && terminalScript[stepIndex].type === 'cmd' && terminalScript[stepIndex].text !== 'clear' && (
                    <div>
                        <Prompt path={currentPath} />
                        <div className="flex items-center pl-10 -mt-5">
                            <span>{typingText}</span>
                            <span className="w-2 h-4 bg-gray-400 ml-1 animate-pulse" />
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}

// --- HILFSKOMPONENTE: KUGELSICHERER & SMOOTHER CHANGELOG SLIDER (LIGHT MODE) ---
function ChangelogSlider() {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const isScrollingProgrammatically = useRef(false);

    // Wir ziehen uns nur die 5 aktuellsten Einträge
    const recentUpdates = changelogData.slice(0, 5);

    // Hilfsfunktion für die Farbzuweisung der Tags
    const getTypeColor = (type: string) => {
        switch (type) {
            case 'security': return 'text-orange-500';
            case 'feature': return 'text-blue-500';
            case 'fix': return 'text-purple-500';
            case 'core': return 'text-emerald-500';
            default: return 'text-gray-500';
        }
    };

    const handleScroll = () => {
        if (isScrollingProgrammatically.current || !scrollContainerRef.current) return;

        const container = scrollContainerRef.current;
        const scrollPosition = container.scrollLeft;
        const maxScroll = container.scrollWidth - container.clientWidth;

        if (scrollPosition >= maxScroll - 10) {
            if (activeIndex !== recentUpdates.length - 1) setActiveIndex(recentUpdates.length - 1);
            return;
        }

        if (container.children.length > 0) {
            const cardWidth = container.children[0].clientWidth;
            const gap = 24;
            const totalItemWidth = cardWidth + gap;
            const newIndex = Math.round(scrollPosition / totalItemWidth);

            if (newIndex >= 0 && newIndex < recentUpdates.length && newIndex !== activeIndex) {
                setActiveIndex(newIndex);
            }
        }
    };

    const scrollToCard = (index: number) => {
        if (!scrollContainerRef.current) return;
        const container = scrollContainerRef.current;
        const cardWidth = container.children[0].clientWidth;
        const gap = 24;
        let targetLeft = index * (cardWidth + gap);
        const maxScroll = container.scrollWidth - container.clientWidth;

        if (targetLeft > maxScroll) targetLeft = maxScroll;

        isScrollingProgrammatically.current = true;
        const startLeft = container.scrollLeft;
        const distance = targetLeft - startLeft;
        const duration = 800;
        let startTime: number | null = null;

        const easeInOutQuart = (t: number) => t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;

        const animation = (currentTime: number) => {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            container.scrollLeft = startLeft + distance * easeInOutQuart(progress);

            if (timeElapsed < duration) requestAnimationFrame(animation);
            else isScrollingProgrammatically.current = false;
        };

        requestAnimationFrame(animation);
        setActiveIndex(index);
    };

    useEffect(() => {
        if (isHovered) return;
        const interval = setInterval(() => {
            setActiveIndex((current) => {
                const next = (current + 1) % recentUpdates.length;
                scrollToCard(next);
                return next;
            });
        }, 4500);
        return () => clearInterval(interval);
    }, [isHovered]);

    return (
        <div
            className="relative w-full h-full flex flex-col justify-center pl-0 md:pl-0 lg:pl-0 pr-0 py-8"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div
                ref={scrollContainerRef}
                onScroll={handleScroll}
                className="flex gap-6 overflow-x-auto hide-scrollbar w-full items-center pl-6 md:pl-8 lg:pl-12 pb-8 pt-4"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {recentUpdates.map((update, i) => {
                    const isActive = activeIndex === i;

                    return (
                        <div
                            key={update.hash}
                            onClick={() => scrollToCard(i)}
                            className={`shrink-0 w-[300px] md:w-[380px] rounded-lg p-6 transition-all duration-700 cursor-pointer group border ${
                                isActive
                                    ? 'bg-white border-black/10 shadow-[0_8px_24px_-4px_rgba(0,0,0,0.08)] transform -translate-y-1'
                                    : 'bg-white/50 border-black/5 hover:bg-white hover:border-black/10 hover:shadow-[0_4px_12px_-2px_rgba(0,0,0,0.04)]'
                            }`}
                        >
                            <div className="flex items-center justify-between border-b border-black/5 pb-4 mb-4">
                                <div className="flex items-center gap-3">
                                    <span className="text-black font-mono text-[13px] font-bold">{update.version}</span>
                                    <span className={`text-[9px] font-bold uppercase tracking-widest ${getTypeColor(update.type)}`}>
                                        // {update.type}
                                    </span>
                                </div>
                                <span className={`text-[10px] font-mono transition-colors duration-700 ${isActive ? 'text-gray-500' : 'text-gray-400'}`}>
                                    {update.date}
                                </span>
                            </div>

                            <h4 className={`text-[15px] font-medium mb-2 transition-colors duration-700 ${isActive ? 'text-black' : 'text-gray-700'} line-clamp-1`}>
                                {update.title}
                            </h4>

                            <p className={`text-[13px] leading-relaxed font-light line-clamp-2 transition-colors duration-700 ${isActive ? 'text-gray-600' : 'text-gray-400'}`}>
                                {update.desc}
                            </p>
                        </div>
                    );
                })}

                <div className="shrink-0 w-[10vw] md:w-[20vw] pointer-events-none" />
            </div>

            <div className="flex justify-center items-center gap-2 mt-2 lg:mt-4">
                {recentUpdates.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => scrollToCard(i)}
                        className={`h-1.5 rounded-full transition-all duration-700 ease-out ${
                            activeIndex === i
                                ? 'w-6 bg-black shadow-sm'
                                : 'w-1.5 bg-black/10 hover:bg-black/20'
                        }`}
                        aria-label={`Gehe zu Update ${i + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}