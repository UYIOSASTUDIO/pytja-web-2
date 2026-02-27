export default function Loading() {
    return (
        <div className="min-h-screen bg-[#0D0D0D] flex flex-col items-center justify-center relative overflow-hidden">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center gap-6">

                {/* Logo Pulse */}
                <div className="relative w-12 h-12 flex items-center justify-center">
                    <div className="absolute inset-0 bg-white/20 rounded-full animate-ping" />
                    <div className="relative w-3 h-3 bg-white rounded-full shadow-[0_0_20px_rgba(255,255,255,0.8)]" />
                </div>

                {/* Loading Text */}
                <div className="space-y-2 text-center">
                    <h3 className="text-xs font-mono font-bold text-white uppercase tracking-[0.3em] animate-pulse">
                        Initializing
                    </h3>
                    <div className="flex gap-1 justify-center">
                        {[...Array(5)].map((_, i) => (
                            <div
                                key={i}
                                className="w-1 h-4 bg-white/20 animate-[pulse_1s_ease-in-out_infinite]"
                                style={{ animationDelay: `${i * 100}ms` }}
                            />
                        ))}
                    </div>
                </div>

                {/* Technical Hash */}
                <p className="text-[10px] font-mono text-white/30 uppercase tracking-widest">
                    Mem_Alloc: 0x{Math.random().toString(16).slice(2, 8).toUpperCase()}
                </p>
            </div>
        </div>
    );
}