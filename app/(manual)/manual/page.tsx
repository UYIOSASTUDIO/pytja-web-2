"use client";
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { motion, LayoutGroup } from 'framer-motion';

export default function ManualPage() {
    const [mounted, setMounted] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeMethod, setActiveMethod] = useState<'binary' | 'source'>('binary');

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

    // --- PORTAL CONTENT: STICKY BAR (Updated Design) ---
    const stickyBar = (
        <div
            className="fixed bottom-0 left-0 right-0 w-full z-[99999] px-6 py-6 flex justify-center pointer-events-none"
            style={{ paddingBottom: 'max(1.5rem, env(safe-area-inset-bottom))' }}
        >
            <div className="pointer-events-auto flex w-full max-w-sm justify-between p-1.5 bg-[#0A0A0A]/90 backdrop-blur-xl border border-white/10 rounded-full shadow-[0_10px_40px_-10px_rgba(0,0,0,0.8)]">

                <LayoutGroup id="manual-toggle">
                    {/* BUTTON 1: CORE BINARY */}
                    <button
                        onClick={() => setActiveMethod('binary')}
                        className={`relative flex-1 py-3 text-[10px] font-bold uppercase tracking-widest rounded-full transition-colors duration-300 flex justify-center items-center gap-2 ${
                            activeMethod === 'binary' ? 'text-black' : 'text-white/40 hover:text-white'
                        }`}
                    >
                        {activeMethod === 'binary' && (
                            <motion.div
                                layoutId="activeMethodManual"
                                className="absolute inset-0 bg-white rounded-full"
                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                style={{ zIndex: 0 }}
                            />
                        )}
                        <span className="relative z-10 flex items-center gap-2">
                            <BinaryIcon /> Core Binary
                        </span>
                    </button>

                    {/* BUTTON 2: SOURCE BUILD (Blau) */}
                    <button
                        onClick={() => setActiveMethod('source')}
                        className={`relative flex-1 py-3 text-[10px] font-bold uppercase tracking-widest rounded-full transition-colors duration-300 flex justify-center items-center gap-2 ${
                            activeMethod === 'source' ? 'text-white' : 'text-white/40 hover:text-white'
                        }`}
                    >
                        {activeMethod === 'source' && (
                            <motion.div
                                layoutId="activeMethodManual"
                                className="absolute inset-0 bg-blue-600 rounded-full shadow-[0_0_15px_rgba(37,99,235,0.4)]"
                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                style={{ zIndex: 0 }}
                            />
                        )}
                        <span className="relative z-10 flex items-center gap-2">
                            <GithubIcon /> Source Build
                        </span>
                    </button>
                </LayoutGroup>

            </div>
        </div>
    );

    return (
        <div className="relative min-h-screen bg-[#0D0D0D] text-white font-mono overflow-x-hidden selection:bg-white/20">
            <style jsx global>{`
                html { overflow-y: auto; overflow-x: hidden; height: auto; }
                body { background-color: #0D0D0D; min-height: 100vh; position: relative; }
                /* Custom Scrollbar für Code-Blöcke */
                .code-scroll::-webkit-scrollbar { height: 4px; }
                .code-scroll::-webkit-scrollbar-track { background: transparent; }
                .code-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 2px; }
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
                    <div className="mt-auto pb-40 flex flex-col gap-4 shrink-0">
                        <Link href="/contact" className="w-full py-4 text-center text-[10px] font-bold uppercase border border-white/5 text-white/40">Contact Support</Link>
                        <Link href="/dashboard" className="w-full py-5 text-center text-[10px] font-bold uppercase bg-white text-black">Open Terminal</Link>
                    </div>
                </div>
            </div>

            {/* --- MAIN CONTENT --- */}
            {/* pb-48 sorgt für genügend Abstand unten für die Sticky Bar */}
            <main className="relative z-10 pt-32 pb-48 px-6 md:px-8 max-w-5xl mx-auto min-h-[90vh]">

                {/* Header Text */}
                <div className="text-center space-y-6 mb-16">
                    <div className="inline-flex items-center gap-2 border border-white/10 bg-white/[0.02] px-3 py-1 rounded-full">
                        {/* ANIMATION: Square Prerelease Style */}
                        <div className="relative flex items-center justify-center w-2 h-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-sm bg-white/40 opacity-75"></span>
                            <span className="relative inline-flex rounded-sm h-1.5 w-1.5 bg-white/80"></span>
                        </div>
                        <span className="text-[9px] uppercase tracking-[0.3em] text-white/60">Documentation</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase text-white">
                        Deployment <span className="text-white/30">Protocols</span>
                    </h1>
                </div>

                {/* --- CONTENT STEPS --- */}
                <div className="relative">
                    {activeMethod === 'binary' ? (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8 md:space-y-0">
                            <ManualStep number="01" title="Acquire Artifact" desc="Download the pre-compiled binary matching your architecture. Ensure the file is not corrupted.">
                                {/* HIER: variant="white" */}
                                <CommandBlock variant="white" cmd="curl -L https://get.pytja.com/latest -o pytja" />
                            </ManualStep>
                            <Divider />
                            <ManualStep number="02" title="Verify Signature" desc="CRITICAL: Verify the SHA-256 hash against the official transparency log before execution.">
                                <CommandBlock variant="white" cmd="shasum -a 256 pytja" output="e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855  pytja" />
                            </ManualStep>
                            <Divider />
                            <ManualStep number="03" title="Grant Permissions" desc="The binary is locked by default. You must explicitly allow execution on Unix-based systems.">
                                <CommandBlock variant="white" cmd="chmod +x pytja" />
                            </ManualStep>
                            <Divider />
                            <ManualStep number="04" title="Initialize Core" desc="Run the binary. The Pytja kernel will allocate isolated memory and start the listener.">
                                <CommandBlock variant="white" cmd="./pytja --init" output="[INFO] Core initialized. Memory lock established." />
                            </ManualStep>
                        </div>
                    ) : (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8 md:space-y-0">
                            {/* Source Build bleibt BLAU (default) */}
                            <ManualStep number="01" title="Prerequisites" desc="Ensure the Rust toolchain (cargo, rustc) and protocol buffers are installed on your build machine.">
                                <CommandBlock cmd="curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh" />
                            </ManualStep>
                            <Divider />
                            <ManualStep number="02" title="Clone Repository" desc="Pull the source code from the repository. We recommend using the main branch for stability.">
                                <CommandBlock cmd="git clone https://github.com/pytja/core.git" />
                            </ManualStep>
                            <Divider />
                            <ManualStep number="03" title="Compile Release" desc="Build the binary in release mode. This optimizes the memory footprint and enables safety checks.">
                                <CommandBlock cmd="cargo build --release --features=strict_mode" output="Finished release [optimized] target(s) in 42.0s" />
                            </ManualStep>
                            <Divider />
                            <ManualStep number="04" title="Execute Binary" desc="The compiled binary is located in the target/release directory.">
                                <CommandBlock cmd="./target/release/pytja" />
                            </ManualStep>
                        </div>
                    )}
                </div>
            </main>

            {/* --- RENDER PORTAL --- */}
            {/* Hier wird die Bar in den Body 'gebeamt' */}
            {createPortal(stickyBar, document.body)}

        </div>
    );
}

// --- SUB-KOMPONENTEN ---

function ManualStep({ number, title, desc, children }: { number: string, title: string, desc: string, children: React.ReactNode }) {
    return (
        <div className="flex flex-col md:flex-row gap-4 md:gap-10 group w-full">
            <div className="flex items-center gap-4 md:block md:w-16 flex-shrink-0">
                <div className="w-10 h-10 md:w-16 md:h-16 flex items-center justify-center border border-white/10 bg-[#0A0A0A] group-hover:border-white/30 transition-colors shrink-0">
                    <span className="text-sm md:text-xl font-bold font-mono text-white/20 group-hover:text-white transition-colors">{number}</span>
                </div>
                <h3 className="md:hidden text-lg font-bold text-white uppercase tracking-tight group-hover:text-blue-400 transition-colors">{title}</h3>
            </div>
            <div className="flex-1 md:pt-3 pb-8 w-full min-w-0">
                <h3 className="hidden md:block text-xl font-bold text-white uppercase tracking-tight mb-3 group-hover:text-blue-400 transition-colors">{title}</h3>
                <p className="text-sm text-[#888] leading-relaxed mb-6 font-light max-w-2xl">{desc}</p>
                <div className="w-full">{children}</div>
            </div>
        </div>
    );
}

function CommandBlock({ cmd, output, variant = 'blue' }: { cmd: string, output?: string, variant?: 'blue' | 'white' }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(cmd);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const barColor = variant === 'white' ? 'bg-white/20' : 'bg-blue-500/20';
    const promptColor = variant === 'white' ? 'text-white' : 'text-blue-500';

    return (
        <div className="w-full bg-[#050505] border border-white/10 p-4 font-mono text-xs rounded-sm group-hover:border-white/20 transition-colors relative">
            {/* FIX: 'rounded-l-sm' hinzugefügt, damit sich der Balken links dem Container anpasst */}
            <div className={`absolute top-0 left-0 w-1 h-full rounded-l-sm ${barColor}`} />

            <button
                onClick={handleCopy}
                className="absolute top-3.5 right-3 p-2 bg-[#050505]/80 text-white/30 hover:text-white border border-transparent hover:border-white/10 rounded-sm transition-all z-10"
                title="Copy to clipboard"
            >
                {copied ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-green-500">
                        <polyline points="20 6 9 17 4 12" />
                    </svg>
                ) : (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                )}
            </button>

            <div className="overflow-x-auto code-scroll py-2 pr-12">
                <div className="flex items-center gap-3 text-white/80 whitespace-nowrap">
                    <span className={`${promptColor} font-bold select-none`}>$</span>
                    <span className="select-all">{cmd}</span>
                </div>
            </div>

            {output && (
                <div className="mt-2 pt-2 border-t border-white/5 text-white/30 whitespace-pre-wrap break-all">
                    {output}
                </div>
            )}
        </div>
    );
}

function Divider() { return <div className="h-8 md:h-12 border-l border-white/5 ml-5 md:ml-8 my-2" />; }
function BinaryIcon() { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M12 8v8m-4-4l4 4 4-4"/></svg> }
function GithubIcon() { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 22.027v-6.027c0-2.227-1.5-3.027-3-3.027c3.5 0 6-2.5 6-5.5c0-4.5-4-5-6-5c-2 0-6 .5-6 5c0 3 2.5 5.5 6 5.5c-1.5 0-3 .8-3 3.027v6.027"/></svg> }