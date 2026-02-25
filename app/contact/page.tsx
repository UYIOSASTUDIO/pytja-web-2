"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function ContactPage() {
    const [mounted, setMounted] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        email: '',
        reason: 'feature',
        message: ''
    });
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

    // Dropdown State
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setMounted(true);
        const handleResize = () => {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        };
        handleResize();
        window.addEventListener('resize', handleResize);

        // Click Outside Handler für Dropdown
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            window.removeEventListener('resize', handleResize);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (status === 'sending' || status === 'success') return;

        setStatus('sending');

        // Simulation API Call
        setTimeout(() => {
            setStatus('success');
            setTimeout(() => {
                setStatus('idle');
                setFormData({ email: '', reason: 'feature', message: '' });
            }, 4000);
        }, 2000);
    };

    // Dropdown Optionen
    const reasonOptions = [
        { value: 'feature', label: 'Feature Request // Verbesserung' },
        { value: 'bug', label: 'Bug Report // Fehler' },
        { value: 'enterprise', label: 'Enterprise Inquiry // Lizenz' },
        { value: 'feedback', label: 'General Feedback // Sonstiges' }
    ];

    const currentReasonLabel = reasonOptions.find(r => r.value === formData.reason)?.label;

    if (!mounted) return null;

    return (
        <div className="relative min-h-screen bg-[#0D0D0D] text-white font-mono overflow-x-hidden selection:bg-white/20">
            <style jsx global>{`
                html { overflow-y: auto; overflow-x: hidden; height: auto; }
                body { background-color: #0D0D0D; min-height: 100vh; position: relative; }
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
                    <div className="mt-auto pb-24 flex flex-col gap-4 shrink-0">
                        <Link href="/contact" className="w-full py-4 text-center text-[10px] font-bold uppercase border border-white/5 text-white/40">Contact Support</Link>
                        <Link href="/dashboard" className="w-full py-5 text-center text-[10px] font-bold uppercase bg-white text-black">Open Terminal</Link>
                    </div>
                </div>
            </div>

            {/* --- MAIN CONTENT --- */}
            <main className="relative z-10 pt-32 pb-20 px-6 md:px-8 max-w-6xl mx-auto min-h-[90vh] flex flex-col justify-center">

                {/* HERO TITLE */}
                <div className="text-center space-y-6 mb-20">
                    <div className="inline-flex items-center gap-2 border border-white/10 bg-white/[0.02] px-3 py-1 rounded-full">
                        {/* Animation: White Square Ping (wie Prerelease) */}
                        <div className="relative flex items-center justify-center w-2 h-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-sm bg-white/40 opacity-75"></span>
                            <span className="relative inline-flex rounded-sm h-1.5 w-1.5 bg-white/80"></span>
                        </div>
                        <span className="text-[9px] uppercase tracking-[0.3em] text-white/60">Mission Brief</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tighter uppercase text-white">
                        Establish <span className="text-white/30">Connection</span>
                    </h1>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start">

                    {/* LEFT COLUMN: CONTACT INFO */}
                    <div className="space-y-12 order-2 lg:order-1">

                        <div className="space-y-8">
                            <div className="space-y-2">
                                <h3 className="text-white text-sm font-bold uppercase tracking-widest">Direct Feed</h3>
                                <p className="text-white/40 text-xs leading-relaxed">
                                    Für Sicherheitslücken, Enterprise-Lizenzen oder allgemeine Anfragen. Wir antworten innerhalb von 24h via verschlüsseltem Kanal.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <a href="mailto:contact@pytja.com" className="group flex items-center gap-6 p-4 border border-white/5 bg-[#0A0A0A] hover:bg-white/5 transition-colors">
                                    <div className="w-10 h-10 flex items-center justify-center border border-white/10 bg-white/[0.02] text-white/40 group-hover:text-white group-hover:border-white/30 transition-all">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                                    </div>
                                    <div>
                                        <div className="text-[9px] uppercase tracking-[0.2em] text-white/30 mb-1">Email Protocol</div>
                                        <div className="text-sm font-mono text-white">contact@pytja.com</div>
                                    </div>
                                </a>

                                <a href="https://github.com/pytja" target="_blank" className="group flex items-center gap-6 p-4 border border-white/5 bg-[#0A0A0A] hover:bg-white/5 transition-colors">
                                    <div className="w-10 h-10 flex items-center justify-center border border-white/10 bg-white/[0.02] text-white/40 group-hover:text-white group-hover:border-white/30 transition-all">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                                    </div>
                                    <div>
                                        <div className="text-[9px] uppercase tracking-[0.2em] text-white/30 mb-1">Repository</div>
                                        <div className="text-sm font-mono text-white">github.com/pytja</div>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: THE FORM */}
                    <div className="order-1 lg:order-2">
                        {/* Container ohne dekorative Ecken */}
                        <form onSubmit={handleSubmit} className="space-y-8 bg-[#0A0A0A] p-8 md:p-10 border border-white/10 relative">

                            {/* --- EMAIL INPUT --- */}
                            <div className="space-y-3">
                                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/40">Identification // Email</label>
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    placeholder="user@domain.com"
                                    className="w-full bg-[#050505] border border-white/10 p-4 text-sm text-white placeholder-white/20 focus:border-white/40 focus:outline-none focus:ring-1 focus:ring-white/20 transition-all font-mono"
                                />
                            </div>

                            {/* --- CUSTOM DROPDOWN --- */}
                            <div className="space-y-3 relative" ref={dropdownRef}>
                                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/40">Purpose // Subject</label>

                                <div className="relative">
                                    <button
                                        type="button"
                                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                        className={`w-full bg-[#050505] border border-white/10 p-4 text-sm text-left text-white focus:outline-none focus:ring-1 focus:ring-white/20 transition-all font-mono flex items-center justify-between ${isDropdownOpen ? 'border-white/40' : ''}`}
                                    >
                                        <span>{currentReasonLabel}</span>
                                        <motion.svg
                                            animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                                            className="w-3 h-3 text-white/30"
                                            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"
                                        >
                                            <path d="M6 9l6 6 6-6"/>
                                        </motion.svg>
                                    </button>

                                    <AnimatePresence>
                                        {isDropdownOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                transition={{ duration: 0.15 }}
                                                className="absolute top-full left-0 right-0 mt-1 bg-[#0A0A0A] border border-white/10 z-50 shadow-2xl"
                                            >
                                                {reasonOptions.map((opt) => (
                                                    <button
                                                        key={opt.value}
                                                        type="button"
                                                        onClick={() => {
                                                            setFormData({...formData, reason: opt.value});
                                                            setIsDropdownOpen(false);
                                                        }}
                                                        className={`w-full text-left p-4 text-sm font-mono border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors ${
                                                            formData.reason === opt.value ? 'text-white bg-white/5' : 'text-white/60'
                                                        }`}
                                                    >
                                                        {opt.label}
                                                    </button>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>

                            {/* --- MESSAGE INPUT --- */}
                            <div className="space-y-3">
                                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/40">Payload // Message</label>
                                <textarea
                                    required
                                    value={formData.message}
                                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                                    placeholder="Enter your message trace..."
                                    rows={5}
                                    className="w-full bg-[#050505] border border-white/10 p-4 text-sm text-white placeholder-white/20 focus:border-white/40 focus:outline-none focus:ring-1 focus:ring-white/20 transition-all font-mono resize-none"
                                />
                            </div>

                            {/* --- SUBMIT BUTTON --- */}
                            <button
                                type="submit"
                                disabled={status !== 'idle'}
                                className={`w-full py-5 text-[10px] font-bold uppercase tracking-[0.3em] transition-all relative overflow-hidden group border ${
                                    status === 'success' ? 'bg-green-500 border-green-500 text-black' :
                                        status === 'error' ? 'bg-red-500 border-red-500 text-white' :
                                            'bg-white text-black border-white hover:bg-transparent hover:text-white'
                                }`}
                            >
                                <span className="relative z-10 flex items-center justify-center gap-3">
                                    {status === 'idle' && (
                                        <>
                                            Transmit Data
                                            <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="square" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                                        </>
                                    )}
                                    {status === 'sending' && (
                                        <>
                                            <span className="animate-spin rounded-full h-3 w-3 border-b-2 border-black"></span>
                                            Encrypting & Uploading...
                                        </>
                                    )}
                                    {status === 'success' && (
                                        <>
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="square" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
                                            Uplink Established
                                        </>
                                    )}
                                </span>
                            </button>

                        </form>
                    </div>

                </div>

            </main>
        </div>
    );
}

// --- LOGO COMPONENT ---
function Logo3DP() {
    const pathString = "M 0 0 H 20 V 15 H 5 V 25 H 0 Z M 5 5 V 10 H 15 V 5 Z";
    const Face = ({ z }: { z: number }) => (<> <div className="absolute inset-0 bg-[#0D0D0D]/40 backdrop-blur-sm" style={{ transform: `translateZ(${z}px)`, clipPath: `path('${pathString}')` }} /> <svg className="absolute inset-0 pointer-events-none" width="20" height="25" style={{ transform: `translateZ(${z}px)` }}> <path d={pathString} fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1" fillRule="evenodd" /> </svg> </>);
    const EdgeH = ({ x, y, w }: { x: number, y: number, w: number }) => (<div className="absolute bg-white/5 backdrop-blur-sm border border-white/40" style={{ left: x, top: y, width: w, height: 5, transform: 'translateY(-2.5px) rotateX(90deg)' }} />);
    const EdgeV = ({ x, y, h }: { x: number, y: number, h: number }) => (<div className="absolute bg-white/5 backdrop-blur-sm border border-white/40" style={{ left: x, top: y, width: 5, height: h, transform: 'translateX(-2.5px) rotateY(90deg)' }} />);
    return (<div className="relative w-8 h-8 preserve-3d flex items-center justify-center mr-1"> <style>{`@keyframes logo-float { 0%, 100% { transform: translateY(0px) rotateX(50deg) rotateY(-40deg) rotateZ(-10deg); } 50% { transform: translateY(-4px) rotateX(50deg) rotateY(-40deg) rotateZ(-10deg); } } .animate-logo-float { animation: logo-float 4s ease-in-out infinite; }`}</style> <div className="absolute inset-0 bg-white/20 blur-xl rounded-full" /> <div className="relative preserve-3d animate-logo-float" style={{ width: 20, height: 25 }}> <Face z={2.5} /> <Face z={-2.5} /> <EdgeH x={0} y={0} w={20} /> <EdgeV x={20} y={0} h={15} /> <EdgeH x={5} y={15} w={15} /> <EdgeV x={5} y={15} h={10} /> <EdgeH x={0} y={25} w={5} /> <EdgeV x={0} y={0} h={25} /> <EdgeH x={5} y={5} w={10} /> <EdgeV x={15} y={5} h={5} /> <EdgeH x={5} y={10} w={10} /> <EdgeV x={5} y={5} h={5} /> </div> </div>);
}