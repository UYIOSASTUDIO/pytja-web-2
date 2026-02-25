export default function TermsPage() {
    return (
        <div className="space-y-12">
            <div>
                <h1 className="text-4xl font-black uppercase tracking-tighter mb-2">Terms of Service</h1>
                <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Usage Agreement</p>
            </div>

            <div className="space-y-8 text-sm text-white/70 font-light leading-relaxed">
                <section className="space-y-4">
                    <h2 className="text-xl font-bold text-white">1. Scope</h2>
                    <p>
                        By downloading or using the Pytja CLI or accessing this website, you agree to be bound by these terms. If you do not agree, please do not use our services.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-xl font-bold text-white">2. "As-Is" Disclaimer</h2>
                    <div className="p-4 border-l-2 border-orange-500 bg-orange-500/5 text-orange-200/80 italic">
                        The software is provided "as is", without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose and noninfringement.
                    </div>
                    <p>
                        In no event shall the authors or copyright holders be liable for any claim, damages or other liability, whether in an action of contract, tort or otherwise, arising from, out of or in connection with the software or the use or other dealings in the software.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-xl font-bold text-white">3. Ethical Use</h2>
                    <p>
                        Pytja is an OSINT and database exploration tool intended for legitimate security research and administrative tasks. You agree not to use this software for illegal activities, unauthorized access, or malicious attacks.
                    </p>
                </section>
            </div>
        </div>
    );
}