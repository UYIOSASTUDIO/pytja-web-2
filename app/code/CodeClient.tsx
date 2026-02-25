"use client";
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom'; // WICHTIG: Portal Import
import Link from 'next/link';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { type FileNode } from '@/lib/fileLoader';
import { motion } from 'framer-motion';

export default function CodeClient({ initialFileTree }: { initialFileTree: FileNode[] }) {

    // --- HELPER ---
    const findFirstFile = (nodes: FileNode[]): { name: string, path: string, content: string } => {
        if (!nodes || nodes.length === 0) return { name: 'error', path: '', content: '' };
        for (const node of nodes) {
            if (node.type === 'file') return { name: node.name, path: node.path, content: node.content || '' };
            if (node.children) {
                const found = findFirstFile(node.children);
                if (found.name !== 'error') return found;
            }
        }
        return { name: 'error', path: '', content: '' };
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
    const [mounted, setMounted] = useState(false);
    const [selectedFile, setSelectedFile] = useState<{ name: string, path: string, content: string }>({ name: '', path: '', content: '' });
    const [openFolders, setOpenFolders] = useState<string[]>([]);

    // UI State
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Global Header Menu
    const [leftSidebarOpen, setLeftSidebarOpen] = useState(false);   // Code Tree
    const [rightSidebarOpen, setRightSidebarOpen] = useState(false); // Documentation

    useEffect(() => {
        setMounted(true);
        if (initialFileTree && initialFileTree.length > 0) {
            setOpenFolders(getAllFolderNames(initialFileTree));
            setSelectedFile(findFirstFile(initialFileTree));
        }

        const handleResize = () => {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [initialFileTree]);

    // --- ACTIONS ---
    const toggleFolder = (folderName: string) => {
        setOpenFolders(prev => prev.includes(folderName) ? prev.filter(f => f !== folderName) : [...prev, folderName]);
    };

    const handleFileSelect = (file: { name: string, path: string, content: string }) => {
        setSelectedFile(file);
        setLeftSidebarOpen(false);
    };

    const formatPath = (rawPath: string) => rawPath.replace(/^demo-code[\/\\]/, '');

    // --- FILE TREE COMPONENT ---
    const FileTreeItem = ({ item, depth = 0 }: { item: FileNode, depth?: number }) => {
        const isFolder = item.type === 'folder';
        const isOpen = openFolders.includes(item.name);
        const isSelected = selectedFile.path === item.path;

        return (
            <div className="select-none w-full">
                <div
                    className={`flex items-center gap-2 py-1.5 px-4 cursor-pointer transition-colors whitespace-nowrap ${isSelected ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white/60 hover:bg-white/5'}`}
                    style={{ paddingLeft: `${depth * 1 + 1}rem` }}
                    onClick={(e) => {
                        e.stopPropagation();
                        if (isFolder) toggleFolder(item.name);
                        else handleFileSelect({ name: item.name, path: item.path, content: item.content || '' });
                    }}
                >
                    <span className={`text-[10px] w-3 flex justify-center font-mono transform transition-transform duration-200 ${isFolder && isOpen ? 'rotate-90' : ''}`}>
                        {isFolder ? '▶' : '○'}
                    </span>
                    <span className={`text-[11px] tracking-wider ${isFolder ? 'font-bold uppercase opacity-80' : ''}`}>
                        {item.name}
                    </span>
                </div>
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

    // --- PORTAL: MOBILE MENU ---
    // Dieses Menü wird direkt in den Body gerendert, um Z-Index Probleme zu vermeiden.
    const mobileMenuPortal = (
        <div
            className={`fixed inset-0 z-[9999] bg-[#050505] lg:hidden transition-all duration-500 ease-in-out flex flex-col ${isMobileMenuOpen ? 'opacity-100 translate-y-0 pointer-events-auto visible' : 'opacity-0 -translate-y-4 pointer-events-none invisible'}`}
            style={{ top: '64px' }} // Startet exakt unter dem Header
        >
            <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none z-0" />
            <div className="relative z-10 flex flex-col h-full pt-10 px-10 gap-12 overflow-y-auto">
                <nav className="flex flex-col gap-8 shrink-0">
                    {['Home', 'Architecture', 'Modularity', 'Stats'].map((item, i) => (
                        <Link key={item} href={`/#${item.toLowerCase()}`} onClick={() => setIsMobileMenuOpen(false)} className="text-3xl font-bold tracking-tighter text-white/40 hover:text-white flex items-baseline gap-4">
                            <span className="text-[10px] font-mono text-white/10">0{i+1}</span>
                            {item}
                        </Link>
                    ))}
                </nav>
                <div className="mt-auto pb-24 flex flex-col gap-4">
                    <Link href="/contact" className="w-full py-4 text-center text-[10px] font-bold uppercase border border-white/5 text-white/40">Contact Support</Link>
                    <Link href="/dashboard" className="w-full py-5 text-center text-[10px] font-bold uppercase bg-white text-black">Open Terminal</Link>
                </div>
            </div>
        </div>
    );

    return (
        // FIX: pt-16 md:pt-20 hinzugefügt, damit der Inhalt unter dem globalen Header startet
        <div className="flex flex-col h-screen bg-[#0D0D0D] text-white font-mono overflow-hidden fixed inset-0 w-full pt-16 md:pt-20" style={{ height: 'calc(var(--vh, 1vh) * 100)' }}>

            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar { width: 5px; height: 5px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 2px; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.2); }
                .code-container pre { margin: 0 !important; border-radius: 0 !important; background: transparent !important; }
                .code-container span.react-syntax-highlighter-line-number { color: rgba(255,255,255,0.15) !important; padding-right: 1.5em !important; user-select: none; }
            `}</style>

            <div className="fixed inset-0 bg-grid opacity-20 pointer-events-none z-0" />

            {/* WICHTIG: Hier den alten <header> Block LÖSCHEN! */}
            {/* Auch das <createPortal> für das Menü LÖSCHEN! */}

            {/* --- 2. SUB-HEADER (Code Controls) --- */}
            <div className="h-12 border-b border-white/5 bg-[#0A0A0A] flex items-center justify-between px-4 z-[50] shrink-0 relative">

                {/* Links: Tree Toggle (Mini-Version des Main Headers) */}
                <button
                    onClick={() => setLeftSidebarOpen(!leftSidebarOpen)}
                    className="lg:hidden flex flex-col justify-center items-center w-10 h-10 relative outline-none group"
                >
                    {/* Balken 1: Rotiert 45deg oder verschiebt sich nach oben */}
                    <div className={`h-[1px] bg-white/50 group-hover:bg-white absolute w-4 transition-all duration-300 ease-in-out ${
                        leftSidebarOpen ? 'rotate-45 translate-y-0' : '-translate-y-[3px]'
                    }`} />
                    {/* Balken 2: Rotiert -45deg oder verschiebt sich nach unten */}
                    <div className={`h-[1px] bg-white/50 group-hover:bg-white absolute w-4 transition-all duration-300 ease-in-out ${
                        leftSidebarOpen ? '-rotate-45 translate-y-0' : 'translate-y-[3px]'
                    }`} />
                </button>

                {/* Desktop Placeholder */}
                <div className="hidden lg:flex items-center gap-2 text-[10px] text-white/30 uppercase tracking-widest font-bold">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/20"><path d="M3 12h18M3 6h18M3 18h18"/></svg>
                    Explorer
                </div>

                {/* Mitte: File Path */}
                <div className="text-[10px] text-white/60 tracking-[0.2em] font-mono uppercase truncate px-4">
                    {formatPath(selectedFile.path)}
                </div>

                {/* Rechts: Info Toggle (Rotierende Animation) */}
                <button
                    onClick={() => setRightSidebarOpen(!rightSidebarOpen)}
                    className="p-2 text-white/50 hover:text-white transition-colors lg:hidden outline-none"
                >
                    <motion.svg
                        animate={{ rotate: rightSidebarOpen ? 90 : 0, color: rightSidebarOpen ? '#ffffff' : 'rgba(255,255,255,0.5)' }}
                        transition={{ duration: 0.3 }}
                        width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"
                    >
                        <circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>
                    </motion.svg>
                </button>

                {/* Desktop Info Label */}
                <div className="hidden lg:flex items-center gap-2 text-[10px] text-white/30 uppercase tracking-widest font-bold">
                    Doc_Panel
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/20"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
                </div>
            </div>

            {/* --- 3. MAIN CONTENT --- */}
            <div className="flex-1 flex overflow-hidden relative">
                <aside className={`absolute lg:static inset-y-0 left-0 w-72 bg-[#080808] border-r border-white/5 z-[40] transition-transform duration-300 ease-in-out flex flex-col ${leftSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
                    <div className="flex-1 overflow-y-auto custom-scrollbar py-2">
                        {initialFileTree.map(item => (<FileTreeItem key={item.path} item={item} />))}
                    </div>
                </aside>
                {leftSidebarOpen && <div className="fixed inset-0 bg-black/50 z-[30] lg:hidden backdrop-blur-sm" onClick={() => setLeftSidebarOpen(false)} style={{ top: '112px' }} />}

                <main className="flex-1 flex flex-col min-w-0 bg-[#0D0D0D] relative z-0">
                    <div className="flex-1 overflow-auto custom-scrollbar code-container relative">
                        <SyntaxHighlighter language="rust" style={vscDarkPlus} customStyle={{ margin: 0, padding: '2rem', fontSize: '13px', background: 'transparent', lineHeight: '1.6', fontFamily: 'var(--font-mono)' }} showLineNumbers={true} wrapLines={true}>
                            {selectedFile.content}
                        </SyntaxHighlighter>
                    </div>
                    <footer className="border-t border-white/5 py-3 px-6 bg-[#0A0A0A] shrink-0 flex justify-between items-center text-[10px] text-white/30 font-mono uppercase">
                        <span>Read-Only Mode</span>
                        <div className="flex gap-2 items-center"><span>UTF-8</span><span className="w-px h-3 bg-white/10 mx-2"/><span>Rust</span></div>
                    </footer>
                </main>

                <aside className={`absolute lg:static inset-y-0 right-0 w-80 bg-[#080808] border-l border-white/5 z-[40] transition-transform duration-300 ease-in-out flex flex-col ${rightSidebarOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}`}>
                    <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-8">
                        <div className="space-y-2"><h3 className="text-white text-sm font-bold uppercase tracking-wider">File Context</h3><p className="text-white/50 text-xs leading-relaxed">You are viewing <span className="text-white font-mono">{selectedFile.name}</span>. This module handles critical system operations.</p></div>
                        <div className="p-4 border border-blue-500/20 bg-blue-500/5 rounded-sm"><h4 className="text-blue-400 text-[10px] font-bold uppercase tracking-widest mb-2">Dev Note</h4><p className="text-white/60 text-[10px] leading-relaxed">All changes to this file must pass the strict borrower check.</p></div>
                    </div>
                </aside>
                {rightSidebarOpen && <div className="fixed inset-0 bg-black/50 z-[30] lg:hidden backdrop-blur-sm" onClick={() => setRightSidebarOpen(false)} style={{ top: '112px' }} />}
            </div>
        </div>
    );
}