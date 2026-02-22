"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function PytjaLanding() {
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(p => (p < 100 ? p + 4 : 100));
        }, 40);
        if (progress === 100) setTimeout(() => setLoading(false), 500);
        return () => clearInterval(interval);
    }, [progress]);

    if (loading) {
        return (
            <div className="h-screen bg-[#0D0D0D] flex items-center justify-center font-mono p-10">
                <div className="w-full max-w-sm space-y-4">
                    <div className="flex justify-between text-[10px] text-accent tracking-[0.4em]">
                        <span>SYSTEM_BOOT</span>
                        <span>{progress}%</span>
                    </div>
                    <div className="h-px w-full bg-[#1a1a1a]">
                        <div className="h-full bg-accent transition-all duration-200" style={{ width: `${progress}%` }} />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="relative min-h-screen bg-[#0D0D0D]">
            <div className="fixed inset-0 bg-grid opacity-30 pointer-events-none" />

            <header className="fixed top-0 w-full z-[100] border-b border-white/5 bg-[#0D0D0D]/90 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto px-10 h-24 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-4 h-4 bg-accent rotate-45 shadow-[0_0_20px_rgba(244,102,35,0.4)]" />
                        <span className="font-bold text-2xl tracking-tighter uppercase tracking-widest">Pytja<span className="text-accent">_</span></span>
                    </div>
                    <nav className="hidden md:flex gap-12 text-[10px] tracking-[0.4em] text-gray-500 font-bold uppercase">
                        <Link href="/dashboard" className="hover:text-accent transition-colors">Dashboard</Link>
                        <a href="#" className="hover:text-white transition-colors">Github</a>
                        <a href="#" className="hover:text-white transition-colors">Docs</a>
                    </nav>
                    <Link href="/dashboard" className="bg-white text-black px-8 py-3 text-[10px] font-bold hover:bg-accent hover:text-white transition-all uppercase tracking-[0.2em]">
                        Terminal_Launch
                    </Link>
                </div>
            </header>

            <main className="relative pt-64 pb-32 px-10 max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-24 items-start min-h-[70vh]">

                    <div className="space-y-16">
                        <div className="space-y-8">
                            <div className="inline-block px-4 py-1 border border-accent/40 bg-accent/5 rounded-sm">
                                <span className="text-[10px] text-accent font-bold tracking-[0.4em] uppercase">Security Verified // Rust Core</span>
                            </div>
                            <h1 className="text-8xl md:text-[150px] font-black leading-[0.8] tracking-tighter uppercase text-white">
                                RUST<br/><span className="text-accent italic">SANDBOX.</span>
                            </h1>
                            <p className="text-xl md:text-2xl text-gray-500 max-w-lg font-light leading-relaxed">
                                High-performance <span className="text-white italic">isolation layer</span> for database exploration. Zero disk traces, pure native speed.
                            </p>
                        </div>

                        <div className="flex items-center gap-10">
                            <Link href="/dashboard" className="bg-accent text-black font-black px-14 py-7 uppercase text-xs tracking-[0.3em] hover:scale-105 transition-all shadow-[0_10px_50px_rgba(244,102,35,0.25)]">
                                Try it now
                            </Link>
                            <div className="hidden sm:block text-[9px] text-gray-600 font-bold uppercase tracking-widest leading-loose">
                                [01] Connect <br /> [02] Isolate <br /> [03] Analyze
                            </div>
                        </div>
                    </div>

                    <div className="relative h-[600px] perspective-2000 hidden lg:flex items-center justify-center">
                        <div className="relative w-80 h-96 animate-float flex flex-col gap-6">
                            {/* 3D Database Layers */}
                            <div className="w-full h-24 border-2 border-accent bg-accent/10 backdrop-blur-md flex items-center justify-center transform skew-x-[-20deg] rotate-x-[45deg] shadow-[0_20px_50px_rgba(244,102,35,0.2)]">
                                <span className="text-accent font-bold tracking-[0.5em] text-[10px]">CORE_ENGINE</span>
                            </div>
                            <div className="w-full h-24 border-2 border-accent/40 bg-accent/5 transform skew-x-[-20deg] rotate-x-[45deg] opacity-60" />
                            <div className="w-full h-24 border-2 border-accent/20 bg-accent/5 transform skew-x-[-20deg] rotate-x-[45deg] opacity-30" />
                        </div>
                    </div>
                </div>

                <section className="mt-40 grid grid-cols-1 md:grid-cols-4 border border-[#1a1a1a] bg-[#0A0A0A]/50 backdrop-blur-sm divide-y md:divide-y-0 md:divide-x divide-[#1a1a1a]">
                    <StatItem label="Throughput" value="36GB/s" />
                    <StatItem label="Isolation" value="100%" />
                    <StatItem label="Latency" value="0.2ms" />
                    <StatItem label="Engine" value="Rustc" />
                </section>
            </main>
        </div>
    );
}

function StatItem({ label, value }: { label: string, value: string }) {
    return (
        <div className="p-16 hover:bg-accent/5 transition-all group">
            <div className="text-[10px] text-gray-600 font-bold tracking-[0.4em] uppercase mb-4 group-hover:text-accent transition-colors italic">{label}</div>
            <div className="text-4xl font-bold tracking-tighter italic text-white">{value}</div>
        </div>
    );
}