"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { type FileNode } from '@/lib/fileLoader';

export default function DashboardClient({ initialFileTree }: { initialFileTree: FileNode[] }) {

    // --- HELPER FUNCTIONS ---
    const findFirstFile = (nodes: FileNode[]): { name: string, path: string, content: string } => {
        if (!nodes || nodes.length === 0) return { name: 'error', path: '', content: '// No files found' };
        for (const node of nodes) {
            if (node.type === 'file') return { name: node.name, path: node.path, content: node.content || '' };
            if (node.children) {
                const found = findFirstFile(node.children);
                if (found.name !== '404') return found;
            }
        }
        return { name: '404', path: '', content: '// No files found' };
    };

    const getAllFolderNames = (nodes: FileNode[]): string[] => {
        let folders: string[] = [];
        nodes.forEach(node => {
            if (node.type === 'folder') {
                folders.push(node.name);
                if (node.children) folders = [...folders, ...getAllFolderNames(node.children)];
            }
        });
        return folders;
    };

    // --- STATE ---
    const [activeTab, setActiveTab] = useState('changelog');
    const [mounted, setMounted] = useState(false);
    const [openFolders, setOpenFolders] = useState<string[]>(getAllFolderNames(initialFileTree));
    const [selectedFile, setSelectedFile] = useState(findFirstFile(initialFileTree));
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isGlobalMenuOpen, setIsGlobalMenuOpen] = useState(false);

    useEffect(() => { setMounted(true); }, []);

    useEffect(() => {
        const handleResize = () => {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        setIsSidebarOpen(false);
    }, [activeTab]);

    // --- ACTIONS ---
    const toggleFolder = (folderName: string) => {
        setOpenFolders(prev =>
            prev.includes(folderName) ? prev.filter(f => f !== folderName) : [...prev, folderName]
        );
    };

    const formatPath = (rawPath: string) => rawPath.replace(/^demo-code[\/\\]/, '');

    // --- REKURSIVE KOMPONENTE ---
    const FileTreeItem = ({ item, depth = 0 }: { item: FileNode, depth?: number }) => {
        const isFolder = item.type === 'folder';
        const isOpen = openFolders.includes(item.name);
        const isSelected = selectedFile.path === item.path;

        return (
            <div className="select-none">
                {/* DATEI / ORDNER ZEILE */}
                <div
                    className={`flex items-center gap-2 py-1.5 px-4 cursor-pointer transition-colors duration-200 ${isSelected ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white/60 hover:bg-white/5'}`}
                    style={{ paddingLeft: `${depth * 1.2 + 1}rem` }}
                    onClick={(e) => {
                        e.stopPropagation();
                        if (isFolder) toggleFolder(item.name);
                        else setSelectedFile({ name: item.name, path: item.path, content: item.content || '' });
                    }}
                >
                    <span className={`text-[10px] w-3 flex justify-center font-mono transform transition-transform duration-200 ${isFolder && isOpen ? 'rotate-90' : ''}`}>
                        {isFolder ? '▶' : '○'}
                    </span>
                    <span className={`text-[11px] tracking-wider ${isFolder ? 'font-bold uppercase opacity-80' : ''}`}>
                        {item.name}
                    </span>
                </div>

                {/* ANIMIERTER UNTERORDNER */}
                {isFolder && item.children && (
                    <div className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                        <div className="overflow-hidden">
                            {item.children.map((child) => (
                                <FileTreeItem key={child.path} item={child} depth={depth + 1} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        );
    };

    if (!mounted) return null;

    const updates = [
        { version: "v1.0.4-stable", date: "2024-05-20", tag: "Security Patch", changes: ["Enhanced Rust-Memory-Isolation", "Zero-Disk-Cache for Plugin-Runtime", "Fixed AES-256 handshake latency"] },
        { version: "v1.0.3-beta", date: "2024-05-12", tag: "Feature Update", changes: ["Added PostgreSQL native stream support", "New Telemetry-Endpoint established"] },
        { version: "v1.0.4-stable", date: "2024-05-20", tag: "Security Patch", changes: ["Enhanced Rust-Memory-Isolation", "Zero-Disk-Cache for Plugin-Runtime", "Fixed AES-256 handshake latency"] },
        { version: "v1.0.4-stable", date: "2024-05-20", tag: "Security Patch", changes: ["Enhanced Rust-Memory-Isolation", "Zero-Disk-Cache for Plugin-Runtime", "Fixed AES-256 handshake latency"] },

    ];

    return (
        <div className="flex h-screen bg-[#0D0D0D] text-white font-mono overflow-hidden relative">
            <div className="fixed inset-0 bg-grid opacity-20 pointer-events-none" />

            {/* --- 1. MOBILE OVERLAY FÜR EXPLORER SIDEBAR (Links) --- */}
            {/* Z-Index erhöht auf 250, damit es ÜBER dem Header liegt, wenn die Sidebar offen ist */}
            <div
                className={`fixed inset-0 bg-black/80 z-[240] transition-opacity duration-300 lg:hidden ${isSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setIsSidebarOpen(false)}
            />

            {/* --- 2. GLOBAL NAV DROPDOWN (Rechts) --- */}
            {/* FIX: Startet jetzt erst ab 'top-16' (unter dem Header), damit der Header bedienbar bleibt */}
            <div className={`
                fixed top-16 inset-x-0 bottom-0 z-[190] bg-[#050505] lg:hidden 
                transition-all duration-500 ease-in-out border-t border-white/10
                ${isGlobalMenuOpen
                ? 'opacity-100 translate-y-0 pointer-events-auto visible'
                : 'opacity-0 -translate-y-4 pointer-events-none invisible'}
            `}>
                <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none z-0" />

                <div className="relative z-10 flex flex-col h-full pt-10 px-10 gap-12">
                    <nav className="flex flex-col gap-8">
                        {[
                            { name: 'Home', id: '/' },
                            { name: 'Architecture', id: '/#architecture' },
                            { name: 'Modularity', id: '/#modularity' },
                            { name: 'Stats', id: '/#stats' }
                        ].map((item, i) => (
                            <Link
                                key={item.name}
                                href={item.id}
                                onClick={() => setIsGlobalMenuOpen(false)}
                                className={`text-3xl font-bold tracking-tighter transition-all duration-700 delay-100 flex items-baseline gap-4 ${
                                    isGlobalMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
                                }`}
                                style={{ transitionDelay: `${i * 50 + 200}ms` }}
                            >
                                <span className="text-[10px] font-mono text-white/10">0{i+1}</span>
                                <span className="text-white/40 hover:text-white">{item.name}</span>
                            </Link>
                        ))}
                    </nav>

                    <div className={`mt-auto pb-24 flex flex-col gap-4 transition-all duration-700 delay-500 ${
                        isGlobalMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                    }`}>
                        <Link href="/contact" onClick={() => setIsGlobalMenuOpen(false)} className="w-full py-4 text-center text-[10px] font-bold uppercase tracking-[0.3em] text-white/40 border border-white/5">
                            Contact Support
                        </Link>
                    </div>
                </div>
            </div>

            {/* --- DASHBOARD SIDEBAR (Links) --- */}
            {/* Z-Index 250: Muss über allem liegen, wenn offen */}
            <aside className={`
                fixed lg:static inset-y-0 left-0 z-[250] w-72 
                border-r border-white/5 bg-[#0A0A0A] lg:bg-[#0A0A0A]/50 backdrop-blur-xl 
                flex flex-col transition-transform duration-300 ease-in-out
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}>
                <div className="p-8 border-b border-white/5 relative">
                    {/* Header Top Row: Link & Close Button auf einer Linie */}
                    <div className="flex items-center justify-between mb-6">
                        <Link href="/" className="text-[10px] text-white/30 hover:text-white transition-colors flex items-center gap-2 uppercase tracking-widest group">
                            <span className="group-hover:-translate-x-1 transition-transform">←</span> Return_to_base
                        </Link>

                        {/* Close Button Mobile - Exakt auf der Linie des Links */}
                        <button
                            onClick={() => setIsSidebarOpen(false)}
                            className="lg:hidden text-white/20 hover:text-white transition-colors p-1 -mr-2"
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M18 6L6 18M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Terminal Title */}
                    <div className="flex items-center gap-4">
                        <div className="w-2 h-2 bg-white rounded-sm shadow-[0_0_10px_white] animate-pulse" />
                        <h2 className="font-bold tracking-tighter text-base uppercase italic text-white/90">Terminal</h2>
                    </div>
                </div>

                <nav className="flex-1 py-10">
                    {[
                        { id: 'changelog', label: '01_CHANGELOG' },
                        { id: 'code', label: '02_SOURCE_CODE' },
                        { id: 'explanation', label: '03_ARCHITECTURE' }
                    ].map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full text-left px-10 py-5 text-[11px] tracking-widest transition-all relative border-y border-transparent flex items-center ${activeTab === item.id ? 'text-white bg-white/[0.04]' : 'text-white/30 hover:text-white/60 hover:bg-white/[0.01]'}`}
                        >
                            <div className={`absolute left-0 top-0 bottom-0 w-[1px] transition-opacity duration-500 ${activeTab === item.id ? 'bg-white opacity-100' : 'bg-white opacity-0'}`} />
                            {item.label}
                        </button>
                    ))}
                </nav>

                <div className="p-8 border-t border-white/5">
                    <div className="text-[8px] text-white/20 uppercase tracking-widest leading-loose">
                        Status: <span className="text-white/60">Verified_User</span><br/>
                        Node: <span className="text-white/60">Alpha_01</span>
                    </div>
                </div>
            </aside>

            {/* --- MAIN VIEWPORT --- */}
            <main className="flex-1 flex flex-col relative z-10 overflow-hidden w-full">

                {/* --- HEADER --- */}
                {/* Z-Index 150: Liegt jetzt ÜBER dem Global Nav Dropdown (140) */}
                <header className="h-16 border-b border-white/5 bg-[#0D0D0D]/80 backdrop-blur-md flex items-center px-4 lg:px-10 justify-between relative shrink-0 z-[150]">

                    {/* LINKER TEIL: Sidebar Icon & Pfad */}
                    <div className="flex items-center gap-4">
                        {/* SIDEBAR TOGGLE BUTTON */}
                        <button
                            onClick={() => setIsSidebarOpen(true)}
                            className="lg:hidden text-white/60 hover:text-white transition-colors"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                                <line x1="9" y1="3" x2="9" y2="21" />
                            </svg>
                        </button>

                        {/* HIER GEÄNDERT: Keine Breitenbegrenzung mehr */}
                        <div className="text-[10px] text-white/40 tracking-[0.3em] uppercase whitespace-nowrap">
                            Path: <span className="text-white">pytja / {activeTab}</span>
                        </div>
                    </div>

                    {/* RECHTER TEIL: Global Nav & Download */}
                    <div className="flex items-center gap-6">

                        {/* Desktop: Buttons sichtbar */}
                        <div className="hidden lg:flex items-center gap-6">
                            <Link href="/contact" className="text-[10px] text-white/40 hover:text-white transition-colors uppercase tracking-[0.2em] font-bold">Contact_Support</Link>
                            <button className="flex items-center gap-3 border border-white/10 bg-white/[0.03] px-6 py-2 transition-all duration-500 hover:bg-white/10 hover:border-white/30 group">
                                <span className="text-[10px] text-white font-bold tracking-widest uppercase">Download_V1</span>
                                <svg className="w-3 h-3 text-white/40 group-hover:translate-y-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="square" strokeWidth="2" d="M19 14l-7 7-7-7m14-8l-7 7-7-7" />
                                </svg>
                            </button>
                        </div>

                        {/* Mobile: Hamburger Button für Globales Menü */}
                        <button
                            className="lg:hidden flex flex-col justify-center items-center w-10 h-10 relative outline-none"
                            onClick={() => setIsGlobalMenuOpen(!isGlobalMenuOpen)}
                        >
                            <div className={`h-[1px] bg-white absolute w-6 transition-all duration-500 ease-in-out ${
                                isGlobalMenuOpen ? 'rotate-45 translate-y-0' : '-translate-y-1'
                            }`} />
                            <div className={`h-[1px] bg-white absolute w-6 transition-all duration-500 ease-in-out ${
                                isGlobalMenuOpen ? '-rotate-45 translate-y-0' : 'translate-y-1'
                            }`} />
                        </button>
                    </div>
                </header>

                {activeTab === 'code' ? (
                    <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">

                        {/* FILE EXPLORER: Mobile (oben), Desktop (links) */}
                        <div className="w-full h-48 lg:h-auto lg:w-64 border-b lg:border-b-0 lg:border-r border-white/5 bg-black/20 flex flex-col flex-shrink-0">
                            <div className="p-4 border-b border-white/5 text-[9px] text-white/20 tracking-widest uppercase font-bold flex justify-between items-center">
                                <span>Explorer</span>
                                <span className="lg:hidden text-[9px] opacity-50">Scroll for more</span>
                            </div>
                            <div className="flex-1 py-4 overflow-y-auto overflow-x-hidden custom-scrollbar">
                                {/* WICHTIG: Nur initialFileTree mappen! */}
                                {initialFileTree && initialFileTree.length > 0 ? (
                                    initialFileTree.map((item) => (
                                        <FileTreeItem key={item.path} item={item} />
                                    ))
                                ) : (
                                    <div className="p-4 text-[10px] text-white/20 uppercase">No_Data_Stream</div>
                                )}
                            </div>
                        </div>

                        {/* CODE VIEWPORT */}
                        <div className="flex-1 flex flex-col bg-[#050505]/50 overflow-hidden relative">
                            {/* Code Header */}
                            <div className="h-10 border-b border-white/5 flex items-center px-4 lg:px-6 gap-4 bg-black/40 shrink-0 overflow-hidden">
                                <div className="text-[10px] text-white/60 flex items-center gap-2 font-mono whitespace-nowrap">
                                    <span className="text-white/20 uppercase tracking-widest hidden sm:inline">File:</span>
                                    <span className="text-white/80 truncate">{formatPath(selectedFile.path)}</span>
                                </div>
                            </div>

                            {/* Editor */}
                            <div className="flex-1 overflow-auto custom-scrollbar relative code-container">
                                <SyntaxHighlighter
                                    language="rust"
                                    style={vscDarkPlus}
                                    useInlineStyles={true}
                                    customStyle={{
                                        margin: 0,
                                        padding: '1.5rem',
                                        fontSize: '13px',
                                        background: 'transparent',
                                        lineHeight: '1.7',
                                        fontFamily: 'var(--font-mono)'
                                    }}
                                    showLineNumbers={true}
                                    wrapLines={true}
                                >
                                    {selectedFile.content}
                                </SyntaxHighlighter>

                                <style jsx global>{`
                                    .code-container span.react-syntax-highlighter-line-number {
                                        color: rgba(255, 255, 255, 0.2) !important;
                                        padding-right: 1em !important;
                                        user-select: none;
                                    }
                                    @media (min-width: 1024px) {
                                        .code-container span.react-syntax-highlighter-line-number {
                                            padding-right: 2em !important;
                                        }
                                    }
                                    .custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
                                    .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                                    .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
                                    .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.3); }
                                `}</style>

                                <div className="absolute top-0 right-0 w-96 h-96 bg-white/[0.01] blur-[120px] pointer-events-none" />
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex-1 overflow-y-auto p-6 lg:p-24 custom-scrollbar">
                        {/* --- CHANGELOG SECTION --- */}
                        {activeTab === 'changelog' && (
                            <div className="max-w-4xl space-y-16">
                                <div className="space-y-4">
                                    <div className="text-[10px] text-white/30 tracking-[0.5em] uppercase">Update_Stream</div>
                                    <h3 className="text-4xl lg:text-6xl font-bold tracking-tighter text-white uppercase italic">Changelog.</h3>
                                </div>
                                <div className="space-y-20">
                                    {updates.map((update, i) => (
                                        <div key={`${update.version}-${i}`} className="relative pl-8 lg:pl-12 border-l border-white/10 group">
                                            <div className="absolute -left-[1px] top-0 w-[1px] h-12 bg-white transition-all duration-700 group-hover:h-full" />
                                            <div className="space-y-6">
                                                <div className="flex flex-wrap items-center gap-4">
                                                    <span className="text-lg font-bold tracking-tighter text-white">{update.version}</span>
                                                    <span className="text-[10px] bg-white text-black px-2 py-0.5 font-bold uppercase tracking-widest">{update.tag}</span>
                                                    <span className="text-[10px] text-white/20 font-mono tracking-widest uppercase">{update.date}</span>
                                                </div>
                                                <ul className="space-y-3">
                                                    {update.changes.map((change, i) => (
                                                        <li key={i} className="flex items-start gap-4 text-white/50 text-sm font-light">
                                                            <span className="text-white/20 mt-1.5 w-1 h-1 bg-white rounded-full flex-shrink-0" />
                                                            {change}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* --- EXPLANATION SECTION --- */}
                        {activeTab === 'explanation' && (
                            <div className="max-w-4xl space-y-12">
                                <div className="space-y-4">
                                    <div className="text-[10px] text-white/30 tracking-[0.5em] uppercase">Intelligence_Briefing</div>
                                    <h3 className="text-4xl lg:text-6xl font-bold tracking-tighter text-white uppercase italic">Architecture.</h3>
                                </div>
                                <div className="grid gap-1 border border-white/5 bg-white/5 p-px">
                                    <div className="bg-[#0D0D0D] p-6 lg:p-10 space-y-4">
                                        <h4 className="text-white font-bold tracking-widest uppercase text-xs">Security Defense Strategy</h4>
                                        <p className="text-white/40 text-sm leading-relaxed font-light">
                                            Pytja's architecture is based on the principle of absolute isolation.
                                            By utilizing Rust's ownership model, we guarantee that memory once allocated is never leaked or swapped to disk.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
}