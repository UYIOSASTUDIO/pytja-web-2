"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

// --- MOCK DATA FOR PLUGINS ---
const plugins = [
    {
        id: "core-pg",
        name: "pg_driver",
        version: "v1.0.4",
        type: "driver",
        desc: "Native, zero-copy PostgreSQL interface. Supports binary replication protocol and pipeline mode.",
        author: "Pytja Core",
        size: "Built-in",
        downloads: "2.4k"
    },
    {
        id: "core-s3",
        name: "fs_s3_connector",
        version: "v0.9.2",
        type: "storage",
        desc: "Mount S3 buckets as local virtual file systems. Supports AWS, MinIO and Cloudflare R2.",
        author: "Pytja Core",
        size: "1.2 MB",
        downloads: "850"
    },
    {
        id: "community-redis",
        name: "redis_cache_layer",
        version: "v0.1.0",
        type: "community",
        desc: "Experimental Redis protocol adapter. Caches read queries in-memory for 10x throughput.",
        author: "Community",
        size: "450 KB",
        downloads: "120"
    },
    {
        id: "community-audit",
        name: "strict_audit_logger",
        version: "v1.0.0",
        type: "security",
        desc: "Compliance plugin. Logs every keystroke and query to an immutable append-only ledger.",
        author: "SecOps_Team",
        size: "89 KB",
        downloads: "340"
    }
];

export default function ModulesPage() {
    return (
        <div className="min-h-screen bg-[#0D0D0D] text-white font-mono selection:bg-white/20 pt-32 pb-24">

            {/* Background */}
            <div className="fixed inset-0 bg-grid opacity-20 pointer-events-none z-0" />

            <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">

                {/* --- HERO SECTION --- */}
                <div className="mb-24 text-center max-w-3xl mx-auto space-y-6">
                    <div className="inline-flex items-center gap-2 border border-white/10 bg-white/[0.02] px-3 py-1 rounded-full">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]" />
                        <span className="text-[9px] uppercase tracking-[0.3em] text-white/60">WASM Runtime Active</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-[0.9]">
                        Extend the <span className="text-white/30">Kernel.</span>
                    </h1>
                    <p className="text-sm md:text-base text-gray-400 leading-relaxed">
                        Pytja features a sandboxed WebAssembly runtime. Load untrusted plugins safely
                        without compromising the core memory space. Hot-swappable. Zero-Cost.
                    </p>
                </div>

                {/* --- HOW IT WORKS (3 Steps) --- */}
                <div className="grid md:grid-cols-3 gap-8 mb-32 border-b border-white/5 pb-24">
                    {[
                        { title: "01. Write", desc: "Write your logic in Rust, Go, or C. Use the Pytja SDK to access the VFS and Network streams." },
                        { title: "02. Compile", desc: "Compile your code to a .wasm binary. The resulting artifact is platform-agnostic and lightweight." },
                        { title: "03. Hot-Load", desc: "Load the plugin into the running shell. The runtime sandboxes execution instantly." }
                    ].map((step, i) => (
                        <div key={i} className="space-y-4">
                            <h3 className="text-xl font-bold uppercase tracking-tight text-white">{step.title}</h3>
                            <p className="text-xs text-white/50 leading-relaxed">{step.desc}</p>
                        </div>
                    ))}
                </div>

                {/* --- MODULE REGISTRY --- */}
                <div className="space-y-12">
                    <div className="flex items-end justify-between border-b border-white/10 pb-4">
                        <h2 className="text-2xl font-bold uppercase tracking-tight">Module Registry</h2>
                        <div className="text-[10px] text-white/40 uppercase tracking-widest font-bold">
                            Total Modules: {plugins.length}
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
                        {plugins.map((plugin) => (
                            <motion.div
                                key={plugin.id}
                                whileHover={{ y: -4 }}
                                className="group bg-[#0A0A0A] border border-white/5 p-6 hover:border-white/20 transition-all duration-300 relative overflow-hidden"
                            >
                                {/* Hover Glow */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-[50px] rounded-full translate-x-1/2 -translate-y-1/2 group-hover:bg-white/10 transition-colors" />

                                <div className="flex justify-between items-start mb-6 relative z-10">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-3">
                                            <h3 className="text-xl font-bold text-white font-mono tracking-tight">{plugin.name}</h3>
                                            <span className={`text-[9px] px-1.5 py-0.5 rounded border uppercase tracking-wide ${
                                                plugin.type === 'driver' ? 'border-blue-500/30 text-blue-400 bg-blue-500/5' :
                                                    plugin.type === 'security' ? 'border-red-500/30 text-red-400 bg-red-500/5' :
                                                        'border-white/10 text-white/40'
                                            }`}>
                                                {plugin.type}
                                            </span>
                                        </div>
                                        <p className="text-[10px] text-white/30 font-mono">by {plugin.author} • {plugin.version}</p>
                                    </div>
                                    <button className="w-8 h-8 flex items-center justify-center border border-white/10 text-white/40 hover:text-black hover:bg-white hover:border-white transition-all rounded-sm">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                                    </button>
                                </div>

                                <p className="text-sm text-gray-400 leading-relaxed font-light mb-6 min-h-[3rem]">
                                    {plugin.desc}
                                </p>

                                <div className="flex items-center gap-6 pt-6 border-t border-white/5 text-[10px] font-mono text-white/30 uppercase tracking-wider">
                                    <span>Size: {plugin.size}</span>
                                    <span>Installs: {plugin.downloads}</span>
                                    <span className="ml-auto text-green-500/80">Verified</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* --- CTA --- */}
                <div className="mt-32 p-1 border border-white/10 rounded-sm bg-[#050505]">
                    <div className="bg-white/5 p-12 text-center space-y-6">
                        <h3 className="text-2xl font-bold uppercase tracking-tight text-white">Build your own</h3>
                        <p className="text-sm text-gray-400 max-w-lg mx-auto">
                            The Pytja SDK provides safe bindings to the core kernel. Check the documentation to start building drivers or analytical tools.
                        </p>
                        <div className="flex justify-center gap-4">
                            <Link href="/manual" className="px-6 py-3 bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-gray-200">
                                Read Docs
                            </Link>
                            <Link href="https://github.com/pytja" className="px-6 py-3 border border-white/20 text-white text-xs font-bold uppercase tracking-widest hover:border-white hover:text-white">
                                View SDK
                            </Link>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}