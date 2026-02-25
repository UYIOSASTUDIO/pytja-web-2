"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function DownloadPage() {
    const [mounted, setMounted] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        setMounted(true);

        // Mobile Viewport Fix (Essential for the mobile menu to fit perfectly)
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
            {/* GLOBAL STYLE FIX FÜR MOBILE SCROLLING */}
            <style jsx global>{`
                html {
                    /* Erlaubt vertikales Scrollen explizit */
                    overflow-y: auto;
                    /* Verhindert nur das seitliche Wischen */
                    overflow-x: hidden;
                    /* WICHTIG: 'auto' statt 'none' für die Höhe, damit der Body wachsen kann */
                    height: auto;
                }
                body {
                    background-color: #0D0D0D;
                    min-height: 100vh;
                    /* Aktiviert "Momentum Scrolling" auf iOS (wichtig für smooth feel) */
                    -webkit-overflow-scrolling: touch;
                    position: relative;
                }
            `}</style>

            {/* Background Grid */}
            <div className="fixed inset-0 bg-grid opacity-20 pointer-events-none z-0" />

            {/* --- HEADER (EXACT COPY FROM MAIN PAGE) --- */}
            <header className="fixed top-0 w-full z-[150] border-b border-white/5 bg-[#0D0D0D]/80 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto px-6 md:px-8 h-16 md:h-20 flex items-center justify-between relative">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 relative z-[160]">
                        <Logo3DP />
                    </Link>

                    {/* DESKTOP NAV (Links adjusted to point to Home anchors) */}
                    <nav className="hidden lg:flex items-center gap-10 text-[10px] tracking-[0.3em] text-gray-500 font-bold uppercase">
                        <Link href="/#home" className="hover:text-white transition-colors">Home</Link>
                        <Link href="/#architecture" className="hover:text-white transition-colors">Arch</Link>
                        <Link href="/#modularity" className="hover:text-white transition-colors">Modules</Link>
                        <Link href="/#stats" className="hover:text-white transition-colors">Telemetry</Link>
                    </nav>

                    {/* DESKTOP BUTTONS */}
                    <div className="hidden md:flex items-center gap-4">
                        <Link href="/contact" className="text-[10px] text-gray-400 font-bold hover:text-white transition-colors uppercase tracking-widest px-4">Contact</Link>
                        <Link href="/dashboard" className="border border-white/20 bg-white/[0.03] text-white px-6 py-2.5 text-[10px] font-bold hover:border-white/50 transition-all uppercase tracking-widest">Terminal</Link>
                    </div>

                    {/* MOBILE MENU TRIGGER */}
                    <button
                        className="lg:hidden flex flex-col justify-center items-center w-10 h-10 relative z-[160] outline-none"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        <div className={`h-[1px] bg-white absolute w-6 transition-all duration-500 ease-in-out ${
                            isMobileMenuOpen ? 'rotate-45 translate-y-0' : '-translate-y-1'
                        }`} />
                        <div className={`h-[1px] bg-white absolute w-6 transition-all duration-500 ease-in-out ${
                            isMobileMenuOpen ? '-rotate-45 translate-y-0' : 'translate-y-1'
                        }`} />
                    </button>
                </div>
            </header>

            {/* --- MOBILE DROPDOWN OVERLAY (EXACT COPY) --- */}
            <div
                className={`fixed inset-0 z-[140] bg-[#050505] lg:hidden transition-all duration-500 ease-in-out flex flex-col ${
                    isMobileMenuOpen
                        ? 'opacity-100 translate-y-0 pointer-events-auto visible'
                        : 'opacity-0 -translate-y-4 pointer-events-none invisible'
                }`}
                style={{ height: 'calc(var(--vh, 1vh) * 100)' }}
            >
                <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none z-0" />

                <div className="relative z-10 flex flex-col h-full pt-32 px-10 gap-12 overflow-y-auto">
                    <nav className="flex flex-col gap-8 shrink-0">
                        {[
                            { name: 'Home', id: '/#home' },
                            { name: 'Architecture', id: '/#architecture' },
                            { name: 'Modularity', id: '/#modularity' },
                            { name: 'Stats', id: '/#stats' }
                        ].map((item, i) => (
                            <Link
                                key={item.name}
                                href={item.id}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`text-3xl font-bold tracking-tighter transition-all duration-700 delay-100 flex items-baseline gap-4 ${
                                    isMobileMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
                                }`}
                                style={{ transitionDelay: `${i * 50 + 200}ms` }}
                            >
                                <span className="text-[10px] font-mono text-white/10">0{i+1}</span>
                                <span className="text-white/40 hover:text-white">{item.name}</span>
                            </Link>
                        ))}
                    </nav>

                    <div className={`mt-auto pb-24 flex flex-col gap-4 shrink-0 transition-all duration-700 delay-500 ${
                        isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                    }`}>
                        <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="w-full py-4 text-center text-[10px] font-bold uppercase tracking-[0.3em] text-white/40 border border-white/5">
                            Contact Support
                        </Link>
                        <Link href="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="w-full py-5 text-center text-[10px] font-bold uppercase tracking-[0.3em] bg-white text-black relative">
                            Open Terminal
                        </Link>
                    </div>
                </div>
            </div>

            {/* --- MAIN DOWNLOAD CONTENT --- */}
            <main className="relative z-10 pt-32 pb-10 px-6 md:px-8 max-w-7xl mx-auto min-h-[90vh] flex flex-col justify-center">

                {/* Title Section */}
                <div className="text-center space-y-6 mb-20 mt-10 md:mt-0">
                    <div className="inline-flex items-center gap-2 border border-white/10 bg-white/[0.02] px-3 py-1 rounded-full">
                        <span className="w-1 h-1 bg-white rounded-full" />
                        <span className="text-[9px] uppercase tracking-[0.3em] text-white/60">Distribution Hub</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase text-white">
                        Select Deployment <br className="hidden md:block" />
                        <span className="text-white/30">Method.</span>
                    </h1>
                </div>

                {/* --- DOWNLOAD CARDS --- */}
                <div className="grid md:grid-cols-2 gap-6 lg:gap-10 max-w-5xl mx-auto w-full">

                    {/* OPTION 1: COMPILED BINARY (Direct Download) */}
                    <DownloadCard
                        type="binary"
                        title="Core Binary"
                        version="v1.0.4-stable"
                        desc="Pre-compiled standalone executable. Optimized for production environments with zero external dependencies."
                        actionLabel="Download Installer"
                        meta={['Windows / Mac / Linux', 'SHA-256 Verified', 'No Source Access']}
                        icon={<BinaryIcon />}
                        href="/downloads/pytja-installer-v1.0.4.exe"
                    />

                    {/* OPTION 2: SOURCE CODE (GitHub) */}
                    <DownloadCard
                        type="source"
                        title="Source Code"
                        version="Branch: Main"
                        desc="Full access to the Rust repository. Inspect the architecture, compile manually, or contribute to the kernel."
                        actionLabel="View on GitHub"
                        meta={['MIT License', 'Rust Toolchain Required', 'Full Audit Trail']}
                        icon={<GithubIcon />}
                        href="https://github.com/your-repo/pytja"
                        external
                    />

                </div>

                {/* Security Note */}
                <div className="mt-20 text-center border-t border-white/5 pt-10">
                    <p className="text-[10px] text-white/30 uppercase tracking-widest max-w-2xl mx-auto leading-relaxed">
                        Security Notice: All binaries are cryptographically signed.
                        Do not run executables if the checksum does not match the official record published on our <span className="text-white underline cursor-pointer">transparency log</span>.
                    </p>
                </div>

            </main>

            {/* --- FOOTER (EXACT COPY FROM MAIN PAGE) --- */}
            <footer className="border-t border-white/10 bg-[#050505] pt-24 pb-12 relative z-10">
                <div className="max-w-7xl mx-auto px-8">

                    <div className="grid md:grid-cols-4 gap-12 mb-24">
                        {/* Spalte 1: Brand */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-white" />
                                <span className="font-bold text-lg tracking-tighter text-white uppercase">Pytja</span>
                            </div>
                            <p className="text-[10px] text-[#666] leading-relaxed max-w-[200px]">
                                Next-generation database exploration layer. Built with Rust for safety-critical environments.
                            </p>
                        </div>

                        {/* Spalte 2: Product */}
                        <div>
                            <h4 className="text-[10px] font-bold text-white uppercase tracking-[0.2em] mb-6">Product</h4>
                            <ul className="space-y-4 text-[11px] text-[#666] uppercase tracking-wider">
                                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Enterprise</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Changelog</a></li>
                            </ul>
                        </div>

                        {/* Spalte 3: Company */}
                        <div>
                            <h4 className="text-[10px] font-bold text-white uppercase tracking-[0.2em] mb-6">Company</h4>
                            <ul className="space-y-4 text-[11px] text-[#666] uppercase tracking-wider">
                                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                            </ul>
                        </div>

                        {/* Spalte 4: Legal */}
                        <div>
                            <h4 className="text-[10px] font-bold text-white uppercase tracking-[0.2em] mb-6">Legal</h4>
                            <ul className="space-y-4 text-[11px] text-[#666] uppercase tracking-wider">
                                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Imprint</a></li>
                            </ul>
                        </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="text-[10px] text-[#444]">
                            &copy; 2024 Pytja Inc. All rights reserved.
                        </div>

                        {/* System Status Indicator */}
                        <div className="flex items-center gap-3 px-4 py-2 border border-white/5 bg-white/[0.02] rounded-full">
                            <div className="relative flex items-center justify-center w-2 h-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
                            </div>
                            <span className="text-[9px] text-[#666] uppercase tracking-widest font-mono">All Systems Operational</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

// --- SUB-COMPONENTS (ICONS, LOGO, CARDS) ---

function DownloadCard({
                          type, title, version, desc, actionLabel, meta, icon, href, external
                      }: {
    type: 'binary' | 'source',
    title: string,
    version: string,
    desc: string,
    actionLabel: string,
    meta: string[],
    icon: React.ReactNode,
    href: string,
    external?: boolean
}) {
    const isBinary = type === 'binary';

    return (
        <Link
            href={href}
            target={external ? "_blank" : undefined}
            className="group relative bg-[#0A0A0A] border border-white/5 p-1 hover:border-white/20 transition-all duration-500 overflow-hidden flex flex-col h-full"
        >
            {/* Hover Glow Effect */}
            <div className={`absolute inset-0 bg-gradient-to-br ${isBinary ? 'from-white/[0.03]' : 'from-blue-500/[0.05]'} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

            <div className="relative z-10 bg-[#080808] h-full p-8 md:p-12 flex flex-col">

                {/* Header */}
                <div className="flex justify-between items-start mb-8">
                    <div className="p-4 bg-white/[0.03] border border-white/5 rounded-sm text-white/80 group-hover:text-white group-hover:border-white/20 transition-all duration-500">
                        {icon}
                    </div>
                    <div className="text-[9px] font-bold uppercase tracking-widest px-2 py-1 bg-white/5 text-white/40 border border-white/5 rounded-sm">
                        {version}
                    </div>
                </div>

                {/* Content */}
                <div className="space-y-4 mb-10 flex-1">
                    <h3 className="text-2xl font-bold text-white tracking-tighter uppercase group-hover:text-white transition-colors">
                        {title}
                    </h3>
                    <p className="text-sm text-white/40 font-light leading-relaxed">
                        {desc}
                    </p>
                </div>

                {/* Meta List */}
                <ul className="space-y-3 mb-10 border-t border-white/5 pt-6">
                    {meta.map((item, i) => (
                        <li key={i} className="flex items-center gap-3 text-[10px] uppercase tracking-wider text-white/30">
                            <span className={`w-1 h-1 rounded-full ${isBinary ? 'bg-white/40' : 'bg-blue-400/40'}`} />
                            {item}
                        </li>
                    ))}
                </ul>

                {/* Button */}
                <div className={`w-full py-4 flex items-center justify-center gap-3 border transition-all duration-300 uppercase text-[10px] font-bold tracking-[0.3em]
                    ${isBinary
                    ? 'bg-white text-black border-white hover:bg-transparent hover:text-white'
                    : 'bg-transparent text-white border-white/20 hover:border-white hover:bg-white/5'
                }
                `}>
                    {actionLabel}
                    <svg className={`w-3 h-3 transition-transform duration-300 ${external ? 'group-hover:-translate-y-0.5 group-hover:translate-x-0.5' : 'group-hover:translate-y-0.5'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        {external
                            ? <path strokeLinecap="square" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            : <path strokeLinecap="square" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        }
                    </svg>
                </div>
            </div>
        </Link>
    );
}

function BinaryIcon() {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="4" y="4" width="16" height="16" rx="2" />
            <rect x="9" y="9" width="2" height="2" fill="currentColor" fillOpacity="0.5" />
            <rect x="9" y="13" width="2" height="2" fill="currentColor" fillOpacity="0.5" />
            <rect x="13" y="9" width="2" height="2" fill="currentColor" fillOpacity="0.5" />
            <rect x="13" y="13" width="2" height="2" fill="currentColor" fillOpacity="0.5" />
            <path d="M4 8H20" strokeOpacity="0.5"/>
            <path d="M4 16H20" strokeOpacity="0.5"/>
        </svg>
    )
}

function GithubIcon() {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
        </svg>
    )
}

// --- 3D LOGO COMPONENT (EXACT COPY) ---

function Logo3DP() {
    // Der exakte Vektor-Pfad für ein eckiges "P" (Breite 20px, Höhe 25px) inkl. Loch in der Mitte
    const pathString = "M 0 0 H 20 V 15 H 5 V 25 H 0 Z M 5 5 V 10 H 15 V 5 Z";

    // Baut die einheitliche Vorder- und Rückseite
    const Face = ({ z }: { z: number }) => (
        <>
            <div
                className="absolute inset-0 bg-[#0D0D0D]/40 backdrop-blur-sm"
                style={{
                    transform: `translateZ(${z}px)`,
                    clipPath: `path('${pathString}')`
                }}
            />
            {/* Der weiße Rand für die komplexe Form */}
            <svg className="absolute inset-0 pointer-events-none" width="20" height="25" style={{ transform: `translateZ(${z}px)` }}>
                <path d={pathString} fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1" fillRule="evenodd" />
            </svg>
        </>
    );

    // Baut die 3D-Seitenwände (Horizontal)
    const EdgeH = ({ x, y, w }: { x: number, y: number, w: number }) => (
        <div className="absolute bg-white/5 backdrop-blur-sm border border-white/40"
             style={{ left: x, top: y, width: w, height: 5, transform: 'translateY(-2.5px) rotateX(90deg)' }} />
    );

    // Baut die 3D-Seitenwände (Vertikal)
    const EdgeV = ({ x, y, h }: { x: number, y: number, h: number }) => (
        <div className="absolute bg-white/5 backdrop-blur-sm border border-white/40"
             style={{ left: x, top: y, width: 5, height: h, transform: 'translateX(-2.5px) rotateY(90deg)' }} />
    );

    return (
        <div className="relative w-8 h-8 preserve-3d flex items-center justify-center mr-1">
            <style>{`
                @keyframes logo-float {
                    /* Der perfekte isometrische Blickwinkel von unten rechts */
                    0%, 100% { transform: translateY(0px) rotateX(50deg) rotateY(-40deg) rotateZ(-10deg); }
                    50% { transform: translateY(-4px) rotateX(50deg) rotateY(-40deg) rotateZ(-10deg); }
                }
                .animate-logo-float {
                    animation: logo-float 4s ease-in-out infinite;
                }
            `}</style>

            <div className="absolute inset-0 bg-white/20 blur-xl rounded-full" />

            <div className="relative preserve-3d animate-logo-float" style={{ width: 20, height: 25 }}>
                {/* 1. Vorder- und Rückseite (als eine einzige Form) */}
                <Face z={2.5} />
                <Face z={-2.5} />

                {/* 2. Die äußeren Kanten (Haut) um das P */}
                <EdgeH x={0} y={0} w={20} />   {/* Kante Oben */}
                <EdgeV x={20} y={0} h={15} />  {/* Kante Rechts Oben */}
                <EdgeH x={5} y={15} w={15} />  {/* Kante Rechts Einbuchtung */}
                <EdgeV x={5} y={15} h={10} />  {/* Kante Rechts Unten (Stamm) */}
                <EdgeH x={0} y={25} w={5} />   {/* Kante Unten */}
                <EdgeV x={0} y={0} h={25} />   {/* Kante Links */}

                {/* 3. Die inneren Kanten (Haut) des Lochs */}
                <EdgeH x={5} y={5} w={10} />   {/* Loch Oben */}
                <EdgeV x={15} y={5} h={5} />   {/* Loch Rechts */}
                <EdgeH x={5} y={10} w={10} />  {/* Loch Unten */}
                <EdgeV x={5} y={5} h={5} />    {/* Loch Links */}
            </div>
        </div>
    );
}