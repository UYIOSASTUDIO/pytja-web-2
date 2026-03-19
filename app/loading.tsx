export default function Loading() {
    return (
        <div className="min-h-screen bg-[#FAFAFA] flex flex-col items-center justify-center relative overflow-hidden z-[999999]">

            {/* Background Grid - Blueprint Style */}
            <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-70 pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center gap-10">

                {/* Multi-Layer Core Indicator */}
                <div className="relative w-10 h-10 flex items-center justify-center mb-2">

                    {/* Layer 1: Startet bei 0 */}
                    <div
                        className="absolute inset-0 bg-black/15 rounded-full animate-ping"
                        style={{ animationDuration: '2.4s', animationDelay: '0s' }}
                    />

                    {/* Layer 2: Negativer Delay! Startet sofort, ist aber schon 1/3 im Zyklus */}
                    <div
                        className="absolute inset-0 bg-black/15 rounded-full animate-ping"
                        style={{ animationDuration: '2.4s', animationDelay: '-0.8s' }}
                    />

                    {/* Layer 3: Negativer Delay! Startet sofort, ist aber schon 2/3 im Zyklus */}
                    <div
                        className="absolute inset-0 bg-black/15 rounded-full animate-ping"
                        style={{ animationDuration: '2.4s', animationDelay: '-1.6s' }}
                    />

                    {/* Statischer Kern in der Mitte (etwas eleganter skaliert) */}
                    <div className="relative w-2.5 h-2.5 bg-black rounded-full shadow-[0_0_15px_rgba(0,0,0,0.3)] z-10" />
                </div>

                {/* Loading Text & Bars */}
                <div className="space-y-4 text-center">
                    <h3 className="text-[11px] font-mono font-bold text-black uppercase tracking-[0.3em] animate-pulse">
                        Initializing
                    </h3>

                    <div className="flex gap-1.5 justify-center">
                        {[...Array(5)].map((_, i) => (
                            <div
                                key={i}
                                className="w-1 h-4 bg-black/20 rounded-full animate-[pulse_1s_ease-in-out_infinite]"
                                style={{ animationDelay: `${i * 100}ms` }}
                            />
                        ))}
                    </div>
                </div>

                {/* Technical Hash */}
                <div className="flex flex-col items-center gap-1.5 mt-2">
                    <p className="text-[9px] font-mono text-gray-400 uppercase tracking-[0.2em]">
                        // Boot Sequence
                    </p>
                    <p className="text-[10px] font-mono text-black/60 uppercase tracking-widest bg-white px-3 py-1.5 rounded-sm border border-black/10 shadow-sm">
                        Mem_Alloc: 0x{Math.random().toString(16).slice(2, 8).toUpperCase()}
                    </p>
                </div>

            </div>
        </div>
    );
}