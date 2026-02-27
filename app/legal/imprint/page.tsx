export default function ImprintPage() {
    return (
        <div className="space-y-12">
            <div>
                <h1 className="text-4xl font-black uppercase tracking-tighter mb-2">Imprint</h1>
                <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Information according to § 5 TMG</p>
            </div>

            <div className="space-y-8 text-sm text-white/70 font-light leading-relaxed">
                {/* ADRESSE */}
                <div className="p-6 border border-white/10 bg-[#0A0A0A]">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-white mb-4">Operator</h3>
                    <p>
                        <strong>Elias Schmolke</strong><br />
                        Zum Wilden Graben 26<br />
                        99425 Weimar<br />
                        Germany
                    </p>
                </div>

                {/* KONTAKT */}
                <div className="p-6 border border-white/10 bg-[#0A0A0A]">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-white mb-4">Contact</h3>
                    <p>
                        Email: <a href="mailto:contact@pytja.com" className="text-white hover:underline">contact@pytja.com</a><br />
                        Portfolio: <a href="https://eliasschmolke.com" className="text-white hover:underline">eliasschmolke.com</a>
                    </p>
                </div>

                {/* DISCLAIMER */}
                <div className="mb-8">
                    <h2 className="text-xl font-bold uppercase tracking-tight text-white mb-4">Online Dispute Resolution</h2>
                    <p className="text-sm text-gray-400 leading-relaxed">
                        The European Commission provides a platform for online dispute resolution (OS): {' '}
                        <a
                            href="https://consumer-redress.ec.europa.eu/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white hover:text-blue-400 underline transition-colors"
                        >
                            https://consumer-redress.ec.europa.eu/
                        </a>
                    </p>
                    <p className="text-sm text-gray-400 leading-relaxed">
                        We are not willing or obliged to participate in dispute resolution proceedings before a consumer arbitration board.
                    </p>
                </div>
            </div>
        </div>
    );
}