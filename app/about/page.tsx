"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AboutPage() {
    const [mounted, setMounted] = useState(false);

    // --- NEU: State & Observer für das Sticky Scroll Menu ---
    const [activeSection, setActiveSection] = useState("daemon");

    useEffect(() => {
        if (!mounted) return;

        // HIER NEU: Bricht sofort ab, wenn der Bildschirm Mobile-Größe hat
        if (typeof window !== 'undefined' && window.innerWidth < 768) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { rootMargin: "-30% 0px -70% 0px" } // Löst aus, wenn der Block im oberen Drittel ist
        );

        const sections = document.querySelectorAll(".scroll-section");
        sections.forEach((section) => observer.observe(section));

        return () => {
            sections.forEach((section) => observer.unobserve(section));
        };
    }, [mounted]);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="relative min-h-screen font-sans selection:bg-black selection:text-white">

            {/* --- HERO & ARCHITECTURE DIAGRAM (Combined Section) --- */}
            <section className="w-full bg-white relative z-20 overflow-hidden pb-24 md:pb-32 border-b border-black/10">

                {/* --- HERO CONTENT --- */}
                <div className="pt-32 md:pt-48 pb-16 md:pb-24 px-6 md:px-8 max-w-6xl mx-auto flex flex-col items-center justify-center text-center">
                    <div className="space-y-6 md:space-y-8 flex flex-col items-center relative z-20 w-full">

                        {/* Tag / Mission Brief */}
                        <div className="inline-flex items-center gap-3 border border-black/10 bg-black/[0.02] px-4 py-1.5 rounded-full">
                            <div className="relative flex items-center justify-center w-2 h-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-sm bg-black/40 opacity-75"></span>
                                <span className="relative inline-flex rounded-sm h-1.5 w-1.5 bg-black/80"></span>
                            </div>
                            <span className="text-[9px] md:text-[10px] text-gray-600 font-mono tracking-[0.4em] uppercase font-bold">
                                Mission Brief
                            </span>
                        </div>

                        {/* Haupt-Statement */}
                        <h1 className="w-full text-3xl sm:text-5xl lg:text-[56px] font-bold leading-[1.1] tracking-tight text-black max-w-5xl mx-auto text-balance px-2 md:px-0">
                            The architect(ure) & intent <br className="hidden md:block" /> behind the system.
                        </h1>

                        {/* Subtext */}
                        <p className="w-full text-sm md:text-base text-gray-500 max-w-2xl font-light leading-relaxed mx-auto">
                            Pytja is the foundational layer for isolated, zero-trust data exploration. Built to manage SQL databases and cloud storage in highly sensitive workflows.
                        </p>

                    </div>
                </div>

                {/* --- THE BLUEPRINT DIAGRAM AREA --- */}
                <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24">

                    {/* CSS FÜR ANIMATIONEN */}
                    <style>{`
        @keyframes stream-flow {
            from { stroke-dashoffset: 24; }
            to { stroke-dashoffset: 0; }
        }
        .animate-stream {
            animation: stream-flow 1s linear infinite;
        }
    `}</style>

                    {/* ========================================================================= */}
                    {/* 1. MOBILE VIEW (Box wächst auf iPad, Diagramm bleibt zentriert)           */}
                    {/* ========================================================================= */}
                    <div className="block lg:hidden relative w-full mx-auto py-8">

                        {/* Äußere Box: Wächst auf iPad (md:max-w-2xl), behält Rand und Background */}
                        <div className="relative w-full md:max-w-2xl mx-auto h-[850px] sm:h-[950px] bg-white border border-black/10 rounded-2xl overflow-hidden shadow-[inset_0_0_40px_rgba(0,0,0,0.02)]">

                            {/* Dotted Grid Background - füllt die gesamte Box aus */}
                            <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-50 z-0" />

                            {/* Innerer Wrapper: Hält das eigentliche Diagramm auf max 450px zentriert */}
                            <div className="relative w-full max-w-[450px] h-full mx-auto">

                                {/* SVG Diagramm */}
                                <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 translate-y-[3%]" viewBox="0 0 500 1000" preserveAspectRatio="none">

                                    {/* Statische Haupt-Linien */}
                                    <g className="text-black/10" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M 250 35 V 100 Q 250 120 230 120 H 145 Q 125 120 125 140 V 220" />
                                        <path d="M 250 35 V 100 Q 250 120 270 120 H 355 Q 375 120 375 140 V 220" />
                                        <path d="M 125 220 V 280 Q 125 300 145 300 H 230 Q 250 300 250 320 V 400" />
                                        <path d="M 375 220 V 280 Q 375 300 355 300 H 270 Q 250 300 250 320 V 400" />
                                        <path d="M 250 400 H 405 Q 425 400 425 420 V 500" />
                                        <path d="M 250 400 V 600" />
                                        <path d="M 250 600 H 95 Q 75 600 75 580 V 500" />
                                        <path d="M 250 600 V 680 Q 250 700 230 700 H 145 Q 125 700 125 720 V 800" />
                                        <path d="M 250 600 V 680 Q 250 700 270 700 H 355 Q 375 700 375 720 V 800" />
                                        <path d="M 125 800 V 880 Q 125 900 145 900 H 355 Q 375 900 375 880 V 800" />
                                    </g>

                                    {/* Animierte Daten-Pulslinien */}
                                    <g className="text-black/40 animate-stream" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="6 6">
                                        <path d="M 250 35 V 100 Q 250 120 230 120 H 145 Q 125 120 125 140 V 220" />
                                        <path d="M 250 35 V 100 Q 250 120 270 120 H 355 Q 375 120 375 140 V 220" />
                                        <path d="M 125 220 V 280 Q 125 300 145 300 H 230 Q 250 300 250 320 V 400" />
                                        <path d="M 375 220 V 280 Q 375 300 355 300 H 270 Q 250 300 250 320 V 400" />
                                        <path d="M 250 400 H 405 Q 425 400 425 420 V 500" />
                                        <path d="M 250 400 V 600" />
                                        <path d="M 250 600 H 95 Q 75 600 75 580 V 500" />
                                        <path d="M 250 600 V 680 Q 250 700 230 700 H 145 Q 125 700 125 720 V 800" />
                                        <path d="M 250 600 V 680 Q 250 700 270 700 H 355 Q 375 700 375 720 V 800" />
                                        <path d="M 125 800 V 880 Q 125 900 145 900 H 250" className="text-emerald-500/50" />
                                        <path d="M 375 800 V 880 Q 375 900 355 900 H 250" className="text-emerald-500/50" />
                                    </g>
                                </svg>

                                {/* --- MOBILE HTML NODES --- */}
                                <div className="absolute inset-0 translate-y-[3%] pointer-events-none">
                                    {/* Auth User */}
                                    <div className="absolute top-[5%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[160px] h-10 bg-black border border-black rounded-full shadow-md flex items-center justify-center gap-2 z-20">
                                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>
                                        <span className="text-[9px] font-bold text-white uppercase tracking-widest">Auth User</span>
                                        <div className="absolute left-[79.5px] -bottom-1.5 -translate-x-1/2 w-2 h-2 bg-black border-[1.5px] border-white rounded-full z-30" />
                                    </div>

                                    {/* Shell */}
                                    <div className="absolute top-[21%] left-[25%] -translate-x-1/2 -translate-y-1/2 w-[110px] h-16 bg-white border border-black/10 rounded-lg shadow-sm flex flex-col items-center justify-center p-2 z-20">
                                        <svg className="w-3 h-3 text-black mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="square" d="M4 17l6-6-6-6M12 19h8" /></svg>
                                        <span className="text-[10px] font-bold text-black uppercase tracking-widest">Shell</span>
                                        <span className="text-[7px] text-gray-500 font-mono mt-0.5">CLI Layer</span>
                                        <div className="absolute left-[50.5px] -top-1 w-2 h-2 bg-white border-[1.5px] border-black rounded-full z-30" />
                                        <div className="absolute left-[50.5px] -bottom-1 w-2 h-2 bg-white border-[1.5px] border-black rounded-full z-30" />
                                    </div>

                                    {/* Admin */}
                                    <div className="absolute top-[21%] left-[75%] -translate-x-1/2 -translate-y-1/2 w-[110px] h-16 bg-white border border-black/10 rounded-lg shadow-sm flex flex-col items-center justify-center p-2 z-20">
                                        <svg className="w-3 h-3 text-black mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>
                                        <span className="text-[10px] font-bold text-black uppercase tracking-widest">Admin</span>
                                        <span className="text-[7px] text-gray-500 font-mono mt-0.5">RBAC & Mounts</span>
                                        <div className="absolute left-[50.5px] -top-1 w-2 h-2 bg-white border-[1.5px] border-black rounded-full z-30" />
                                        <div className="absolute left-[50.5px] -bottom-1 w-2 h-2 bg-white border-[1.5px] border-black rounded-full z-30" />
                                    </div>

                                    {/* Server */}
                                    <div className="absolute top-[40%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[130px] h-16 bg-white border border-black/10 rounded-lg shadow-sm flex flex-col items-center justify-center p-2 z-20">
                                        <svg className="w-4 h-4 text-black mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" /></svg>
                                        <span className="text-[10px] font-bold text-black uppercase tracking-widest">Server</span>
                                        <span className="text-[7px] text-gray-500 font-mono mt-0.5">gRPC Network</span>
                                        <div className="absolute left-[60.5px] -top-1 w-2 h-2 bg-white border-[1.5px] border-black rounded-full z-30" />
                                        <div className="absolute left-[60.5px] -bottom-1 w-2 h-2 bg-white border-[1.5px] border-black rounded-full z-30" />
                                        <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-white border-[1.5px] border-black rounded-full z-30" />
                                    </div>

                                    {/* Redis */}
                                    <div className="absolute top-[50%] left-[85%] -translate-x-1/2 -translate-y-1/2 w-[70px] h-12 bg-white border border-black/10 rounded-lg shadow-sm flex flex-col items-center justify-center p-1 z-20">
                                        <span className="text-[8px] font-bold text-black uppercase tracking-widest">Redis</span>
                                        <span className="text-[6px] text-gray-400 font-mono mt-0.5">State</span>
                                        <div className="absolute left-[30.5px] -top-1 w-2 h-2 bg-white border-[1.5px] border-black rounded-full z-30" />
                                    </div>

                                    {/* Core */}
                                    <div className="absolute top-[60%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[130px] h-16 bg-black text-white border border-black rounded-lg shadow-xl flex flex-col items-center justify-center p-2 z-20">
                                        <svg className="w-4 h-4 text-white mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z" /></svg>
                                        <span className="text-[10px] font-bold text-white uppercase tracking-widest">Core</span>
                                        <span className="text-[7px] text-white/50 font-mono mt-0.5">Engine</span>
                                        <div className="absolute left-[60.5px] -top-1 w-2 h-2 bg-black border-[1.5px] border-white rounded-full z-40" />
                                        <div className="absolute left-[60.5px] -bottom-1 w-2 h-2 bg-black border-[1.5px] border-white rounded-full z-40" />
                                        <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-black border-[1.5px] border-white rounded-full z-40" />
                                    </div>

                                    {/* WASM */}
                                    <div className="absolute top-[50%] left-[15%] -translate-x-1/2 -translate-y-1/2 w-[70px] h-12 bg-white border border-black/10 rounded-lg shadow-sm flex flex-col items-center justify-center p-1 z-20">
                                        <span className="text-[8px] font-bold text-black uppercase tracking-widest">WASM</span>
                                        <span className="text-[6px] text-gray-400 font-mono mt-0.5">Compute</span>
                                        <div className="absolute left-[30.5px] -bottom-1 w-2 h-2 bg-white border-[1.5px] border-black rounded-full z-30" />
                                    </div>

                                    {/* Databases */}
                                    <div className="absolute top-[80%] left-[25%] -translate-x-1/2 -translate-y-1/2 w-[110px] h-16 bg-white border border-black/10 rounded-lg shadow-sm flex flex-col items-center justify-center p-2 z-20">
                                        <svg className="w-3 h-3 text-black mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" /></svg>
                                        <span className="text-[10px] font-bold text-black uppercase tracking-widest">Databases</span>
                                        <span className="text-[7px] text-gray-400 font-mono mt-0.5">Local / Remote</span>
                                        <div className="absolute left-[50.5px] -top-1 w-2 h-2 bg-white border-[1.5px] border-black rounded-full z-30" />
                                        <div className="absolute left-[50.5px] -bottom-1 w-2 h-2 bg-white border-[1.5px] border-black rounded-full z-30" />
                                    </div>

                                    {/* S3 Storage */}
                                    <div className="absolute top-[80%] left-[75%] -translate-x-1/2 -translate-y-1/2 w-[110px] h-16 bg-white border border-black/10 rounded-lg shadow-sm flex flex-col items-center justify-center p-2 z-20">
                                        <svg className="w-3 h-3 text-black mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" /></svg>
                                        <span className="text-[10px] font-bold text-black uppercase tracking-widest">S3 Storage</span>
                                        <span className="text-[7px] text-gray-400 font-mono mt-0.5">Cloud Buckets</span>
                                        <div className="absolute left-[50.5px] -top-1 w-2 h-2 bg-white border-[1.5px] border-black rounded-full z-30" />
                                        <div className="absolute left-[50.5px] -bottom-1 w-2 h-2 bg-white border-[1.5px] border-black rounded-full z-30" />
                                    </div>

                                    {/* Universal Transfer Bridge */}
                                    <div className="absolute top-[90%] left-[50%] -translate-x-1/2 -translate-y-1/2 bg-white border border-black/10 rounded-full shadow-sm flex items-center justify-center px-3 py-1.5 z-30">
                                        <svg className="w-3 h-3 text-emerald-500 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" /></svg>
                                        <span className="text-[8px] font-bold text-black uppercase tracking-widest">Universal Transfer</span>
                                        <div className="absolute -left-1 w-2 h-2 bg-white border-[1.5px] border-emerald-300 rounded-full" />
                                        <div className="absolute -right-1 w-2 h-2 bg-white border-[1.5px] border-emerald-300 rounded-full" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ========================================================================= */}
                    {/* 2. DESKTOP VIEW (Perfectly scaled responsive grid)                          */}
                    {/* ========================================================================= */}
                    <div className="hidden lg:block relative w-full max-w-[1000px] mx-auto py-8">

                        {/* Der Trick: aspect-[1000/750] zwingt die HTML-Box exakt in die Proportionen des SVGs */}
                        <div className="relative w-full aspect-[1000/750] bg-white border border-black/10 rounded-2xl overflow-hidden shadow-[inset_0_0_40px_rgba(0,0,0,0.02)]">

                            {/* Dotted Grid Background */}
                            <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-50 z-0" />

                            {/* Mathematisch perfekter Loop für Desktop */}
                            <style>{`
                @keyframes stream-flow-perfect-desktop {
                    from { stroke-dashoffset: 16; }
                    to { stroke-dashoffset: 0; }
                }
            `}</style>

                            {/* --- BACKGROUND SVG LINES --- */}
                            <svg
                                className="absolute inset-0 w-full h-full pointer-events-none z-0 translate-y-[1%]" // <-- HIER ANPASSEN
                                viewBox="0 0 1000 750"
                                preserveAspectRatio="none"
                            >
                                <g className="text-black/10" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M 500 40 V 90 Q 500 110 480 110 H 320 Q 300 110 300 130 V 180" />
                                    <path d="M 500 40 V 90 Q 500 110 520 110 H 680 Q 700 110 700 130 V 180" />
                                    <path d="M 300 180 V 240 Q 300 260 320 260 H 480 Q 500 260 500 280 V 345" />
                                    <path d="M 700 180 V 240 Q 700 260 680 260 H 520 Q 500 260 500 280 V 345" />
                                    <path d="M 500 345 H 900" />
                                    <path d="M 500 345 V 480" />
                                    <path d="M 500 480 H 100" />
                                    <path d="M 500 480 V 540 Q 500 560 480 560 H 320 Q 300 560 300 580 V 640" />
                                    <path d="M 500 480 V 540 Q 500 560 520 560 H 680 Q 700 560 700 580 V 640" />
                                </g>

                                <g className="text-black/40 animate-stream" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="6 6">
                                    <path d="M 500 40 V 90 Q 500 110 480 110 H 320 Q 300 110 300 130 V 180" />
                                    <path d="M 500 40 V 90 Q 500 110 520 110 H 680 Q 700 110 700 130 V 180" />
                                    <path d="M 300 180 V 240 Q 300 260 320 260 H 480 Q 500 260 500 280 V 345" />
                                    <path d="M 700 180 V 240 Q 700 260 680 260 H 520 Q 500 260 500 280 V 345" />
                                    <path d="M 500 345 H 900" />
                                    <path d="M 500 345 V 480" />
                                    <path d="M 500 480 H 100" />
                                    <path d="M 500 480 V 540 Q 500 560 480 560 H 320 Q 300 560 300 580 V 640" />
                                    <path d="M 500 480 V 540 Q 500 560 520 560 H 680 Q 700 560 700 580 V 640" />
                                    <path d="M 300 640 V 680 Q 300 700 320 700 H 500" className="text-emerald-500/50" />
                                    <path d="M 700 640 V 680 Q 700 700 680 700 H 500" className="text-emerald-500/50" />
                                </g>
                            </svg>

                            {/* --- HTML NODES WITH CONNECTION PORTS --- */}
                            <div className="absolute inset-0 translate-y-[1%] pointer-events-none">
                                {/* Auth User */}
                                <div className="absolute top-[5.33%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-fit min-w-[220px] px-8 h-12 bg-black border border-black rounded-full shadow-md flex items-center justify-center gap-3 z-20">
                                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>
                                    <span className="text-[11px] font-bold text-white uppercase tracking-widest">Authenticated User</span>
                                    <div className="absolute left-1/2 -bottom-1.5 -translate-x-1/2 w-2.5 h-2.5 bg-black border-2 border-white rounded-full z-30" />
                                </div>

                                {/* Pytja Shell */}
                                <div className="absolute top-[25%] left-[30%] -translate-x-1/2 -translate-y-1/2 w-44 h-20 bg-white border border-black/10 rounded-lg shadow-sm flex flex-col items-center justify-center p-3 z-20">
                                    <svg className="w-4 h-4 text-black mb-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="square" d="M4 17l6-6-6-6M12 19h8" /></svg>
                                    <span className="text-[12px] font-bold text-black uppercase tracking-widest">Pytja Shell</span>
                                    <span className="text-[9px] text-gray-500 font-mono mt-0.5">Interactive CLI</span>
                                    <div className="absolute left-[87.5px] -top-1.5 -translate-x-1/2 w-2.5 h-2.5 bg-white border-2 border-black rounded-full z-30" />
                                    <div className="absolute left-[87.5px] -bottom-1.5 -translate-x-1/2 w-2.5 h-2.5 bg-white border-2 border-black rounded-full z-30" />
                                </div>

                                {/* Admin Tool */}
                                <div className="absolute top-[25%] left-[70%] -translate-x-1/2 -translate-y-1/2 w-44 h-20 bg-white border border-black/10 rounded-lg shadow-sm flex flex-col items-center justify-center p-3 z-20">
                                    <svg className="w-4 h-4 text-black mb-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>
                                    <span className="text-[12px] font-bold text-black uppercase tracking-widest">Admin Tool</span>
                                    <span className="text-[9px] text-gray-500 font-mono mt-0.5">RBAC & Mounts</span>
                                    <div className="absolute left-[87.5px] -top-1.5 -translate-x-1/2 w-2.5 h-2.5 bg-white border-2 border-black rounded-full z-30" />
                                    <div className="absolute left-[87.5px] -bottom-1.5 -translate-x-1/2 w-2.5 h-2.5 bg-white border-2 border-black rounded-full z-30" />
                                </div>

                                {/* Pytja Server */}
                                <div className="absolute top-[46%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-44 h-20 bg-white border border-black/10 rounded-lg shadow-sm flex flex-col items-center justify-center p-3 z-20">
                                    <svg className="w-5 h-5 text-black mb-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" /></svg>
                                    <span className="text-[12px] font-bold text-black uppercase tracking-widest">Pytja Server</span>
                                    <span className="text-[9px] text-gray-500 font-mono mt-0.5">gRPC Network Layer</span>
                                    <div className="absolute left-1/2 -top-1.5 -translate-x-1/2 w-2.5 h-2.5 bg-white border-2 border-black rounded-full z-30" />
                                    <div className="absolute left-1/2 -bottom-1.5 -translate-x-1/2 w-2.5 h-2.5 bg-white border-2 border-black rounded-full z-30" />
                                    <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-white border-2 border-black rounded-full z-30" />
                                </div>

                                {/* Redis */}
                                <div className="absolute top-[46%] left-[85%] -translate-x-1/2 -translate-y-1/2 w-40 h-16 bg-white border border-black/10 rounded-lg shadow-sm flex flex-col items-center justify-center p-2 z-20">
                                    <svg className="w-4 h-4 text-black mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>
                                    <span className="text-[10px] font-bold text-black uppercase tracking-widest">Redis</span>
                                    <span className="text-[8px] text-gray-400 font-mono mt-0.5">Session State</span>
                                    <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-white border-2 border-black rounded-full z-30" />
                                </div>

                                {/* Core */}
                                <div className="absolute top-[64%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-44 h-20 bg-black text-white border border-black rounded-lg shadow-xl flex flex-col items-center justify-center p-2 z-20">
                                    <svg className="w-5 h-5 text-emerald-400 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z" /></svg>
                                    <span className="text-[12px] font-bold text-white uppercase tracking-widest">Core</span>
                                    <span className="text-[9px] text-white/80 font-mono mt-0.5">Engine</span>
                                    <div className="absolute left-[82.5px] -top-1 w-2.5 h-2.5 bg-black border-2 border-white rounded-full z-40" />
                                    <div className="absolute left-[82.5px] -bottom-1 w-2.5 h-2.5 bg-black border-2 border-white rounded-full z-40" />
                                    <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-black border-2 border-white rounded-full z-40" />
                                </div>

                                {/* WASM Plugins */}
                                <div className="absolute top-[64%] left-[15%] -translate-x-1/2 -translate-y-1/2 w-40 h-16 bg-white border border-black/10 rounded-lg shadow-sm flex flex-col items-center justify-center p-2 z-20">
                                    <svg className="w-4 h-4 text-black mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" /></svg>
                                    <span className="text-[10px] font-bold text-black uppercase tracking-widest">WASM Plugins</span>
                                    <span className="text-[8px] text-gray-400 font-mono mt-0.5">Sandboxed CLI Extensions</span>
                                    <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-white border-2 border-black rounded-full z-30" />
                                </div>

                                {/* Databases */}
                                <div className="absolute top-[85.33%] left-[30%] -translate-x-1/2 -translate-y-1/2 w-44 h-20 bg-white border border-black/10 rounded-lg shadow-sm flex flex-col items-center justify-center p-3 z-20">
                                    <svg className="w-4 h-4 text-black mb-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" /></svg>
                                    <span className="text-[12px] font-bold text-black uppercase tracking-widest">Databases</span>
                                    <span className="text-[9px] text-gray-400 font-mono mt-0.5">Relational / Local</span>
                                    <div className="absolute left-[87.5px] -top-1.5 -translate-x-1/2 w-2.5 h-2.5 bg-white border-2 border-black rounded-full z-30" />
                                    <div className="absolute left-[87.5px] -bottom-1.5 -translate-x-1/2 w-2.5 h-2.5 bg-white border-2 border-emerald-300 rounded-full z-30" />
                                </div>

                                {/* Object Storage */}
                                <div className="absolute top-[85.33%] left-[70%] -translate-x-1/2 -translate-y-1/2 w-44 h-20 bg-white border border-black/10 rounded-lg shadow-sm flex flex-col items-center justify-center p-3 z-20">
                                    <svg className="w-4 h-4 text-black mb-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" /></svg>
                                    <span className="text-[12px] font-bold text-black uppercase tracking-widest">Object Storage</span>
                                    <span className="text-[9px] text-gray-400 font-mono mt-0.5">Cloud Buckets</span>
                                    <div className="absolute left-[87.5px] -top-1.5 -translate-x-1/2 w-2.5 h-2.5 bg-white border-2 border-black rounded-full z-30" />
                                    <div className="absolute left-[87.5px] -bottom-1.5 -translate-x-1/2 w-2.5 h-2.5 bg-white border-2 border-emerald-300 rounded-full z-30" />
                                </div>

                                {/* CROSS-TRANSFER BRIDGE BADGE */}
                                <div className="absolute top-[93.33%] left-[50%] -translate-x-1/2 -translate-y-1/2 bg-white border border-black/10 rounded-full shadow-sm flex items-center justify-center px-4 py-1.5 z-30">
                                    <svg className="w-3.5 h-3.5 text-emerald-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                                    </svg>
                                    <span className="text-[9px] font-bold text-black uppercase tracking-widest">Universal Transfer</span>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

            </section>

            {/* --- TECH STACK SECTION (Light Mode / Architecture Style 4 Boxes) --- */}
            <section className="w-full bg-white relative z-20 border-b border-black/10">

                {/* HIER GEÄNDERT: px-0 auf Mobile, md:px-12 und lg:px-24.
                    Keine abgerundeten Ecken mehr, kein äußerer Rahmen.
                    Nur die "divide" Linien durchschneiden das Layout. */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-black/10 max-w-[1600px] mx-auto px-0 md:px-12 lg:px-24">

                    {/* BOX 1: Rust */}
                    {/* HIER GEÄNDERT: Inneres Padding p-6 md:p-8 lg:p-12 exakt wie auf der Startseite */}
                    <div className="p-6 md:p-8 lg:p-12 flex flex-col justify-between min-h-[220px] hover:bg-black/[0.01] transition-colors">
                        <div className="mb-6">
                            <svg className="w-6 h-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z" />
                            </svg>
                        </div>
                        <div>
                            <div className="text-[10px] text-gray-400 font-mono uppercase tracking-widest mb-1.5">Async Core Engine</div>
                            <h3 className="text-[17px] font-medium tracking-tight text-black mb-2">
                                Rust & Tokio
                            </h3>
                            <p className="text-[14px] text-gray-500 leading-relaxed font-light line-clamp-2">
                                Deterministic memory safety. Handles concurrent data streams reliably.
                            </p>
                        </div>
                    </div>

                    {/* BOX 2: WebAssembly */}
                    <div className="p-6 md:p-8 lg:p-12 flex flex-col justify-between min-h-[220px] hover:bg-black/[0.01] transition-colors">
                        <div className="mb-6">
                            <svg className="w-6 h-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                            </svg>
                        </div>
                        <div>
                            <div className="text-[10px] text-gray-400 font-mono uppercase tracking-widest mb-1.5">Sandboxed Compute</div>
                            <h3 className="text-[17px] font-medium tracking-tight text-black mb-2">
                                WebAssembly
                            </h3>
                            <p className="text-[14px] text-gray-500 leading-relaxed font-light line-clamp-2">
                                Strictly isolated plugin execution. Absolute memory safety.
                            </p>
                        </div>
                    </div>

                    {/* BOX 3: gRPC */}
                    <div className="p-6 md:p-8 lg:p-12 flex flex-col justify-between min-h-[220px] hover:bg-black/[0.01] transition-colors">
                        <div className="mb-6">
                            <svg className="w-6 h-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                            </svg>
                        </div>
                        <div>
                            <div className="text-[10px] text-gray-400 font-mono uppercase tracking-widest mb-1.5">Encrypted Transport</div>
                            <h3 className="text-[17px] font-medium tracking-tight text-black mb-2">
                                gRPC
                            </h3>
                            <p className="text-[14px] text-gray-500 leading-relaxed font-light line-clamp-2">
                                Bidirectional streaming over TLS. High throughput data transfer.
                            </p>
                        </div>
                    </div>

                    {/* BOX 4: Redis */}
                    <div className="p-6 md:p-8 lg:p-12 flex flex-col justify-between min-h-[220px] hover:bg-black/[0.01] transition-colors">
                        <div className="mb-6">
                            <svg className="w-6 h-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                            </svg>
                        </div>
                        <div>
                            <div className="text-[10px] text-gray-400 font-mono uppercase tracking-widest mb-1.5">In-Memory State</div>
                            <h3 className="text-[17px] font-medium tracking-tight text-black mb-2">
                                Redis
                            </h3>
                            <p className="text-[14px] text-gray-500 leading-relaxed font-light line-clamp-2">
                                Ultra-fast session validation. Keeps the architecture stateless.
                            </p>
                        </div>
                    </div>

                </div>
            </section>

            {/* --- SUPPORTED ECOSYSTEMS (DARK MODE / data-theme="dark") --- */}
            <section data-theme="dark" className="w-full bg-[#050505] relative z-20 pt-32 pb-32">
                <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-36">

                    <div className="mb-16">
                        <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-white mb-4">Supported Ecosystems</h2>
                        <p className="text-[15px] text-gray-400 max-w-2xl">Direct, low-level integrations for the most critical database engines.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                        {/* PostgreSQL */}
                        <div className="p-8 border border-white/10 bg-white/[0.02] rounded-xl hover:bg-white/[0.04] hover:border-white/20 transition-colors">
                            <div className="flex justify-between items-start mb-12">
                                <h3 className="text-xl font-medium text-white">PostgreSQL</h3>
                                <div className="flex items-center gap-3 px-3 py-1.5 bg-emerald-500/10 rounded-2xl">
                                    <div className="relative flex items-center justify-center w-2 h-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                                    </div>
                                    <span className="text-[9px] uppercase tracking-widest text-emerald-400 font-bold">Active</span>
                                </div>
                            </div>
                            <div>
                                <p className="text-[10px] text-gray-500 font-mono uppercase tracking-widest mb-2">Remote Engine</p>
                                <p className="text-[13px] text-gray-400 leading-relaxed">Secure TLS-encrypted connections to remote Postgres instances for live, high-throughput data querying.</p>
                            </div>
                        </div>

                        {/* SQLite */}
                        <div className="p-8 border border-white/10 bg-white/[0.02] rounded-xl hover:bg-white/[0.04] hover:border-white/20 transition-colors">
                            <div className="flex justify-between items-start mb-12">
                                <h3 className="text-xl font-medium text-white">SQLite</h3>
                                <div className="flex items-center gap-3 px-3 py-1.5 bg-emerald-500/10 rounded-2xl">
                                    <div className="relative flex items-center justify-center w-2 h-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                                    </div>
                                    <span className="text-[9px] uppercase tracking-widest text-emerald-400 font-bold">Active</span>
                                </div>
                            </div>
                            <div>
                                <p className="text-[10px] text-gray-500 font-mono uppercase tracking-widest mb-2">Local File Support</p>
                                <p className="text-[13px] text-gray-400 leading-relaxed">Direct, low-level integration for local .db and .sqlite files utilizing zero-copy memory mapping.</p>
                            </div>
                        </div>

                        {/* S3 */}
                        <div className="p-8 border border-white/10 bg-white/[0.02] rounded-xl hover:bg-white/[0.04] hover:border-white/20 transition-colors">
                            <div className="flex justify-between items-start mb-12">
                                <h3 className="text-xl font-medium text-white">AWS S3</h3>
                                <div className="flex items-center gap-3 px-3 py-1.5 bg-amber-500/10 rounded-2xl">
                                    <div className="relative flex items-center justify-center w-2 h-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-500"></span>
                                    </div>
                                    <span className="text-[9px] uppercase tracking-widest text-amber-400 font-bold">Beta</span>
                                </div>
                            </div>
                            <div>
                                <p className="text-[10px] text-gray-500 font-mono uppercase tracking-widest mb-2">Object Storage</p>
                                <p className="text-[13px] text-gray-400 leading-relaxed">Stream massive datasets directly from S3 compatible buckets via chunked gRPC transfer protocols.</p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* --- ARCHITECTURAL PRINCIPLES (Full-Width Grid & Scrollspy) --- */}
            <section className="w-full bg-white relative z-20" style={{ clipPath: 'inset(0)' }}>

                {/* --- GRID HEADER ROW (Full Width Borders) --- */}
                <div className="w-full border-y border-black/10">
                    <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24">
                        <div className="py-16 md:py-24 md:px-8 lg:px-12">
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-black mb-6">
                                Architectural Principles
                            </h2>
                            <p className="text-[15px] md:text-[16px] text-gray-500 max-w-2xl font-light leading-relaxed">
                                The defining technical decisions that enable Pytja to process massive datasets locally, maintain zero-latency execution, and guarantee absolute host isolation.
                            </p>
                        </div>
                    </div>
                </div>

                {/* --- GRID SPLIT ROW (Full Width Bottom Border) --- */}
                <div className="w-full border-b border-black/10">
                    <div className="max-w-[1600px] mx-auto px-0 md:px-12 lg:px-24 flex flex-col md:flex-row md:divide-x divide-black/10">

                        {/* LEFT COLUMN: Sticky Navigation Sidebar */}
                        {/* HIER GEÄNDERT: 'hidden md:block' blendet die Spalte auf Mobile aus */}
                        <div className="hidden md:block md:w-1/3 lg:w-1/4 p-6 md:p-8 lg:p-12 relative border-b md:border-b-0 border-black/10">
                            <div className="md:sticky md:top-32 flex flex-col gap-8 transform-gpu">
                                <span className="text-[10px] text-gray-400 font-mono uppercase tracking-widest">
                                    Index
                                </span>

                                {/* Navigation List (Vertical Dots Style) */}
                                <nav className="flex flex-col gap-6">
                                    <a
                                        href="#daemon"
                                        onClick={(e) => { e.preventDefault(); document.getElementById('daemon')?.scrollIntoView({ behavior: 'smooth' }); setActiveSection("daemon"); }}
                                        className="group flex items-center gap-4 cursor-pointer"
                                    >
                                        <div className="w-1.5 flex items-center justify-center h-6">
                                            <div className={`w-1.5 rounded-full transition-all duration-500 ease-out ${
                                                activeSection === "daemon" ? "h-6 bg-black shadow-sm" : "h-1.5 bg-black/10 group-hover:bg-black/20"
                                            }`} />
                                        </div>
                                        <span className={`text-[12px] md:text-[13px] font-bold uppercase tracking-widest transition-colors duration-300 ${
                                            activeSection === "daemon" ? "text-black" : "text-gray-400 group-hover:text-black"
                                        }`}>
                                            Seamless Daemon
                                        </span>
                                    </a>

                                    <a
                                        href="#grpc"
                                        onClick={(e) => { e.preventDefault(); document.getElementById('grpc')?.scrollIntoView({ behavior: 'smooth' }); setActiveSection("grpc"); }}
                                        className="group flex items-center gap-4 cursor-pointer"
                                    >
                                        <div className="w-1.5 flex items-center justify-center h-6">
                                            <div className={`w-1.5 rounded-full transition-all duration-500 ease-out ${
                                                activeSection === "grpc" ? "h-6 bg-black shadow-sm" : "h-1.5 bg-black/10 group-hover:bg-black/20"
                                            }`} />
                                        </div>
                                        <span className={`text-[12px] md:text-[13px] font-bold uppercase tracking-widest transition-colors duration-300 ${
                                            activeSection === "grpc" ? "text-black" : "text-gray-400 group-hover:text-black"
                                        }`}>
                                            gRPC Streaming
                                        </span>
                                    </a>

                                    <a
                                        href="#zerotrust"
                                        onClick={(e) => { e.preventDefault(); document.getElementById('zerotrust')?.scrollIntoView({ behavior: 'smooth' }); setActiveSection("zerotrust"); }}
                                        className="group flex items-center gap-4 cursor-pointer"
                                    >
                                        <div className="w-1.5 flex items-center justify-center h-6">
                                            <div className={`w-1.5 rounded-full transition-all duration-500 ease-out ${
                                                activeSection === "zerotrust" ? "h-6 bg-black shadow-sm" : "h-1.5 bg-black/10 group-hover:bg-black/20"
                                            }`} />
                                        </div>
                                        <span className={`text-[12px] md:text-[13px] font-bold uppercase tracking-widest transition-colors duration-300 ${
                                            activeSection === "zerotrust" ? "text-black" : "text-gray-400 group-hover:text-black"
                                        }`}>
                                            Zero-Trust Identity
                                        </span>
                                    </a>

                                    <a
                                        href="#wasm"
                                        onClick={(e) => { e.preventDefault(); document.getElementById('wasm')?.scrollIntoView({ behavior: 'smooth' }); setActiveSection("wasm"); }}
                                        className="group flex items-center gap-4 cursor-pointer"
                                    >
                                        <div className="w-1.5 flex items-center justify-center h-6">
                                            <div className={`w-1.5 rounded-full transition-all duration-500 ease-out ${
                                                activeSection === "wasm" ? "h-6 bg-black shadow-sm" : "h-1.5 bg-black/10 group-hover:bg-black/20"
                                            }`} />
                                        </div>
                                        <span className={`text-[12px] md:text-[13px] font-bold uppercase tracking-widest transition-colors duration-300 ${
                                            activeSection === "wasm" ? "text-black" : "text-gray-400 group-hover:text-black"
                                        }`}>
                                            Ephemeral WASM
                                        </span>
                                    </a>

                                </nav>
                            </div>
                        </div>

                        {/* RIGHT COLUMN: Scrolling Content Area */}
                        {/* HIER GEÄNDERT: w-full für Mobile, divide-y für Mobile (als Fallback, falls die desktop-Linien versteckt werden), pb für Mobile etwas reduziert */}
                        <div className="w-full md:w-2/3 lg:w-3/4 flex flex-col pb-24 md:pb-48">

                            {/* --- BLOCK 01: Daemonization --- */}
                            {/* HIER GEÄNDERT: px-6 auf Mobile, damit der Text nicht am Rand klebt */}
                            <div id="daemon" className="scroll-section relative flex flex-col lg:flex-row gap-10 scroll-mt-32 px-6 py-16 md:p-8 lg:p-12">
                                <div className="hidden md:block absolute bottom-0 left-0 w-[200vw] h-[1px] bg-black/10 z-0 pointer-events-none" />

                                <div className="flex-1 flex flex-col justify-center relative z-10">
                                    <h3 className="text-2xl md:text-3xl font-medium text-black mb-4 md:mb-6 tracking-tight text-balance">
                                        Seamless Single-Binary Daemonization
                                    </h3>
                                    <p className="text-[14px] md:text-[15px] lg:text-[16px] text-gray-500 leading-relaxed font-light">
                                        Despite its complex client-server architecture, Pytja delivers a frictionless user experience. Packaged as a single executable, the CLI intelligently pings the local network upon invocation. If the core engine is offline, the executable seamlessly forks the server into a background daemon and connects the interactive shell in milliseconds. This provides the power of a distributed enterprise backend with the simplicity of a standalone local tool.
                                    </p>
                                </div>
                                <div className="flex-1 flex items-center justify-center relative z-10">
                                    <div className="w-full aspect-[4/3] bg-black/[0.02] border border-black/10 rounded-xl flex items-center justify-center overflow-hidden relative shadow-sm">
                                        <span className="text-[10px] font-mono text-gray-400 tracking-widest uppercase">Insert PNG Here</span>
                                    </div>
                                </div>
                            </div>

                            {/* --- BLOCK 02: gRPC Streaming --- */}
                            {/* HIER GEÄNDERT: border-t auf Mobile als Fallback für die Desktop-Linie */}
                            <div id="grpc" className="scroll-section relative flex flex-col lg:flex-row-reverse gap-10 scroll-mt-32 px-6 py-16 md:p-8 lg:p-12 border-t md:border-t-0 border-black/10">
                                <div className="hidden md:block absolute bottom-0 left-0 w-[200vw] h-[1px] bg-black/10 z-0 pointer-events-none" />

                                <div className="flex-1 flex flex-col justify-center relative z-10">
                                    <h3 className="text-2xl md:text-3xl font-medium text-black mb-4 md:mb-6 tracking-tight text-balance">
                                        Optimized gRPC Data Streaming
                                    </h3>
                                    <p className="text-[14px] md:text-[15px] lg:text-[16px] text-gray-500 leading-relaxed font-light">
                                        Handling massive datasets locally often leads to severe memory spikes and application crashes. Pytja circumvents this by abandoning standard REST protocols in favor of bidirectional, TLS-encrypted gRPC tunnels. All file transfers and queries are streamed in strictly optimized 64-KB chunks. This architectural choice guarantees a constant memory footprint, mathematically eliminating Out-of-Memory (OOM) failures whether you are processing a 5 MB file or a 50 GB database archive.
                                    </p>
                                </div>
                                <div className="flex-1 flex items-center justify-center relative z-10">
                                    <div className="w-full aspect-[4/3] bg-black/[0.02] border border-black/10 rounded-xl flex items-center justify-center overflow-hidden relative shadow-sm">
                                        <span className="text-[10px] font-mono text-gray-400 tracking-widest uppercase">Insert PNG Here</span>
                                    </div>
                                </div>
                            </div>

                            {/* --- BLOCK 03: Zero-Trust & Redis --- */}
                            <div id="zerotrust" className="scroll-section relative flex flex-col lg:flex-row gap-10 scroll-mt-32 px-6 py-16 md:p-8 lg:p-12 border-t md:border-t-0 border-black/10">
                                <div className="hidden md:block absolute bottom-0 left-0 w-[200vw] h-[1px] bg-black/10 z-0 pointer-events-none" />

                                <div className="flex-1 flex flex-col justify-center relative z-10">
                                    <h3 className="text-2xl md:text-3xl font-medium text-black mb-4 md:mb-6 tracking-tight text-balance">
                                        Zero-Trust Identity & Redis-Backed
                                    </h3>
                                    <p className="text-[14px] md:text-[15px] lg:text-[16px] text-gray-500 leading-relaxed font-light">
                                        Pytja discards traditional password-based authentication, which is inherently vulnerable to interception or brute-force attacks. Instead, access is governed by Ed25519 asymmetric cryptography and strictly scoped JSON Web Tokens (JWTs). To maintain zero-latency execution across thousands of concurrent operations, Pytja leverages Redis as an ultra-fast, in-memory datastore for session state management. This ensures that every individual command is cryptographically verified in sub-millisecond latency.
                                    </p>
                                </div>
                                <div className="flex-1 flex items-center justify-center relative z-10">
                                    <div className="w-full aspect-[4/3] bg-black/[0.02] border border-black/10 rounded-xl flex items-center justify-center overflow-hidden relative shadow-sm">
                                        <span className="text-[10px] font-mono text-gray-400 tracking-widest uppercase">Insert PNG Here</span>
                                    </div>
                                </div>
                            </div>

                            {/* --- BLOCK 04: Ephemeral WASM --- */}
                            <div id="wasm" className="scroll-section relative flex flex-col lg:flex-row-reverse gap-10 scroll-mt-32 px-6 py-16 md:p-8 lg:p-12 border-t md:border-t-0 border-black/10">
                                {/* Keine "endlose" Linie unten, der Section-Border übernimmt das */}

                                <div className="flex-1 flex flex-col justify-center relative z-10">
                                    <h3 className="text-2xl md:text-3xl font-medium text-black mb-4 md:mb-6 tracking-tight text-balance">
                                        Ephemeral WebAssembly (WASM)
                                    </h3>
                                    <p className="text-[14px] md:text-[15px] lg:text-[16px] text-gray-500 leading-relaxed font-light">
                                        The defining capability of Pytja is its extensible execution engine. Instead of forcing data out of the secure environment for processing, Pytja brings the logic to the data. Users can write custom analytical scripts in any language that compiles to WebAssembly. These plugins are executed via the Wasmer engine in strictly sandboxed, ephemeral threads. The sandbox is ruthlessly purged the moment the execution concludes, ensuring absolute host isolation and zero system leakage.
                                    </p>
                                </div>
                                <div className="flex-1 flex items-center justify-center relative z-10">
                                    <div className="w-full aspect-[4/3] bg-black/[0.02] border border-black/10 rounded-xl flex items-center justify-center overflow-hidden relative shadow-sm">
                                        <span className="text-[10px] font-mono text-gray-400 tracking-widest uppercase">Insert PNG Here</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>

            {/* --- THE ARCHITECT (Full-Width Grid Style) --- */}
            <section className="w-full bg-white relative z-20">

                {/* --- GRID HEADER ROW (Edge-to-Edge Borders) --- */}
                <div className="w-full border-y border-black/10">
                    <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24">
                        <div className="py-16 md:py-24 md:px-8 lg:px-12">
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-black mb-6">
                                The Architect
                            </h2>
                            <p className="text-[15px] md:text-[16px] text-gray-500 max-w-2xl font-light leading-relaxed">
                                Bridging the gap between strategic oversight and bare-metal technical execution.
                            </p>
                        </div>
                    </div>
                </div>

                {/* --- GRID SPLIT ROW (Profile & Background) --- */}
                <div className="w-full border-b border-black/10">
                    <div className="max-w-[1600px] mx-auto px-0 md:px-12 lg:px-24 flex flex-col lg:flex-row divide-y lg:divide-y-0 lg:divide-x divide-black/10">

                        {/* LEFT COLUMN: Identity & Contact */}
                        <div className="lg:w-1/3 p-6 md:p-8 lg:p-12 flex flex-col justify-between min-h-[300px] lg:min-h-[400px]">

                            {/* Horizontal Identity Badge */}
                            <div className="flex items-center gap-5">
                                {/* Technischer Avatar-Platzhalter */}
                                <div className="w-16 h-16 shrink-0 rounded-sm border border-black/10 bg-black/[0.02] flex items-center justify-center shadow-sm relative overflow-hidden">
                                    <span className="text-lg font-mono text-black font-bold tracking-widest relative z-10">ES</span>
                                    <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(0,0,0,0.02)_50%,transparent_75%)] bg-[length:250%_250%] animate-[stream-flow_3s_linear_infinite]" />
                                </div>

                                <div className="flex flex-col justify-center">
                                    <h3 className="text-xl md:text-3xl font-medium tracking-tight text-black mb-1.5">
                                        Elias Schmolke
                                    </h3>
                                    <p className="text-[10px] text-gray-400 font-mono uppercase tracking-widest leading-tight">
                                        Architect & Lead Developer
                                    </p>
                                </div>
                            </div>

                            {/* Minimalist Icon Links Container */}
                            <div className="flex gap-3 mt-12">

                                {/* Email */}
                                <a
                                    href="mailto:contact@pytja.com"
                                    className="flex items-center justify-center w-12 h-12 border border-black/10 bg-white text-black rounded-md hover:bg-black/[0.02] hover:border-black/20 transition-all shadow-sm shrink-0"
                                    aria-label="Send Email"
                                >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                                    </svg>
                                </a>

                                {/* GitHub */}
                                <a
                                    href="https://github.com/uyiosastudio"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center w-12 h-12 border border-black/10 bg-white text-black rounded-md hover:bg-black/[0.02] hover:border-black/20 transition-all shadow-sm shrink-0"
                                    aria-label="GitHub Profile"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                                    </svg>
                                </a>

                                {/* LinkedIn */}
                                <a
                                    href="https://linkedin.com/in/elias-schmolke"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center w-12 h-12 border border-black/10 bg-white text-black rounded-md hover:bg-black/[0.02] hover:border-black/20 transition-all shadow-sm shrink-0"
                                    aria-label="LinkedIn Profile"
                                >
                                    {/* Das LinkedIn Icon ist optisch schwerer, daher w-4 h-4 für die perfekte visuelle Balance */}
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                                    </svg>
                                </a>

                            </div>
                        </div>

                        {/* RIGHT COLUMN: Statement & Vision */}
                        <div className="lg:w-2/3 p-6 md:p-8 lg:p-12 flex flex-col justify-center bg-black/[0.01]">

                            <div className="max-w-3xl">
                                {/* Das starke Intro-Zitat */}
                                <p className="text-[20px] md:text-[24px] lg:text-[28px] text-black font-medium leading-snug md:leading-normal mb-8 text-balance">
                                    "I engineered Pytja as an independent foundational layer to provide a strictly isolated, secure environment for future data aggregation and analytical workflows."
                                </p>

                                {/* Dezenter visueller Trenner */}
                                <div className="w-12 h-px bg-black/20 mb-8" />

                                {/* Der Background-Kontext */}
                                <p className="text-[14px] md:text-[15px] lg:text-[16px] text-gray-500 leading-relaxed font-light">
                                    As an International Management student with a deep-seated interest in system architecture and cybersecurity, my goal is to build tools that do not compromise on security or performance. Pytja is the result of applying bare-metal engineering principles to modern data challenges, ensuring every line of code serves a highly optimized purpose.
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

        </div>
    );
}