"use client";
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, LayoutGroup } from 'framer-motion';
import Link from 'next/link';

const envContent = `# ==============================================================================
# PYTJA V1 - ENVIRONMENT CONFIGURATION
# ==============================================================================
# Copy this file to '.env' and adjust the values to your environment.
# Note: Pytja uses relative paths by default for a portable, local workspace.
# ==============================================================================

# --- 1. SERVER & NETWORK ---
# The host and port where the Pytja gRPC Daemon will listen.
# Keep SERVER_HOST at 127.0.0.1 for strict local zero-trust isolation.
SERVER_HOST=127.0.0.1
SERVER_PORT=50051

# --- 2. TLS / SECURITY ---
# Pytja requires encrypted gRPC streams. Generate these via OpenSSL:
# openssl req -x509 -newkey rsa:4096 -keyout server.key -out server.crt -days 365 -nodes -subj "/CN=localhost"
TLS_ENABLED=true
TLS_CERT_PATH=./server.crt
TLS_KEY_PATH=./server.key

# --- 3. SESSION MANAGEMENT (REDIS) ---
# Required for ultra-fast, sub-millisecond JWT session validation.
REDIS_URL=redis://127.0.0.1:6379/

# --- 4. CORE DATABASE ---
# The primary database storing file metadata, users, and RBAC policies.
# Use sqlite:// for local setups, or postgres:// for enterprise deployments.
DATABASE_PRIMARY_URL=sqlite://pytja.db

# --- 5. VIRTUAL FILE SYSTEM (STORAGE) ---
# Type can be 'fs' (Local File System) or 's3' (AWS/MinIO).
STORAGE_TYPE=fs
STORAGE_LOCAL_PATH=./data

# If STORAGE_TYPE=s3, fill in the following:
# S3_BUCKET=my-pytja-secure-bucket
# S3_REGION=us-east-1
# AWS_ACCESS_KEY_ID=your_access_key
# AWS_SECRET_ACCESS_KEY=your_secret_key

# --- 6. PATHS & LOGGING ---
PATHS_LOGS_DIR=./logs
PATHS_MOUNTS_FILE=./config/mounts.json`;

// --- DATEN FÜR DIE SCHRITTE ---
const binarySteps = [
    {
        id: "step1",
        number: "01",
        title: "Acquire Core Binaries",
        desc: "Download the pre-compiled, highly optimized binaries for your specific operating system from our official distribution page and prepare your sovereign workspace.",
        link: { text: "Go to Download Page", href: "/download" },
    },
    {
        id: "step2",
        number: "02",
        title: "Local Datastore (Redis)",
        desc: "Pytja requires a local Redis cache for high-speed session state management. Ensure the service is provisioned and running for your respective operating system before executing the core binary.",
        commands: [
            { cmd: "sudo apt-get install redis-server && sudo systemctl enable --now redis-server", output: "# Linux (Debian/Ubuntu)" },
            { cmd: "brew install redis && brew services start redis", output: "# macOS (Homebrew)" },
            { cmd: "docker run --name pytja-redis -p 6379:6379 -d redis", output: "# Windows (via Docker / WSL2)" }
        ]
    },
    {
        id: "step3",
        number: "03",
        title: "Grant Permissions",
        desc: "Authorize the binary for local execution. Unix-based systems require execution flags, macOS requires Gatekeeper clearance, and Windows requires unblocking the downloaded artifact.",
        commands: [
            { cmd: "chmod +x pytja-linux", output: "# Linux" },
            { cmd: "chmod +x pytja-macos && xattr -d com.apple.quarantine pytja-macos", output: "# macOS (Execution & Gatekeeper Bypass)" },
            { cmd: "Unblock-File -Path .\\pytja-windows.exe", output: "# Windows (PowerShell Security Clearance)" }
        ]
    },
    {
        id: "step4",
        number: "04",
        title: "Zero-Touch Provisioning",
        desc: "Execute the binary. The automated bootstrap wizard will instantly bind your network, generate Zero-Trust TLS certificates, initialize the local SQLite database, and prompt you to create your administrative identity.",
        commands: [
            { cmd: "./pytja-linux   # or ./pytja-macos", output: "[SYSTEM] Generating TLS certificates...\n[SYSTEM] Initializing database...\n> Enter admin username: admin\n> Set Master Password: ***" },
            { cmd: ".\\pytja-windows.exe", output: "[SYSTEM] Generating TLS certificates...\n[SYSTEM] Initializing database...\n> Enter admin username: admin\n> Set Master Password: ***" }
        ]
    },
    {
        id: "step5",
        number: "05",
        title: "Operational Handoff",
        desc: "After completing the identity setup, the backend server seamlessly detaches as a background daemon across all operating systems, automatically transitioning your terminal into the interactive Pytja Shell.",
        commands: [
            { cmd: "pytja > mounts", output: "[SYSTEM] Core offline. Forking background daemon...\n[SYSTEM] Connecting to interactive shell..." }
        ]
    }
];

const sourceSteps = [
    {
        id: "step1",
        number: "01",
        title: "Clone Repository",
        desc: "For maximum transparency and custom compilation, pull the open-source code directly from our official GitHub repository into your local environment.",
        link: { text: "View Source on GitHub", href: "https://github.com/pytja/pytja" },
        commands: [{ cmd: "git clone https://github.com/pytja/pytja.git && cd pytja" }]
    },
    {
        id: "step2",
        number: "02",
        title: "Provision Infrastructure",
        desc: "Pytja requires a local Redis cache for sub-millisecond session validation. For development environments, running Redis via Docker is the cleanest, recommended approach.",
        commands: [
            { cmd: "docker run --name pytja-redis -p 6379:6379 -d redis", output: "# Recommended: Universal Docker Container" },
            { cmd: "brew install redis && brew services start redis", output: "# Fallback: macOS Native via Homebrew" }
        ]
    },
    {
        id: "step3",
        number: "03",
        title: "Compile Core Engine",
        desc: "Build the project using the Rust toolchain (Cargo). This will compile the core daemon, the identity registrar, and the admin interface directly from source.",
        commands: [{ cmd: "cargo build --release", output: "Finished release [optimized] target(s) in 42.0s" }]
    },
    {
        id: "step4",
        number: "04",
        title: "Environment & TLS Setup",
        desc: "Create your sovereign configuration. Copy the reference environment file, create a dedicated certificates directory, and generate the mandatory Self-Signed TLS keys for encrypted gRPC communication.",
        commands: [
            { cmd: "cp .env.example .env && mkdir certs", output: "# Initialize environment structure" },
            { cmd: 'openssl req -x509 -newkey rsa:4096 -keyout certs/server.key -out certs/server.crt -days 365 -nodes -subj "/CN=localhost"', output: "# Generate Zero-Trust certificates" }
        ]
    },
    {
        id: "step5",
        number: "05",
        title: "Identity Generation",
        desc: "Access is strictly granted via Ed25519 asymmetric cryptography. Execute the compiled registrar binary to securely generate your administrative identity file.",
        commands: [{ cmd: "./target/release/pytja_registrar", output: "[INFO] Launching interactive setup...\n> Enter username: admin\n> Set Master Password: ***" }]
    },
    {
        id: "step6",
        number: "06",
        title: "Launch Engine",
        desc: "Execute the compiled core binary. It will parse your environment, load the manually generated TLS certificates, and fork the gRPC daemon into the background.",
        commands: [{ cmd: "./target/release/pytja", output: "[SYSTEM] Core offline. Forking background daemon...\n[SYSTEM] Connecting to interactive shell..." }]
    }
];

export default function ManualPage() {
    const [mounted, setMounted] = useState(false);
    const [activeMethod, setActiveMethod] = useState<'binary' | 'source'>('binary');
    const [activeSection, setActiveSection] = useState("step1");

    useEffect(() => {
        setMounted(true);
    }, []);

    // Observer für Scrollspy (Optional, aktiviert den aktiven Punkt in der Sidebar)
    useEffect(() => {
        if (!mounted || typeof window === 'undefined' || window.innerWidth < 768) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { rootMargin: "-20% 0px -60% 0px" }
        );

        const sections = document.querySelectorAll(".manual-step-section");
        sections.forEach((section) => observer.observe(section));

        return () => {
            sections.forEach((section) => observer.unobserve(section));
        };
    }, [mounted, activeMethod]); // Wichtig: Re-run wenn sich die Methode ändert

    if (!mounted) return null;

    const currentSteps = activeMethod === 'binary' ? binarySteps : sourceSteps;

    // --- PORTAL CONTENT: STICKY BAR ---
    const stickyBar = (
        <div
            className="fixed bottom-0 left-0 right-0 w-full z-[99999] px-6 py-6 flex justify-center pointer-events-none"
            style={{ paddingBottom: 'max(1.5rem, env(safe-area-inset-bottom))' }}
        >
            <div className="pointer-events-auto flex w-full max-w-sm justify-between p-1.5 bg-black/90 backdrop-blur-xl border border-white/10 rounded-full shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)]">
                <LayoutGroup id="manual-toggle">
                    <button
                        onClick={() => { setActiveMethod('binary'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                        className={`relative flex-1 py-3 text-[10px] font-bold uppercase tracking-widest rounded-full transition-colors duration-300 flex justify-center items-center gap-2 ${
                            activeMethod === 'binary' ? 'text-black' : 'text-white/40 hover:text-white'
                        }`}
                    >
                        {activeMethod === 'binary' && (
                            <motion.div
                                layoutId="activeMethodManual"
                                className="absolute inset-0 bg-white rounded-full"
                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                style={{ zIndex: 0 }}
                            />
                        )}
                        <span className="relative z-10 flex items-center gap-2">
                            <BinaryIcon /> Core Binary
                        </span>
                    </button>

                    <button
                        onClick={() => { setActiveMethod('source'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                        className={`relative flex-1 py-3 text-[10px] font-bold uppercase tracking-widest rounded-full transition-colors duration-300 flex justify-center items-center gap-2 ${
                            activeMethod === 'source' ? 'text-black' : 'text-white/40 hover:text-white'
                        }`}
                    >
                        {activeMethod === 'source' && (
                            <motion.div
                                layoutId="activeMethodManual"
                                className="absolute inset-0 bg-white rounded-full"
                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                style={{ zIndex: 0 }}
                            />
                        )}
                        <span className="relative z-10 flex items-center gap-2">
                            <GithubIcon /> Source Build
                        </span>
                    </button>
                </LayoutGroup>
            </div>
        </div>
    );

    return (
        <div className="relative min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white">
            <style jsx global>{`
                html { overflow-y: auto; overflow-x: hidden; height: auto; scroll-behavior: smooth; }
                body { background-color: #000000; min-height: 100vh; position: relative; }
                .code-scroll::-webkit-scrollbar { height: 4px; }
                .code-scroll::-webkit-scrollbar-track { background: transparent; }
                .code-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 2px; }
            `}</style>

            <main className="relative z-10 pt-32 md:pt-40">

                {/* --- GRID HEADER ROW --- */}
                <div className="w-full">
                    <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24">
                        <div className="py-16 md:py-8 md:px-8 lg:px-12">
                            <h2 className="text-4xl md:text-5xl lg:text-[56px] font-medium tracking-tight text-black mb-6 leading-[1.1]">
                                Deployment Protocols
                            </h2>
                            <p className="text-[15px] md:text-[16px] text-gray-500 max-w-2xl font-light leading-relaxed">
                                Due to our strict Zero-Trust architecture, Pytja does not rely on centralized servers or pre-packaged credentials. Every deployment is a sovereign, isolated environment.
                            </p>
                        </div>
                    </div>
                </div>

                {/* --- GRID SPLIT ROW (Sidebar & Steps) --- */}
                <section className="w-full border-t border-black/10 relative z-20 mt-8" style={{ clipPath: 'inset(0)' }}>
                    <div className="max-w-[1600px] mx-auto px-0 md:px-12 lg:px-24 flex flex-col md:flex-row md:divide-x divide-black/10">

                        {/* LEFT COLUMN: Sticky Navigation Sidebar */}
                        <div className="hidden md:block md:w-1/3 lg:w-1/4 p-6 md:p-8 lg:p-12 relative border-b md:border-b-0 border-black/10 z-0 before:absolute before:inset-y-0 before:right-0 before:w-[100vw] before:bg-black/[0.01] before:-z-10">
                            <div className="md:sticky md:top-32 flex flex-col gap-8 transform-gpu">
                                <span className="text-[10px] text-gray-400 font-mono uppercase tracking-widest">
                                    Index
                                </span>

                                <nav className="flex flex-col gap-6">
                                    {currentSteps.map((step) => (
                                        <a
                                            key={step.id}
                                            href={`#${step.id}`}
                                            onClick={(e) => { e.preventDefault(); document.getElementById(step.id)?.scrollIntoView({ behavior: 'smooth' }); setActiveSection(step.id); }}
                                            className="group flex items-center gap-4 cursor-pointer"
                                        >
                                            <div className="w-1.5 flex items-center justify-center h-6 shrink-0">
                                                <div className={`w-1.5 rounded-full transition-all duration-500 ease-out ${
                                                    activeSection === step.id ? "h-6 bg-black shadow-sm" : "h-1.5 bg-black/10 group-hover:bg-black/20"
                                                }`} />
                                            </div>
                                            <span className={`text-[12px] md:text-[13px] font-bold uppercase tracking-widest transition-colors duration-300 truncate ${
                                                activeSection === step.id ? "text-black" : "text-gray-400 group-hover:text-black"
                                            }`}>
                                                {step.title}
                                            </span>
                                        </a>
                                    ))}
                                </nav>
                            </div>
                        </div>

                        {/* RIGHT COLUMN: Scrolling Steps Area */}
                        <div className="w-full md:w-2/3 lg:w-3/4 flex flex-col">

                            {/* Rendert die Schritte basierend auf dem aktiven State */}
                            {currentSteps.map((step, index) => (
                                <div key={step.id} id={step.id} className="manual-step-section relative p-6 md:p-8 lg:p-12 flex flex-col gap-6 lg:min-h-[250px] scroll-mt-20">

                                    {/* Die absolute Trennlinie (Startet links, läuft endlos nach rechts) - außer beim ersten Element */}
                                    {index !== 0 && (
                                        <div className="absolute top-0 left-[-100vw] lg:left-0 w-[200vw] h-[1px] bg-black/10 pointer-events-none" />
                                    )}

                                    {/* Header (Zahl + Titel) */}
                                    <div className="flex items-center gap-4">
                                        <div className="text-[10px] font-bold font-mono text-gray-400 uppercase tracking-widest">
                                            Step {step.number}
                                        </div>
                                        <div className="h-px flex-1 bg-black/5" />
                                    </div>

                                    <div>
                                        <h3 className="text-2xl font-medium tracking-tight text-black mb-3">
                                            {step.title}
                                        </h3>
                                        <p className="text-[14px] md:text-[15px] text-gray-500 font-light leading-relaxed max-w-2xl">
                                            {step.desc}
                                        </p>

                                        {step.link && (
                                            <div className="mt-12">
                                                <Link
                                                    href={step.link.href}
                                                    className="group inline-flex items-center gap-2 text-[13px] font-medium text-black transition-all w-fit border-b border-black/20 pb-0.5 hover:text-gray-600 hover:border-gray-600"
                                                >
                                                    {step.link.text}
                                                    <span className="transform transition-transform duration-300 group-hover:translate-x-1">→</span>
                                                </Link>
                                            </div>
                                        )}
                                    </div>

                                    {/* Command Blocks (Sicherer Render-Check) */}
                                    {step.commands && step.commands.length > 0 && (
                                        <div className="w-full max-w-3xl space-y-3 mt-4">
                                            {step.commands.map((cmd, i) => (
                                                <CommandBlock key={i} cmd={cmd.cmd} output={cmd.output} />
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}

                        </div>
                    </div>
                </section>

                {/* --- ENVIRONMENT CONFIGURATION SECTION (10-Col Grid) --- */}
                {/* HIER GEÄNDERT: border-y sorgt für die obere und untere Linie */}
                <section id="env-config" className="w-full bg-white relative z-20 border-y border-black/10" style={{ clipPath: 'inset(0)' }}>
                    <div className="grid grid-cols-1 lg:grid-cols-10 divide-y lg:divide-y-0 lg:divide-x divide-black/10 max-w-[1600px] mx-auto px-0 md:px-12 lg:px-24">

                        {/* LINKE SPALTE: Info Text (4 von 10 Spalten) */}
                        {/* HIER GEÄNDERT: Gleicher Bleed-Trick wie bei der Sidebar oben */}
                        <div className="lg:col-span-4 p-6 md:p-8 lg:p-12 flex flex-col bg-black/[0.01] -ml-[100vw] pl-[calc(100vw+1.5rem)] md:pl-[calc(100vw+2rem)] lg:pl-[calc(100vw+3rem)]">

                            <div className="inline-flex items-center gap-3 border border-black/10 bg-white shadow-sm px-4 py-1.5 rounded-full w-fit mb-6">
                                <span className="text-[9px] text-gray-600 font-mono tracking-[0.4em] uppercase font-bold">
                                    Appendix
                                </span>
                            </div>

                            <h2 className="text-2xl md:text-3xl font-medium tracking-tight text-black mb-4">
                                Environment Variables
                            </h2>
                            <p className="text-[14px] md:text-[15px] text-gray-500 leading-relaxed max-w-md">
                                Regardless of your deployment method, Pytja relies on a local <code className="bg-black/[0.03] border border-black/10 px-1.5 py-0.5 rounded text-black font-mono text-[12px]">.env</code> file to map paths, connect to Redis, and strictly configure TLS.
                                <br/><br/>
                                Copy the reference configuration into your sovereign workspace before launching the core engine.
                            </p>
                        </div>

                        {/* RECHTE SPALTE: Der Env Block (6 von 10 Spalten) */}
                        <div className="lg:col-span-6 p-6 md:p-8 lg:p-12 flex items-center justify-center bg-white">
                            <div className="w-full">
                                <EnvBlock content={envContent} />
                            </div>
                        </div>

                    </div>
                </section>

            </main>

            {createPortal(stickyBar, document.body)}
        </div>
    );
}

// --- SUB-KOMPONENTEN ---

function CommandBlock({ cmd, output }: { cmd: string, output?: string }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(cmd);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="w-full bg-[#0a0a0a] rounded-lg p-4 relative group shadow-sm overflow-hidden flex flex-col border border-black/5">
            <button
                onClick={handleCopy}
                className="absolute top-3 right-3 p-1.5 bg-white/10 hover:bg-white/20 text-white/50 hover:text-white rounded-md transition-colors z-10 cursor-pointer"
                title="Copy to clipboard"
            >
                {copied ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-emerald-400">
                        <polyline points="20 6 9 17 4 12" />
                    </svg>
                ) : (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                )}
            </button>

            <div className="overflow-x-auto code-scroll pr-10 hide-scrollbar">
                <div className="flex items-center gap-3 text-white/90 whitespace-nowrap font-mono text-[12px]">
                    <span className="text-white/30 font-bold select-none">$</span>
                    <span className="select-all">{cmd}</span>
                </div>
            </div>

            {output && (
                <div className="mt-3 pt-3 border-t border-white/10 text-white/40 font-mono text-[11px] whitespace-pre-wrap break-all leading-relaxed">
                    {output}
                </div>
            )}
        </div>
    );
}

function EnvBlock({ content }: { content: string }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(content);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="w-full bg-[#0a0a0a] rounded-lg relative overflow-hidden group shadow-md border border-black/5">
            {/* Header Bar */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-[#111]">
                <div className="flex items-center gap-2">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/40">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <line x1="16" y1="13" x2="8" y2="13"></line>
                        <line x1="16" y1="17" x2="8" y2="17"></line>
                        <polyline points="10 9 9 9 8 9"></polyline>
                    </svg>
                    <span className="text-[10px] text-white/50 uppercase tracking-widest font-bold">.env</span>
                </div>

                <button
                    onClick={handleCopy}
                    className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-white/40 hover:text-white transition-colors cursor-pointer"
                >
                    {copied ? (
                        <span className="text-emerald-400 flex items-center gap-1">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
                            Copied
                        </span>
                    ) : (
                        <span className="flex items-center gap-1">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                            Copy File
                        </span>
                    )}
                </button>
            </div>

            {/* Code Content mit Auto-Highlighting */}
            <div className="p-5 overflow-x-auto code-scroll bg-[#0a0a0a] hide-scrollbar">
                <pre className="text-[12px] font-mono leading-[1.6]">
                    {content.split('\n').map((line, i) => {
                        if (line.trim().startsWith('#')) {
                            return <div key={i} className="text-gray-500 italic">{line}</div>;
                        }
                        if (line.includes('=')) {
                            const [key, ...rest] = line.split('=');
                            const value = rest.join('=');
                            return (
                                <div key={i}>
                                    <span className="text-white/90">{key}</span>
                                    <span className="text-white/30">=</span>
                                    <span className="text-emerald-400/90">{value}</span>
                                </div>
                            );
                        }
                        return <div key={i} className="text-white/80 h-4">{line}</div>;
                    })}
                </pre>
            </div>
        </div>
    );
}

function BinaryIcon() {
    return (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z" />
        </svg>
    )
}

function GithubIcon() {
    return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
        </svg>
    )
}