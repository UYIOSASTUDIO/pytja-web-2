"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { changelogData, ChangeType } from '@/lib/changelog';

export default function ChangelogPage() {
    const [mounted, setMounted] = useState(false);
    const [filter, setFilter] = useState<'all' | ChangeType>('all');
    const filterRef = useRef<HTMLDivElement>(null);
    const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);

    useEffect(() => {
        setMounted(true);
        const handleClickOutside = (event: MouseEvent) => {
            if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
                setIsFilterDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    if (!mounted) return null;

    const filteredData = filter === 'all'
        ? changelogData
        : changelogData.filter(item => item.type === filter);

    const filterOptions: { id: 'all' | ChangeType, label: string }[] = [
        { id: 'all', label: 'All Updates' },
        { id: 'security', label: 'Security' },
        { id: 'feature', label: 'Features' },
        { id: 'fix', label: 'Fixes' },
        { id: 'core', label: 'Core' }
    ];

    const currentFilterLabel = filterOptions.find(f => f.id === filter)?.label || 'All Updates';

    return (
        <div className="relative min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white overflow-x-hidden">
            <style jsx global>{`
                html { overflow-y: auto; overflow-x: hidden; height: auto; }
                body { background-color: #ffffff; min-height: 100vh; position: relative; }
            `}</style>

            <main className="relative z-10 pt-32 md:pt-40">

                {/* --- HERO HEADER --- */}
                <div className="w-full">
                    <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24">
                        <div className="py-16 md:py-8 md:px-8 lg:px-12">

                            <h1 className="text-4xl md:text-5xl lg:text-[56px] font-medium tracking-tight text-black mb-6 leading-[1.1]">
                                View the Development
                            </h1>
                            <p className="text-[15px] md:text-[16px] text-gray-500 max-w-2xl font-light leading-relaxed">
                                Track the evolution of the Pytja core engine. This ledger contains all major architectural shifts, security patches, and feature additions.
                            </p>
                        </div>
                    </div>
                </div>

                {/* --- STATIC FILTER BAR --- */}
                <section className="w-full border-y border-black/10 bg-white relative z-30 mt-8">
                    <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24 py-6 md:py-8 flex justify-center items-center">

                        {/* Mobile Dropdown */}
                        <div className="md:hidden w-full max-w-sm relative" ref={filterRef}>
                            <div className="bg-white border border-black/10 rounded-lg shadow-sm overflow-hidden transition-all duration-300 absolute w-full top-0 left-0 z-50">
                                <button
                                    onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
                                    className={`w-full flex items-center justify-between px-6 py-4 text-black text-[10px] font-bold uppercase tracking-widest transition-colors ${
                                        isFilterDropdownOpen ? 'bg-black/[0.02]' : 'hover:bg-black/[0.02]'
                                    }`}
                                >
                                    <span>Filter: {currentFilterLabel}</span>
                                    <motion.svg
                                        animate={{ rotate: isFilterDropdownOpen ? 180 : 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="w-3 h-3"
                                        fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"
                                    >
                                        <path strokeLinecap="square" d="M19 9l-7 7-7-7" />
                                    </motion.svg>
                                </button>

                                <AnimatePresence initial={false}>
                                    {isFilterDropdownOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                                        >
                                            <div className="flex flex-col border-t border-black/10">
                                                {filterOptions.map((opt) => (
                                                    <button
                                                        key={opt.id}
                                                        onClick={() => {
                                                            setFilter(opt.id);
                                                            setIsFilterDropdownOpen(false);
                                                        }}
                                                        className={`w-full text-left px-6 py-4 text-[10px] font-bold uppercase tracking-widest border-b border-black/5 last:border-0 hover:bg-black/[0.02] transition-colors ${
                                                            filter === opt.id ? 'text-black bg-black/[0.02]' : 'text-gray-500'
                                                        }`}
                                                    >
                                                        {opt.label}
                                                    </button>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                            {/* Invisible placeholder to keep height consistent since absolute positioning removes it from flow */}
                            <div className="h-[46px] w-full" />
                        </div>

                        {/* Desktop Pill Navigation */}
                        <div className="hidden md:inline-flex gap-2 p-1.5 bg-black/[0.02] border border-black/10 rounded-full shadow-sm">
                            {filterOptions.map((btn) => {
                                const isActive = filter === btn.id;
                                return (
                                    <button
                                        key={btn.id}
                                        onClick={() => setFilter(btn.id)}
                                        className={`relative px-6 py-2.5 text-[10px] font-bold uppercase tracking-widest rounded-full transition-colors duration-300 ${
                                            isActive ? 'text-white' : 'text-gray-500 hover:text-black'
                                        }`}
                                    >
                                        {isActive && (
                                            <motion.div
                                                layoutId="activeFilterChangelog"
                                                className="absolute inset-0 bg-black rounded-full shadow-sm"
                                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                                style={{ zIndex: 0 }}
                                            />
                                        )}
                                        <span className="relative z-10">{btn.label}</span>
                                    </button>
                                );
                            })}
                        </div>

                    </div>
                </section>

                {/* --- CHANGELOG GRID SECTIONS --- */}
                <div className="w-full mb-32">
                    {filteredData.map((entry, index) => (
                        <section key={entry.hash} className={`w-full relative z-20 ${index !== filteredData.length - 1 ? 'border-b border-black/10' : ''}`} style={{ clipPath: 'inset(0)' }}>
                            <div className="grid grid-cols-1 lg:grid-cols-10 divide-y lg:divide-y-0 lg:divide-x divide-black/10 max-w-[1600px] mx-auto px-0 md:px-12 lg:px-24">

                                {/* LINKE SPALTE: Meta Info (4 von 10 Spalten) */}
                                <div className="lg:col-span-4 p-6 md:p-8 lg:p-12 flex flex-col bg-black/[0.01] relative z-0 before:absolute before:inset-y-0 before:right-0 before:w-[100vw] before:bg-black/[0.01] before:-z-10">

                                    <div className="flex flex-col gap-4 max-w-xs">
                                        <div className="flex flex-wrap items-center gap-3">
                                            <h3 className="text-3xl font-medium text-black tracking-tight">
                                                {entry.version}
                                            </h3>
                                            {index === 0 && filter === 'all' && (
                                                <span className="inline-block text-[9px] bg-black px-2 py-0.5 rounded-sm text-white uppercase tracking-wider font-bold shadow-sm mt-1.5">
                                                    Latest
                                                </span>
                                            )}
                                        </div>

                                        <div className="text-[11px] text-gray-500 font-mono uppercase tracking-widest">
                                            {entry.date}
                                        </div>

                                        <a href={`https://github.com/pytja/core/commit/${entry.hash}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[10px] font-mono text-gray-600 bg-white px-3 py-1.5 border border-black/10 rounded-md cursor-pointer hover:text-black hover:bg-black/[0.02] hover:border-black/20 transition-all w-fit group">
                                            {/* HIER GEÄNDERT: Das offizielle GitHub Logo */}
                                            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                                            </svg>
                                            {entry.hash}
                                        </a>
                                    </div>

                                </div>

                                {/* RECHTE SPALTE: Content (6 von 10 Spalten) */}
                                <div className="lg:col-span-6 p-6 md:p-8 lg:p-12 flex flex-col bg-white">

                                    <div className="flex items-center gap-3 mb-4">
                                        <span className={`text-[9px] uppercase tracking-[0.2em] font-bold px-2.5 py-1 rounded-sm border ${
                                            entry.type === 'security' ? 'text-orange-600 bg-orange-50 border-orange-100' :
                                                entry.type === 'feature' ? 'text-blue-600 bg-blue-50 border-blue-100' :
                                                    entry.type === 'fix' ? 'text-gray-600 bg-gray-100 border-gray-200' :
                                                        'text-emerald-600 bg-emerald-50 border-emerald-100' // Core
                                        }`}>
                                            Type: {entry.type}
                                        </span>
                                    </div>

                                    <h3 className="text-xl md:text-2xl font-medium text-black tracking-tight mb-4">
                                        {entry.title}
                                    </h3>

                                    <p className="text-[14px] md:text-[15px] text-gray-500 font-light leading-relaxed mb-8 max-w-2xl">
                                        {entry.desc}
                                    </p>

                                    <ul className="space-y-4 border-t border-black/10 pt-8 max-w-2xl">
                                        {entry.changes.map((change, idx) => (
                                            <li key={idx} className="flex items-start gap-4 text-[13px] md:text-[14px] text-gray-600 font-light">
                                                <span className="text-black/30 font-mono mt-0.5 select-none">—</span>
                                                <span className="leading-relaxed">{change}</span>
                                            </li>
                                        ))}
                                    </ul>

                                </div>
                            </div>
                        </section>
                    ))}

                    {/* --- END OF STREAM INDICATOR --- */}
                    {/* HIER GEÄNDERT: border-y statt border-t */}
                    <section className="w-full border-y border-black/10 relative z-20" style={{ clipPath: 'inset(0)' }}>
                        <div className="grid grid-cols-1 lg:grid-cols-10 divide-y lg:divide-y-0 lg:divide-x divide-black/10 max-w-[1600px] mx-auto px-0 md:px-12 lg:px-24">
                            <div className="lg:col-span-4 p-6 md:p-8 lg:p-12 flex flex-col bg-black/[0.01] relative z-0 before:absolute before:inset-y-0 before:right-0 before:w-[100vw] before:bg-black/[0.01] before:-z-10">
                                <div className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-mono font-bold">
                                    // End of Ledger
                                </div>
                            </div>
                            <div className="lg:col-span-6 p-6 md:p-8 lg:p-12 flex items-center bg-white">
                                <div className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-mono">
                                    Initial Repository Commit Reached
                                </div>
                            </div>
                        </div>
                    </section>

                </div>
            </main>
        </div>
    );
}