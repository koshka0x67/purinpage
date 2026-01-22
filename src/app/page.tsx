"use client";

import { useEffect, useState } from "react";
import { createSupabaseClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { categoryLinks } from "@/lib/links";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = createSupabaseClient();

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
    <div className="min-h-screen w-screen flex flex-col items-center p-4 md:p-8 pt-24 md:pt-32 pb-20 overflow-y-auto">
      <div className="max-w-[1200px] mx-auto w-full">
        <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] md:grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4 md:gap-6">
          {categories.map((cat) => (
            <a
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="glass-panel flex flex-col items-center justify-center p-8 gap-4 transition-all duration-300 hover:scale-105 hover:bg-black/90 hover:border-[var(--accent-pink)] no-underline group overflow-hidden h-[220px] relative"
            >
              {cat.icon.startsWith("http") || cat.icon.startsWith("/") ? (
                <img
                  src={cat.icon}
                  alt={cat.title}
                  className="w-20 h-20 object-cover rounded-full group-hover:scale-110 transition-transform duration-300 shadow-[0_0_15px_var(--accent-dim)] group-hover:shadow-[0_0_25px_var(--accent-pink)] z-10"
                />
              ) : (
                <span className="text-[4rem] group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_5px_var(--accent-pink)] z-10 group-hover:bg-black/50 group-hover:rounded-full group-hover:p-2">{cat.icon}</span>
              )}
              <span className="text-[1.3rem] font-bold text-center text-[var(--accent-pink)] group-hover:text-white transition-colors duration-300 z-10">{cat.title}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
