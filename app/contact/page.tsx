"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from "next/link";

export default function ContactPage() {
    const [mounted, setMounted] = useState(false);

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
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (status === 'sending' || status === 'success') return;

        setStatus('sending');

        // 1. Namen vor dem @-Zeichen extrahieren
        const userName = formData.email.split('@')[0];

        // 2. Den korrekten Label-Text für den Betreff ermitteln
        const options: Record<string, string> = {
            'feature': 'Feature Request // Architecture',
            'bug': 'Bug Report // Security',
            'collaboration': 'Collaboration Request // Collaboration',
            'feedback': 'General Feedback // System'
        };
        const selectedLabel = options[formData.reason] || 'Contact Request';

        // 3. E-Mail Inhalte URL-sicher encodieren
        const subject = encodeURIComponent(`${selectedLabel} by ${userName}`);
        const body = encodeURIComponent(formData.message);

        // Kurze Verzögerung für den "Encrypting..." Terminal-Effekt
        setTimeout(() => {
            // Öffnet das Mail-Programm des Nutzers mit den fertigen Daten
            window.location.href = `mailto:elias.schmolke@gmail.com?subject=${subject}&body=${body}`;

            setStatus('success');
            setTimeout(() => {
                setStatus('idle');
                setFormData({ email: '', reason: 'feature', message: '' });
            }, 4000);
        }, 800);
    };

    const reasonOptions = [
        { value: 'feature', label: 'Feature Request // Architecture' },
        { value: 'bug', label: 'Bug Report // Security' },
        { value: 'collaboration', label: 'Collaboration Request // Collaboration' },
        { value: 'feedback', label: 'General Feedback // System' }
    ];

    const currentReasonLabel = reasonOptions.find(r => r.value === formData.reason)?.label;

    if (!mounted) return null;

    return (
        <div className="relative min-h-screen bg-white font-sans selection:bg-black selection:text-white">
            <style jsx global>{`
                html { overflow-y: auto; overflow-x: hidden; height: auto; }
                body { background-color: #ffffff; min-height: 100vh; position: relative; }
            `}</style>

            {/* HIER GEÄNDERT: pt-32 pb-16 für kompakteren Abstand */}
            <main className="relative z-10 pt-32 pb-16 md:pt-40 md:pb-24">

                {/* --- COMPACT HERO HEADER --- */}
                <div className="w-full">
                    <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24">
                        {/* HIER GEÄNDERT: py-10 md:py-16 statt py-24 für einen strafferen Look */}
                        <div className="py-10 md:py-8 md:px-8 lg:px-12 flex flex-col gap-6">

                            <h1 className="text-4xl md:text-5xl lg:text-[56px] font-medium tracking-tight text-black leading-[1.1] text-balance">
                                Establish Connection
                            </h1>
                            <p className="text-[15px] md:text-[16px] text-gray-500 max-w-2xl font-light leading-relaxed">
                                Submit your payload directly to the core architecture team. For security disclosures, enterprise support, or technical collaboration.
                            </p>
                        </div>
                    </div>
                </div>

                {/* --- GRID SPLIT (Architecture Design) --- */}
                <section className="w-full border-y border-black/10 relative z-20">
                    <div className="grid grid-cols-1 lg:grid-cols-10 divide-y lg:divide-y-0 lg:divide-x divide-black/10 max-w-[1600px] mx-auto px-0 md:px-12 lg:px-24">

                        {/* LEFT COLUMN: 4 Columns (Intro & Links) */}
                        <div className="lg:col-span-4 p-6 md:p-8 lg:p-12 flex flex-col bg-black/[0.01]">

                            {/* Intro Text */}
                            <div className="pb-6 md:pb-12">
                                <p className="text-[14px] md:text-[15px] text-gray-500 leading-relaxed font-light mb-8">
                                    We aim to respond within 24 hours. All communications remain strictly confidential and governed by our privacy terms.
                                </p>

                                <Link href="/about" className="group inline-flex items-center gap-2 text-[13px] font-medium text-black transition-all w-fit border-b border-black/20 pb-0.5 hover:text-gray-600 hover:border-gray-600">
                                    How we store your data
                                    <span className="transform transition-transform duration-300 group-hover:translate-x-1">→</span>
                                </Link>

                            </div>

                            {/* Network Links (Mit der Full-Width Trennlinie) */}
                            <div className="pt-8 border-t border-black/10 space-y-4 -ml-[50vw] pl-[50vw] -mr-6 md:-mr-8 lg:-mr-12 pr-6 md:pr-8 lg:pr-12">
                                {/* GitHub */}
                                <a href="https://github.com/uyiosastudio" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 p-4 border border-black/10 bg-white hover:border-black/10 hover:shadow-md transition-all rounded-lg">
                                    <div className="w-10 h-10 flex items-center justify-center border border-black/10 bg-black/[0.02] text-black group-hover:bg-black group-hover:text-white transition-colors rounded-md">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                                    </div>
                                    <div>
                                        <div className="text-[10px] uppercase tracking-[0.1em] text-gray-400 font-bold mb-0.5">Source Code & Issues</div>
                                        <div className="text-[13px] font-mono text-black">github.com/uyiosastudio</div>
                                    </div>
                                </a>

                                {/* LinkedIn */}
                                <a href="https://linkedin.com/in/dein-profil" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 p-4 border border-black/10 bg-white hover:border-black/10 hover:shadow-md transition-all rounded-lg">
                                    <div className="w-10 h-10 flex items-center justify-center border border-black/10 bg-black/[0.02] text-black group-hover:bg-[#0A66C2] group-hover:border-[#0A66C2] group-hover:text-white transition-colors rounded-md">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                                    </div>
                                    <div>
                                        <div className="text-[10px] uppercase tracking-[0.1em] text-gray-400 font-bold mb-0.5">Architecture & Business</div>
                                        <div className="text-[13px] font-mono text-black">Elias Schmolke</div>
                                    </div>
                                </a>

                                {/* X / Twitter */}
                                <a href="https://x.com/dein-handle" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 p-4 border border-black/10 bg-white hover:border-black/10 hover:shadow-md transition-all rounded-lg">
                                    <div className="w-10 h-10 flex items-center justify-center border border-black/10 bg-black/[0.02] text-black group-hover:bg-black group-hover:text-white transition-colors rounded-md">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                                    </div>
                                    <div>
                                        <div className="text-[10px] uppercase tracking-[0.1em] text-gray-400 font-bold mb-0.5">Announcements & Updates</div>
                                        <div className="text-[13px] font-mono text-black">@pytja_core</div>
                                    </div>
                                </a>
                            </div>
                        </div>

                        {/* RIGHT COLUMN: 6 Columns (The Dark Form Box) */}
                        <div className="lg:col-span-6 p-6 md:p-8 lg:p-12 bg-white flex items-center justify-center">

                            {/* HIER GEÄNDERT: Das Formular ist jetzt ein massiver schwarzer Block */}
                            <form onSubmit={handleSubmit} className="w-full bg-[#0a0a0a] rounded-2xl p-6 md:p-10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border border-black/5 space-y-8">

                                {/* Formular Header (Optional, stärkt den Terminal-Look) */}
                                <div className="border-b border-white/10 pb-6 mb-2">
                                    <h3 className="text-white text-xl font-medium tracking-tight">Direct Interface</h3>
                                    <p className="text-gray-400 text-sm font-light mt-1">All transmissions are encrypted.</p>
                                </div>

                                {/* --- EMAIL INPUT --- */}
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400">
                                        Identification // Email
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                                        placeholder="user@domain.com"
                                        className="w-full bg-[#111] border border-white/10 p-4 text-[14px] text-white placeholder-gray-600 focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/30 transition-all font-mono rounded-md"
                                    />
                                </div>

                                {/* --- CUSTOM DROPDOWN --- */}
                                <div className="space-y-2 relative z-50">
                                    <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400">
                                        Purpose // Subject
                                    </label>

                                    <div className="relative" ref={dropdownRef}>
                                        <button
                                            type="button"
                                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                            className={`w-full bg-[#111] border border-white/10 p-4 text-[14px] text-left focus:outline-none focus:ring-1 focus:ring-white/30 transition-all font-mono rounded-md flex items-center justify-between ${
                                                isDropdownOpen ? 'border-white/30 text-white shadow-sm' : 'text-white hover:border-white/20'
                                            }`}
                                        >
                                            <span>{currentReasonLabel}</span>
                                            <motion.svg
                                                animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                                                className="w-4 h-4 text-gray-500"
                                                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"
                                            >
                                                <path d="M6 9l6 6 6-6"/>
                                            </motion.svg>
                                        </button>

                                        <AnimatePresence>
                                            {isDropdownOpen && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: -5 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -5 }}
                                                    transition={{ duration: 0.15 }}
                                                    className="absolute top-full left-0 right-0 mt-2 bg-[#111] border border-white/10 rounded-md shadow-2xl overflow-hidden"
                                                >
                                                    {reasonOptions.map((opt) => (
                                                        <button
                                                            key={opt.value}
                                                            type="button"
                                                            onClick={() => {
                                                                setFormData({...formData, reason: opt.value});
                                                                setIsDropdownOpen(false);
                                                            }}
                                                            className={`w-full text-left p-4 text-[13px] font-mono border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors ${
                                                                formData.reason === opt.value ? 'text-white font-bold bg-white/5' : 'text-gray-400'
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
                                <div className="space-y-2 relative z-0">
                                    <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400">
                                        Payload // Message
                                    </label>
                                    <textarea
                                        required
                                        value={formData.message}
                                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                                        placeholder="Enter your message trace..."
                                        rows={6}
                                        className="w-full bg-[#111] border border-white/10 p-4 text-[14px] text-white placeholder-gray-600 focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/30 transition-all font-mono resize-none rounded-md"
                                    />
                                </div>

                                {/* --- SUBMIT BUTTON --- */}
                                <button
                                    type="submit"
                                    disabled={status !== 'idle'}
                                    className={`w-full py-5 text-[10px] font-bold uppercase tracking-[0.3em] transition-all relative overflow-hidden group rounded-md border mt-4 ${
                                        status === 'success' ? 'bg-emerald-500 border-emerald-500 text-black' :
                                            status === 'error' ? 'bg-red-500 border-red-500 text-white' :
                                                'bg-white text-black border-white hover:bg-gray-200'
                                    }`}
                                >
                                    <span className="relative z-10 flex items-center justify-center gap-3">
                                        {status === 'idle' && (
                                            <>
                                                Transmit Data
                                                <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                    <path strokeLinecap="square" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                                                </svg>
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
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                    <path strokeLinecap="square" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                                                </svg>
                                                Uplink Established
                                            </>
                                        )}
                                    </span>
                                </button>
                            </form>
                        </div>

                    </div>
                </section>

            </main>
        </div>
    );
}