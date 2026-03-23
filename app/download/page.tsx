"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function DownloadPage() {
    const [mounted, setMounted] = useState(false);
    const [copiedCurl, setCopiedCurl] = useState(false);
    const [copiedDocker, setCopiedDocker] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleCopyCurl = () => {
        navigator.clipboard.writeText('curl -sSL pytja.com/install | bash');
        setCopiedCurl(true);
        setTimeout(() => setCopiedCurl(false), 2000);
    };

    const handleCopyDocker = () => {
        navigator.clipboard.writeText('docker pull pytja/core:latest');
        setCopiedDocker(true);
        setTimeout(() => setCopiedDocker(false), 2000);
    };

    if (!mounted) return null;

    return (
        <div className="relative min-h-screen bg-white font-sans selection:bg-black selection:text-white">
            <style jsx global>{`
                html { overflow-y: auto; overflow-x: hidden; height: auto; }
                body { background-color: #000000; min-height: 100vh; position: relative; }
            `}</style>

            {/* main padding angepasst, da die Sektionen jetzt eigene Paddings haben */}
            <main className="relative z-10 pt-32 md:pt-40">

                {/* --- HERO HEADER --- */}
                <section className="w-full pb-16 md:pb-24">
                    <div className="w-full text-center px-6 max-w-4xl mx-auto space-y-6">
                        <div className="inline-flex items-center gap-3 border border-black/10 bg-black/[0.02] px-4 py-1.5 rounded-full w-fit mx-auto">
                            <div className="relative flex items-center justify-center w-2 h-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-sm bg-black/40 opacity-75"></span>
                                <span className="relative inline-flex rounded-sm h-1.5 w-1.5 bg-black/80"></span>
                            </div>
                            <span className="text-[9px] md:text-[10px] text-gray-600 font-mono tracking-[0.4em] uppercase font-bold">
                                Distribution Hub
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-[56px] font-medium tracking-tight text-black leading-[1.1] text-balance">
                            Select Deployment
                        </h1>
                        <p className="text-[15px] md:text-[16px] text-gray-500 font-light leading-relaxed max-w-2xl mx-auto">
                            Install the pre-compiled standalone executable for your operating system, or inspect the source architecture directly on GitHub.
                        </p>
                    </div>
                </section>

                {/* --- DOWNLOAD CARDS (Mit durchgehender Linie oben) --- */}
                <section className="w-full border-t border-black/10 relative z-20">
                    <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24 py-16 md:py-24">
                        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">

                            {/* OPTION 1: COMPILED BINARY (Dark Box) */}
                            <div className="w-full bg-[#0a0a0a] rounded-2xl p-6 md:p-10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border border-black/5 flex flex-col h-full relative overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                                <div className="relative z-10 flex justify-between items-start mb-6">
                                    <div className="p-3 bg-white/[0.05] border border-white/10 rounded-md text-white">
                                        <BinaryIcon />
                                    </div>
                                    <div className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 bg-white/10 text-white/60 border-1 border-white/20 rounded-2xl">
                                        v1.0.4-stable
                                    </div>
                                </div>

                                <div className="relative z-10 mb-6">
                                    <h3 className="text-2xl font-medium text-white tracking-tight mb-2">
                                        Core Binary
                                    </h3>
                                    <p className="text-[14px] text-gray-400 font-light leading-relaxed">
                                        Pre-compiled standalone executable. Optimized for production environments with zero external dependencies.
                                    </p>
                                </div>

                                <ul className="relative z-10 space-y-2 mb-8 border-t border-white/10 pt-6">
                                    {['Windows / Mac / Linux', 'SHA-256 Verified', 'No Source Access'].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 text-[11px] uppercase tracking-wider text-gray-400 font-mono">
                                            <span className="w-1 h-1 rounded-full bg-gray-500" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>

                                {/* Keine Icon-Bewegung bei Hover */}
                                <Link href="/downloads/pytja-installer-v1.0.4.exe" className="relative z-10 w-full py-4 flex items-center justify-center gap-3 border transition-colors duration-300 uppercase text-[10px] font-bold tracking-[0.3em] bg-white text-black border-white hover:bg-gray-200 rounded-md mt-auto">
                                    Download Installer
                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="square" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                    </svg>
                                </Link>
                            </div>

                            {/* OPTION 2: SOURCE CODE (Dark Box) */}
                            <div className="w-full bg-[#111] rounded-2xl p-6 md:p-10 border border-black/10 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.2)] flex flex-col h-full relative overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                                <div className="relative z-10 flex justify-between items-start mb-6">
                                    <div className="p-3 bg-white/[0.05] border border-white/10 rounded-md text-white/70">
                                        <GithubIcon />
                                    </div>
                                    <div className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 border border-white/20 text-white/50 rounded-2xl">
                                        Branch: Main
                                    </div>
                                </div>

                                <div className="relative z-10 mb-6">
                                    <h3 className="text-xl font-medium text-white/90 tracking-tight mb-2">
                                        Source Code
                                    </h3>
                                    <p className="text-[14px] text-gray-500 font-light leading-relaxed">
                                        Full access to the Rust repository. Inspect the architecture, compile manually, or contribute to the kernel.
                                    </p>
                                </div>

                                <ul className="relative z-10 space-y-2 mb-8 border-t border-white/10 pt-6">
                                    {['MIT License', 'Rust Toolchain Required', 'Full Audit Trail'].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 text-[11px] uppercase tracking-wider text-gray-500 font-mono">
                                            <span className="w-1 h-1 rounded-full bg-gray-600" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>

                                {/* Keine Icon-Bewegung bei Hover */}
                                <Link href="https://github.com/pytja/core" target="_blank" className="relative z-10 w-full py-4 flex items-center justify-center gap-3 border transition-colors duration-300 uppercase text-[10px] font-bold tracking-[0.3em] bg-transparent text-white border-white/20 hover:border-white/50 hover:bg-white/5 rounded-md mt-auto">
                                    View on GitHub
                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="square" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                </Link>
                            </div>

                        </div>
                    </div>
                </section>

                {/* --- AUTOMATED INSTALLATION SECTION (Updated architecture) --- */}
                <section className="w-full bg-white relative z-20 overflow-x-hidden">
                    <div className="w-full border-y border-black/10">
                        <div className="grid grid-cols-1 lg:grid-cols-10 divide-y lg:divide-y-0 lg:divide-x divide-black/10 max-w-[1600px] mx-auto px-0 md:px-12 lg:px-24">

                            {/* LINKE SPALTE: Text & Boxed Icon (4 von 10 Spalten) */}
                            <div className="lg:col-span-4 p-6 md:p-8 lg:p-12 flex flex-col bg-black/[0.01]">

                                {/* Das Boxed Icon */}
                                <div className="mb-6 lg:mb-8">
                                    <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-black/[0.03] to-transparent border border-black/10 rounded-lg shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
                                        <svg className="w-5 h-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9.75v6.75m0 0l-3-3m3 3l3-3m-8.25 6a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                                        </svg>
                                    </div>
                                </div>

                                <h2 className="text-2xl md:text-3xl font-medium tracking-tight text-black mb-3">
                                    Automated Installation
                                </h2>
                                <p className="text-[14px] md:text-[15px] text-gray-500 leading-relaxed max-w-md">
                                    Integrate Pytja directly into your CI/CD pipelines or headless environments. Use our shell script for native Unix execution, or pull the minimal Alpine-based Docker container.
                                </p>
                            </div>

                            {/* RECHTE BOX: Befehle untereinander (6 von 10 Spalten) */}
                            {/* HIER GEÄNDERT: divide-y wurde entfernt, da wir die Linie manuell setzen */}
                            <div className="lg:col-span-6 flex flex-col">

                                {/* UNIX SHELL BLOCK */}
                                <div className="p-6 md:p-8 lg:px-12 lg:py-8 flex flex-col justify-center gap-4 lg:min-h-[170px]">

                                    {/* Header */}
                                    <div className="flex items-center gap-3">
                                        <div>
                                            <h3 className="text-[15px] font-medium tracking-tight text-black mb-0.5">
                                                Unix / macOS Shell
                                            </h3>
                                            <div className="text-[13px] text-gray-500 leading-none">
                                                Native installation via bash
                                            </div>
                                        </div>
                                    </div>

                                    {/* Code Block with integrated Copy (Unix Shell) */}
                                    <div className="w-full bg-black/[0.03] border border-black/10 rounded-md text-[12px] font-mono text-black relative flex items-center shadow-inner overflow-hidden">
                                        <code className="flex-1 p-3.5 pr-12 truncate">
                                            curl -sSL pytja.com/install | bash
                                        </code>

                                        <button
                                            onClick={handleCopyCurl}
                                            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-md text-black/40 hover:text-black hover:bg-black/5 transition-colors cursor-pointer"
                                            aria-label="Copy code"
                                            title="Copy to clipboard"
                                        >
                                            {copiedCurl ? (
                                                // Checkmark Icon (Emerald Green)
                                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-emerald-600">
                                                    <polyline points="20 6 9 17 4 12" />
                                                </svg>
                                            ) : (
                                                // Copy/Square Icon
                                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                                                </svg>
                                            )}
                                        </button>
                                    </div>
                                </div>

                                {/* DOCKER IMAGE BLOCK */}
                                {/* HIER GEÄNDERT: relative hinzugefügt für die Linie */}
                                <div className="relative p-6 md:p-8 lg:px-12 lg:py-8 flex flex-col justify-center gap-4 lg:min-h-[170px]">

                                    {/* HIER NEU: Die absolute Trennlinie! Startet links an der Kante und läuft rechts endlos weiter */}
                                    <div className="absolute top-0 left-[-100vw] lg:left-0 w-[200vw] h-[1px] bg-black/10 pointer-events-none" />

                                    {/* Header */}
                                    <div className="flex items-center gap-3">
                                        <div>
                                            <h3 className="text-[15px] font-medium tracking-tight text-black mb-0.5">
                                                Docker Container
                                            </h3>
                                            <div className="text-[13px] text-gray-500 leading-none">
                                                Pre-built Alpine image
                                            </div>
                                        </div>
                                    </div>

                                    {/* Code Block with integrated Copy (Docker) */}
                                    <div className="w-full bg-black/[0.03] border border-black/10 rounded-md text-[12px] font-mono text-black relative flex items-center shadow-inner overflow-hidden">
                                        <code className="flex-1 p-3.5 pr-12 truncate">
                                            docker pull pytja/core:latest
                                        </code>

                                        <button
                                            onClick={handleCopyDocker}
                                            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-md text-black/40 hover:text-black hover:bg-black/5 transition-colors cursor-pointer"
                                            aria-label="Copy code"
                                            title="Copy to clipboard"
                                        >
                                            {copiedDocker ? (
                                                // Checkmark Icon (Emerald Green)
                                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-emerald-600">
                                                    <polyline points="20 6 9 17 4 12" />
                                                </svg>
                                            ) : (
                                                // Copy/Square Icon
                                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                                                </svg>
                                            )}
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>

                {/* Security Note Footer (Ohne eigene Rahmen, schließt optisch die Architektur-Section ab) */}
                <section className="w-full relative z-10">
                    <div className="max-w-[1600px] mx-auto text-center py-12 px-6">
                        <p className="text-[11px] text-gray-500 uppercase tracking-widest leading-relaxed font-mono">
                            // Security Notice: All binaries are cryptographically signed.<br/>
                            Do not run executables if the checksum does not match the official record published on our <Link href="/legal/transparency" className="text-black font-bold hover:underline underline-offset-2 transition-all">transparency log</Link>.
                        </p>
                    </div>
                </section>

            </main>
        </div>
    );
}

// --- ICONS ---
function BinaryIcon() {
    return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z" />
        </svg>
    )
}

function GithubIcon() {
    return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
        </svg>
    )
}