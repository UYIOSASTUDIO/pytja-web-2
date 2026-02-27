"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { createPortal } from 'react-dom';
import Logo3DP from '../ui/Logo3DP';

export default function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const pathname = usePathname();

    // UPDATE: "About" zur Hauptnavigation hinzugefügt
    const navLinks = [
        { label: 'About', href: '/about' },
        { label: 'Modules', href: '/modules' },
        { label: 'Manual', href: '/manual' },
        { label: 'Code', href: '/code' },
        { label: 'Changelog', href: '/changelog' },
    ];

    useEffect(() => {
        setMounted(true);
        const handleResize = () => {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isMobileMenuOpen]);

    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    if (!mounted) return null;

    // --- MOBILE MENU (Kompakt & Professionell) ---
    const mobileMenu = (
        <div
            className={`fixed inset-0 z-[999999] bg-[#050505] lg:hidden transition-all duration-500 ease-in-out flex flex-col ${isMobileMenuOpen ? 'opacity-100 translate-y-0 pointer-events-auto visible' : 'opacity-0 -translate-y-4 pointer-events-none invisible'}`}
            style={{ top: '64px', height: 'calc(100vh - 64px)' }}
        >
            <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none z-0" />

            {/* Flex-Container mit 'justify-between', damit oben die Links und unten der Footer kleben, OHNE zu scrollen */}
            <div className="relative z-10 flex flex-col h-full pt-8 px-8 pb-8">

                {/* --- Haupt-Navigation --- */}
                {/* gap-5 statt gap-8, und text-2xl statt text-3xl für kompaktere Optik */}
                <nav className="flex flex-col gap-5 mt-2">
                    <Link
                        href="/"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`text-2xl font-bold tracking-tight flex items-baseline gap-4 transition-colors ${pathname === '/' ? 'text-white' : 'text-white/40 hover:text-white'}`}
                    >
                        <span className="text-[10px] font-mono text-white/10">01</span>
                        Home
                    </Link>

                    {navLinks.map((item, i) => {
                        const isActive = pathname.startsWith(item.href);
                        return (
                            <Link
                                key={item.label}
                                href={item.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`text-2xl font-bold tracking-tight flex items-baseline gap-4 transition-colors ${isActive ? 'text-white' : 'text-white/40 hover:text-white'}`}
                            >
                                <span className="text-[10px] font-mono text-white/10">0{i + 2}</span>
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                {/* --- Bottom Section (Actions & Socials) --- */}
                <div className="mt-auto flex flex-col gap-6">

                    {/* Buttons nebeneinander (Grid) spart extrem viel Platz */}
                    <div className="grid grid-cols-2 gap-3">
                        <Link
                            href="/contact"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="py-3 text-center text-[10px] font-bold uppercase border border-white/10 text-white/60 hover:text-white hover:border-white/30 transition-all rounded-sm"
                        >
                            Support
                        </Link>
                        <Link
                            href="/download"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="py-3 text-center text-[10px] font-bold uppercase bg-white text-black hover:bg-gray-200 transition-colors rounded-sm"
                        >
                            Download
                        </Link>
                    </div>

                    {/* Mini-Footer für Mobile */}
                    <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[9px] font-mono text-white/30 uppercase tracking-widest">
                        <span className="truncate pr-4">Op. Elias Schmolke</span>
                        <div className="flex gap-4 shrink-0">
                            <a href="https://github.com/pytja" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                                GitHub
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                                X/Twitter
                            </a>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );

    return (
        <>
            <header className="fixed top-0 w-full z-[10000000] border-b border-white/5 bg-[#0D0D0D]/80 backdrop-blur-xl h-16 md:h-20 flex items-center">
                <div className="max-w-7xl mx-auto px-6 md:px-8 w-full flex items-center justify-between relative">

                    {/* LOGO */}
                    <Link href="/" className="flex items-center gap-3 relative z-[160]">
                        <Logo3DP />
                    </Link>

                    {/* DESKTOP NAV (Mittig) - Lücken etwas verkleinert von gap-10 auf gap-8, damit alles gut passt */}
                    <nav className="hidden lg:flex items-center gap-8 text-[10px] tracking-[0.3em] font-bold uppercase">
                        {navLinks.map((link) => {
                            const isActive = pathname.startsWith(link.href);
                            return (
                                <Link
                                    key={link.label}
                                    href={link.href}
                                    className={`transition-colors ${isActive ? 'text-white' : 'text-gray-500 hover:text-white'}`}
                                >
                                    {link.label}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* DESKTOP ACTIONS (Rechts) - Contact hinzugefügt */}
                    <div className="hidden md:flex items-center gap-6 relative z-[160]">
                        <Link
                            href="/contact"
                            className="text-[10px] text-gray-400 font-bold hover:text-white transition-colors uppercase tracking-widest"
                        >
                            Contact
                        </Link>
                        <Link
                            href="https://github.com/pytja/core"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[10px] text-gray-400 font-bold hover:text-white transition-colors uppercase tracking-widest"
                        >
                            GitHub
                        </Link>
                        <Link
                            href="/download"
                            className="border border-white/20 bg-white/[0.03] text-white px-6 py-2.5 text-[10px] font-bold hover:border-white/50 transition-all uppercase tracking-widest"
                        >
                            Download
                        </Link>
                    </div>

                    {/* MOBILE HAMBURGER */}
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