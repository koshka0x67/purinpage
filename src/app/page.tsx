"use client";

import { useEffect, useState, useRef } from "react";
import { createSupabaseClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { categoryLinks } from "@/lib/links";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = createSupabaseClient();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        router.replace("/login");
      } else {
        setLoading(false);
      }
    };
    checkUser();
  }, [router, supabase]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace("/login");
  };

  const scrollToSection = (index: number) => {
    if (scrollContainerRef.current) {
      const width = scrollContainerRef.current.offsetWidth;
      scrollContainerRef.current.scrollTo({
        left: width * index,
        behavior: "smooth",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  // Convert categoryLinks object to array for mapping
  const categories = Object.entries(categoryLinks).map(([slug, data]) => ({
    slug,
    ...data,
  }));

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden bg-[var(--background)]">
      {/* Header & Nav */}
      <div className="p-8 pb-4 shrink-0 z-10 bg-[var(--background)]/80 backdrop-blur-sm border-b border-[var(--accent-dim)]">
        <header className="flex justify-between items-center mb-6 max-w-[1400px] mx-auto w-full">
          <h1 className="text-[2.5rem] font-bold tracking-widest text-shadow-pink">WIRED/SYS</h1>
          <div className="flex gap-2.5">
            <a
              href="/profile"
              className="primary-btn flex items-center no-underline text-xs md:text-base px-4 py-2"
            >
              My Profile
            </a>
            <button
              onClick={handleLogout}
              className="primary-btn text-xs md:text-base px-4 py-2"
            >
              Logout
            </button>
          </div>
        </header>

        {/* Navigation Bar */}
        <nav className="flex justify-center gap-12 text-[1.2rem] font-bold tracking-widest uppercase">
          <button
            onClick={() => scrollToSection(0)}
            className="text-[var(--text-main)] hover:text-[var(--accent-pink)] hover:text-shadow-pink transition-all duration-300 cursor-pointer"
          >
            Links
          </button>
          <span className="text-[var(--accent-dim)]">|</span>
          <button
            onClick={() => scrollToSection(1)}
            className="text-[var(--text-main)] hover:text-[var(--accent-pink)] hover:text-shadow-pink transition-all duration-300 cursor-pointer"
          >
            Tools
          </button>
          <span className="text-[var(--accent-dim)]">|</span>
          <button
            onClick={() => scrollToSection(2)}
            className="text-[var(--text-main)] hover:text-[var(--accent-pink)] hover:text-shadow-pink transition-all duration-300 cursor-pointer"
          >
            About Me
          </button>
        </nav>
      </div>

      {/* Horizontal Scroll Sections */}
      <div
        ref={scrollContainerRef}
        className="flex-1 flex overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {/* Section 1: LINKS */}
        <section className="min-w-full w-full h-full snap-center overflow-y-auto p-8 pt-4">
          <div className="max-w-[1200px] mx-auto pb-20">
            <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-6">
              {categories.map((cat) => (
                <a
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  className="glass-panel flex flex-col items-center justify-center p-8 gap-4 transition-all duration-300 hover:scale-105 hover:bg-white/10 no-underline group overflow-hidden h-[220px]"
                >
                  {cat.icon.startsWith("http") || cat.icon.startsWith("/") ? (
                    <img
                      src={cat.icon}
                      alt={cat.title}
                      className="w-20 h-20 object-cover rounded-full group-hover:scale-110 transition-transform duration-300 shadow-[0_0_15px_var(--accent-dim)]"
                    />
                  ) : (
                    <span className="text-[4rem] group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_5px_var(--accent-pink)]">{cat.icon}</span>
                  )}
                  <span className="text-[1.3rem] font-bold text-center text-[var(--accent-pink)] group-hover:text-white transition-colors duration-300">{cat.title}</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Section 2: TOOLS */}
        <section className="min-w-full w-full h-full snap-center flex items-center justify-center p-8">
          <div className="max-w-[1200px] mx-auto w-full h-full flex items-center justify-center">
            <div className="glass-panel p-20 text-center w-full max-w-2xl border-2 border-[var(--accent-dim)]">
              <div className="w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden border-4 border-[var(--accent-pink)] shadow-[0_0_30px_var(--accent-pink)]">
                <img
                  src="https://i.pinimg.com/1200x/7b/c3/ca/7bc3ca00228a49e51305b911c9a7e392.jpg"
                  alt="Chains"
                  className="w-full h-full object-cover"
                />
              </div>

              <h2 className="text-[3rem] font-bold text-[var(--accent-pink)] mb-4">
                TOOLS
              </h2>
              <p className="text-[1.5rem] italic opacity-70">
                Coming soon...
              </p>
            </div>
          </div>
        </section>


        {/* Section 3: ABOUT ME */}
        <section className="min-w-full w-full h-full snap-center flex items-center justify-center p-8">
          <div className="max-w-[1200px] mx-auto w-full h-full flex items-center justify-center">
            <div className="glass-panel p-16 w-full max-w-4xl flex flex-col md:flex-row gap-12 items-center border border-[var(--wired-grid)]">
              <div className="w-48 h-48 bg-[var(--background)] rounded-full flex items-center justify-center border-4 border-[var(--accent-pink)] shadow-[0_0_30px_var(--accent-pink)] shrink-0 overflow-hidden relative group">
                <img
                  src="https://i.pinimg.com/736x/31/c8/8c/31c88c752483a072673f6c0ac9caa1db.jpg"
                  alt="Custom Avatar"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-[var(--accent-pink)] opacity-10 animate-pulse"></div>
              </div>
              <div className="text-center md:text-left">
                <h2 className="text-[2.5rem] font-bold mb-6 text-[var(--accent-pink)] border-b border-[var(--accent-dim)] inline-block pb-2">SYSTEM ADMINISTRATOR</h2>
                <p className="text-[var(--foreground)] text-lg leading-relaxed mb-6">
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
        </section>
      </div>

      <footer className="fixed bottom-4 w-full text-center text-xs opacity-50 pointer-events-none">
        <p className="bg-black/50 inline-block px-4 py-1 rounded-full backdrop-blur-md">WIRED // SYSTEM V2.0</p>
      </footer>
    </div>
  );
}
