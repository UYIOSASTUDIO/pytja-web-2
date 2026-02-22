"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link'; // <--- Das hat gefehlt!
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function DashboardPage() {
    const [activeTab, setActiveTab] = useState('overview');
    const [mounted, setMounted] = useState(false);

    // Verhindert Hydration-Fehler bei Client-Side Rendering
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const rustCode = `// src/sandbox/mod.rs
pub fn secure_connection() -> Result<(), PytjaError> {
    let mut session = Runtime::isolate()?;
    session.lock_memory_bounds(2048)?;
    Ok(())
}`;

    return (
        <div className="flex h-screen bg-[#0D0D0D] text-[#E5E5E5] font-mono overflow-hidden">

            {/* SIDEBAR */}
            <aside className="w-72 border-r border-[#1F1F1F] bg-[#0A0A0A] flex flex-col z-20">
                <div className="p-6 border-b border-[#1F1F1F] bg-[#0D0D0D]">
                    <Link href="/" className="text-[9px] text-[#444] hover:text-[#F46623] transition-colors mb-4 inline-block">
                        ← RETURN_TO_SITE
                    </Link>
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-[#F46623] rounded-full animate-pulse" />
                        <h2 className="font-bold tracking-tighter text-sm uppercase">Pytja_Terminal</h2>
                    </div>
                </div>

                <nav className="flex-1 py-6 overflow-y-auto">
                    <div className="px-8 py-2 text-[9px] text-[#333] tracking-[0.3em] uppercase font-bold">Menu</div>
                    <button
                        onClick={() => setActiveTab('overview')}
                        className={`w-full text-left px-8 py-3 text-[11px] transition-all border-l-2 ${activeTab === 'overview' ? 'text-[#F46623] border-[#F46623] bg-[#F46623]/5' : 'text-[#666] border-transparent hover:text-white hover:bg-white/5'}`}
                    >
                        _DASHBOARD
                    </button>
                    <button
                        onClick={() => setActiveTab('code')}
                        className={`w-full text-left px-8 py-3 text-[11px] transition-all border-l-2 ${activeTab === 'code' ? 'text-[#F46623] border-[#F46623] bg-[#F46623]/5' : 'text-[#666] border-transparent hover:text-white hover:bg-white/5'}`}
                    >
                        _SOURCE_CODE
                    </button>
                </nav>
            </aside>

            {/* MAIN VIEWPORT */}
            <main className="flex-1 flex flex-col relative overflow-hidden">
                <header className="h-12 border-b border-[#1F1F1F] bg-[#0D0D0D] flex items-center px-8 justify-between z-30">
                    <div className="text-[10px] text-[#444] tracking-widest uppercase">
                        Location: <span className="text-[#F46623]">root / {activeTab}</span>
                    </div>
                    <div className="h-1.5 w-32 bg-[#111] rounded-full overflow-hidden">
                        <div className="h-full bg-[#F46623] w-1/2 animate-pulse" />
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto z-10 p-12 lg:p-20">
                    {activeTab === 'overview' ? (
                        <div className="max-w-4xl space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                            <h3 className="text-5xl font-bold tracking-tighter italic text-[#222]">System_Status.</h3>
                            <p className="text-[#888] leading-relaxed text-lg max-w-2xl font-light">
                                Alle Instanzen laufen im <span className="text-white underline decoration-[#F46623]">Isolations-Modus</span>.
                                V1 nutzt Rust-Binaries zur direkten Kommunikation mit Datenbank-Backends ohne API-Overhead.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#1F1F1F] border border-[#1F1F1F]">
                                <div className="bg-[#0D0D0D] p-8">
                                    <span className="text-[10px] text-[#F46623] font-bold">SEC_01</span>
                                    <h4 className="mt-2 font-bold uppercase">Memory Lock</h4>
                                    <p className="text-xs text-[#555] mt-2">Garantiert, dass Daten nicht in den Swap-Speicher ausgelagert werden.</p>
                                </div>
                                <div className="bg-[#0D0D0D] p-8">
                                    <span className="text-[10px] text-[#F46623] font-bold">PERF_02</span>
                                    <h4 className="mt-2 font-bold uppercase">Native Speed</h4>
                                    <p className="text-xs text-[#555] mt-2">Direkter Zugriff auf System-Ressourcen durch Rust-Runtime.</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="h-full border border-[#1F1F1F] rounded overflow-hidden flex flex-col bg-[#050505] animate-in zoom-in-95 duration-500">
                            <div className="bg-[#111] p-3 border-b border-[#1F1F1F] text-[10px] text-[#444] flex justify-between">
                                <span>src/sandbox/mod.rs</span>
                                <span className="text-[#F46623]">RUST_V1.78</span>
                            </div>
                            <div className="flex-1">
                                <SyntaxHighlighter
                                    language="rust"
                                    style={vscDarkPlus}
                                    customStyle={{ margin: 0, padding: '2rem', fontSize: '14px', background: 'transparent' }}
                                >
                                    {rustCode}
                                </SyntaxHighlighter>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}