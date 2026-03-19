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
        <div className="min-h-screen bg-[#FAFAFA] text-black font-sans flex flex-col items-center justify-center p-4 relative overflow-hidden z-[999999]">

            {/* Background Grid - Blueprint Style */}
            <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-70 pointer-events-none" />

            <div className="relative z-10 max-w-lg w-full space-y-8 border border-black/10 bg-white p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl">

                {/* Header */}
                <div className="flex items-center justify-between border-b border-black/5 pb-4">
                    <div className="flex items-center gap-2">
                        {/* Rotes Blinken (Original Pytja Style) */}
                        <div className="relative flex items-center justify-center w-2.5 h-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                        </div>

                        {/* Statische Punkte */}
                        <div className="w-2.5 h-2.5 rounded-full bg-black/10" />
                        <div className="w-2.5 h-2.5 rounded-full bg-black/10" />
                    </div>
                    <span className="text-[10px] uppercase tracking-widest text-red-600 font-bold font-mono">Fatal Error</span>
                </div>

                {/* Terminal Output */}
                <div className="font-mono text-sm md:text-base leading-relaxed h-32 text-gray-600 whitespace-pre-line">
                    {text}
                    <span className="animate-pulse inline-block w-2 h-4 bg-red-500 ml-1 align-middle" />
                </div>

                {/* Action Buttons */}
                <div className="pt-4 flex flex-col sm:flex-row gap-3">
                    <Link
                        href="/"
                        className="flex-1 py-3 text-center bg-black text-white text-[11px] font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors rounded-md shadow-sm"
                    >
                        Return to Root
                    </Link>
                    <Link
                        href="/contact"
                        className="flex-1 py-3 text-center border border-black/10 bg-white text-gray-500 text-[11px] font-bold uppercase tracking-widest hover:text-black hover:border-black/30 transition-all rounded-md"
                    >
                        Report Issue
                    </Link>
                </div>
            </div>

            {/* Background Text Overlay */}
            <div className="absolute bottom-10 left-0 w-full text-center pointer-events-none select-none">
                <h1 className="text-[120px] md:text-[200px] font-black text-black/[0.03] leading-none tracking-tighter">404</h1>
            </div>
        </div>
    );
}