"use client"; // WICHTIG: Error Components müssen Client Components sein

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Error({
                                  error,
                                  reset,
                              }: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    const [text, setText] = useState("");

    useEffect(() => {
        // Logging des Fehlers (könnte man an Sentry schicken)
        console.error(error);

        const fullText = `> SYSTEM_CRASH_DETECTED\n> ERROR_CODE: 500_INTERNAL_SERVER_ERROR\n> PROCESS_ID: ${error.digest || 'UNKNOWN'}\n> DIAGNOSTIC: ${error.message}\n> RECOVERY_MODE: ACTIVE...`;

        let i = 0;
        const interval = setInterval(() => {
            setText(fullText.slice(0, i));
            i++;
            if (i > fullText.length) clearInterval(interval);
        }, 20); // Etwas schnellerer Tipp-Effekt für "Panic Mode"

        return () => clearInterval(interval);
    }, [error]);

    return (
        <div className="min-h-screen bg-[#050505] text-white font-mono flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Background Grid & Noise */}
            <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />

            {/* Amber Hazard Blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-600/10 blur-[120px] rounded-full pointer-events-none animate-pulse" />

            <div className="relative z-10 max-w-lg w-full space-y-8 border border-amber-500/20 bg-[#0A0A0A] p-8 md:p-12 shadow-[0_0_50px_rgba(245,158,11,0.1)] backdrop-blur-sm">

                {/* Header */}
                <div className="flex items-center justify-between border-b border-white/5 pb-4">
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-amber-500 animate-[ping_1.5s_infinite]" />
                        <div className="w-3 h-3 rounded-full bg-amber-500/50" />
                        <div className="w-3 h-3 rounded-full bg-amber-500/20" />
                    </div>
                    <span className="text-[10px] uppercase tracking-widest text-amber-500 font-bold">System Failure</span>
                </div>

                {/* Terminal Output */}
                <div className="font-mono text-sm md:text-base leading-relaxed h-40 text-amber-400/80 whitespace-pre-line overflow-hidden">
                    {text}
                    <span className="animate-pulse inline-block w-2 h-4 bg-amber-500 ml-1 align-middle" />
                </div>

                {/* Action Buttons */}
                <div className="pt-4 flex flex-col sm:flex-row gap-4">
                    <button
                        onClick={reset}
                        className="flex-1 py-3 text-center bg-amber-500 text-black text-xs font-bold uppercase tracking-widest hover:bg-amber-400 transition-colors shadow-[0_0_20px_rgba(245,158,11,0.3)]"
                    >
                        Reboot System
                    </button>
                    <Link
                        href="/contact"
                        className="flex-1 py-3 text-center border border-white/10 text-white/40 text-xs font-bold uppercase tracking-widest hover:text-white hover:border-white transition-colors"
                    >
                        Contact Admin
                    </Link>
                </div>
            </div>

            {/* Background Text Overlay */}
            <div className="absolute bottom-10 left-0 w-full text-center pointer-events-none select-none">
                <h1 className="text-[120px] md:text-[200px] font-black text-white/[0.02] leading-none tracking-tighter">500</h1>
            </div>
        </div>
    );
}