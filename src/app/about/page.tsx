"use client";

export default function AboutPage() {
    return (
        <div className="min-h-screen w-screen flex flex-col items-center justify-center p-4 md:p-8 pt-20 md:pt-24 pb-20 overflow-y-auto">
            <div className="max-w-[1200px] mx-auto w-full flex items-center justify-center">
                <div className="glass-panel p-8 md:p-16 w-full max-w-4xl flex flex-col md:flex-row gap-8 md:gap-12 items-center border border-[var(--wired-grid)]">
                    <div className="w-32 h-32 md:w-48 md:h-48 bg-[var(--background)] rounded-full flex items-center justify-center border-4 border-[var(--accent-pink)] shadow-[0_0_30px_var(--accent-pink)] shrink-0 overflow-hidden relative group">
                        <img
                            src="https://i.pinimg.com/736x/31/c8/8c/31c88c752483a072673f6c0ac9caa1db.jpg"
                            alt="Custom Avatar"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-[var(--accent-pink)] opacity-10 animate-pulse"></div>
                    </div>
                    <div className="text-center md:text-left">
                        <h2 className="text-2xl md:text-[2.5rem] font-bold mb-4 md:mb-6 text-[var(--accent-pink)] border-b border-[var(--accent-dim)] inline-block pb-2">SYS ADMIN SIF</h2>
                        <p className="text-[var(--foreground)] text-base md:text-lg leading-relaxed mb-4 md:mb-6">
                            Welcome to the <strong>Wired</strong>. This is your personal nexus for information retrieval and system management.
                            Inspired by the visual protocols of <em>Serial Experiments Lain</em>.
                        </p>
                        <div className="flex gap-4 justify-center md:justify-start">
                            <div className="px-4 py-2 border border-[var(--accent-pink)] text-[var(--accent-pink)] text-sm">STATUS: ONLINE</div>
                            <div className="px-4 py-2 border border-[var(--accent-pink)] text-[var(--accent-pink)] text-sm animate-pulse">NETWORK: SECURE</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
