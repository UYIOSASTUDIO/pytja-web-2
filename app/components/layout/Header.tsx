"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { createPortal } from 'react-dom';
import Logo3DP from '@/public/SVG/pytja_logo.svg';

export default function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    // States für Header-Sichtbarkeit und Theme (Light/Dark)
    const [isHeaderVisible, setIsHeaderVisible] = useState(true);
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Refs für Scroll-Logik
    const lastScrollY = useRef(0);
    const scrollTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

    const pathname = usePathname();

    const navLinks = [
        { label: 'About', href: '/about' },
        { label: 'Modules', href: '/modules' },
        { label: 'Manual', href: '/manual' },
        { label: 'Code', href: 'https://github.com/pytja/pytja' },
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

    // --- SCROLL & THEME LOGIK ---
    useEffect(() => {
        const handleScroll = () => {
            if (isMobileMenuOpen) {
                setIsHeaderVisible(true);
                return;
            }

            const currentScrollY = window.scrollY;

            // 1. Sichtbarkeits-Logik
            if (Math.abs(currentScrollY - lastScrollY.current) > 2) {
                if (currentScrollY < 50) {
                    setIsHeaderVisible(true);
                } else if (currentScrollY > lastScrollY.current) {
                    setIsHeaderVisible(false);
                } else {
                    setIsHeaderVisible(true);
                }
                lastScrollY.current = currentScrollY;
            }

            if (scrollTimeout.current) {
                clearTimeout(scrollTimeout.current);
            }

            scrollTimeout.current = setTimeout(() => {
                setIsHeaderVisible(true);
            }, 100);

            // 2. THEME-SWITCH LOGIK
            const headerTriggerY = 40;
            const darkSections = document.querySelectorAll('[data-theme="dark"]');
            let shouldBeDark = false;

            darkSections.forEach(section => {
                const rect = section.getBoundingClientRect();
                if (rect.top <= headerTriggerY && rect.bottom >= headerTriggerY) {
                    shouldBeDark = true;
                }
            });

            setIsDarkMode(shouldBeDark);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        // HIER GEÄNDERT: Wir geben dem Browser 50ms Zeit, die Seite aufzubauen,
        // bevor wir messen. Das löst das Neuladen-Problem!
        const initialCheckTimeout = setTimeout(() => {
            handleScroll();
        }, 50);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearTimeout(initialCheckTimeout);
            if (scrollTimeout.current) {
                clearTimeout(scrollTimeout.current);
            }
        };
        // HIER GEÄNDERT: pathname als Dependency hinzugefügt,
        // damit der Theme-Check bei JEDEM Seitenwechsel neu auslöst.
    }, [isMobileMenuOpen, pathname]);

    if (!mounted) return null;

    // --- DYNAMISCHE STYLES FÜR DEN HEADER ---
    // Smooth Transitions für absolut alles im Header
    const baseBlockStyle = "backdrop-blur-md rounded-md shadow-sm h-12 flex items-center transition-colors duration-500 ease-in-out";

    const themeClasses = isDarkMode
        ? "bg-[#0a0a0a]/80 border-white/10"
        : "bg-white/80 border-black/10";

    const textActive = isDarkMode ? "text-white" : "text-black";
    const textInactive = isDarkMode ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-black";

    const blockStyle = `${baseBlockStyle} border ${themeClasses}`;

    const mobileMenu = (
        <div
            className={`fixed inset-x-4 z-[999999] lg:hidden transition-all duration-500 ease-in-out flex flex-col transform-gpu ${isMobileMenuOpen ? 'opacity-100 translate-y-0 pointer-events-auto visible' : 'opacity-0 -translate-y-4 pointer-events-none invisible'}`}
            style={{ top: '80px', height: 'calc(100vh - 100px)' }}
        >
            <div className={`border rounded-xl shadow-2xl flex flex-col h-full overflow-hidden transition-colors duration-500 transform-gpu ${
                isDarkMode ? 'bg-black border-white/10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)]' : 'bg-white border-black/10'
            }`}>
                <div className="relative z-10 flex flex-col h-full pt-8 px-6 pb-6">

                    <nav className="flex flex-col gap-6 mt-2">
                        <Link
                            href="/"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={`text-2xl font-bold tracking-tight flex items-baseline gap-4 transition-colors ${
                                pathname === '/'
                                    ? (isDarkMode ? 'text-white' : 'text-black')
                                    : (isDarkMode ? 'text-white/40 hover:text-white' : 'text-black/50 hover:text-black')
                            }`}
                        >
                            <span className={`text-[10px] font-mono ${isDarkMode ? 'text-white/20' : 'text-black/20'}`}>01</span>
                            Home
                        </Link>

                        {navLinks.map((item, i) => {
                            const isActive = pathname.startsWith(item.href);
                            return (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`text-2xl font-bold tracking-tight flex items-baseline gap-4 transition-colors ${
                                        isActive
                                            ? (isDarkMode ? 'text-white' : 'text-black')
                                            : (isDarkMode ? 'text-white/40 hover:text-white' : 'text-black/50 hover:text-black')
                                    }`}
                                >
                                    <span className={`text-[10px] font-mono ${isDarkMode ? 'text-white/20' : 'text-black/20'}`}>0{i + 2}</span>
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="mt-auto flex flex-col gap-6">
                        <div className="grid grid-cols-2 gap-3">
                            <Link
                                href="/contact"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`py-3 text-center text-[10px] font-bold uppercase border transition-all rounded-md ${
                                    isDarkMode
                                        ? 'border-white/10 text-white/60 hover:text-white hover:border-white/30'
                                        : 'border-black/10 text-black/60 hover:text-black hover:border-black/30'
                                }`}
                            >
                                Support
                            </Link>
                            <Link
                                href="/download"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`py-3 text-center text-[10px] font-bold uppercase transition-colors rounded-md ${
                                    isDarkMode
                                        ? 'bg-white text-black hover:bg-gray-200'
                                        : 'bg-black text-white hover:bg-gray-800'
                                }`}
                            >
                                Download
                            </Link>
                        </div>

                        <div className={`pt-4 border-t flex items-center justify-between text-[9px] font-mono uppercase tracking-widest transition-colors ${
                            isDarkMode ? 'border-white/10 text-white/40' : 'border-black/10 text-black/40'
                        }`}>
                            <span className="truncate pr-4">Op. Elias Schmolke</span>
                            <div className="flex gap-4 shrink-0">
                                <a href="https://github.com/pytja" target="_blank" rel="noopener noreferrer" className={isDarkMode ? 'hover:text-white' : 'hover:text-black'}>
                                    GitHub
                                </a>
                                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className={isDarkMode ? 'hover:text-white' : 'hover:text-black'}>
                                    X/Twitter
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <>
            <header
                className={`fixed top-4 w-full z-[10000000] px-4 md:px-6 pointer-events-none transition-transform duration-500 ease-in-out ${
                    isHeaderVisible ? 'translate-y-0' : '-translate-y-[150%]'
                }`}
            >
                <div className="max-w-7xl mx-auto w-full flex items-center justify-between">

                    <div className="flex items-center gap-2 pointer-events-auto">
                        <Link
                            href="/"
                            className={`${blockStyle} px-4 md:px-6 transition-colors duration-500 cursor-pointer flex items-center justify-center`}
                        >
                            <img
                                src="/SVG/pytja_logo_text.svg"
                                alt="Pytja Logo"
                                className={`h-5 md:h-5 w-auto select-none pointer-events-none transition-all duration-500 ease-in-out ${
                                    isDarkMode ? 'invert brightness-100' : 'invert-0'
                                }`}
                            />
                        </Link>

                        {/* HIER GEÄNDERT: px-6 wieder manuell hinzugefügt, da wir es oben aus dem blockStyle entfernt haben */}
                        <nav className={`hidden lg:flex ${blockStyle} px-6 gap-8 text-[10px] tracking-[0.3em] font-bold uppercase`}>
                            {navLinks.map((link) => {
                                const isActive = pathname.startsWith(link.href);
                                return (
                                    <Link
                                        key={link.label}
                                        href={link.href}
                                        className={`transition-colors duration-500 ${isActive ? textActive : textInactive}`}
                                    >
                                        {link.label}
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>

                    <div className="flex items-center gap-2 pointer-events-auto">
                        <div className={`hidden md:flex ${blockStyle} px-4 md:px-6 gap-6`}>
                            <Link
                                href="/contact"
                                className={`text-[10px] font-bold transition-colors duration-500 uppercase tracking-widest ${textInactive}`}
                            >
                                Contact
                            </Link>
                            <Link
                                href="https://github.com/pytja/core"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`text-[10px] font-bold transition-colors duration-500 uppercase tracking-widest ${textInactive}`}
                            >
                                GitHub
                            </Link>
                            <Link
                                href="/download"
                                className={`border px-4 py-1.5 rounded-sm text-[10px] font-bold transition-all duration-500 uppercase tracking-widest ${
                                    isDarkMode
                                        ? 'border-white/20 bg-white/[0.05] text-white hover:border-white/40'
                                        : 'border-black/10 bg-black/[0.03] text-black hover:border-black/30'
                                }`}
                            >
                                Download
                            </Link>
                        </div>

                        {/* Hamburger Button für Mobile (passt sich ebenfalls dem Theme an) */}
                        <button
                            className={`lg:hidden flex flex-col justify-center items-center w-12 h-12 backdrop-blur-md border rounded-md shadow-sm outline-none transition-colors duration-500 ease-in-out ${themeClasses}`}
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            <div className={`h-[1.5px] absolute w-5 transition-all duration-500 ease-in-out ${isDarkMode ? 'bg-white' : 'bg-black'} ${isMobileMenuOpen ? 'rotate-45 translate-y-0' : '-translate-y-1'}`} />
                            <div className={`h-[1.5px] absolute w-5 transition-all duration-500 ease-in-out ${isDarkMode ? 'bg-white' : 'bg-black'} ${isMobileMenuOpen ? '-rotate-45 translate-y-0' : 'translate-y-1'}`} />
                        </button>
                    </div>

                </div>
            </header>

            {mounted ? createPortal(mobileMenu, document.body) : null}
        </>
    );
}