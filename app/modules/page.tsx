"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

// --- MOCK DATA FOR PLUGINS (ENTERPRISE GRADE) ---
const plugins = [
    {
        id: "demo_plugin",
        name: "demo_plugin",
        version: "v1.0.0",
        type: "demo",
        desc: "A demo plugin build for developers to explore the capability and possibilities of the pytja modularity system powered by WASM.",
        author: "Elias Schmolke",
        size: "410 KB",
        updated: "2026-03-19"
    },
];

export default function ModulesPage() {
    const [activeGuideSection, setActiveGuideSection] = useState("guide-intro");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        if (typeof window !== 'undefined' && window.innerWidth < 768) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveGuideSection(entry.target.id);
                    }
                });
            },
            { rootMargin: "-25% 0px -40% 0px" }
        );

        const sections = document.querySelectorAll(".guide-scroll-section");
        sections.forEach((section) => observer.observe(section));

        return () => {
            sections.forEach((section) => observer.unobserve(section));
        };
    }, [mounted]);

    if (!mounted) return null;

    return (
        <div className="relative min-h-screen bg-white font-sans selection:bg-black selection:text-white">

            {/* Global CSS for Animations */}
            <style jsx global>{`
                @keyframes stream-flow {
                    from { stroke-dashoffset: 24; }
                    to { stroke-dashoffset: 0; }
                }
                .animate-stream {
                    animation: stream-flow 1s linear infinite;
                }
            `}</style>

            <main className="relative z-10 pt-32 md:pt-40">

                {/* ========================================================= */}
                {/* 1. HERO SECTION                                           */}
                {/* ========================================================= */}
                <section className="w-full pb-4 md:pb-12">
                    <div className="w-full text-center px-6 max-w-4xl mx-auto space-y-6">
                        {/* Tag / Mission Brief */}
                        <div className="inline-flex items-center gap-3 border border-black/10 bg-black/[0.02] px-4 py-1.5 rounded-full">
                            <div className="relative flex items-center justify-center w-2 h-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-sm bg-black/40 opacity-75"></span>
                                <span className="relative inline-flex rounded-sm h-1.5 w-1.5 bg-black/80"></span>
                            </div>
                            <span className="text-[9px] md:text-[10px] text-gray-600 font-mono tracking-[0.4em] uppercase font-bold">
                                Extensible Architecture
                            </span>
                        </div>

                        {/* Haupt-Statement */}
                        <h1 className="w-full text-3xl sm:text-5xl lg:text-[56px] font-bold leading-[1.1] tracking-tight text-black max-w-5xl mx-auto text-balance px-2 md:px-0">
                            Extend the core kernel. <br className="hidden md:block" /> Absolutely safely.
                        </h1>

                        {/* Subtext */}
                        <p className="w-full text-sm md:text-base text-gray-500 max-w-2xl font-light leading-relaxed mx-auto">
                            Load untrusted plugins without compromising the core memory space. Sandboxed, hot-swappable, and executed at near-native speeds via WebAssembly.
                        </p>
                    </div>

                    {/* Visual Blueprint Area */}
                    <div className="w-full pt-16 pb-4 md:pt-24 md:pb-4 px-6 md:px-12 flex flex-col items-center overflow-hidden">
                        <div className="w-full overflow-x-auto hide-scrollbar flex justify-center pb-8">
                            <WasmArchitectureMindmap />
                        </div>
                    </div>
                </section>

                {/* ========================================================= */}
                {/* 2. THE USP VISUAL HOOK & FEATURES                         */}
                {/* ========================================================= */}
                <section className="w-full border-t border-black/10 relative z-20">

                    {/* Features Row (3-Col Grid) */}
                    <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-black/10 max-w-[1600px] mx-auto px-0 md:px-12 lg:px-24">

                        <div className="p-6 md:p-8 lg:p-12 flex flex-col justify-between min-h-[220px]">
                            <div className="mb-6">
                                {/* HIER GEÄNDERT: Gegenläufige Pfeile (Interconnected) */}
                                <svg className="w-5 h-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-[16px] font-medium tracking-tight text-black mb-2">
                                    Interconnected Pipelines
                                </h3>
                                <p className="text-[14px] text-gray-500 leading-relaxed font-light">
                                    Plugins can securely pass data to each other. Extract raw files, format them via JSON parsers, and stream the result directly into ML models.
                                </p>
                            </div>
                        </div>

                        <div className="p-6 md:p-8 lg:p-12 flex flex-col justify-between min-h-[220px]">
                            <div className="mb-6">
                                {/* Beibehalten: Schloss (Isolation) */}
                                <svg className="w-5 h-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-[16px] font-medium tracking-tight text-black mb-2">
                                    Strict WASI Isolation
                                </h3>
                                <p className="text-[14px] text-gray-500 leading-relaxed font-light">
                                    Each node operates in a ruthless sandbox. Zero host network access, zero disk access. Data is passed strictly via memory-safe channels.
                                </p>
                            </div>
                        </div>

                        <div className="p-6 md:p-8 lg:p-12 flex flex-col justify-between min-h-[220px]">
                            <div className="mb-6">
                                {/* Beibehalten: Zeit/Reset (Ephemeral) */}
                                <svg className="w-5 h-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-[16px] font-medium tracking-tight text-black mb-2">
                                    Ephemeral Execution
                                </h3>
                                <p className="text-[14px] text-gray-500 leading-relaxed font-light">
                                    The Wasmer runtime engine is instantly purged upon plugin exit. No hidden background processes, preventing memory leaks entirely.
                                </p>
                            </div>
                        </div>

                    </div>

                    {/* Features Row 2 (3-Col Grid) - Nahtlos angefügt */}
                    <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-black/10 max-w-[1600px] mx-auto px-0 md:px-12 lg:px-24 border-t border-black/10">

                        {/* 4. Controlled Outbound Networking */}
                        <div className="p-6 md:p-8 lg:p-12 flex flex-col justify-between min-h-[220px]">
                            <div className="mb-6">
                                {/* HIER GEÄNDERT: Schild (Security/Policy Control) */}
                                <svg className="w-5 h-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-[16px] font-medium tracking-tight text-black mb-2">
                                    Egress Policy Control
                                </h3>
                                <p className="text-[14px] text-gray-500 leading-relaxed font-light">
                                    Securely fetch external data. Plugins can be granted granular network access to specific domains via encrypted proxy-tunnels, maintaining full auditability.
                                </p>
                            </div>
                        </div>

                        {/* 5. Headless or Graphical Interfaces */}
                        <div className="p-6 md:p-8 lg:p-12 flex flex-col justify-between min-h-[220px]">
                            <div className="mb-6">
                                {/* Beibehalten: Devices/UI */}
                                <svg className="w-5 h-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-[16px] font-medium tracking-tight text-black mb-2">
                                    Hybrid UI Support
                                </h3>
                                <p className="text-[14px] text-gray-500 leading-relaxed font-light">
                                    Render rich dashboards directly in the browser or deploy as standalone OS windows. Leverage React or Electron to build high-performance plugin frontends.
                                </p>
                            </div>
                        </div>

                        {/* 6. Background Persistence */}
                        <div className="p-6 md:p-8 lg:p-12 flex flex-col justify-between min-h-[220px]">
                            <div className="mb-6">
                                {/* Beibehalten: Server/Stack (Daemonized) */}
                                <svg className="w-5 h-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-[16px] font-medium tracking-tight text-black mb-2">
                                    Daemonized Persistence
                                </h3>
                                <p className="text-[14px] text-gray-500 leading-relaxed font-light">
                                    Configure plugins as reliable background services. Automatically spin up worker threads at kernel startup to handle long-running polling or monitoring tasks.
                                </p>
                            </div>
                        </div>

                    </div>
                </section>

                {/* ========================================================= */}
                {/* 3. PLUGIN REGISTRY SECTION                                */}
                {/* ========================================================= */}
                <section className="w-full border-t border-black/10 relative z-20">

                    {/* --- GRID HEADER ROW (Edge-to-Edge Borders) --- */}
                    <div className="w-full border-b border-black/10">
                        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24">
                            <div className="py-16 md:py-24 md:px-8 lg:px-12">
                                <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-black mb-6">
                                    Explore Ecosystem
                                </h2>
                                <p className="text-[15px] md:text-[16px] text-gray-500 max-w-2xl font-light leading-relaxed">
                                    Discover specialized modules for networking, security, and real-time compute. All binaries are verified for WASI compliance and memory safety.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* MAIN REGISTRY GRID */}
                    <div className="grid grid-cols-1 lg:grid-cols-10 divide-y lg:divide-y-0 lg:divide-x divide-black/10 max-w-[1600px] mx-auto px-0 md:px-12 lg:px-24">

                        {/* LEFT COLUMN: Registry Info */}
                        <div className="lg:col-span-4 p-6 md:p-8 lg:p-12 flex flex-col relative border-b md:border-b-0 border-black/10 z-0 before:absolute before:inset-y-0 before:right-0 before:w-[100vw] before:bg-black/[0.01] before:-z-10">
                            <div className="md:sticky md:top-32 flex flex-col gap-12 transform-gpu">
                                <div>
            <span className="text-[10px] text-gray-400 font-mono uppercase tracking-widest block mb-4">
                // Status Dashboard
            </span>
                                    <h3 className="text-2xl md:text-3xl font-medium tracking-tight text-black mb-4">
                                        Registry Insights
                                    </h3>
                                    <p className="text-[14px] md:text-[15px] text-gray-500 leading-relaxed font-light">
                                        The repository is updated in real-time. Use the Pytja CLI to fetch and hot-swap modules without restarting the kernel.
                                    </p>
                                </div>

                                <div className="space-y-4 pt-8 border-t border-black/10 max-w-xs">
                                    <div className="flex justify-between items-center text-[11px] font-mono">
                                        <span className="text-gray-400 uppercase tracking-widest">Total Active</span>
                                        <span className="font-bold text-black">{plugins.length} Modules</span>
                                    </div>

                                    {/* Runtime Zeile */}
                                    <div className="flex justify-between items-center text-[11px] font-mono">
                                        <span className="text-gray-400 uppercase tracking-widest">Runtime</span>
                                        <span className="font-bold text-black">Wasmer v4.4.0</span>
                                    </div>

                                    {/* NEU: WASIX Spezifikation als eigene Zeile */}
                                    <div className="flex justify-between items-center text-[11px] font-mono">
                                        <span className="text-gray-400 uppercase tracking-widest">ABI Standard</span>
                                        <div className="flex items-center gap-2">
                                            <span className="px-1.5 py-0.5 bg-black text-[9px] text-white font-bold rounded-2xl tracking-tighter">WASIX</span>
                                            <span className="font-bold text-black">v0.28.0</span>
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center text-[11px] font-mono">
                                        <span className="text-gray-400 uppercase tracking-widest">Safety Tier</span>
                                        <span className="font-bold text-emerald-600">Level 3 (Sandbox)</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT COLUMN: The Plugin Grid */}
                        <div className="lg:col-span-6 p-6 md:p-8 lg:p-12 bg-white">
                            <div className="grid sm:grid-cols-2 gap-6">
                                {plugins.map((plugin) => (
                                    <div
                                        key={plugin.id}
                                        className="group bg-white border border-black/10 p-6 md:p-8 rounded-xl hover:shadow-lg transition-all duration-300 flex flex-col relative overflow-hidden"
                                    >
                                        {/* Hover Gradient Effect */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-black/[0.01] to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                                        {/* Card Header */}
                                        <div className="flex justify-between items-start mb-6 gap-4 relative z-10">
                                            <div className="space-y-2 flex-1 min-w-0">
                                                <h4 className="text-[16px] font-bold text-black font-mono tracking-tight truncate">
                                                    {plugin.name}
                                                </h4>
                                                <p className="text-[10px] text-gray-400 font-mono uppercase tracking-widest">
                                                    {plugin.author} • {plugin.version}
                                                </p>
                                            </div>
                                            <span className={`text-[9px] px-2 py-1 rounded-sm border uppercase tracking-widest shrink-0 font-bold ${
                                                plugin.type === 'driver' ? 'border-blue-500/20 text-blue-600 bg-blue-500/5' :
                                                    plugin.type === 'security' ? 'border-red-500/20 text-red-600 bg-red-500/5' :
                                                        'border-black/10 text-gray-500 bg-black/[0.02]'
                                            }`}>
                                {plugin.type}
                            </span>
                                        </div>

                                        {/* Description */}
                                        <p className="text-[14px] text-gray-500 leading-relaxed font-light mb-8 flex-1 relative z-10">
                                            {plugin.desc}
                                        </p>

                                        {/* Footer Info */}
                                        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 pt-6 border-t border-black/10 text-[10px] font-mono text-gray-400 uppercase tracking-widest relative z-10">
                                            <div className="flex gap-3">
                                                <span>{plugin.size}</span>
                                            </div>
                                            <button className="flex items-center gap-2 text-black hover:text-gray-500 transition-colors font-bold group/btn hover:cursor-pointer">
                                                Install
                                                <svg className="w-2.5 h-2.5 transform transition-transform group-hover/btn:translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </section>

                {/* ========================================================= */}
                {/* 4. DEVELOPER GUIDE (Dark Mode, Full-Width Grid Style)     */}
                {/* ========================================================= */}
                <section data-theme="dark" className="w-full bg-[#050505] relative z-20" style={{ clipPath: 'inset(0)' }}>

                    {/* Header Row */}
                    <div className="w-full border-y border-white/10">
                        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24">
                            <div className="py-16 md:py-24 md:px-8 lg:px-12">
                                <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-white mb-6">
                                    Building Modules
                                </h2>
                                <p className="text-[15px] md:text-[16px] text-gray-400 max-w-2xl font-light leading-relaxed">
                                    Write custom data parsers or analytical tools in Rust, C, or Go. Compile to WASI and inject them directly into the secure execution layer.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Scrollspy Row */}
                    <div className="grid grid-cols-1 lg:grid-cols-10 divide-y lg:divide-y-0 lg:divide-x divide-white/10 max-w-[1600px] mx-auto px-0 md:px-12 lg:px-24">

                        {/* Sticky Navigation Sidebar */}
                        <div className="hidden md:block lg:col-span-3 p-6 md:p-8 lg:p-12 relative border-b md:border-b-0 border-white/10 relative z-0 before:absolute before:inset-y-0 before:right-0 before:w-[100vw] before:bg-white/[0.01] before:-z-10">
                            <div className="md:sticky md:top-32 flex flex-col gap-8 transform-gpu">
                                <span className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">
                                    Contents
                                </span>
                                <nav className="flex flex-col gap-6">
                                    {[
                                        { id: "guide-intro", label: "How Plugins Work" },
                                        { id: "guide-dev", label: "Writing in Rust" },
                                        { id: "guide-manifest", label: "Manifest Configuration" },
                                        { id: "guide-deploy", label: "Deployment" }
                                    ].map((item) => (
                                        <a
                                            key={item.id}
                                            href={`#${item.id}`}
                                            onClick={(e) => { e.preventDefault(); document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' }); setActiveGuideSection(item.id); }}
                                            className="group flex items-center gap-4 cursor-pointer"
                                        >
                                            <div className="w-1.5 flex items-center justify-center h-6">
                                                <div className={`w-1.5 rounded-full transition-all duration-500 ease-out ${
                                                    activeGuideSection === item.id ? "h-6 bg-white shadow-sm" : "h-1.5 bg-white/10 group-hover:bg-white/20"
                                                }`} />
                                            </div>
                                            <span className={`text-[12px] md:text-[13px] font-bold uppercase tracking-widest transition-colors duration-300 ${
                                                activeGuideSection === item.id ? "text-white" : "text-gray-500 group-hover:text-white"
                                            }`}>
                                                {item.label}
                                            </span>
                                        </a>
                                    ))}
                                </nav>
                            </div>
                        </div>

                        {/* Scrolling Content Area */}
                        <div className="lg:col-span-6 flex flex-col pb-24 md:pb-48 [&>*:not(:first-child)]:border-t [&>*:not(:first-child)]:border-white/10">

                            <div id="guide-intro" className="guide-scroll-section flex flex-col gap-10 scroll-mt-32 p-6 md:p-8 lg:p-12">
                                <div className="max-w-3xl relative z-10">
                                    <h3 className="text-2xl md:text-3xl font-medium text-white mb-6 tracking-tight text-balance">
                                        How Plugins Work
                                    </h3>
                                    <p className="text-[14px] md:text-[15px] lg:text-[16px] text-gray-400 leading-relaxed font-light mb-12">
                                        Pytja spawns an ephemeral Wasmer runtime for every module execution. The shell decodes requested files from the secure database and maps them into a restricted virtual workspace. The plugin has no access to your host network or physical file system.
                                    </p>

                                    <div className="grid sm:grid-cols-2 gap-4">
                                        {[
                                            { title: "Isolation", text: "Zero network access by default." },
                                            { title: "Data Handover", text: "VFS mapping prevents data leaks." },
                                            { title: "Execution", text: "Near-native speed via WASI." },
                                            { title: "Cleanup", text: "Workspace is ruthlessly purged after exit." }
                                        ].map((item, idx) => (
                                            <div key={idx} className="p-6 border border-white/10 bg-white/[0.02] rounded-md">
                                                <h4 className="text-[11px] font-bold text-white uppercase tracking-widest mb-2">{item.title}</h4>
                                                <p className="text-xs text-gray-500 font-light leading-relaxed">{item.text}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div id="guide-dev" className="guide-scroll-section flex flex-col gap-10 scroll-mt-32 p-6 md:p-8 lg:p-12">
                                <div className="max-w-3xl relative z-10">
                                    <h3 className="text-2xl md:text-3xl font-medium text-white mb-6 tracking-tight text-balance">
                                        Writing in Rust
                                    </h3>
                                    <p className="text-[14px] md:text-[15px] lg:text-[16px] text-gray-400 leading-relaxed font-light mb-12">
                                        If you use Rust, the easiest way to start is by creating a new <code className="text-white bg-white/10 px-1.5 py-0.5 rounded text-sm">cdylib</code> library project. Plugins interact with data via standard I/O or files mapped to the sandbox.
                                    </p>
                                    <div className="space-y-8">
                                        <div className="space-y-3">
                                            <p className="text-[10px] text-white/50 font-bold uppercase tracking-widest">A. Initialize</p>
                                            <CommandBlock cmd="cargo new my_pytja_plugin --lib" />
                                        </div>
                                        <div className="space-y-3">
                                            <p className="text-[10px] text-white/50 font-bold uppercase tracking-widest">B. Write Logic (src/lib.rs)</p>
                                            <CodeBlock filename="src/lib.rs" code={`#[no_mangle]\npub extern "C" fn process_data() {\n    // Isolated processing logic\n    println!("Pytja Plugin: Processing secure data...");\n}`} language="rust" />
                                        </div>
                                        <div className="space-y-3">
                                            <p className="text-[10px] text-white/50 font-bold uppercase tracking-widest">C. Compile to WASI</p>
                                            <CommandBlock cmd="cargo build --target wasm32-wasi --release" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div id="guide-manifest" className="guide-scroll-section flex flex-col gap-10 scroll-mt-32 p-6 md:p-8 lg:p-12">
                                <div className="max-w-3xl relative z-10">
                                    <h3 className="text-2xl md:text-3xl font-medium text-white mb-6 tracking-tight text-balance">
                                        Manifest Configuration
                                    </h3>
                                    <p className="text-[14px] md:text-[15px] lg:text-[16px] text-gray-400 leading-relaxed font-light mb-12">
                                        Every module requires a strict JSON manifest defining its capabilities. The Radar-Engine actively blocks any ABI calls that are not explicitly whitelisted in the <code className="text-white bg-white/10 px-1.5 py-0.5 rounded text-sm">permissions</code> array (Principle of Least Privilege).
                                    </p>

                                    <div className="space-y-12">
                                        {/* JSON Code Block */}
                                        <div className="space-y-3">
                                            <p className="text-[10px] text-white/50 font-bold uppercase tracking-widest">Example Specification</p>
                                            <CodeBlock
                                                filename="manifest.json"
                                                language="json"
                                                code={`{\n  "name": "pytja_core_plugin",\n  "version": "1.0.0",\n  "description": "Enterprise VFS & C2 Telemetry Agent",\n  "permissions": [\n    "fs_read",\n    "fs_write",\n    "network_tcp",\n    "radar_ipc",\n    "admin",\n    "display_ui"\n  ],\n  "autostart": true\n}`}
                                            />
                                        </div>

                                        {/* Permission Matrix Grid - Monochrom */}
                                        <div className="space-y-6">
                                            <h4 className="text-[14px] font-bold text-white uppercase tracking-widest border-b border-white/10 pb-2">
                                                Permission Matrix
                                            </h4>

                                            <div className="grid sm:grid-cols-2 gap-4">
                                                <div className="p-5 border border-white/10 bg-white/[0.02] rounded-md">
                                                    <div className="text-[11px] font-mono text-white/80 font-bold mb-2">"fs_read" & "fs_write"</div>
                                                    <p className="text-xs text-gray-500 font-light leading-relaxed">
                                                        Grants read/write access to create, modify, or delete files exclusively within the user's isolated Virtual File System (VFS).
                                                    </p>
                                                </div>
                                                <div className="p-5 border border-white/10 bg-white/[0.02] rounded-md">
                                                    <div className="text-[11px] font-mono text-white/80 font-bold mb-2">"network_tcp"</div>
                                                    <p className="text-xs text-gray-500 font-light leading-relaxed">
                                                        Allows the plugin to establish outbound network connections (e.g., HTTP requests, WebSockets). Blocked by default.
                                                    </p>
                                                </div>
                                                <div className="p-5 border border-white/10 bg-white/[0.02] rounded-md">
                                                    <div className="text-[11px] font-mono text-white/80 font-bold mb-2">"radar_ipc"</div>
                                                    <p className="text-xs text-gray-500 font-light leading-relaxed">
                                                        Activates the Inter-Process Communication bus, enabling message passing between active daemons inside the Radar-Engine.
                                                    </p>
                                                </div>
                                                <div className="p-5 border border-white/10 bg-white/[0.02] rounded-md">
                                                    <div className="text-[11px] font-mono text-white/80 font-bold mb-2">"admin" & "display_ui"</div>
                                                    <p className="text-xs text-gray-500 font-light leading-relaxed">
                                                        Elevated privileges. Allows execution of security-critical syscalls (User Management) and triggering native host UI components.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Lifecycle Info - Monochrom */}
                                        <div className="p-5 border border-white/10 bg-white/[0.02] rounded-md relative overflow-hidden">
                                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-white/20" />
                                            <div className="text-[11px] font-mono text-white font-bold mb-2 pl-2">Background Execution</div>
                                            <p className="text-xs text-gray-400 font-light leading-relaxed pl-2">
                                                Setting <code className="text-white/80 bg-white/10 px-1 py-0.5 rounded">"autostart": true</code> instructs the shell to initialize the module as an asynchronous background daemon upon startup. Omitting this defaults to ephemeral execution.
                                            </p>
                                        </div>

                                    </div>
                                </div>
                            </div>

                            <div id="guide-deploy" className="guide-scroll-section flex flex-col gap-10 scroll-mt-32 p-6 md:p-8 lg:p-12">
                                <div className="max-w-3xl relative z-10">
                                    <h3 className="text-2xl md:text-3xl font-medium text-white mb-6 tracking-tight text-balance">
                                        Deployment
                                    </h3>
                                    <p className="text-[14px] md:text-[15px] lg:text-[16px] text-gray-400 leading-relaxed font-light mb-12">
                                        Once compiled, place your <code className="text-white bg-white/10 px-1.5 py-0.5 rounded text-sm">.wasm</code> binary alongside its <code className="text-white bg-white/10 px-1.5 py-0.5 rounded text-sm">manifest.json</code> in the active registry directory. The engine will automatically parse the permissions and apply the sandbox constraints.
                                    </p>
                                    <div className="space-y-8">
                                        <div className="space-y-3">
                                            <p className="text-[10px] text-white/50 font-bold uppercase tracking-widest">Execute in Shell</p>
                                            <CommandBlock prompt="pytja>" cmd="module run pytja_core_plugin --input /vfs/secure.bin" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>

            </main>
        </div>
    );
}

// --- VISUAL HOOK: THE WASM ECOSYSTEM PIPELINE (RESPONSIVE NODE EDITOR STYLE) ---
function WasmArchitectureMindmap() {
    return (
        <div className="w-full">

            {/* ========================================================================= */}
            {/* 1. MOBILE VIEW (Safari-Bug Fixed: Absolute Divs instead of foreignObject) */}
            {/* ========================================================================= */}
            <div className="block md:hidden relative w-[calc(100%-2px)] mx-auto bg-[#FAFAFA] border border-black/5 rounded-2xl overflow-x-auto hide-scrollbar">

                {/* Dotted Grid Background - Geheftet an die volle Scroll-Breite */}
                <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-70 z-0 min-w-[380px]" />

                {/* Mathematisch perfekter Loop */}
                <style>{`
                    @keyframes stream-flow-mobile {
                        from { stroke-dashoffset: 16; }
                        to { stroke-dashoffset: 0; }
                    }
                `}</style>

                {/* Wrapper erzwingt exakte Maße (380x930) für perfektes Alignment der Pfade */}
                <div className="relative w-[380px] min-w-[380px] h-[930px] mx-auto my-8">

                    {/* SVG NUR FÜR DIE PFADE */}
                    <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none" viewBox="0 0 380 930">
                        {/* 1. Static Shadow Paths */}
                        <g className="text-black/5" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M 95 110 V 180 A 10 10 0 0 0 105 190 H 130 A 10 10 0 0 1 140 200" />
                            <path d="M 285 110 V 180 A 10 10 0 0 1 275 190 H 250 A 10 10 0 0 0 240 200" />
                            <path d="M 190 360 V 430" />
                            <path d="M 190 500 V 580" />
                            <path d="M 85 615 H 40 A 10 10 0 0 1 30 605 V 290 A 10 10 0 0 1 40 280 H 85" />
                            <path d="M 240 650 V 800" />
                            <path d="M 295 280 H 340 A 10 10 0 0 1 350 290 V 820 A 10 10 0 0 1 340 830 H 300" />
                            <path d="M 150 360 V 380 A 10 10 0 0 1 140 390 H 60 A 10 10 0 0 0 50 400 V 700" />
                        </g>

                        {/* 2. Animated Flow Paths */}
                        <g strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" className="animate-[stream-flow-mobile_1s_linear_infinite]" strokeDasharray="8 8">
                            <path d="M 95 100 V 180 A 10 10 0 0 0 105 190 H 130 A 10 10 0 0 1 140 200" stroke="#06b6d4" />
                            <path d="M 285 100 V 180 A 10 10 0 0 1 275 190 H 250 A 10 10 0 0 0 240 200" stroke="#3b82f6" />
                            <path d="M 190 360 V 430" stroke="#10b981" />
                            <path d="M 190 500 V 580" stroke="#10b981" />
                            <path d="M 85 615 H 40 A 10 10 0 0 1 30 605 V 290 A 10 10 0 0 1 40 280 H 85" stroke="#a855f7" />
                            <path d="M 240 650 V 800" stroke="#f43f5e" />
                            <path d="M 295 280 H 340 A 10 10 0 0 1 350 290 V 820 A 10 10 0 0 1 340 830 H 300" stroke="#f43f5e" />
                            <path d="M 150 360 V 380 A 10 10 0 0 1 140 390 H 60 A 10 10 0 0 0 50 400 V 700" stroke="#f97316" />
                        </g>
                    </svg>

                    {/* --- HTML NODES (Absolut positioniert, ohne foreignObject) --- */}

                    {/* 1. Webhook (Top Left) */}
                    <div className="absolute w-[160px] z-20" style={{ left: 15, top: 40 }}>
                        <div className="relative w-full bg-white rounded-lg border border-cyan-500/20 shadow-sm flex flex-col z-20">
                            <div className="px-2 py-1.5 bg-cyan-50/30 border-b border-black/5 rounded-t-lg flex justify-between items-center">
                                <span className="text-[10px] font-bold text-black truncate">webhook</span>
                                <div className="relative flex items-center justify-center w-2 h-2 shrink-0">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-500"></span>
                                </div>
                            </div>
                            <div className="p-2 text-[9px] font-mono text-gray-500 text-center">Port: 8080</div>
                            <div className="absolute left-1/2 -bottom-1.5 -translate-x-1/2 w-2.5 h-2.5 bg-white border-2 border-cyan-400 rounded-full z-30" />
                        </div>
                    </div>

                    {/* 2. CDC (Top Right) */}
                    <div className="absolute w-[160px] z-20" style={{ left: 205, top: 40 }}>
                        <div className="relative w-full bg-white rounded-lg border border-black/10 shadow-sm flex flex-col z-20">
                            <div className="px-2 py-1.5 bg-gray-50/50 border-b border-black/5 rounded-t-lg flex justify-center items-center">
                                <span className="text-[10px] font-bold text-black truncate">pg_cdc_streamer</span>
                            </div>
                            <div className="p-2 text-[9px] font-mono text-gray-500 text-center">1.4M rows/s</div>
                            <div className="absolute left-1/2 -bottom-1.5 -translate-x-1/2 w-2.5 h-2.5 bg-white border-2 border-blue-400 rounded-full z-30" />
                        </div>
                    </div>

                    {/* 3. Core (Center) */}
                    <div className="absolute w-[210px] z-30" style={{ left: 85, top: 200 }}>
                        <div className="relative w-full h-[160px] bg-[#0A0A0A] rounded-xl border border-white/20 shadow-lg flex flex-col items-center justify-center z-30 p-3">
                            <div className="w-12 h-12 bg-emerald-500/10 rounded-full flex items-center justify-center border border-emerald-500/30 mb-2">
                                <svg className="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z" /></svg>
                            </div>
                            <h4 className="text-[15px] font-bold text-white tracking-widest uppercase mb-1">Pytja Core</h4>
                            <span className="text-[10px] text-white/50 font-mono mb-2">Isolated Data Bus</span>
                            <div className="absolute left-[54px] -top-1.5 -translate-x-1/2 w-2.5 h-2.5 bg-[#0A0A0A] border-2 border-cyan-400 rounded-full z-40" />
                            <div className="absolute left-[154px] -top-1.5 -translate-x-1/2 w-2.5 h-2.5 bg-[#0A0A0A] border-2 border-blue-400 rounded-full z-40" />
                            <div className="absolute left-1/2 -bottom-1.5 -translate-x-1/2 w-2.5 h-2.5 bg-[#0A0A0A] border-2 border-emerald-400 rounded-full z-40" />
                            <div className="absolute left-[64px] -bottom-1.5 -translate-x-1/2 w-2.5 h-2.5 bg-[#0A0A0A] border-2 border-orange-400 rounded-full z-40" />
                            <div className="absolute -left-1.5 top-[79px] -translate-y-1/2 w-2.5 h-2.5 bg-[#0A0A0A] border-2 border-purple-400 rounded-full z-40" />
                            <div className="absolute -right-1.5 top-[79px] -translate-y-1/2 w-2.5 h-2.5 bg-[#0A0A0A] border-2 border-rose-400 rounded-full z-40" />
                        </div>
                    </div>

                    {/* 4. PII Filter (Center) */}
                    <div className="absolute w-[210px] z-20" style={{ left: 85, top: 430 }}>
                        <div className="relative w-full bg-white rounded-lg border border-black/10 shadow-sm flex flex-col z-20">
                            <div className="px-3 py-1.5 bg-gray-50/50 border-b border-black/5 rounded-t-lg flex justify-center items-center">
                                <span className="text-[10px] font-bold text-black truncate">pii_redaction_filter</span>
                            </div>
                            <div className="p-2 text-[9px] font-mono text-gray-500 text-center">Stream Intercept</div>
                            <div className="absolute left-1/2 -top-1.5 -translate-x-1/2 w-2.5 h-2.5 bg-white border-2 border-emerald-400 rounded-full z-30" />
                            <div className="absolute left-1/2 -bottom-1.5 -translate-x-1/2 w-2.5 h-2.5 bg-white border-2 border-emerald-400 rounded-full z-30" />
                        </div>
                    </div>

                    {/* 5. ONNX (Center) */}
                    <div className="absolute w-[210px] z-20" style={{ left: 85, top: 580 }}>
                        <div className="relative w-full bg-white rounded-lg border border-black/10 shadow-sm flex flex-col z-20">
                            <div className="px-3 py-1.5 bg-gray-50/50 border-b border-black/5 rounded-t-lg flex justify-center items-center gap-2">
                                <svg className="w-3.5 h-3.5 text-purple-500" fill="currentColor" viewBox="0 0 24 24"><circle cx="6" cy="6" r="2"/><circle cx="6" cy="12" r="2"/><circle cx="6" cy="18" r="2"/><circle cx="12" cy="9" r="2"/><circle cx="12" cy="15" r="2"/><circle cx="18" cy="12" r="2"/></svg>
                                <span className="text-[10px] font-bold text-black truncate">onnx_fraud_detector</span>
                            </div>
                            <div className="p-2 text-[9px] font-mono text-gray-500 text-center">ML Scoring</div>
                            <div className="absolute left-1/2 -top-1.5 -translate-x-1/2 w-2.5 h-2.5 bg-white border-2 border-emerald-400 rounded-full z-30" />
                            <div className="absolute -left-1.5 top-[34px] -translate-y-1/2 w-2.5 h-2.5 bg-white border-2 border-purple-400 rounded-full z-30" />
                            <div className="absolute left-[154px] -bottom-1.5 -translate-x-1/2 w-2.5 h-2.5 bg-white border-2 border-rose-400 rounded-full z-30" />
                        </div>
                    </div>

                    {/* 6. Audit (Bottom Left) */}
                    <div className="absolute w-[160px] z-20" style={{ left: 15, top: 700 }}>
                        <div className="relative w-full bg-white rounded-lg border border-orange-500/20 shadow-sm flex flex-col z-20">
                            <div className="px-2 py-1.5 bg-orange-50/30 border-b border-orange-500/10 rounded-t-lg flex justify-center items-center">
                                <span className="text-[10px] font-bold text-black truncate">immutable_audit</span>
                            </div>
                            <div className="p-2 text-[9px] font-mono text-gray-500 text-center">WORM Storage</div>
                            <div className="absolute left-[29.3px] -top-1.5 w-2.5 h-2.5 bg-white border-2 border-orange-400 rounded-full z-30" />
                        </div>
                    </div>

                    {/* 7. IAM (Bottom Right) */}
                    <div className="absolute w-[160px] z-20" style={{ left: 160, top: 790 }}>
                        <div className="relative w-full bg-white rounded-lg border border-rose-500/20 shadow-sm flex flex-col z-20">
                            <div className="px-2 py-1.5 bg-rose-50/50 border-b border-rose-500/10 rounded-t-lg flex justify-center items-center">
                                <span className="text-[10px] font-bold text-black truncate">iam_enforcer</span>
                            </div>
                            <div className="p-2 text-[9px] font-mono text-gray-500 text-center">Revoke Token</div>
                            <div className="absolute left-1/2 -top-1.5 -translate-x-1/2 w-2.5 h-2.5 bg-white border-2 border-rose-400 rounded-full z-30" />
                            <div className="absolute -right-1.5 top-[34px] w-2.5 h-2.5 bg-white border-2 border-rose-400 rounded-full z-30" />
                        </div>
                    </div>

                    {/* One-Liner Disclaimer */}
                    <div className="absolute -bottom-[10px] left-0 right-0 w-full flex justify-center z-30 pointer-events-none">
                        <span className="text-[8px] text-gray-400 font-mono uppercase tracking-[0.1em] font-bold bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-sm border border-black/5 shadow-sm text-center leading-tight max-w-[90%]">
                            // Theoretical demonstration of interconnected WASM pipelines
                        </span>
                    </div>

                </div>
            </div>


            {/* ========================================================================= */}
            {/* 2. DESKTOP VIEW (Unverändert, hier gab es den Bug nicht)                  */}
            {/* ========================================================================= */}
            <div className="hidden md:block w-full overflow-x-auto overflow-y-hidden pb-8 pt-4">
                <div className="w-max mx-auto px-4 md:px-8">
                    <div className="relative w-[1000px] h-[650px] bg-white border border-black/10 rounded-2xl overflow-hidden shadow-[inset_0_0_40px_rgba(0,0,0,0.02)]">

                        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-50 z-0" />

                        <style>{`
                            @keyframes stream-flow-perfect-desktop {
                                from { stroke-dashoffset: 16; }
                                to { stroke-dashoffset: 0; }
                            }
                        `}</style>

                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-center w-full pointer-events-none">
                            <span className="text-[10px] text-gray-400 font-mono uppercase tracking-[0.2em] font-bold bg-white/90 px-4 py-1.5 rounded-sm border border-black/5">
                                // Theoretical demonstration of interconnected WASM pipelines
                            </span>
                        </div>

                        {/* SVG STREAMS & CONNECTIONS */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 1000 650">
                            {/* Static Shadow Paths */}
                            <g className="text-black/5" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M 310 99 H 340 A 10 10 0 0 1 350 109 V 214 A 10 10 0 0 0 360 224 H 390" />
                                <path d="M 310 279 H 390" />
                                <path d="M 610 224 H 640 A 10 10 0 0 0 650 214 V 109 A 10 10 0 0 1 660 99 H 690" />
                                <path d="M 800 170 V 220" />
                                <path d="M 690 279 H 610" />
                                <path d="M 800 350 V 400" />
                                <path d="M 690 459 H 640 A 10 10 0 0 1 630 449 V 354 A 10 10 0 0 0 620 344 H 610" />
                                <path d="M 390 344 H 360 A 10 10 0 0 0 350 354 V 449 A 10 10 0 0 1 340 459 H 310" />
                            </g>
                            {/* Animated Flow Paths */}
                            <g strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" className="animate-[stream-flow-perfect-desktop_1s_linear_infinite]" strokeDasharray="8 8">
                                <path d="M 310 99 H 340 A 10 10 0 0 1 350 109 V 214 A 10 10 0 0 0 360 224 H 390" stroke="#06b6d4" />
                                <path d="M 310 279 H 390" stroke="#3b82f6" />
                                <path d="M 610 224 H 640 A 10 10 0 0 0 650 214 V 109 A 10 10 0 0 1 660 99 H 690" stroke="#10b981" />
                                <path d="M 800 170 V 220" stroke="#10b981" />
                                <path d="M 690 279 H 610" stroke="#a855f7" />
                                <path d="M 800 350 V 400" stroke="#f43f5e" />
                                <path d="M 690 459 H 640 A 10 10 0 0 1 630 449 V 354 A 10 10 0 0 0 620 344 H 610" stroke="#f43f5e" />
                                <path d="M 390 344 H 360 A 10 10 0 0 0 350 354 V 449 A 10 10 0 0 1 340 459 H 310" stroke="#f97316" />
                            </g>
                        </svg>

                        {/* --- HTML NODES --- */}
                        <div className="absolute w-[220px] bg-white rounded-xl border border-cyan-500/20 shadow-sm flex flex-col z-20" style={{ left: 90, top: 40 }}>
                            <div className="flex items-center justify-between px-4 py-2.5 bg-cyan-50/30 border-b border-black/5 rounded-t-xl">
                                <div className="flex items-center gap-2">
                                    <svg className="w-3.5 h-3.5 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" /></svg>
                                    <span className="text-[11px] font-bold text-black tracking-wide">webhook_ingress</span>
                                </div>
                                <span className="flex items-center gap-1.5 bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 px-1.5 py-0.5 rounded font-mono text-[8px] font-bold shrink-0">
                                    <div className="relative flex items-center justify-center w-2 h-2 shrink-0">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-500"></span>
                                    </div> DAEMON
                                </span>
                            </div>
                            <div className="p-4 flex flex-col gap-2.5">
                                <div className="flex justify-between items-center text-[10px] font-mono">
                                    <span className="text-gray-400">Port</span>
                                    <span className="text-black font-medium">Listening :8080</span>
                                </div>
                                <div className="flex justify-between items-center text-[10px] font-mono">
                                    <span className="text-gray-400">Events</span>
                                    <span className="text-cyan-600 font-medium">45 / sec</span>
                                </div>
                            </div>
                            <div className="absolute -right-1.5 top-[52px] w-3 h-3 bg-white border-[2.5px] border-cyan-400 rounded-full z-30 shadow-sm" />
                        </div>

                        <div className="absolute w-[220px] bg-white rounded-xl border border-black/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col z-20" style={{ left: 90, top: 220 }}>
                            <div className="flex items-center justify-between px-3 py-2.5 bg-gray-50/50 border-b border-black/5 rounded-t-xl">
                                <div className="flex items-center gap-1.5 min-w-0 pr-2">
                                    <svg className="w-3.5 h-3.5 text-blue-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375" /></svg>
                                    <span className="text-[11px] font-bold text-black tracking-wide truncate">pg_cdc_streamer</span>
                                </div>
                                <span className="bg-gray-100 border border-black/10 text-gray-500 px-1.5 py-0.5 rounded font-mono text-[8px] font-bold shrink-0">MANUAL CLI</span>
                            </div>
                            <div className="p-4 flex flex-col gap-2.5">
                                <div className="flex justify-between items-center text-[10px] font-mono">
                                    <span className="text-gray-400">Target</span>
                                    <span className="text-black font-medium">prod_eu_west</span>
                                </div>
                                <div className="flex justify-between items-center text-[10px] font-mono">
                                    <span className="text-gray-400">Status</span>
                                    <span className="text-blue-600 font-medium">Streaming</span>
                                </div>
                            </div>
                            <div className="absolute -right-1.5 top-[51.5px] w-3 h-3 bg-white border-[2.5px] border-blue-400 rounded-full z-30 shadow-sm" />
                        </div>

                        <div className="absolute w-[220px] bg-white rounded-xl border border-orange-500/20 shadow-sm flex flex-col z-20" style={{ left: 90, top: 400 }}>
                            <div className="flex items-center justify-between px-3 py-2.5 bg-orange-50/30 border-b border-orange-500/10 rounded-t-xl">
                                <div className="flex items-center gap-1.5 min-w-0 pr-2">
                                    <svg className="w-3.5 h-3.5 text-orange-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                    <span className="text-[11px] font-bold text-black tracking-wide truncate">immutable_audit</span>
                                </div>
                                <span className="flex items-center gap-1.5 bg-orange-500/10 border border-orange-500/10 text-orange-600 px-1.5 py-0.5 rounded font-mono text-[8px] font-bold shrink-0">
                                    <div className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse shrink-0" /> BACKGROUND
                                </span>
                            </div>
                            <div className="p-4 flex flex-col gap-2.5">
                                <div className="flex justify-between items-center text-[10px] font-mono">
                                    <span className="text-gray-400">Target</span>
                                    <span className="text-black font-medium">S3 WORM</span>
                                </div>
                                <div className="flex justify-between items-center text-[10px] font-mono">
                                    <span className="text-gray-400">Hashes</span>
                                    <span className="text-orange-500 font-medium">Synced</span>
                                </div>
                            </div>
                            <div className="absolute -right-1.5 top-[51px] w-3 h-3 bg-white border-[2.5px] border-orange-400 rounded-full z-30 shadow-sm" />
                        </div>

                        <div className="absolute w-[220px] h-[130px] bg-white rounded-xl border border-black/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col z-20" style={{ left: 690, top: 40 }}>
                            <div className="flex items-center justify-between px-4 py-2.5 bg-gray-50/50 border-b border-black/5 rounded-t-xl">
                                <div className="flex items-center gap-2">
                                    <svg className="w-3.5 h-3.5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" /></svg>
                                    <span className="text-[11px] font-bold text-black tracking-wide">pii_filter</span>
                                </div>
                                <span className="bg-black/[0.04] text-gray-500 px-1.5 py-0.5 rounded font-mono text-[8px] font-bold border border-black/5">WASI</span>
                            </div>
                            <div className="p-4 flex flex-col gap-2.5">
                                <div className="flex justify-between items-center text-[10px] font-mono">
                                    <span className="text-gray-400">Mode</span>
                                    <span className="text-black font-medium">Stream Intercept</span>
                                </div>
                                <div className="flex justify-between items-center text-[10px] font-mono mt-2 pt-2 border-t border-black/5">
                                    <span className="text-gray-400">Memory Cap</span>
                                    <span className="text-emerald-600 font-medium">12 MB</span>
                                </div>
                            </div>
                            <div className="absolute -left-1.5 top-[52px] w-3 h-3 bg-white border-[2.5px] border-emerald-400 rounded-full z-30 shadow-sm" />
                            <div className="absolute left-[102px] -bottom-1.5 w-3 h-3 bg-white border-[2.5px] border-emerald-400 rounded-full z-30 shadow-sm" />
                        </div>

                        <div className="absolute w-[220px] h-[130px] bg-white rounded-xl border border-black/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col z-20" style={{ left: 690, top: 220 }}>
                            <div className="flex items-center justify-between px-4 py-2.5 bg-gray-50/50 border-b border-black/5 rounded-t-xl">
                                <div className="flex items-center gap-2">
                                    <svg className="w-3.5 h-3.5 text-purple-500" fill="currentColor" viewBox="0 0 24 24"><circle cx="6" cy="6" r="2"/><circle cx="6" cy="12" r="2"/><circle cx="6" cy="18" r="2"/><circle cx="12" cy="9" r="2"/><circle cx="12" cy="15" r="2"/><circle cx="18" cy="12" r="2"/></svg>
                                    <span className="text-[11px] font-bold text-black tracking-wide">onnx_inference</span>
                                </div>
                                <span className="bg-black/[0.04] text-gray-500 px-1.5 py-0.5 rounded font-mono text-[8px] font-bold border border-black/5">WASI</span>
                            </div>
                            <div className="p-4 flex flex-col gap-2.5">
                                <div className="flex justify-between items-center text-[10px] font-mono">
                                    <span className="text-gray-400">Model</span>
                                    <span className="text-black font-medium">XGBoost v2</span>
                                </div>
                                <div className="flex justify-between items-center text-[10px] font-mono">
                                    <span className="text-gray-400">Anomalies</span>
                                    <span className="text-purple-600 font-medium">12 Detected</span>
                                </div>
                            </div>
                            <div className="absolute left-[102px] -top-1.5 w-3 h-3 bg-white border-[2.5px] border-emerald-400 rounded-full z-30 shadow-sm" />
                            <div className="absolute -left-1.5 top-[51px] w-3 h-3 bg-white border-[2.5px] border-purple-400 rounded-full z-30 shadow-sm" />
                            <div className="absolute left-[102px] -bottom-1.5 w-3 h-3 bg-white border-[2.5px] border-rose-400 rounded-full z-30 shadow-sm" />
                        </div>

                        <div className="absolute w-[220px] bg-white rounded-xl border border-rose-500/20 shadow-[0_8px_30px_rgb(243,24,70,0.05)] flex flex-col z-20" style={{ left: 690, top: 400 }}>
                            <div className="flex items-center justify-between px-4 py-2.5 bg-rose-50/50 border-b border-rose-500/10 rounded-t-xl">
                                <div className="flex items-center gap-2">
                                    <svg className="w-3.5 h-3.5 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg>
                                    <span className="text-[11px] font-bold text-black tracking-wide">iam_enforcer</span>
                                </div>
                                <span className="flex items-center gap-1.5 bg-rose-500/10 border border-rose-500/20 text-rose-600 px-1.5 py-0.5 rounded font-mono text-[8px] font-bold shrink-0">
                                    <div className="w-1.5 h-1.5 bg-rose-500 rounded-full shrink-0" /> EVENT HOOK
                                </span>
                            </div>
                            <div className="p-4 flex flex-col gap-2.5">
                                <div className="flex justify-between items-center text-[10px] font-mono">
                                    <span className="text-gray-400">Action</span>
                                    <span className="text-black font-medium">Revoke Token</span>
                                </div>
                                <div className="flex justify-between items-center text-[10px] font-mono">
                                    <span className="text-gray-400">Trigger</span>
                                    <span className="text-rose-500 font-medium">On Anomaly</span>
                                </div>
                            </div>
                            <div className="absolute left-[102px] -top-1.5 w-3 h-3 bg-white border-[2.5px] border-rose-400 rounded-full z-30 shadow-sm" />
                            <div className="absolute -left-1.5 top-[51px] w-3 h-3 bg-white border-[2.5px] border-rose-400 rounded-full z-30 shadow-sm" />
                        </div>

                        <div className="absolute w-[220px] h-[200px] bg-[#0A0A0A] rounded-xl border border-white/20 shadow-[0_0_40px_rgba(0,0,0,0.15)] flex flex-col items-center justify-center z-30 p-5" style={{ left: 390, top: 185 }}>
                            <div className="w-12 h-12 bg-emerald-500/10 rounded-full flex items-center justify-center border border-emerald-500/30 mb-4 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                                <svg className="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z" /></svg>
                            </div>
                            <h4 className="text-[15px] font-bold text-white tracking-widest uppercase mb-1.5">Pytja Core</h4>
                            <span className="text-[10px] text-white/50 font-mono mb-4">Event & Data Bus</span>
                            <div className="w-full h-px bg-white/10 mb-4" />
                            <div className="w-full flex justify-between items-center text-[10px] font-mono">
                                <span className="text-white/40">Active Nodes</span>
                                <span className="text-emerald-400 font-bold">6 Running</span>
                            </div>

                            <div className="absolute -left-1.5 top-[31px] w-3 h-3 bg-[#0A0A0A] border-[2.5px] border-cyan-400 rounded-full z-40" />
                            <div className="absolute -left-1.5 top-[86px] w-3 h-3 bg-[#0A0A0A] border-[2.5px] border-blue-400 rounded-full z-40" />
                            <div className="absolute -left-1.5 top-[151px] w-3 h-3 bg-[#0A0A0A] border-[2.5px] border-orange-400 rounded-full z-40" />
                            <div className="absolute -right-1.5 top-[31px] w-3 h-3 bg-[#0A0A0A] border-[2.5px] border-emerald-400 rounded-full z-40" />
                            <div className="absolute -right-1.5 top-[86px] w-3 h-3 bg-[#0A0A0A] border-[2.5px] border-purple-400 rounded-full z-40" />
                            <div className="absolute -right-1.5 top-[151px] w-3 h-3 bg-[#0A0A0A] border-[2.5px] border-rose-400 rounded-full z-40" />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

// --- SMALL HELPER COMPONENTS ---

function CommandBlock({ cmd, output, prompt = "$" }: { cmd: string, output?: string, prompt?: string }) {
    const [copied, setCopied] = useState(false);
    const handleCopy = () => { navigator.clipboard.writeText(cmd); setCopied(true); setTimeout(() => setCopied(false), 2000); };
    return (
        <div className="w-full bg-[#0A0A0A] border border-white/10 p-4 font-mono text-xs rounded-md hover:border-white/30 transition-all relative group shadow-sm">
            <button onClick={handleCopy} className="absolute top-4 right-3 p-2 text-white/30 hover:text-white transition-colors z-10 cursor-pointer" title="Copy to clipboard">
                {copied ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-emerald-500"><polyline points="20 6 9 17 4 12" /></svg> : <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>}
            </button>
            <div className="overflow-x-auto py-2 pr-12 hide-scrollbar">
                <div className="flex items-center gap-3 text-white/80 whitespace-nowrap">
                    <span className="text-white/30 font-bold select-none">{prompt}</span><span className="select-all">{cmd}</span>
                </div>
            </div>
            {output && <div className="mt-2 pt-2 border-t border-white/5 text-white/40 whitespace-pre-wrap break-all">{output}</div>}
        </div>
    );
}

function CodeBlock({ filename, code, language }: { filename: string, code: string, language: string }) {
    const [copied, setCopied] = useState(false);
    const handleCopy = () => { navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 2000); };
    return (
        <div className="w-full bg-[#0A0A0A] border border-white/10 rounded-md relative overflow-hidden group shadow-sm">
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/[0.02]">
                <div className="flex items-center gap-2"><span className="text-[10px] text-white/50 uppercase tracking-widest font-bold">{filename}</span></div>
                <button onClick={handleCopy} className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-white/40 hover:text-white transition-colors cursor-pointer">
                    {copied ? <span className="text-emerald-500 flex items-center gap-1"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>Copied</span> : <span className="flex items-center gap-1"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>Copy Code</span>}
                </button>
            </div>
            <div className="p-4 overflow-x-auto hide-scrollbar">
                <pre className="text-xs font-mono leading-[1.6] text-white/80">{code}</pre>
            </div>
        </div>
    );
}