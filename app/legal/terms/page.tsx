export default function TermsPage() {
    return (
        <div className="space-y-12">

            {/* Header */}
            <div className="border-b border-white/10 pb-8">
                <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4 text-white">Terms of Service</h1>
                <div className="flex items-center gap-4 text-[10px] font-mono text-white/40 uppercase tracking-widest">
                    <span>Usage Agreement</span>
                    <span className="w-1 h-1 bg-white/40 rounded-full" />
                    <span>Effective: March 2026</span>
                </div>
            </div>

            {/* Content */}
            <div className="space-y-10 text-sm text-gray-400 font-light leading-relaxed">

                <section className="space-y-4">
                    <h2 className="text-xl font-bold uppercase tracking-tight text-white">1. Acceptance of Terms</h2>
                    <p>
                        By downloading, compiling, or using the Pytja CLI, kernel, or associated services (collectively, the "Software"), you agree to be bound by these Terms of Service. If you do not agree to all of the terms and conditions, you must not access or use the Software.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-xl font-bold uppercase tracking-tight text-white">2. License and Usage Rights</h2>
                    <p>
                        Subject to your compliance with these Terms, Pytja grants you a limited, non-exclusive, non-transferable, and revocable license to use the Software for personal, internal business, or security research purposes. You may not distribute, sub-license, or monetize the Software without explicit prior written consent, unless governed by a specific open-source license provided alongside the source code.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-xl font-bold uppercase tracking-tight text-white">3. Ethical and Acceptable Use</h2>
                    <p>
                        Pytja is designed as a secure database exploration and management tool. You agree to use the Software strictly for lawful purposes. You expressly agree <strong>not</strong> to:
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-gray-400 marker:text-white/30">
                        <li>Use the Software to access, alter, or exfiltrate data from systems, servers, or databases for which you do not have explicit authorization.</li>
                        <li>Employ the Software in the execution of denial-of-service (DoS) attacks or any other malicious network activities.</li>
                        <li>Bypass, disable, or defeat any security or encryption protocols implemented within the Software or targeted environments.</li>
                    </ul>
                    <p>
                        Any violation of this section will result in immediate termination of your license and may be reported to relevant law enforcement authorities.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-xl font-bold uppercase tracking-tight text-white">4. "As-Is" Disclaimer of Warranties</h2>

                    {/* NEUES DESIGN: Weißer, technischer Terminal-Block statt Orange */}
                    <div className="p-6 border-l-2 border-white bg-white/[0.02] text-white/80 font-mono text-xs leading-relaxed uppercase tracking-wider relative group hover:bg-white/[0.04] transition-colors">
                        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-white/20 to-transparent" />
                        The software is provided "as is", without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose and noninfringement.
                    </div>

                    <p>
                        We do not warrant that the Software will be uninterrupted, error-free, or completely secure. You acknowledge that you use the Software at your own risk.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-xl font-bold uppercase tracking-tight text-white">5. Limitation of Liability</h2>
                    <p>
                        In no event shall the authors, maintainers, or copyright holders of Pytja be liable for any direct, indirect, incidental, special, exemplary, or consequential damages (including, but not limited to, procurement of substitute goods or services; loss of use, data, or profits; or business interruption) however caused and on any theory of liability, whether in contract, strict liability, or tort (including negligence or otherwise) arising in any way out of the use of this software, even if advised of the possibility of such damage.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-xl font-bold uppercase tracking-tight text-white">6. Governing Law</h2>
                    <p>
                        These Terms shall be governed and construed in accordance with the laws of Germany, without regard to its conflict of law provisions. Any dispute arising from these Terms will be subject to the exclusive jurisdiction of the courts located in Germany.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-xl font-bold uppercase tracking-tight text-white">7. Modifications to Terms</h2>
                    <p>
                        We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
                    </p>
                </section>

            </div>
        </div>
    );
}