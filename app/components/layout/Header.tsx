"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Damit wir wissen, wo wir sind
import { createPortal } from 'react-dom';
import Logo3DP from '../ui/Logo3DP';

export default function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        setMounted(true);
        // Mobile Viewport Height Fix
        const handleResize = () => {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // --- SCROLL LOCK FIX ---
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        // Cleanup beim Unmount
        return () => { document.body.style.overflow = ''; };
    }, [isMobileMenuOpen]);

    // Menu schließen, wenn sich die Seite ändert
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    if (!mounted) return null;

    // Mobile Menu Portal Content
    const mobileMenu = (
        <div
            className={`fixed inset-0 z-[9999] bg-[#050505] lg:hidden transition-all duration-500 ease-in-out flex flex-col ${isMobileMenuOpen ? 'opacity-100 translate-y-0 pointer-events-auto visible' : 'opacity-0 -translate-y-4 pointer-events-none invisible'}`}
            style={{ top: '64px', height: 'calc(100vh - 64px)' }} // Exakt unter Header
        >
            <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none z-0" />
            <div className="relative z-10 flex flex-col h-full pt-10 px-10 gap-12 overflow-y-auto pb-safe">
                <nav className="flex flex-col gap-8 shrink-0">
                    {['Home', 'Architecture', 'Modularity', 'Stats'].map((item, i) => (
                        <Link
                            key={item}
                            href={`/#${item.toLowerCase()}`}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="text-3xl font-bold tracking-tighter text-white/40 hover:text-white flex items-baseline gap-4"
                        >
                            <span className="text-[10px] font-mono text-white/10">0{i+1}</span>
                            {item}
                        </Link>
                    ))}
                </nav>
                <div className="mt-auto pb-12 flex flex-col gap-4">
                    <Link href="/contact" className="w-full py-4 text-center text-[10px] font-bold uppercase border border-white/5 text-white/40">Contact Support</Link>
                    <Link href="/dashboard" className="w-full py-5 text-center text-[10px] font-bold uppercase bg-white text-black">Open Terminal</Link>
                </div>
            </div>
        </div>
    );

    return (
        <>
            <header className="fixed top-0 w-full z-[150] border-b border-white/5 bg-[#0D0D0D]/80 backdrop-blur-xl h-16 md:h-20 flex items-center">
                <div className="max-w-7xl mx-auto px-6 md:px-8 w-full flex items-center justify-between relative">
                    <Link href="/" className="flex items-center gap-3 relative z-[160]">
                        <Logo3DP />
                    </Link>
                    <nav className="hidden lg:flex items-center gap-10 text-[10px] tracking-[0.3em] text-gray-500 font-bold uppercase">
                        <Link href="/#home" className="hover:text-white transition-colors">Home</Link>
                        <Link href="/#architecture" className="hover:text-white transition-colors">Arch</Link>
                        <Link href="/#modularity" className="hover:text-white transition-colors">Modules</Link>
                        <Link href="/#stats" className="hover:text-white transition-colors">Telemetry</Link>
                    </nav>
                    <div className="hidden md:flex items-center gap-4">
                        <Link href="/contact" className="text-[10px] text-gray-400 font-bold hover:text-white transition-colors uppercase tracking-widest px-4">Contact</Link>
                        <Link href="/dashboard" className="border border-white/20 bg-white/[0.03] text-white px-6 py-2.5 text-[10px] font-bold hover:border-white/50 transition-all uppercase tracking-widest">Terminal</Link>
                    </div>
                    <button className="lg:hidden flex flex-col justify-center items-center w-10 h-10 relative z-[160] outline-none" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                        <div className={`h-[1px] bg-white absolute w-6 transition-all duration-500 ease-in-out ${isMobileMenuOpen ? 'rotate-45 translate-y-0' : '-translate-y-1'}`} />
                        <div className={`h-[1px] bg-white absolute w-6 transition-all duration-500 ease-in-out ${isMobileMenuOpen ? '-rotate-45 translate-y-0' : 'translate-y-1'}`} />
                    </button>
                </div>
            </header>

            {/* Render Mobile Menu in Body via Portal */}
            {mounted ? createPortal(mobileMenu, document.body) : null}
        </>
    );
}