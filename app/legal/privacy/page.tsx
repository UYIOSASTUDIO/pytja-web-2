export default function PrivacyPage() {
    return (
        <div className="space-y-12">
            <div>
                <h1 className="text-4xl font-black uppercase tracking-tighter mb-2">Privacy Policy</h1>
                <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Data Protection & GDPR</p>
            </div>

            <div className="space-y-8 text-sm text-white/70 font-light leading-relaxed">
                <p>
                    Your privacy is critical to us. Pytja is designed as a "Zero-Trace" tool, and we apply the same philosophy to this website. We collect as little data as possible.
                </p>

                <section className="space-y-4">
                    <h2 className="text-xl font-bold text-white">1. Data Collection</h2>
                    <p>
                        <strong>Server Log Files:</strong> When you visit our website, the server automatically collects standard data provided by your browser (IP address, browser type, time of access). This is technically necessary for stability and security.
                    </p>
                    <p>
                        <strong>Contact Form:</strong> If you use our contact form, we store the data you enter (Email, Message, Reason) solely for the purpose of processing your inquiry. We do not share this data without your consent.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-xl font-bold text-white">2. Cookies & Analytics</h2>
                    <p>
                        We do <strong>not</strong> use invasive tracking cookies or third-party analytics tools (like Google Analytics) on this marketing site. Pytja operates on a strict privacy-first basis.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-xl font-bold text-white">3. Your Rights</h2>
                    <p>
                        You have the right to request information about your stored data, its origin, its recipients, and the purpose of its collection at no charge. You also have the right to request that it be corrected, blocked, or deleted.
                    </p>
                </section>
            </div>
        </div>
    );
}