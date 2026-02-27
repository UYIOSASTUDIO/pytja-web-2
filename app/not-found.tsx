"use client";
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function NotFound() {
    const [text, setText] = useState("");
    const fullText = "> ERROR: 404_NOT_FOUND\n> TARGET_URI: UNREACHABLE\n> SYSTEM_STATUS: HALTED\n> INITIATING_RECOVERY...";

    // Typewriter Effect
    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            setText(fullText.slice(0, i));
            i++;
            if (i > fullText.length) clearInterval(interval);
        }, 30);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-[#050505] text-white font-mono flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Background Grid & Noise */}
            <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />

            {/* Red Glitch Blob (Optional) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-600/10 blur-[100px] rounded-full pointer-events-none animate-pulse" />

            <div className="relative z-10 max-w-lg w-full space-y-8 border border-red-500/20 bg-[#0A0A0A] p-8 md:p-12 shadow-2xl backdrop-blur-sm">

                {/* Header */}
                <div className="flex items-center justify-between border-b border-white/5 pb-4">
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                        <div className="w-3 h-3 rounded-full bg-white/10" />
                        <div className="w-3 h-3 rounded-full bg-white/10" />
                    </div>
                    <span className="text-[10px] uppercase tracking-widest text-red-500 font-bold">Fatal Error</span>
                </div>

                {/* Terminal Output */}
                <div className="font-mono text-sm md:text-base leading-relaxed h-32 text-red-400/80 whitespace-pre-line">
                    {text}
                    <span className="animate-pulse inline-block w-2 h-4 bg-red-500 ml-1 align-middle" />
                </div>

                {/* Action Buttons */}
                <div className="pt-4 flex flex-col sm:flex-row gap-4">
                    <Link
                        href="/"
                        className="flex-1 py-3 text-center bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors"
                    >
                        Return to Root
                    </Link>
                    <Link
                        href="/contact"
                        className="flex-1 py-3 text-center border border-white/10 text-white/40 text-xs font-bold uppercase tracking-widest hover:text-white hover:border-white transition-colors"
                    >
                        Report Issue
                    </Link>
                </div>
            </div>

            {/* Background Text Overlay */}
            <div className="absolute bottom-10 left-0 w-full text-center pointer-events-none select-none">
                <h1 className="text-[120px] md:text-[200px] font-black text-white/[0.02] leading-none tracking-tighter">404</h1>
            </div>
        </div>
    );
}