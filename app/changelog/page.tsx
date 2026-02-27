"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';

// --- TYPEN ---
type ChangeType = 'security' | 'feature' | 'fix' | 'core';

interface ChangeLogEntry {
    version: string;
    date: string;
    hash: string;
    type: ChangeType;
    title: string;
    desc: string;
    changes: string[];
}

// --- DATEN ---
const changelogData: ChangeLogEntry[] = [
    {
        version: "v1.0.4",
        date: "2024-05-20",
        hash: "a1b2c3d",
        type: "security",
        title: "Critical Memory Patch",
        desc: "Fixed a potential heap overflow in the session handler. Recommended for all production nodes.",
        changes: [
            "Patched buffer bounds check in `session_manager.rs`",
            "Enforced strict memory isolation for plugin runtime",
            "Updated OpenSSL dependency to v3.2.1"
        ]
    },
    {
        version: "v1.0.3",
        date: "2024-05-12",
        hash: "e5f6g7h",
        type: "feature",
        title: "PostgreSQL Stream Support",
        desc: "Native support for PostgreSQL 16 binary replication protocol. Zero-copy implementation.",
        changes: [
            "Added `pg_stream` module",
            "Implemented logical replication slot handling",
            "New telemetry metrics for throughput"
        ]
    },
    {
        version: "v1.0.2",
        date: "2024-04-28",
        hash: "i8j9k0l",
        type: "fix",
        title: "CLI Stability Improvements",
        desc: "Addressed flickering issues in the TUI dashboard and improved connection retries.",
        changes: [
            "Fixed render loop in dashboard thread",
            "Increased default connection timeout to 30s",
            "Better error messages for auth failures"
        ]
    },
    {
        version: "v1.0.1",
        date: "2024-04-10",
        hash: "m1n2o3p",
        type: "core",
        title: "Initial Public Release",
        desc: "First stable release of the Pytja Core Engine. Air-gapped by design.",
        changes: [
            "Core engine stable release",
            "Plugin system V1",
            "Documentation published"
        ]
    }
];

// --- NEU: SICHERE SUB-KOMPONENTE FÜR DIE LINIE (MIT SPRING-GLÄTTUNG) ---
const AnimatedTimelineLine = ({ targetRef }: { targetRef: React.RefObject<HTMLElement | null> }) => {
    const { scrollYProgress } = useScroll({
        target: targetRef as React.RefObject<HTMLElement>,
        offset: ["start center", "end center"]
    });

    // NEU: Wir legen eine "Feder" über den Scroll-Wert. Das bügelt jedes Chrome-Ruckeln glatt!
    const smoothScaleY = useSpring(scrollYProgress, {
        stiffness: 100, // Wie schnell die Linie dem Scrollen folgt
        damping: 30,    // Verhindert ein "Nachwippen" am Ende
        restDelta: 0.001
    });

    return (
        <motion.div
            className="absolute top-4 -bottom-16 left-[10px] md:left-[-6px] w-px z-0 origin-top"
            style={{
                scaleY: smoothScaleY, // HIER den neuen smoothen Wert einsetzen!
                background: "linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 75%, rgba(255,255,255,0) 100%)"
            }}
        />
    );
};

export default function ChangelogPage() {
    const [mounted, setMounted] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [filter, setFilter] = useState<'all' | ChangeType>('all');

    const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
    const filterRef = useRef<HTMLDivElement>(null);
    const timelineRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setMounted(true);
        const handleResize = () => {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        };
        handleResize();
        window.addEventListener('resize', handleResize);

        const handleClickOutside = (event: MouseEvent) => {
            if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
                setIsFilterDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            window.removeEventListener('resize', handleResize);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Wenn nicht gemounted (also noch auf dem Server), render nichts.
    // So schützen wir alle Browser-spezifischen Hooks!
    if (!mounted) return null;

    const filteredData = filter === 'all'
        ? changelogData
        : changelogData.filter(item => item.type === filter);

    const filterOptions: { id: 'all' | ChangeType, label: string }[] = [
        { id: 'all', label: 'All Updates' },
        { id: 'security', label: 'Security' },
        { id: 'feature', label: 'Features' },
        { id: 'fix', label: 'Fixes' },
        { id: 'core', label: 'Core' }
    ];

    const currentFilterLabel = filterOptions.find(f => f.id === filter)?.label || 'All Updates';

    return (
        <div className="relative min-h-screen bg-[#0D0D0D] text-white font-mono overflow-x-hidden selection:bg-white/20">
            <style jsx global>{`
                html { overflow-y: auto; overflow-x: hidden; height: auto; }
                body { background-color: #0D0D0D; min-height: 100vh; position: relative; }
            `}</style>

            <div className="fixed inset-0 bg-grid opacity-20 pointer-events-none z-0" />

            {/* --- MOBILE NAV OVERLAY --- */}
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
                        <Link href="/download" className="w-full py-5 text-center text-[10px] font-bold uppercase bg-white text-black">Download</Link>
                    </div>
                </div>
            </div>

            {/* --- MAIN CONTENT --- */}
            <main className="relative z-10 pt-32 pb-20 px-6 md:px-8 max-w-5xl mx-auto min-h-[90vh]">

                <div className="text-center space-y-6 mb-16">
                    <div className="inline-flex items-center gap-2 border border-white/10 bg-white/[0.02] px-3 py-1 rounded-full">
                        <div className="relative flex items-center justify-center w-2 h-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-sm bg-white/40 opacity-75"></span>
                            <span className="relative inline-flex rounded-sm h-1.5 w-1.5 bg-white/80"></span>
                        </div>
                        <span className="text-[9px] uppercase tracking-[0.3em] text-white/60">System Log</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase text-white">
                        Project <span className="text-white/30">Changelog</span>
                    </h1>
                </div>

                <div className="sticky top-20 md:top-24 z-30 mb-20 flex justify-center">
                    <div className="md:hidden w-full max-w-sm" ref={filterRef}>
                        <div className="bg-[#0A0A0A] border border-white/10 rounded-3xl overflow-hidden transition-all duration-300">
                            <button
                                onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
                                className={`w-full flex items-center justify-between px-6 py-4 text-white text-[10px] font-bold uppercase tracking-widest transition-colors ${
                                    isFilterDropdownOpen ? 'bg-white/5' : 'hover:bg-white/5'
                                }`}
                            >
                                <span>Filter: {currentFilterLabel}</span>
                                <motion.svg
                                    animate={{ rotate: isFilterDropdownOpen ? 180 : 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="w-3 h-3"
                                    fill="none" viewBox="0 0 24 24" stroke="currentColor"
                                >
                                    <path strokeLinecap="square" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </motion.svg>
                            </button>

                            <AnimatePresence initial={false}>
                                {isFilterDropdownOpen && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                                    >
                                        <div className="flex flex-col border-t border-white/5">
                                            {filterOptions.map((opt) => (
                                                <button
                                                    key={opt.id}
                                                    onClick={() => {
                                                        setFilter(opt.id);
                                                        setIsFilterDropdownOpen(false);
                                                    }}
                                                    className={`w-full text-left px-6 py-4 text-[10px] font-bold uppercase tracking-widest border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors ${
                                                        filter === opt.id ? 'text-white bg-white/5' : 'text-white/40'
                                                    }`}
                                                >
                                                    {opt.label}
                                                </button>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    <div className="hidden md:inline-flex gap-2 p-1 bg-[#0A0A0A]/80 backdrop-blur-md border border-white/10 rounded-full">
                        {filterOptions.map((btn) => {
                            const isActive = filter === btn.id;
                            return (
                                <button
                                    key={btn.id}
                                    onClick={() => setFilter(btn.id)}
                                    className={`relative px-6 py-2 text-[10px] font-bold uppercase tracking-widest rounded-full transition-colors duration-300 ${
                                        isActive ? 'text-black' : 'text-white/40 hover:text-white'
                                    }`}
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeFilter"
                                            className="absolute inset-0 bg-white rounded-full"
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                            style={{ zIndex: 0 }}
                                        />
                                    )}
                                    <span className="relative z-10">{btn.label}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div ref={timelineRef} className="relative pl-4 md:pl-0 space-y-16">

                    {/* 1. Die statische graue Hintergrund-Linie */}
                    <div className="absolute top-4 -bottom-16 left-[10px] md:left-[-6px] w-px bg-white/10 z-0" />

                    {/* 2. Die animierte weiße Linie - Sicher ausgelagert */}
                    <AnimatedTimelineLine targetRef={timelineRef} />

                    {filteredData.map((entry, i) => (
                        <div key={i} className="relative pl-4 md:pl-8 group z-10">

                            {/* Fix für den CSS Syntax Fehler in den Breakpoints */}
                            <div className="absolute -left-[5.5px] md:-left-[5.5px] top-2.5 p-1 -translate-x-1/2">
                                <div className="relative flex items-center justify-center w-2 h-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-sm bg-white/40 opacity-75"></span>
                                    <span className="relative inline-flex rounded-sm h-1.5 w-1.5 bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]"></span>
                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-start">
                                <div className="md:w-30 shrink-0 space-y-2">
                                    <div className="flex items-center gap-3">
                                        <span className="text-2xl font-bold text-white tracking-tighter">{entry.version}</span>
                                        {i === 0 && filter === 'all' && (
                                            <span className="text-[9px] bg-white/10 border border-white/10 px-2 py-0.5 rounded text-white/60 uppercase tracking-wider">Latest</span>
                                        )}
                                    </div>
                                    <div className="text-[10px] text-white/30 font-mono uppercase tracking-widest">{entry.date}</div>

                                    <div className="inline-flex items-center gap-2 text-[10px] font-mono text-white/20 bg-white/[0.02] px-2 py-1 border border-white/5 rounded cursor-pointer hover:text-white/60 hover:border-white/20 transition-all group/hash">
                                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 22.027v-6.027c0-2.227-1.5-3.027-3-3.027c3.5 0 6-2.5 6-5.5c0-4.5-4-5-6-5c-2 0-6 .5-6 5c0 3 2.5 5.5 6 5.5c-1.5 0-3 .8-3 3.027v6.027"/></svg>
                                        {entry.hash}
                                    </div>
                                </div>

                                <div className="flex-1 space-y-6 bg-[#0A0A0A] p-6 border border-white/5 rounded-sm hover:border-white/10 transition-colors w-full">
                                    <div>
                                        <div className="text-[9px] uppercase tracking-[0.2em] font-bold mb-2 text-white/50">
                                            [{entry.type}]
                                        </div>
                                        <h3 className="text-xl font-bold text-white uppercase tracking-tight">{entry.title}</h3>
                                        <p className="text-sm text-[#888] mt-2 font-light leading-relaxed">{entry.desc}</p>
                                    </div>

                                    <ul className="space-y-3 border-t border-white/5 pt-4">
                                        {entry.changes.map((change, idx) => (
                                            <li key={idx} className="flex items-start gap-3 text-xs text-white/60 font-mono">
                                                {/* font-bold macht ihn dicker, -translate-y-[1px] schiebt ihn leicht hoch */}
                                                <span className="text-white/30 font-bold select-none -translate-y-[1px]">—</span>
                                                {change}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="ml-[10px] md:ml-[-6px] pl-8 md:pl-16 pt-16 pb-8 border-l border-white/10 border-dashed relative z-10">
                    <div className="text-[10px] text-white/20 uppercase tracking-[0.2em]">End of Stream // Initial Commit</div>
                </div>

            </main>
        </div>
    );
}