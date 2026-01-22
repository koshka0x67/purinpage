"use client";

export default function ToolsPage() {
    return (
        <div className="min-h-screen w-screen flex flex-col items-center justify-center p-4 md:p-8 pt-24 md:pt-32 pb-20 overflow-y-auto">
            <div className="max-w-[1200px] mx-auto w-full flex items-center justify-center">
                <div className="glass-panel p-10 md:p-20 text-center w-full max-w-2xl border-2 border-[var(--accent-dim)]">
                    <div className="w-32 h-32 md:w-48 md:h-48 mx-auto mb-6 rounded-full overflow-hidden border-4 border-[var(--accent-pink)] shadow-[0_0_30px_var(--accent-pink)]">
                        <img
                            src="https://i.pinimg.com/1200x/7b/c3/ca/7bc3ca00228a49e51305b911c9a7e392.jpg"
                            alt="Chains"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <h2 className="text-[2rem] md:text-[3rem] font-bold text-[var(--accent-pink)] mb-4">
                        TOOLS
                    </h2>
                    <p className="text-[1.2rem] md:text-[1.5rem] italic opacity-70">
                        Coming soon...
                    </p>
                </div>
            </div>
        </div>
    );
}
