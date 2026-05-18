import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const BASE_URL = "https://inspector-api-five.vercel.app/api";

export default function ProfilePage() {
  const { user, updateUsername, logout, getToken } = useAuth();
  const [username, setUsername] = useState(user?.name || "");
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSave = async (e) => {
    e.preventDefault();
    if (!username.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${BASE_URL}/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ name: username.trim() }),
      });
      const data = await res.json();
      if (data.status === "success") {
        const meRes = await fetch(`${BASE_URL}/auth/me`, {
          headers: { Authorization: `Bearer ${getToken()}` },
        });
        const meData = await meRes.json();
        if (meData.status === "success") updateUsername(meData.data.name);
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
      } else {
        setError(data.message || "Gagal menyimpan perubahan.");
      }
    } catch {
      setError("Terjadi kesalahan, coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ position: "fixed", inset: 0, display: "flex", flexDirection: "column", background: "#f0f4ff", overflow: "hidden" }}>

      {/* ── HEADER — floating with margin all sides ── */}
      <div style={{ flexShrink: 0, padding: "12px 12px 0 12px" }}>
      <header style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px 20px",
        background: "#fff",
        borderRadius: 14,
        boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
        zIndex: 10,
      }}>
        {/* Kiri: tombol kembali + logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button
            onClick={() => navigate("/dashboard")}
            style={{ background: "none", border: "none", cursor: "pointer", padding: 4, borderRadius: 6, display: "flex", alignItems: "center" }}
          >
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#6b7280" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 24, height: 24, borderRadius: 6, background: "#5b8dee", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={3}>
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
            </div>
            <span style={{ fontWeight: 700, fontSize: 14, color: "#5b8dee" }}>Inspector</span>
          </div>
        </div>

        {/* Kanan: user info + tombol keluar */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button
                style={{ background: "none", border: "none", cursor: "pointer", fontSize: 13, color: "#ef4444", fontWeight: 500, padding: "4px 10px", borderRadius: 8, transition: "background .15s" }}
                onMouseOver={e => e.currentTarget.style.background = "#fef2f2"}
                onMouseOut={e => e.currentTarget.style.background = "none"}
              >
                Keluar
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Keluar dari Inspector?</AlertDialogTitle>
                <AlertDialogDescription>
                  Kamu akan keluar dari akun <strong>{user?.name}</strong>. Kamu perlu login kembali untuk menggunakan Inspector.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Batal</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => { logout(); navigate("/"); }}
                  style={{ background: "#ef4444" }}
                  className="hover:bg-red-600"
                >
                  Ya, Keluar
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 14, color: "#6b7280" }}>{user?.name || ""}</span>
            <Avatar className="w-8 h-8">
              <AvatarImage src={user?.picture} />
              <AvatarFallback style={{ fontSize: 12, background: "#dbeafe", color: "#2563eb" }}>{user?.name?.[0]}</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>
      </div>

      {/* ── BODY — scrollable content area ── */}
      <div style={{ flex: 1, overflowY: "auto", padding: "24px 12px 12px" }}>
        <div style={{ maxWidth: 480, margin: "0 auto" }}>

          <h1 style={{ fontSize: 22, fontWeight: 700, color: "#1e293b", marginBottom: 24 }}>Pengaturan Profil</h1>

          {/* Profile info card */}
          <div style={{
            background: "#fff",
            border: "1px solid #f1f5f9",
            borderRadius: 16,
            padding: 20,
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 16,
            boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
          }}>
            <img
              src={user?.picture}
              alt="Profile"
              style={{ width: 56, height: 56, borderRadius: "50%", border: "2px solid #5b8dee", objectFit: "cover", flexShrink: 0 }}
            />
            <div>
              <p style={{ fontWeight: 700, color: "#1e293b", fontSize: 15, margin: 0 }}>{user?.name}</p>
              <p style={{ fontSize: 13, color: "#6b7280", margin: "2px 0 0" }}>{user?.email}</p>
              <p style={{ fontSize: 11, color: "#9ca3af", margin: "4px 0 0" }}>Foto diambil dari akun Google</p>
            </div>
          </div>

          {/* Form card */}
          <form
            onSubmit={handleSave}
            style={{
              background: "#fff",
              border: "1px solid #f1f5f9",
              borderRadius: 16,
              padding: 20,
              display: "flex",
              flexDirection: "column",
              gap: 20,
              boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
            }}
          >
            {/* Nama */}
            <div>
              <label style={{ fontSize: 11, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600, display: "block", marginBottom: 8 }}>
                Nama Tampilan
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Masukkan nama kamu"
                minLength={2}
                maxLength={100}
                style={{
                  width: "100%", boxSizing: "border-box",
                  background: "#f9fafb", border: "1px solid #e5e7eb",
                  borderRadius: 10, padding: "10px 14px",
                  fontSize: 14, color: "#1e293b", outline: "none",
                  transition: "border-color .2s",
                }}
                onFocus={e => e.target.style.borderColor = "#5b8dee"}
                onBlur={e => e.target.style.borderColor = "#e5e7eb"}
              />
              <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 6 }}>Min. 2 karakter, maks. 100 karakter.</p>
            </div>

            {/* Email (disabled) */}
            <div>
              <label style={{ fontSize: 11, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600, display: "block", marginBottom: 8 }}>
                Email
              </label>
              <input
                type="email"
                value={user?.email}
                disabled
                style={{
                  width: "100%", boxSizing: "border-box",
                  background: "#f3f4f6", border: "1px solid #e5e7eb",
                  borderRadius: 10, padding: "10px 14px",
                  fontSize: 14, color: "#9ca3af", outline: "none",
                  cursor: "not-allowed", opacity: 0.7,
                }}
              />
              <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 6 }}>Email tidak dapat diubah.</p>
            </div>

            {error && <p style={{ color: "#ef4444", fontSize: 13, margin: 0 }}>{error}</p>}

            {/* Submit button */}
            <button
              type="submit"
              disabled={!username.trim() || username.trim().length < 2 || loading}
              style={{
                background: saved ? "#10b981" : "#5b8dee",
                color: "#fff",
                fontWeight: 700,
                fontSize: 14,
                border: "none",
                borderRadius: 10,
                padding: "12px 0",
                cursor: loading || !username.trim() || username.trim().length < 2 ? "not-allowed" : "pointer",
                opacity: !username.trim() || username.trim().length < 2 ? 0.5 : 1,
                transition: "background .2s, opacity .2s",
              }}
            >
              {loading ? "Menyimpan..." : saved ? "✓ Tersimpan!" : "Simpan Perubahan"}
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}
