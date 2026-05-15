import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

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
        if (meData.status === "success") {
          updateUsername(meData.data.name);
        }
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
    <div className="min-h-screen bg-[#0A192F] text-[#CCD6F6]">
      <header className="flex items-center justify-between px-6 py-4 border-b border-[#112240] bg-[#0D2137]">
        <button
          onClick={() => navigate("/dashboard")}
          className="text-[#8892B0] hover:text-[#64FFDA] text-sm transition-colors cursor-pointer border-0 bg-transparent"
        >
          ← Kembali ke Dashboard
        </button>
        <button
          onClick={() => { logout(); navigate("/"); }}
          className="text-sm text-red-400 hover:text-red-300 transition-colors cursor-pointer border-0 bg-transparent"
        >
          Keluar
        </button>
      </header>

      <div className="max-w-lg mx-auto px-6 py-12">
        <h1 className="text-2xl font-black text-[#E6F1FF] tracking-tight mb-8">Pengaturan Profil</h1>

        <div className="bg-[#0D2137] border border-[#112240] rounded-2xl p-6 flex items-center gap-5 mb-6">
          <img
            src={user?.picture}
            alt="Profile"
            className="w-16 h-16 rounded-full border-2 border-[#64FFDA] object-cover flex-shrink-0"
          />
          <div>
            <p className="font-bold text-[#E6F1FF]">{user?.name}</p>
            <p className="text-sm text-[#8892B0]">{user?.email}</p>
            <p className="text-xs text-[#8892B0]/60 mt-1">Foto diambil dari akun Google</p>
          </div>
        </div>

        <form onSubmit={handleSave} className="bg-[#0D2137] border border-[#112240] rounded-2xl p-6 flex flex-col gap-5">
          <div>
            <label className="text-xs text-[#8892B0] uppercase tracking-widest font-medium block mb-2">
              Nama Tampilan
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Masukkan nama kamu"
              minLength={2}
              maxLength={100}
              className="w-full bg-[#0A192F] border border-[#112240] focus:border-[#64FFDA] rounded-xl px-4 py-3 text-sm text-[#CCD6F6] placeholder-[#8892B0]/40 outline-none transition-colors"
            />
            <p className="text-xs text-[#8892B0]/60 mt-1.5">Min. 2 karakter, maks. 100 karakter.</p>
          </div>

          <div>
            <label className="text-xs text-[#8892B0] uppercase tracking-widest font-medium block mb-2">
              Email
            </label>
            <input
              type="email"
              value={user?.email}
              disabled
              className="w-full bg-[#0A192F]/50 border border-[#112240] rounded-xl px-4 py-3 text-sm text-[#8892B0] outline-none opacity-60 cursor-not-allowed"
            />
            <p className="text-xs text-[#8892B0]/60 mt-1.5">Email tidak dapat diubah.</p>
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={!username.trim() || username.trim().length < 2 || loading}
            className="bg-[#64FFDA] hover:bg-[#4DDBBB] text-[#0A192F] font-bold py-3 rounded-xl transition-all cursor-pointer border-0 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Menyimpan..." : saved ? "✓ Tersimpan!" : "Simpan Perubahan"}
          </button>
        </form>
      </div>
    </div>
  );
}