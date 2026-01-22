"use client";

import { useEffect, useState } from "react";
import { createSupabaseClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

    const router = useRouter();
    const supabase = createSupabaseClient();

    useEffect(() => {
        const fetchUser = async () => {
            const {
                data: { session },
            } = await supabase.auth.getSession();
            if (!session) {
                router.replace("/login");
            } else {
                // Extract username from email
                const email = session.user.email || "";
                const extractedUsername = email.split("@")[0];
                setUsername(extractedUsername);
                setLoading(false);
            }
        };
        fetchUser();
    }, [router, supabase]);

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null);

        try {
            const updates: { email?: string; password?: string } = {};

            if (newPassword) {
                updates.password = newPassword;
            }

            // If authenticating user changes email, they might need to re-verify if strict details are on,
            // but here we are just swapping the dummy email.
            if (username) {
                updates.email = `${username}@purin.local`;
            }

            if (Object.keys(updates).length === 0) return;

            const { error } = await supabase.auth.updateUser(updates);

            if (error) throw error;

            setMessage({ text: "Profile updated successfully!", type: "success" });
            setNewPassword(""); // Clear password field for security

        } catch (err: any) {
            setMessage({ text: err.message, type: "error" });
        }
    };

    const handleBack = () => {
        router.push("/");
    };

    if (loading) {
        return (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                Loading...
            </div>
        );
    }

    return (
        <div style={{ padding: "40px", maxWidth: "600px", margin: "0 auto", minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center" }}>

            <div className="glass-panel" style={{ padding: "40px" }}>
                <button
                    onClick={handleBack}
                    style={{
                        background: "none",
                        border: "none",
                        color: "var(--secondary)",
                        marginBottom: "20px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "5px"
                    }}
                >
                    ← Back to Dashboard
                </button>

                <h1 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "10px" }}>My Profile</h1>
                <p style={{ color: "var(--secondary)", marginBottom: "30px" }}>Manage your account settings</p>

                {message && (
                    <div style={{
                        background: message.type === 'success' ? "rgba(50, 255, 50, 0.2)" : "rgba(255, 50, 50, 0.2)",
                        border: message.type === 'success' ? "1px solid rgba(50, 255, 50, 0.5)" : "1px solid rgba(255, 50, 50, 0.5)",
                        color: message.type === 'success' ? "#ccffcc" : "#ffcccc",
                        padding: "10px",
                        borderRadius: "8px",
                        marginBottom: "20px",
                        textAlign: "center"
                    }}>
                        {message.text}
                    </div>
                )}

                <form onSubmit={handleUpdateProfile} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                    <div>
                        <label style={{ display: "block", marginBottom: "8px", fontWeight: 500 }}>Username</label>
                        <input
                            type="text"
                            className="input-field"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="New Username"
                        />
                        <p style={{ fontSize: "0.8rem", color: "var(--secondary)", marginTop: "5px" }}>
                            Changing this will change your login username.
                        </p>
                    </div>

                    <div>
                        <label style={{ display: "block", marginBottom: "8px", fontWeight: 500 }}>New Password</label>
                        <input
                            type="password"
                            className="input-field"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="Leave blank to keep current"
                        />
                    </div>

                    <button type="submit" className="primary-btn">
                        Save Changes
                    </button>
                </form>
            </div>
        </div>
    );
}
