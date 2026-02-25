"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ManualPage() {
    const [mounted, setMounted] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeMethod, setActiveMethod] = useState<'binary' | 'source'>('binary');

    useEffect(() => {
        setMounted(true);
        // Mobile Viewport Fix
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
        <>
            {/* 1. GLOBALE STYLES (Direkt am Body, keine Wrapper-Klassen) */}
            <style jsx global>{`
                html {
                    overflow-y: auto;
                    height: auto;
                }
                body {
                    background-color: #0D0D0D;
                    min-height: 100vh;
                    position: relative;
                    padding-bottom: 0;
                    margin: 0;
                    /* WICHTIG: Overflow-x hier behandeln, nicht im Wrapper */
                    overflow-x: hidden;
                    -webkit-overflow-scrolling: touch;
                }
                /* Scrollbar Styling */
                ::-webkit-scrollbar { width: 6px; }
                ::-webkit-scrollbar-track { background: #0D0D0D; }
                ::-webkit-scrollbar-thumb { background: #333; border-radius: 3px; }
                
                .code-scroll::-webkit-scrollbar { height: 4px; }
                .code-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); }
            `}</style>

            {/* 2. BACKGROUND GRID (Fixed im Hintergrund) */}
            <div className="fixed inset-0 bg-grid opacity-20 pointer-events-none z-[-1]" />

            {/* 3. HEADER */}
            <header className="fixed top-0 left-0 right-0 z-[150] border-b border-white/5 bg-[#0D0D0D]/80 backdrop-blur-xl h-16 md:h-20 flex items-center px-6 md:px-8">
                <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
                    <Link href="/public" className="flex items-center gap-3">
                        <Logo3DP />
                    </Link>
                    <nav className="hidden lg:flex items-center gap-10 text-[10px] tracking-[0.3em] text-gray-500 font-bold uppercase">
                        <Link href="/public#home" className="hover:text-white transition-colors">Home</Link>
                        <Link href="/public#architecture" className="hover:text-white transition-colors">Arch</Link>
                        <Link href="/public#modularity" className="hover:text-white transition-colors">Modules</Link>
                        <Link href="/public#stats" className="hover:text-white transition-colors">Telemetry</Link>
                    </nav>
                    <div className="hidden md:flex items-center gap-4">
                        <Link href="/contact" className="text-[10px] text-gray-400 font-bold hover:text-white transition-colors uppercase tracking-widest px-4">Contact</Link>
                        <Link href="/dashboard" className="border border-white/20 bg-white/[0.03] text-white px-6 py-2.5 text-[10px] font-bold hover:border-white/50 transition-all uppercase tracking-widest">Terminal</Link>
                    </div>
                    <button className="lg:hidden flex flex-col justify-center items-center w-10 h-10 outline-none" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                        <div className={`h-[1px] bg-white absolute w-6 transition-all duration-500 ease-in-out ${isMobileMenuOpen ? 'rotate-45 translate-y-0' : '-translate-y-1'}`} />
                        <div className={`h-[1px] bg-white absolute w-6 transition-all duration-500 ease-in-out ${isMobileMenuOpen ? '-rotate-45 translate-y-0' : 'translate-y-1'}`} />
                    </button>
                </div>
            </header>

            {/* 4. MOBILE MENU OVERLAY */}
            <div className={`fixed inset-0 z-[140] bg-[#050505] lg:hidden transition-all duration-500 ease-in-out flex flex-col ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`} style={{ paddingTop: '80px' }}>
                <div className="flex-1 overflow-y-auto px-10 pb-32">
                    <nav className="flex flex-col gap-8 mt-10">
                        {['Home', 'Architecture', 'Modularity', 'Stats'].map((item) => (
                            <Link key={item} href={`/public#${item.toLowerCase()}`} onClick={() => setIsMobileMenuOpen(false)} className="text-3xl font-bold tracking-tighter text-white/40 hover:text-white flex items-baseline gap-4">
                                <span className="text-[10px] font-mono text-white/10">01</span>{item}
                            </Link>
                        ))}
                    </nav>
                    <div className="mt-20 flex flex-col gap-4">
                        <Link href="/contact" className="w-full py-4 text-center text-[10px] font-bold uppercase border border-white/5 text-white/40">Contact Support</Link>
                        <Link href="/dashboard" className="w-full py-5 text-center text-[10px] font-bold uppercase bg-white text-black">Open Terminal</Link>
                    </div>
                </div>
            </div>

            {/* 5. MAIN SCROLLABLE CONTENT */}
            {/* WICHTIG: pb-40 sorgt für Platz für die Sticky Bar unten */}
            <div className="w-full min-h-screen bg-transparent text-white font-mono pb-40">

                <main className="relative z-10 pt-32 px-6 md:px-8 max-w-5xl mx-auto">

                    {/* Page Title */}
                    <div className="text-center space-y-6 mb-16">
                        <div className="inline-flex items-center gap-2 border border-white/10 bg-white/[0.02] px-3 py-1 rounded-full">
                            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse shadow-[0_0_10px_#3b82f6]" />
                            <span className="text-[9px] uppercase tracking-[0.3em] text-white/60">Documentation</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase text-white">
                            Deployment <span className="text-white/30">Protocols</span>
                        </h1>
                    </div>

                    {/* Manual Steps Content */}
                    <div className="relative">
                        {activeMethod === 'binary' ? (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8 md:space-y-0">
                                <ManualStep number="01" title="Acquire Artifact" desc="Download the pre-compiled binary matching your architecture. Ensure the file is not corrupted.">
                                    <CommandBlock cmd="curl -L https://get.pytja.com/latest -o pytja" />
                                </ManualStep>
                                <Divider />
                                <ManualStep number="02" title="Verify Signature" desc="CRITICAL: Verify the SHA-256 hash against the official transparency log before execution.">
                                    <CommandBlock cmd="shasum -a 256 pytja" output="e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855  pytja" />
                                </ManualStep>
                                <Divider />
                                <ManualStep number="03" title="Grant Permissions" desc="The binary is locked by default. You must explicitly allow execution on Unix-based systems.">
                                    <CommandBlock cmd="chmod +x pytja" />
                                </ManualStep>
                                <Divider />
                                <ManualStep number="04" title="Initialize Core" desc="Run the binary. The Pytja kernel will allocate isolated memory and start the listener.">
                                    <CommandBlock cmd="./pytja --init" output="[INFO] Core initialized. Memory lock established." />
                                </ManualStep>
                            </div>
                        ) : (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8 md:space-y-0">
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

                {/* Footer Content */}
                <footer className="border-t border-white/10 bg-[#050505] pt-24 pb-12 mt-32 relative z-10 mx-6 md:mx-8 max-w-7xl lg:mx-auto">
                    <div className="grid md:grid-cols-4 gap-12 mb-24">
                        <div className="space-y-6">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-white" />
                                <span className="font-bold text-lg tracking-tighter text-white uppercase">Pytja</span>
                            </div>
                            <p className="text-[10px] text-[#666] leading-relaxed max-w-[200px]">Next-generation database exploration layer.</p>
                        </div>
                        <div className="md:col-span-3 flex flex-wrap gap-12">
                            <div><h4 className="text-[10px] font-bold text-white uppercase tracking-[0.2em] mb-6">Product</h4><p className="text-[10px] text-[#666]">FEATURES / SECURITY</p></div>
                            <div><h4 className="text-[10px] font-bold text-white uppercase tracking-[0.2em] mb-6">Legal</h4><p className="text-[10px] text-[#666]">PRIVACY / IMPRINT</p></div>
                        </div>
                    </div>
                    <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="text-[10px] text-[#444]">&copy; 2024 Pytja Inc.</div>
                        <div className="flex items-center gap-3 px-4 py-2 border border-white/5 bg-white/[0.02] rounded-full">
                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                            <span className="text-[9px] text-[#666] uppercase tracking-widest font-mono">System OK</span>
                        </div>
                    </div>
                </footer>
            </div>

            {/* 6. STICKY BOTTOM BAR (Außerhalb des Scroll-Flows!) */}
            <div
                style={{
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    zIndex: 99999, /* Extrem hoch, um alles zu überlagern */
                    paddingBottom: 'max(1.5rem, env(safe-area-inset-bottom))'
                }}
                className="bg-[#050505]/80 backdrop-blur-md border-t border-white/10 pt-4 px-6 md:px-8"
            >
                <div className="max-w-xl mx-auto flex justify-center w-full">
                    <div className="grid grid-cols-2 gap-2 w-full md:w-auto bg-[#0A0A0A] p-1 border border-white/10 rounded-sm shadow-2xl">
                        <button
                            onClick={() => setActiveMethod('binary')}
                            className={`px-4 py-3 text-[10px] font-bold uppercase tracking-[0.1em] transition-all duration-300 flex justify-center items-center gap-2 rounded-sm whitespace-nowrap ${
                                activeMethod === 'binary' ? 'bg-white text-black' : 'text-white/40 hover:text-white'
                            }`}
                        >
                            <BinaryIcon />
                            <span>Core Binary</span>
                        </button>
                        <button
                            onClick={() => setActiveMethod('source')}
                            className={`px-4 py-3 text-[10px] font-bold uppercase tracking-[0.1em] transition-all duration-300 flex justify-center items-center gap-2 rounded-sm whitespace-nowrap ${
                                activeMethod === 'source' ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]' : 'text-white/40 hover:text-white'
                            }`}
                        >
                            <GithubIcon />
                            <span>Source Build</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

// --- COMPONENTS ---

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

function CommandBlock({ cmd, output }: { cmd: string, output?: string }) {
    return (
        <div className="w-full bg-[#050505] border border-white/10 p-4 font-mono text-xs rounded-sm group-hover:border-white/20 transition-colors relative">
            <div className="absolute top-0 left-0 w-1 h-full bg-blue-500/20" />
            <div className="overflow-x-auto code-scroll pb-2">
                <div className="flex items-center gap-3 text-white/80 whitespace-nowrap">
                    <span className="text-blue-500 font-bold select-none">$</span>
                    <span className="select-all">{cmd}</span>
                </div>
            </div>
            {output && <div className="mt-2 pt-2 border-t border-white/5 text-white/30 whitespace-pre-wrap break-all">{output}</div>}
        </div>
    );
}

function Divider() { return <div className="h-8 md:h-12 border-l border-white/5 ml-5 md:ml-8 my-2" />; }
function BinaryIcon() { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M12 8v8m-4-4l4 4 4-4"/></svg> }
function GithubIcon() { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 22.027v-6.027c0-2.227-1.5-3.027-3-3.027c3.5 0 6-2.5 6-5.5c0-4.5-4-5-6-5c-2 0-6 .5-6 5c0 3 2.5 5.5 6 5.5c-1.5 0-3 .8-3 3.027v6.027"/></svg> }
function Logo3DP() { const pathString = "M 0 0 H 20 V 15 H 5 V 25 H 0 Z M 5 5 V 10 H 15 V 5 Z"; const Face = ({ z }: { z: number }) => (<> <div className="absolute inset-0 bg-[#0D0D0D]/40 backdrop-blur-sm" style={{ transform: `translateZ(${z}px)`, clipPath: `path('${pathString}')` }} /> <svg className="absolute inset-0 pointer-events-none" width="20" height="25" style={{ transform: `translateZ(${z}px)` }}> <path d={pathString} fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1" fillRule="evenodd" /> </svg> </>); const EdgeH = ({ x, y, w }: { x: number, y: number, w: number }) => (<div className="absolute bg-white/5 backdrop-blur-sm border border-white/40" style={{ left: x, top: y, width: w, height: 5, transform: 'translateY(-2.5px) rotateX(90deg)' }} />); const EdgeV = ({ x, y, h }: { x: number, y: number, h: number }) => (<div className="absolute bg-white/5 backdrop-blur-sm border border-white/40" style={{ left: x, top: y, width: 5, height: h, transform: 'translateX(-2.5px) rotateY(90deg)' }} />); return (<div className="relative w-8 h-8 preserve-3d flex items-center justify-center mr-1"> <style>{`@keyframes logo-float { 0%, 100% { transform: translateY(0px) rotateX(50deg) rotateY(-40deg) rotateZ(-10deg); } 50% { transform: translateY(-4px) rotateX(50deg) rotateY(-40deg) rotateZ(-10deg); } } .animate-logo-float { animation: logo-float 4s ease-in-out infinite; }`}</style> <div className="absolute inset-0 bg-white/20 blur-xl rounded-full" /> <div className="relative preserve-3d animate-logo-float" style={{ width: 20, height: 25 }}> <Face z={2.5} /> <Face z={-2.5} /> <EdgeH x={0} y={0} w={20} /> <EdgeV x={20} y={0} h={15} /> <EdgeH x={5} y={15} w={15} /> <EdgeV x={5} y={15} h={10} /> <EdgeH x={0} y={25} w={5} /> <EdgeV x={0} y={0} h={25} /> <EdgeH x={5} y={5} w={10} /> <EdgeV x={15} y={5} h={5} /> <EdgeH x={5} y={10} w={10} /> <EdgeV x={5} y={5} h={5} /> </div> </div>); }