"use client";

import { useState } from "react";
import { createSupabaseClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const supabase = createSupabaseClient();

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        // Append dummy domain for Supabase email auth
        const email = `${username}@purin.local`;

        try {
            if (isLogin) {
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });
                if (error) throw error;
                router.push("/");
            } else {
                const { error } = await supabase.auth.signUp({
                    email,
                    password,
                });
                if (error) throw error;
                // Since email confirmation is disabled/we are using dummy emails, 
                // we can try to auto-login or just redirect to login

                // Check if session was created immediately (meaning no confirm email needed)
                const { data: { session } } = await supabase.auth.getSession();
                if (session) {
                    router.push("/");
                } else {
                    alert("Account created! Please sign in.");
                    setIsLogin(true);
                }
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "100vh",
                padding: "20px",
            }}
        >
            <div
                className="glass-panel"
                style={{
                    width: "100%",
                    maxWidth: "400px",
                    padding: "40px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                }}
            >
                <h1 style={{ textAlign: "center", fontSize: "2rem", fontWeight: 700 }}>
                    {isLogin ? "Welcome Back" : "Join Purin Page"}
                </h1>
                <p style={{ textAlign: "center", color: "var(--secondary)", marginBottom: "10px" }}>
                    {isLogin ? "Login with your username" : "Create an account to get started"}
                </p>

                {error && (
                    <div style={{
                        background: "rgba(255, 50, 50, 0.2)",
                        border: "1px solid rgba(255, 50, 50, 0.5)",
                        color: "#ffcccc",
                        padding: "10px",
                        borderRadius: "8px",
                        fontSize: "0.9rem",
                        textAlign: "center"
                    }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleAuth} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                    <input
                        type="text"
                        placeholder="Username"
                        className="input-field"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        autoCapitalize="none"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="input-field"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit" className="primary-btn" disabled={loading}>
                        {loading ? "Processing..." : isLogin ? "Login" : "Sign Up"}
                    </button>
                </form>

                <p style={{ textAlign: "center", fontSize: "0.9rem", color: "var(--secondary)" }}>
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        style={{
                            background: "none",
                            border: "none",
                            color: "var(--accent)",
                            cursor: "pointer",
                            fontWeight: 600,
                            textDecoration: "underline",
                        }}
                    >
                        {isLogin ? "Sign Up" : "Login"}
                    </button>
                </p>
            </div>
        </div>
    );
}
