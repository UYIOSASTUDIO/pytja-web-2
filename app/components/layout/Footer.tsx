"use client";
import React from 'react';
import Link from 'next/link'; // WICHTIG: Das nutzen wir jetzt

export default function Footer() {
    return (
        <footer className="border-t border-white/10 bg-[#050505] pt-24 pb-12 relative z-10">
            <div className="max-w-7xl mx-auto px-8">

                <div className="grid md:grid-cols-4 gap-12 mb-24">
                    {/* Spalte 1: Brand */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-2">
                            <span className="font-bold text-lg tracking-tighter text-white uppercase">Pytja</span>
                        </div>
                        <p className="text-[10px] text-[#666] leading-relaxed max-w-[200px]">
                            Next-generation database exploration layer. Built with Rust for safety-critical environments.
                        </p>
                    </div>

                    {/* Spalte 2: Product */}
                    <div>
                        <h4 className="text-[10px] font-bold text-white uppercase tracking-[0.2em] mb-6">Product</h4>
                        <ul className="space-y-4 text-[11px] text-[#666] uppercase tracking-wider">
                            {/* HIER GEÄNDERT: <Link> statt <a> */}
                            <li><Link href="/download" className="hover:text-white transition-colors">Download</Link></li>
                            <li><Link href="/manual" className="hover:text-white transition-colors">Manual</Link></li>
                            <li><Link href="/modules" className="hover:text-white transition-colors">Modules</Link></li>
                            <li><Link href="/code" className="hover:text-white transition-colors">Code</Link></li>
                            <li><Link href="/changelog" className="hover:text-white transition-colors">Changelog</Link></li>
                        </ul>
                    </div>

                    {/* Spalte 3: Company */}
                    <div>
                        <h4 className="text-[10px] font-bold text-white uppercase tracking-[0.2em] mb-6">Company</h4>
                        <ul className="space-y-4 text-[11px] text-[#666] uppercase tracking-wider">
                            <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
                            <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Spalte 4: Legal */}
                    <div>
                        <h4 className="text-[10px] font-bold text-white uppercase tracking-[0.2em] mb-6">Legal</h4>
                        <ul className="space-y-4 text-[11px] text-[#666] uppercase tracking-wider">
                            <li><Link href="/legal/privacy" className="hover:text-white transition-colors">Privacy</Link></li>
                            <li><Link href="/legal/terms" className="hover:text-white transition-colors">Terms</Link></li>
                            <li><Link href="/legal/imprint" className="hover:text-white transition-colors">Imprint</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-[10px] text-[#444]">
                        &copy; 2026 Pytja. All rights reserved.
                    </div>

                    {/* System Status Indicator */}
                    <div className="flex items-center gap-3 px-4 py-2 border border-white/5 bg-white/[0.02] rounded-full">
                        <div className="relative flex items-center justify-center w-2 h-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
                        </div>
                        <span className="text-[9px] text-[#666] uppercase tracking-widest font-mono">All Systems Operational</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}