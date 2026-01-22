"use client";

import { useState } from "react";
import { createSupabaseClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
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
        // Encode username to support foreign characters (e.g. Ukrainian)
        const email = `${encodeURIComponent(username)}@purin.local`;

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
                <p style={{ textAlign: "center", color: "var(--accent-pink)", marginBottom: "10px" }}>
                    {isLogin ? "Login with your username" : "Create an account to get started"}
                </p>

                {error && (
                    <div style={{
                        background: "rgba(255, 0, 0, 0.1)",
                        border: "1px solid red",
                        color: "red",
                        padding: "10px",
                        fontSize: "0.9rem",
                        textAlign: "center",
                        textTransform: "uppercase"
                    }}>
                        ERROR: {error}
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
                    <div style={{ position: "relative" }}>
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            className="input-field"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{ width: "100%" }}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            style={{
                                position: "absolute",
                                right: "10px",
                                top: "50%",
                                transform: "translateY(-50%)",
                                background: "none",
                                border: "none",
                                cursor: "pointer",
                                color: "var(--foreground)",
                                opacity: 0.7,
                                padding: "5px", // larger touch target
                            }}
                        >
                            {showPassword ? (
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                                    <line x1="1" y1="1" x2="23" y2="23"></line>
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                    <circle cx="12" cy="12" r="3"></circle>
                                </svg>
                            )}
                        </button>
                    </div>
                    <button type="submit" className="primary-btn" disabled={loading}>
                        {loading ? "Processing..." : isLogin ? "Login" : "Sign Up"}
                    </button>
                </form>

                <p style={{ textAlign: "center", fontSize: "0.8rem", color: "var(--accent-pink)", marginTop: "20px" }}>
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        style={{
                            background: "none",
                            border: "none",
                            color: "white",
                            cursor: "pointer",
                            fontWeight: 600,
                            textDecoration: "underline",
                            fontFamily: "var(--font-main)"
                        }}
                    >
                        {isLogin ? "Sign Up" : "Login"}
                    </button>
                </p>
            </div>
        </div>
    );
}
