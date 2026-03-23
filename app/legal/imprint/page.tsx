export default function ImprintPage() {
    return (
        <div className="space-y-12 animate-in fade-in duration-700">

            <header className="space-y-4 border-b border-black/10 pb-8">
                <h1 className="text-4xl md:text-5xl font-medium uppercase tracking-tighter text-black">Imprint</h1>
                <p className="text-[10px] font-mono text-gray-400 uppercase tracking-[0.2em]">Legal disclosure // § 5 TMG</p>
            </header>

            <div className="grid md:grid-cols-2 gap-6">
                {/* Operator Node */}
                <div className="relative p-6 border border-black/5 bg-white rounded-xl group transition-all">

                    <h3 className="text-[10px] font-mono font-bold uppercase tracking-widest text-gray-400 mb-6 flex items-center gap-2">
                        <div className="relative flex items-center justify-center w-2 h-2 shrink-0">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                        </div>
                        Operator
                    </h3>
                    <p className="text-sm text-gray-600 font-light leading-relaxed">
                        <span className="text-black font-bold tracking-tight">Elias Schmolke</span><br />
                        Architect & Lead Developer
                    </p>
                </div>

                {/* Contact Node */}
                <div className="relative p-6 border border-black/5 bg-white rounded-xl group transition-all">

                    <h3 className="text-[10px] font-mono font-bold uppercase tracking-widest text-gray-400 mb-6 flex items-center gap-2">
                        <div className="relative flex items-center justify-center w-2 h-2 shrink-0">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                        </div>
                        Operator
                    </h3>
                    <div className="text-sm text-gray-600 font-light leading-relaxed space-y-1">
                        <p>Mail: <a href="mailto:mail@pytja.com" className="text-black font-medium hover:underline decoration-cyan-500/50">mail@pytja.com</a></p>
                        <p>Web: <a href="https://eliasschmolke.com" className="text-black font-medium hover:underline decoration-cyan-500/50">eliasschmolke.com</a></p>
                    </div>
                </div>
            </div>

        </div>
    );
}