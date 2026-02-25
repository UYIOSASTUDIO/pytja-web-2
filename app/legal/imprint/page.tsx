export default function ImprintPage() {
    return (
        <div className="space-y-12">
            <div>
                <h1 className="text-4xl font-black uppercase tracking-tighter mb-2">Imprint</h1>
                <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Angaben gemäß § 5 TMG</p>
            </div>

            <div className="space-y-8 text-sm text-white/70 font-light leading-relaxed">
                {/* ADRESSE */}
                <div className="p-6 border border-white/10 bg-[#0A0A0A]">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-white mb-4">Operator</h3>
                    <p>
                        <strong>Elias Schmolke</strong><br />
                        Musterstraße 123<br />
                        12345 Berlin<br />
                        Germany
                    </p>
                </div>

                {/* KONTAKT */}
                <div className="p-6 border border-white/10 bg-[#0A0A0A]">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-white mb-4">Contact</h3>
                    <p>
                        Email: <a href="mailto:contact@pytja.com" className="text-white hover:underline">contact@pytja.com</a><br />
                        Phone: +49 (0) 123 456789 (Optional)
                    </p>
                </div>

                {/* DISCLAIMER */}
                <div className="space-y-4">
                    <h3 className="text-lg font-bold text-white">Online Dispute Resolution</h3>
                    <p>
                        The European Commission provides a platform for online dispute resolution (OS):
                        <a href="https://ec.europa.eu/consumers/odr/" target="_blank" className="text-white/50 hover:text-white ml-1">https://ec.europa.eu/consumers/odr/</a>.<br/>
                        We are not willing or obliged to participate in dispute resolution proceedings before a consumer arbitration board.
                    </p>
                </div>
            </div>
        </div>
    );
}