export default function TermsPage() {
    return (
        <div className="space-y-12 animate-in fade-in duration-700">

            <header className="space-y-4 border-b border-black/10 pb-8">
                <h1 className="text-4xl md:text-5xl font-medium uppercase tracking-tighter text-black">Terms of Service</h1>
                <div className="flex flex-wrap items-center gap-4 text-[10px] font-mono text-gray-400 uppercase tracking-widest">
                    <span>Usage Agreement</span>
                    <span className="w-1 h-1 bg-black/20 rounded-full" />
                    <span>Effective: March 2026</span>
                </div>
            </header>

            <div className="space-y-10 text-sm text-gray-500 font-light leading-relaxed">

                <section className="space-y-4">
                    <h2 className="text-xl font-bold uppercase tracking-tight text-black">1. Acceptance of Terms</h2>
                    <p>
                        By accessing the Pytja website, documentation, or official infrastructure (collectively, the "Services"), you agree to be bound by these Terms of Service. These terms govern your relationship with the Pytja project infrastructure and brand, distinct from the usage rights of the open-source software itself.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-xl font-bold uppercase tracking-tight text-black">2. Open Source License & Branding</h2>
                    <p>
                        The core Pytja software, CLI, and kernel are released under the <strong>MIT License</strong>. You are free to use, copy, modify, merge, publish, distribute, sublicense, and sell copies of the software, subject to the conditions of the MIT License included in the repository.
                    </p>
                    <p>
                        However, this license does <strong>not</strong> grant you the right to use the Pytja trademarks, logos, or official branding in a way that implies endorsement, sponsorship, or false association with the official project.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-xl font-bold uppercase tracking-tight text-black">3. Acceptable Use of Infrastructure</h2>
                    <p>
                        While the software itself is open-source, any interaction with our hosted services, official module registries, or APIs must strictly adhere to lawful and ethical standards. You expressly agree not to:
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-gray-600 marker:text-black/30">
                        <li>Utilize official Pytja infrastructure to distribute malware, malicious WASM plugins, or unauthorized telemetry components.</li>
                        <li>Employ our hosted services in the execution of denial-of-service (DoS) attacks or network abuse.</li>
                        <li>Impersonate official Pytja release channels or intercept infrastructure traffic.</li>
                    </ul>
                    <p>
                        Violation of this section will result in immediate bans from our infrastructure and registries, without affecting your rights to the underlying MIT-licensed source code.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-xl font-bold uppercase tracking-tight text-black">4. "As-Is" Disclaimer</h2>

                    {/* ENTERPRISE HIGHLIGHT BLOCK */}
                    <div className="relative p-6 md:p-8 border border-orange-500/20 bg-orange-50/50 overflow-hidden rounded-xl shadow-sm">
                        <div className="relative z-10 flex gap-6">
                            <div className="space-y-2">
                                <p className="text-xs md:text-sm text-orange-950 font-medium leading-relaxed tracking-tight">
                                    The software and services are provided "as is", without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose and noninfringement.
                                </p>
                            </div>
                        </div>
                    </div>

                    <p>
                        We do not warrant that the Software or Services will be uninterrupted, error-free, or completely secure. You acknowledge that you deploy and operate the software entirely at your own risk.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-xl font-bold uppercase tracking-tight text-black">5. Limitation of Liability</h2>
                    <p>
                        In no event shall the authors, maintainers, or copyright holders of Pytja be liable for any claim, damages, or other liability, whether in an action of contract, tort, or otherwise, arising from, out of, or in connection with the software or the use or other dealings in the software. This aligns strictly with the limitations set forth in the MIT License.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-xl font-bold uppercase tracking-tight text-black">6. Governing Law</h2>
                    <p>
                        These Terms, specifically regarding the use of the website and official services, shall be governed and construed in accordance with the laws of Germany, without regard to its conflict of law provisions.
                    </p>
                </section>

            </div>
        </div>
    );
}