"use client";
import React, { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';

// --- DATEN FÜR DIE SCROLL-ANIMATION ---
const archSteps = [
    {
        id: 1,
        title: "Air-gapped by design.",
        desc: "Herkömmliche Datenbank-Clients schreiben temporäre Dateien und Cache-Daten auf deine Festplatte. In sicherheitskritischen Umgebungen ist das ein massives Risiko.",
        stepTitle: "Connect Source",
        stepDesc: "Read-only stream established."
    },
    {
        id: 2,
        title: "Strict Memory Lock.",
        desc: "Pytja löst dieses Problem durch eine strikte In-Memory-Architektur, geschrieben in Rust. Sobald du das Terminal schließt, wird der zugewiesene RAM komplett vernichtet.",
        stepTitle: "Memory Allocation",
        stepDesc: "Rust bounds isolated RAM."
    },
    {
        id: 3,
        title: "Zero-Trace Execution.",
        desc: "Führe komplexe OSINT-Plugins direkt im isolierten Speicher aus. Keine Logs, keine Spuren auf dem Host-System. Absolute Sicherheit bei jedem Audit.",
        stepTitle: "Plugin Execution",
        stepDesc: "OSINT tools run in sandbox."
    }
];

export default function PytjaLanding() {

    const [activeStep, setActiveStep] = useState(1);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const scrollContainerRef = useRef<HTMLElement>(null);

    // --- DIE MAGIE: SCROLL-TRACKING (Fix für Loader-Transition) ---
    useEffect(() => {

        const handleScroll = () => {
            // Sicherstellen, dass die Ref existiert
            if (!scrollContainerRef.current) return;

            const container = scrollContainerRef.current;
            const rect = container.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            // Wir berechnen den Fortschritt basierend auf der Position der Sektion
            // Wenn die Sektion oben am Bildschirm klebt (rect.top <= 0)
            if (rect.top <= 0) {
                // Gesamter Scrollweg innerhalb der Sektion (Höhe der Sektion minus Viewport)
                const totalScrollable = rect.height - windowHeight;
                // Wie weit wir innerhalb dieses Bereichs gescrollt haben
                const currentScroll = Math.abs(rect.top);

                // Prozentualer Fortschritt (0 bis 1)
                const scrollProgress = Math.min(Math.max(currentScroll / totalScrollable, 0), 1);

                // Aufteilung in 3 Phasen (für 3 archSteps)
                if (scrollProgress < 0.33) {
                    setActiveStep(1);
                } else if (scrollProgress < 0.66) {
                    setActiveStep(2);
                } else {
                    setActiveStep(3);
                }
            }
        };

        // Wir fügen eine kleine Verzögerung hinzu, damit der Browser die Layout-Werte nach dem Loader-Fade stabil hat
        const timeoutId = setTimeout(() => {
            window.addEventListener('scroll', handleScroll);
            // Einmal initial ausführen, falls der User bereits gescrollt hat
            handleScroll();
        }, 100);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearTimeout(timeoutId);
        };
    }, []); // Wichtig: Der Effekt muss neu triggern, wenn loading auf false springt!

    // Fix für mobile Adressleiste (Buttons sichtbar machen)
    useEffect(() => {
        const handleResize = () => {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        };
        handleResize(); // Initial aufrufen
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    return (
        // LÖSCHE die Transition-Klassen (opacity-0 etc.)
        <div className="relative min-h-screen bg-[#0D0D0D]">
            <div className="fixed inset-0 bg-grid opacity-30 pointer-events-none" />

            {/* MOBILE DROPDOWN OVERLAY - Mit Smooth Transition Guard */}
            <div
                className={`fixed inset-0 z-[140] bg-[#050505] lg:hidden transition-all duration-500 ease-in-out flex flex-col ${
                    isMobileMenuOpen
                        ? 'opacity-100 translate-y-0 pointer-events-auto visible'
                        : 'opacity-0 -translate-y-4 pointer-events-none invisible'
                }`}
                // WICHTIG: Nutzt die berechnete Höhe, damit Buttons sichtbar bleiben
                style={{ height: 'calc(var(--vh, 1vh) * 100)' }}
            >
                {/* Das Grid im Hintergrund */}
                <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none z-0" />

                {/* Container mit flex-1 drückt die Buttons nach unten, aber innerhalb des Viewports */}
                <div className="relative z-10 flex flex-col h-full pt-32 px-10 gap-12 overflow-y-auto">
                    <nav className="flex flex-col gap-8 shrink-0">
                        {[
                            { name: 'Home', id: 'home' },
                            { name: 'Architecture', id: 'architecture' },
                            { name: 'Modularity', id: 'modularity' },
                            { name: 'Stats', id: 'stats' }
                        ].map((item, i) => (
                            <a
                                key={item.id}
                                href={`#${item.id}`}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`text-3xl font-bold tracking-tighter transition-all duration-700 delay-100 flex items-baseline gap-4 ${
                                    isMobileMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
                                }`}
                                style={{ transitionDelay: `${i * 50 + 200}ms` }}
                            >
                                <span className="text-[10px] font-mono text-white/10">0{i+1}</span>
                                <span className="text-white/40 hover:text-white">{item.name}</span>
                            </a>
                        ))}
                    </nav>

                    {/* Footer-Bereich: mt-auto schiebt ihn ans Ende, pb-24 sorgt für Abstand zur Adressleiste */}
                    <div className={`mt-auto pb-24 flex flex-col gap-4 shrink-0 transition-all duration-700 delay-500 ${
                        isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                    }`}>
                        <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="w-full py-4 text-center text-[10px] font-bold uppercase tracking-[0.3em] text-white/40 border border-white/5">
                            Contact Support
                        </Link>
                        <Link href="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="w-full py-5 text-center text-[10px] font-bold uppercase tracking-[0.3em] bg-white text-black relative">
                            Open Terminal
                        </Link>
                    </div>
                </div>
            </div>

            <main className="relative z-10">

                {/* --- HERO SECTION (Responsive & Optimized for Mobile/iPad) --- */}
                <section id="home" className="pt-32 md:pt-48 pb-20 md:pb-32 px-6 md:px-8 max-w-7xl mx-auto min-h-[90vh] flex items-center">
                    <div className="grid lg:grid-cols-2 gap-12 md:gap-20 w-full items-center">

                        {/* --- CONTENT (Wird auf Mobile nach unten geschoben) --- */}
                        <div className="space-y-8 md:space-y-12 text-center lg:text-left order-2 lg:order-1">
                            <div className="space-y-6">
                                {/* Prerelease Tag mit Live-Animation */}
                                <div className="text-[9px] md:text-[10px] text-[#666] font-mono tracking-[0.4em] uppercase flex items-center justify-center lg:justify-start gap-4">
                                    <div className="relative flex items-center justify-center w-2 h-2">
                                        {/* Der pulsierende Außenring (Ping) */}
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-sm bg-white/40 opacity-75"></span>
                                        {/* Das feste Viereck im Zentrum (etwas kleiner) */}
                                        <span className="relative inline-flex rounded-sm h-1.5 w-1.5 bg-white/80"></span>
                                    </div>
                                    <span>Prerelease V1 [Stable]</span>
                                </div>

                                {/* Haupt-Titel */}
                                <h1 className="text-6xl md:text-8xl lg:text-[110px] font-black leading-[0.85] tracking-tighter uppercase text-white">
                                    PYTJA
                                </h1>

                                {/* Subtext */}
                                <p className="text-lg md:text-xl text-[#888] max-w-md mx-auto lg:mx-0 font-light leading-relaxed">
                                    Isolated database exploration engine. Zero disk traces, pure native speed.
                                </p>
                            </div>

                            {/* Button */}
                            <div className="flex justify-center lg:justify-start">
                                <Link
                                    href="/dashboard"
                                    className="group flex items-center border border-white/20 bg-white/[0.03] px-8 md:px-10 py-4 transition-all duration-500 hover:bg-white/[0.08] hover:border-white/50 w-fit cursor-pointer relative overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    <span className="text-[10px] text-white font-bold tracking-[0.3em] uppercase relative z-10">
                        Launch Terminal
                    </span>
                                    <div className="flex items-center justify-end w-0 opacity-0 overflow-hidden transition-all duration-500 group-hover:w-6 group-hover:opacity-100 group-hover:ml-3 relative z-10">
                                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="square" strokeWidth="2" d="M5 12h14m-7-7 7 7-7 7" />
                                        </svg>
                                    </div>
                                </Link>
                            </div>
                        </div>

                        {/* --- 3D VISUAL (Sichtbar auf allen Geräten, skaliert auf Mobile) --- */}
                        <div className="relative flex items-center justify-center h-[350px] md:h-[500px] order-1 lg:order-2">
                            {/* scale-[0.7] verkleinert den Würfel auf Handys, sm:scale-90 auf Tablets, lg:scale-100 auf Desktop */}
                            <div className="transform scale-[0.7] sm:scale-90 lg:scale-100 transition-transform duration-500">
                                <Interactive3DVisual />
                            </div>

                            {/* Subtiler Glow-Effekt im Hintergrund nur für Mobile/Tablet um Tiefe zu geben */}
                            <div className="absolute inset-0 bg-white/5 blur-[80px] rounded-full lg:hidden pointer-events-none" />
                        </div>
                    </div>
                </section>

                {/* --- ARCHITECTURE SECTION (Responsive: Scroll-Jacking Desktop, Clean List Mobile) --- */}
                <section id="architecture" ref={scrollContainerRef} className="relative border-t border-[#222] lg:h-[400vh]">

                    {/* Desktop-Variante: Sticky (Unverändert) */}
                    <div className="hidden lg:flex sticky top-0 h-screen items-center bg-[#0D0D0D] overflow-hidden">
                        <div className="w-full max-w-7xl mx-auto px-8 grid lg:grid-cols-2 gap-20 items-center">

                            {/* LINKS: Das Diagramm mit intelligenten Pfaden */}
                            <div className="relative p-4">
                                <div className="text-[10px] text-[#444] tracking-[0.2em] mb-12 uppercase font-bold pl-2">Request Lifecycle</div>
                                <div className="flex flex-col items-start">

                                    {/* SCHRITT 01 */}
                                    <FlowStepGlass number="01" title={archSteps[0].stepTitle} desc={archSteps[0].stepDesc} state={activeStep === 1 ? 'active' : activeStep > 1 ? 'done' : 'idle'} />

                                    {/* VERBINDUNG 1 -> 2 */}
                                    <div className="relative w-px h-16 ml-[35px] bg-[#222]">
                                        <div
                                            className={`absolute top-0 left-0 w-full transition-all duration-700 ease-in-out ${
                                                activeStep === 2
                                                    ? 'h-full bg-gradient-to-b from-white/20 to-white opacity-100' // Aktiv am Laden/Ziel
                                                    : activeStep > 2
                                                        ? 'h-full bg-white opacity-20' // Abgeschlossen & ausgegraut
                                                        : 'h-0 bg-white opacity-0'     // Noch nicht erreicht
                                            }`}
                                        />
                                    </div>

                                    {/* SCHRITT 02 */}
                                    <FlowStepGlass number="02" title={archSteps[1].stepTitle} desc={archSteps[1].stepDesc} state={activeStep === 2 ? 'active' : activeStep > 2 ? 'done' : 'idle'} />

                                    {/* VERBINDUNG 2 -> 3 */}
                                    <div className="relative w-px h-16 ml-[35px] bg-[#222]">
                                        <div
                                            className={`absolute top-0 left-0 w-full transition-all duration-700 ease-in-out ${
                                                activeStep === 3
                                                    ? 'h-full bg-gradient-to-b from-white/20 to-white opacity-100' // Aktiv am Laden/Ziel
                                                    : activeStep > 3
                                                        ? 'h-full bg-white opacity-20'
                                                        : 'h-0 bg-white opacity-0'
                                            }`}
                                        />
                                    </div>

                                    {/* SCHRITT 03 */}
                                    <FlowStepGlass number="03" title={archSteps[2].stepTitle} desc={archSteps[2].stepDesc} state={activeStep === 3 ? 'active' : 'idle'} />
                                </div>
                            </div>

                            {/* RECHTS: Der Text */}
                            <div className="space-y-8 relative h-[300px] overflow-hidden">
                                {archSteps.map((step) => {
                                    const isActive = activeStep === step.id;
                                    return (
                                        <div
                                            key={step.id}
                                            className={`absolute inset-0 flex flex-col justify-center transition-all duration-700 ease-in-out ${
                                                isActive ? 'opacity-100 translate-y-0' : step.id < activeStep ? 'opacity-0 -translate-y-16' : 'opacity-0 translate-y-16'
                                            }`}
                                        >
                                            <div className="text-[10px] text-white/40 font-mono tracking-[0.4em] uppercase mb-6 flex items-center gap-3">
                                                <span className="w-8 h-px bg-white/20" /> Phase {step.id}
                                            </div>
                                            <h2 className="text-4xl lg:text-5xl font-bold tracking-tighter text-white mb-6">{step.title}</h2>
                                            <p className="text-[#888] text-sm lg:text-base leading-relaxed font-light">{step.desc}</p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Mobile-Variante: Refined Technical Layout */}
                    <div className="lg:hidden bg-[#0D0D0D] py-24 px-8 space-y-32">
                        <div className="text-[10px] text-[#444] tracking-[0.3em] mb-16 uppercase font-bold text-center">
                            Request Lifecycle
                        </div>

                        {archSteps.map((step, index) => (
                            <div key={step.id} className="relative pl-10 border-l border-white/5">

                                {/* DER WANDERNDE AKZENT-STRICH */}
                                {/* index 0 (Top), index 1 (Center), index 2 (Bottom) */}
                                <div className={`
                    absolute -left-[1px] w-[1.5px] h-12 bg-white/60 shadow-[0_0_10px_rgba(255,255,255,0.3)]
                    ${index === 0 ? 'top-0' : index === 1 ? 'top-1/2 -translate-y-1/2' : 'bottom-0'}
                `} />

                                <div className="space-y-8">
                                    {/* Header: Einfacher technischer Strich statt Box */}
                                    <div className="flex items-center gap-4 text-[10px] text-white/40 font-mono tracking-[0.3em] uppercase">
                                        <div className="w-4 h-px bg-white/40" />
                                        {step.stepTitle}
                                    </div>

                                    {/* Content */}
                                    <div className="space-y-6">
                                        <h2 className="text-3xl font-bold tracking-tighter text-white leading-[1.1]">
                                            {step.title}
                                        </h2>
                                        <div className="space-y-4">
                                            <p className="text-[#888] text-sm leading-relaxed font-light border-l border-white/10 pl-4 py-1 italic">
                                                {step.stepDesc}
                                            </p>
                                            <p className="text-[#555] text-xs leading-relaxed font-light">
                                                {step.desc}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* --- NEUE SECTION: INTERAKTIVER BLOCK-HAUFEN --- */}
                <section id="modularity" className="py-32 border-t border-[#222] bg-[#0D0D0D] relative overflow-hidden">
                    <div className="max-w-7xl mx-auto px-8 grid lg:grid-cols-2 gap-20 items-center">

                        {/* LINKE SEITE: Text */}
                        <div className="space-y-8 relative z-10">
                            <div className="text-[10px] text-white/40 font-mono tracking-[0.3em] uppercase flex items-center gap-4">
                                <span className="w-8 h-px bg-white/20" /> Modular Architecture
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white">
                                Stackable <br/> <span className="text-white/40">Security Modules.</span>
                            </h2>
                            <p className="text-[#888] text-sm md:text-base leading-relaxed font-light max-w-md">
                                Unsere Architektur ist granular. Jeder Block repräsentiert ein isoliertes Rust-Modul. Klicken Sie auf den hervorgehobenen Kern-Block, um die dynamische Speicher-Allokation zu testen.
                            </p>
                        </div>

                        {/* RECHTE SEITE: 3D Block-Haufen */}
                        <div className="relative h-[400px] flex items-center justify-center perspective-2000 cursor-grab active:cursor-grabbing">
                            {/* Die Szene: Steiler Blickwinkel von schräg oben */}
                            <BlockClusterScene />
                        </div>
                    </div>
                </section>

                {/* --- STATS SECTION (Mit animierten Graphen) --- */}
                <section id="stats" className="py-32 border-t border-[#222] bg-[#0D0D0D] relative z-10">
                    <div className="max-w-7xl mx-auto px-8">
                        <div className="flex items-center justify-between mb-16">
                            <div className="text-[10px] text-white/40 font-mono tracking-[0.3em] uppercase">System Telemetry</div>
                            <div className="text-[10px] text-white/20 font-mono">LIVE FEED</div>
                        </div>

                        {/* Grid für die Graphen */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-[#222] border border-[#222]">
                            <GraphCard title="Transfer Throughput" value="36 GB/s" sub="Peak Performance">
                                <SpeedChart />
                            </GraphCard>

                            <GraphCard title="Memory Isolation" value="100 %" sub="Strict Lock">
                                <MemoryChart />
                            </GraphCard>

                            <GraphCard title="Disk Write" value="0.0 MB" sub="Zero Trace">
                                <DiskChart />
                            </GraphCard>

                            <GraphCard title="Engine Latency" value="0.2 ms" sub="Realtime">
                                <LatencyChart />
                            </GraphCard>
                        </div>
                    </div>
                </section>

            </main>
        </div>
    );
}

function StatBlock({ label, value }: { label: string, value: string }) {
    return (
        <div className="p-10 hover:bg-[#111] transition-colors flex flex-col justify-center group">
            <div className="text-[10px] text-[#555] font-mono tracking-[0.2em] uppercase mb-3 group-hover:text-accent transition-colors">{label}</div>
            <div className="text-3xl font-bold tracking-tighter text-white">{value}</div>
        </div>
    );
}

// --- HIGH PERFORMANCE HERO VISUAL (Gradient Glass, No Blur) ---

function Interactive3DVisual() {
    const [hoveredBlock, setHoveredBlock] = useState<number | null>(null);

    // Refs für direkten DOM-Zugriff
    const containerRef = useRef<HTMLDivElement>(null);
    const topCubeRef = useRef<HTMLDivElement>(null);
    const midCubeRef = useRef<HTMLDivElement>(null);
    const botCubeRef = useRef<HTMLDivElement>(null);

    // Zeit-Variable
    const timeRef = useRef(0);
    const requestRef = useRef<number>(0);

    useEffect(() => {
        const animate = () => {
            // Zeit läuft nur weiter, wenn NICHT gehovert wird
            if (!hoveredBlock) {
                timeRef.current += 0.008;
            }

            const t = timeRef.current;
            const sinWave = Math.sin(t);
            const normalizedWave = (sinWave + 1) / 2; // 0 bis 1

            // 1. GLOBALES SCHWEBEN (Container)
            if (containerRef.current) {
                const floatY = normalizedWave * -40;
                // rotateZ(-45deg) sorgt für die isometrische Ausrichtung
                containerRef.current.style.transform = `translateY(${floatY}px) rotateX(60deg) rotateZ(-45deg)`;
            }

            // 2. ATMEN (Die Würfel ziehen sich auseinander)

            // TOP CUBE
            if (topCubeRef.current) {
                const zTop = 45 + (normalizedWave * 75);
                topCubeRef.current.style.transform = `translateZ(${zTop}px)`;
            }

            // MID CUBE
            if (midCubeRef.current) {
                midCubeRef.current.style.transform = `translateZ(0px)`;
            }

            // BOT CUBE
            if (botCubeRef.current) {
                const zBot = -45 - (normalizedWave * 75);
                botCubeRef.current.style.transform = `translateZ(${zBot}px)`;
            }

            requestRef.current = requestAnimationFrame(animate);
        };

        requestRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(requestRef.current);
    }, [hoveredBlock]);

    return (
        // will-change-transform hilft dem Browser bei der Optimierung
        <div
            className="relative w-72 h-72 preserve-3d will-change-transform"
            ref={containerRef}
            onMouseLeave={() => setHoveredBlock(null)}
        >
            <WireframeCube
                id={1}
                label="gRPC STREAMING"
                hoveredBlock={hoveredBlock}
                setHoveredBlock={setHoveredBlock}
                cubeRef={topCubeRef}
            />
            <WireframeCube
                id={2}
                label="REDIS HANDLING"
                hoveredBlock={hoveredBlock}
                setHoveredBlock={setHoveredBlock}
                cubeRef={midCubeRef}
            />
            <WireframeCube
                id={3}
                label="RUST CORE"
                hoveredBlock={hoveredBlock}
                setHoveredBlock={setHoveredBlock}
                cubeRef={botCubeRef}
            />
        </div>
    );
}

function WireframeCube({
                           id, label, hoveredBlock, setHoveredBlock, cubeRef
                       }: {
    id: number, label: string, hoveredBlock: number | null, setHoveredBlock: (id: number | null) => void, cubeRef: React.RefObject<HTMLDivElement | null>
}) {
    const isHovered = hoveredBlock === id;

    // Dynamischer Z-Index gegen Flackern
    const dynamicZIndex = isHovered ? 100 : (10 - id);

    // STYLING HIERARCHIE (Performance & Visual Clarity)

    // 1. TOP FACE (Deckel): Am wichtigsten, enthält Text. Hellster Gradient.
    const styleTop = isHovered
        ? "border-white/80 bg-gradient-to-br from-white/20 to-white/5 shadow-[0_0_30px_rgba(255,255,255,0.15)]" // Active
        : "border-white/40 bg-gradient-to-br from-white/10 to-transparent shadow-[inset_0_0_20px_rgba(255,255,255,0.05)]"; // Idle

    // 2. SIDES (Seiten): Mittel. Nur leichte Struktur.
    const styleSide = "border-white/20 bg-white/[0.02]";

    // 3. BOTTOM / BACK (Unten/Hinten): Dunkel. Verhindert visuelles Chaos.
    const styleHidden = "border-white/5 bg-transparent";

    return (
        // OUTER WRAPPER: Z-Position (Atmen) via JS
        <div
            ref={cubeRef}
            className="absolute inset-0 preserve-3d will-change-transform"
            style={{ zIndex: dynamicZIndex }}
        >
            {/* INNER MOVER: Hover Slide via CSS */}
            <div
                onMouseEnter={() => setHoveredBlock(id)}
                className="absolute inset-0 preserve-3d cursor-pointer transition-transform duration-500 ease-out will-change-transform"
                style={{
                    transform: isHovered
                        ? 'translateX(-140px) translateY(40px)'
                        : 'translateX(0) translateY(0)'
                }}
            >
                {/* Hitbox für einfacheres Hovern */}
                <div className="absolute inset-0 bg-transparent z-20 pointer-events-auto" />

                {/* --- 1. TOP FACE (Deckel mit Text) --- */}
                <div
                    className={`absolute inset-0 flex items-center justify-center z-10 transition-colors duration-300 pointer-events-none border ${styleTop}`}
                >
                    <span className={`text-[10px] font-bold tracking-[0.5em] uppercase drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-colors ${isHovered ? 'text-white' : 'text-white/70'}`}>
                        {label}
                    </span>
                </div>

                {/* --- 2. BOTTOM FACE (Dunkel) --- */}
                <div className={`absolute inset-0 border pointer-events-none ${styleHidden}`} style={{ transform: 'translateZ(-30px)' }} />

                {/* --- SEITENWÄNDE --- */}

                {/* Nord (Oben im Bild) -> Eher dunkel */}
                <div className={`absolute top-0 left-0 w-full h-[30px] origin-top pointer-events-auto border ${styleHidden}`} style={{ transform: 'rotateX(-90deg)' }} />

                {/* Süd (Unten im Bild, Frontal) -> Sichtbar */}
                <div className={`absolute bottom-0 left-0 w-full h-[30px] origin-bottom pointer-events-auto border ${styleSide}`} style={{ transform: 'rotateX(90deg)' }} />

                {/* Ost (Rechts) -> Dunkler */}
                <div className={`absolute top-0 right-0 w-[30px] h-full origin-right pointer-events-auto border ${styleHidden}`} style={{ transform: 'rotateY(-90deg)' }} />

                {/* West (Links, Frontal) -> Sichtbar */}
                <div className={`absolute top-0 left-0 w-[30px] h-full origin-left pointer-events-auto border ${styleSide}`} style={{ transform: 'rotateY(90deg)' }} />
            </div>
        </div>
    );
}

// --- 3D LOGO KOMPONENTEN ---

function Logo3DP() {
    // Der exakte Vektor-Pfad für ein eckiges "P" (Breite 20px, Höhe 25px) inkl. Loch in der Mitte
    const pathString = "M 0 0 H 20 V 15 H 5 V 25 H 0 Z M 5 5 V 10 H 15 V 5 Z";

    // Baut die einheitliche Vorder- und Rückseite
    const Face = ({ z }: { z: number }) => (
        <>
            <div
                className="absolute inset-0 bg-[#0D0D0D]/40 backdrop-blur-sm"
                style={{
                    transform: `translateZ(${z}px)`,
                    clipPath: `path('${pathString}')`
                }}
            />
            {/* Der weiße Rand für die komplexe Form */}
            <svg className="absolute inset-0 pointer-events-none" width="20" height="25" style={{ transform: `translateZ(${z}px)` }}>
                <path d={pathString} fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1" fillRule="evenodd" />
            </svg>
        </>
    );

    // Baut die 3D-Seitenwände (Horizontal)
    const EdgeH = ({ x, y, w }: { x: number, y: number, w: number }) => (
        <div className="absolute bg-white/5 backdrop-blur-sm border border-white/40"
             style={{ left: x, top: y, width: w, height: 5, transform: 'translateY(-2.5px) rotateX(90deg)' }} />
    );

    // Baut die 3D-Seitenwände (Vertikal)
    const EdgeV = ({ x, y, h }: { x: number, y: number, h: number }) => (
        <div className="absolute bg-white/5 backdrop-blur-sm border border-white/40"
             style={{ left: x, top: y, width: 5, height: h, transform: 'translateX(-2.5px) rotateY(90deg)' }} />
    );

    return (
        <div className="relative w-8 h-8 preserve-3d flex items-center justify-center mr-1">
            <style>{`
                @keyframes logo-float {
                    /* Der perfekte isometrische Blickwinkel von unten rechts */
                    0%, 100% { transform: translateY(0px) rotateX(50deg) rotateY(-40deg) rotateZ(-10deg); }
                    50% { transform: translateY(-4px) rotateX(50deg) rotateY(-40deg) rotateZ(-10deg); }
                }
                .animate-logo-float {
                    animation: logo-float 4s ease-in-out infinite;
                }
            `}</style>

            <div className="absolute inset-0 bg-white/20 blur-xl rounded-full" />

            <div className="relative preserve-3d animate-logo-float" style={{ width: 20, height: 25 }}>
                {/* 1. Vorder- und Rückseite (als eine einzige Form) */}
                <Face z={2.5} />
                <Face z={-2.5} />

                {/* 2. Die äußeren Kanten (Haut) um das P */}
                <EdgeH x={0} y={0} w={20} />   {/* Kante Oben */}
                <EdgeV x={20} y={0} h={15} />  {/* Kante Rechts Oben */}
                <EdgeH x={5} y={15} w={15} />  {/* Kante Rechts Einbuchtung */}
                <EdgeV x={5} y={15} h={10} />  {/* Kante Rechts Unten (Stamm) */}
                <EdgeH x={0} y={25} w={5} />   {/* Kante Unten */}
                <EdgeV x={0} y={0} h={25} />   {/* Kante Links */}

                {/* 3. Die inneren Kanten (Haut) des Lochs */}
                <EdgeH x={5} y={5} w={10} />   {/* Loch Oben */}
                <EdgeV x={15} y={5} h={5} />   {/* Loch Rechts */}
                <EdgeH x={5} y={10} w={10} />  {/* Loch Unten */}
                <EdgeV x={5} y={5} h={5} />    {/* Loch Links */}
            </div>
        </div>
    );
}

function FlowStepGlass({ number, title, desc, state }: { number: string, title: string, desc: string, state: 'idle' | 'active' | 'done' }) {
    const isActive = state === 'active';
    const isDone = state === 'done';

    return (
        <div className={`
            relative border transition-all duration-700 px-0 flex items-stretch w-full overflow-hidden
            ${isActive
            ? 'border-white/60 bg-white/[0.08] shadow-[0_0_30px_rgba(255,255,255,0.05)] translate-x-2'
            : isDone ? 'border-white/20 bg-white/[0.02] opacity-60' : 'border-white/5 bg-transparent opacity-30'}
        `}>
            {/* LINKER BLOCK: Quadratische Zahl-Box, exakt so hoch wie der Content rechts */}
            <div className={`
                flex items-center justify-center font-mono border-r transition-all duration-500 px-6
                ${isActive ? 'border-white/40 text-white bg-white/10' : 'border-white/10 text-white/20'}
            `}>
                <span className="text-sm font-bold">{number}</span>
            </div>

            {/* RECHTER BLOCK: Content mit Padding */}
            <div className="py-6 px-8 flex flex-col justify-center">
                <div className={`text-[11px] font-bold uppercase tracking-[0.2em] mb-1 ${isActive ? 'text-white' : 'text-white/50'}`}>
                    {title}
                </div>
                <div className={`text-[10px] leading-relaxed font-mono ${isActive ? 'text-white/40' : 'text-white/20'}`}>
                    {desc}
                </div>
            </div>
        </div>
    );
}

function GraphCard({ title, value, sub, children }: { title: string, value: string, sub: string, children: React.ReactElement }) {
    const [isVisible, setIsVisible] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); }
        }, { threshold: 0.5 });
        if (cardRef.current) observer.observe(cardRef.current);
        return () => observer.disconnect();
    }, []);

    const chartWithProps = React.cloneElement(children as React.ReactElement<any>, { visible: isVisible });

    return (
        <div ref={cardRef} className="bg-[#0A0A0A] p-6 border-r border-white/5 flex flex-col justify-between group h-56">
            <div className="space-y-1">
                <div className="text-[9px] text-white/30 font-mono tracking-[0.2em] uppercase">{title}</div>
                <div className="flex items-baseline gap-2">
                    <div className="text-2xl font-light tracking-tighter text-white font-mono">{value}</div>
                    <div className="text-[9px] text-white/10 font-mono">{sub}</div>
                </div>
            </div>

            {/* Der Graph: Jetzt flacher und technischer */}
            <div className="h-16 w-full opacity-40 group-hover:opacity-100 transition-opacity duration-500">
                {chartWithProps}
            </div>

            <div className="flex items-center gap-2">
                <div className={`w-1 h-1 rounded-full ${isVisible ? 'bg-white animate-pulse' : 'bg-white/10'}`} />
                <div className="text-[8px] text-white/20 font-mono uppercase tracking-widest">Node_Alpha_01 // Verified</div>
            </div>
        </div>
    );
}

function SpeedChart({ visible }: { visible?: boolean }) {
    return (
        <svg viewBox="0 0 100 40" className="w-full h-full overflow-visible">
            {/* Statische Hintergrund-Raster */}
            <path d="M0 10 H100 M0 20 H100 M0 30 H100" stroke="white" strokeWidth="0.1" strokeOpacity="0.2" />

            <path
                d="M0 35 L15 32 L25 38 L35 15 L45 22 L55 8 L65 12 L75 5 L85 18 L100 15"
                fill="none"
                stroke="white"
                strokeWidth="0.8"
                strokeDasharray="150"
                strokeDashoffset={visible ? 0 : 150}
                className="transition-all duration-[2500ms] ease-in-out shadow-[0_0_10px_rgba(255,255,255,0.3)]"
            />
        </svg> // <-- Hier war vorher fälschlicherweise ein </div>
    );
}

// 2. MEMORY CHART (Fix: Client-Side Randomness)
function MemoryChart({ visible }: { visible?: boolean }) {
    // Startet leer, damit Server & Client gleich sind
    const [bars, setBars] = useState<number[]>([]);

    useEffect(() => {
        // Erst im Browser generieren wir die Zufallswerte
        setBars(Array.from({ length: 10 }, (_, i) => 10 + (i * 2) + Math.random() * 10));
    }, []);

    return (
        <svg viewBox="0 0 100 40" className="w-full h-full">
            <path d="M0 10 H100 M0 20 H100 M0 30 H100" stroke="white" strokeWidth="0.1" strokeOpacity="0.2" />
            {bars.map((height, i) => (
                <rect
                    key={i}
                    x={i * 10 + 2}
                    y={40 - height}
                    width="2"
                    height={height}
                    fill="white"
                    fillOpacity={visible ? "0.4" : "0"}
                    className="transition-all duration-1000 ease-out"
                    style={{ transitionDelay: `${i * 50}ms` }}
                />
            ))}
        </svg>
    );
}

// 3. DISK CHART (Präzise Null-Linie mit Check-Impuls)
function DiskChart({ visible }: { visible?: boolean }) {
    return (
        <svg viewBox="0 0 100 40" className="w-full h-full overflow-visible">
            <path d="M0 10 H100 M0 20 H100 M0 30 H100" stroke="white" strokeWidth="0.1" strokeOpacity="0.2" />
            <path
                d="M0 38 H 45 L 48 30 L 52 38 H 100"
                fill="none"
                stroke="white"
                strokeWidth="0.8"
                strokeDasharray="100"
                strokeDashoffset={visible ? 0 : 100}
                className="transition-all duration-[1500ms] ease-linear"
            />
        </svg>
    );
}

// 4. LATENCY CHART (Feine Sinus-Welle)
function LatencyChart({ visible }: { visible?: boolean }) {
    return (
        <svg viewBox="0 0 100 40" className="w-full h-full overflow-visible">
            <path d="M0 10 H100 M0 20 H100 M0 30 H100" stroke="white" strokeWidth="0.1" strokeOpacity="0.2" />
            <path
                d="M0 20 Q 12.5 5, 25 20 T 50 20 T 75 20 T 100 20"
                fill="none"
                stroke="white"
                strokeWidth="0.8"
                strokeDasharray="110"
                strokeDashoffset={visible ? 0 : 110}
                className="transition-all duration-[2000ms] ease-in-out"
            />
        </svg>
    );
}

// --- ULTRA-SMOOTH LIGHT FADE & SEQUENCE ---

function BlockClusterScene() {
    const [isAnimating, setIsAnimating] = useState(false);
    const [litSatelliteId, setLitSatelliteId] = useState<number | null>(null);

    const satellites = [
        { id: 1, x: 180, y: 40, z: 60 },
        { id: 2, x: -180, y: -40, z: 30 },
        { id: 3, x: 0, y: -200, z: 0 },
        { id: 4, x: -60, y: 160, z: 120 },
        { id: 5, x: 200, y: 0, z: -150 },
    ];

    const triggerAnimation = () => {
        if (isAnimating) return;
        setIsAnimating(true);

        // Der Rhythmus: Jedes Modul glüht für 1,2 Sekunden auf
        // Die Intervalle (400ms) sind kürzer als die Leuchtdauer (1200ms),
        // wodurch ein fließender Übergang (Fade-In/Out Überlappung) entsteht.
        satellites.forEach((sat, index) => {
            setTimeout(() => {
                setLitSatelliteId(sat.id);
                // Sanftes Ausfaden nach 1.2 Sekunden
                setTimeout(() => {
                    setLitSatelliteId((current) => current === sat.id ? null : current);
                }, 1200);
            }, index * 400 + 400);
        });

        setTimeout(() => {
            setIsAnimating(false);
        }, 3500);
    };

    return (
        <div className="relative w-full h-full flex items-center justify-center perspective-[1200px]">
            <div
                className="relative preserve-3d"
                style={{
                    transform: 'rotateX(-20deg) rotateY(-30deg)',
                    transformStyle: 'preserve-3d'
                }}
            >
                {/* --- CORE --- */}
                <div
                    className={`absolute top-0 left-0 preserve-3d cursor-pointer 
                        ${isAnimating ? 'animate-core-ultra-jump' : 'animate-float-core'}`}
                    onClick={triggerAnimation}
                >
                    <div className={`preserve-3d ${isAnimating ? 'animate-core-ultra-spin' : ''}`}>
                        <True3DCube size={100} x={0} y={0} z={0} isCore={true} />
                    </div>
                </div>

                {/* --- SATELLITES --- */}
                {satellites.map((sat) => (
                    <div
                        key={sat.id}
                        className={`absolute top-0 left-0 preserve-3d animate-float-${sat.id} will-change-transform`}
                        style={{ animationDuration: `${6 + sat.id}s` }}
                    >
                        <True3DCube
                            size={50}
                            x={sat.x} y={sat.y} z={sat.z}
                            isLit={litSatelliteId === sat.id}
                        />
                    </div>
                ))}
            </div>

            <style>{`
                .preserve-3d { transform-style: preserve-3d; }
                
                @keyframes float-y {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-20px); }
                }

                .animate-float-core { animation: float-y 8s ease-in-out infinite; }
                .animate-float-1 { animation: float-y 5s ease-in-out infinite; }
                .animate-float-2 { animation: float-y 6s ease-in-out infinite; animation-delay: 1s; }
                .animate-float-3 { animation: float-y 7s ease-in-out infinite; animation-delay: 2s; }
                .animate-float-4 { animation: float-y 5.5s ease-in-out infinite; animation-delay: 0.5s; }
                .animate-float-5 { animation: float-y 8s ease-in-out infinite; animation-delay: 1.5s; }

                @keyframes core-ultra-jump {
                    0% { transform: translateY(0px); animation-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1); }
                    45% { transform: translateY(-65px); animation-timing-function: cubic-bezier(0.45, 0, 0.55, 1); }
                    75% { transform: translateY(4px); animation-timing-function: ease-out; }
                    100% { transform: translateY(0px); }
                }

                @keyframes core-ultra-spin {
                    0% { transform: rotateY(0deg); }
                    100% { transform: rotateY(360deg); }
                }
                
                .animate-core-ultra-jump { animation: core-ultra-jump 3s forwards; }
                .animate-core-ultra-spin { animation: core-ultra-spin 3s cubic-bezier(0.45, 0.05, 0.55, 0.95) forwards; }
            `}</style>
        </div>
    );
}

// --- FINAL PERFECT CUBE (Solid rotation with visible back) ---

function True3DCube({ size, x, y, z, isCore, isLit }: { size: number, x: number, y: number, z: number, isCore?: boolean, isLit?: boolean }) {
    const half = size / 2;
    const active = isCore || isLit;

    // Glow & Border Logik
    const shadow = active
        ? (isLit ? "shadow-[0_0_60px_rgba(255,255,255,0.18)]" : "shadow-[0_0_40px_rgba(255,255,255,0.12)]")
        : "shadow-none";

    // Die Basis-Sichtbarkeit der Kanten (auch für die Rückseite)
    const border = active ? "border-white/50" : "border-white/10";
    const borderSubtle = active ? "border-white/20" : "border-white/5";

    // Transition für den Fade-Effekt
    const faceBase = "absolute flex items-center justify-center border transition-all duration-[1000ms] cubic-bezier(0.4, 0, 0.2, 1)";

    // Füllungen
    const bgFront = active ? "bg-white/15" : "bg-white/5";
    const bgMid = active ? "bg-white/10" : "bg-white/[0.01]";
    const bgBack = active ? "bg-white/[0.03]" : "bg-transparent"; // Ganz leichte Füllung für die Rückseite

    return (
        <div
            className="absolute preserve-3d"
            style={{ width: size, height: size, transform: `translate3d(${x - half}px, ${y - half}px, ${z}px)` }}
        >
            {/* FRONT */}
            <div className={`${faceBase} ${bgFront} ${border} ${shadow}`} style={{ width: size, height: size, transform: `translateZ(${half}px)` }}>
                {isCore && <div className="w-3 h-3 bg-white rounded-full animate-pulse shadow-[0_0_15px_white]" />}
            </div>

            {/* BACK (Jetzt sichtbar beim Drehen) */}
            <div className={`${faceBase} ${borderSubtle} ${bgBack}`} style={{ width: size, height: size, transform: `rotateY(180deg) translateZ(${half}px)` }} />

            {/* RECHTS */}
            <div className={`${faceBase} ${bgMid} ${border}`} style={{ width: size, height: size, transform: `rotateY(90deg) translateZ(${half}px)` }} />

            {/* LINKS */}
            <div className={`${faceBase} ${bgMid} ${border}`} style={{ width: size, height: size, transform: `rotateY(-90deg) translateZ(${half}px)` }} />

            {/* OBEN */}
            <div className={`${faceBase} ${bgMid} ${border}`} style={{ width: size, height: size, transform: `rotateX(90deg) translateZ(${half}px)` }} />

            {/* UNTEN (Bodenfläche für Solidität) */}
            <div className={`${faceBase} ${borderSubtle} ${bgBack}`} style={{ width: size, height: size, transform: `rotateX(-90deg) translateZ(${half}px)` }} />
        </div>
    );
}