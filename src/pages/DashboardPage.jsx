import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const BASE_URL = "https://inspector-api-five.vercel.app/api";

function timeAgo(dateStr) {
  const diff = Math.floor((Date.now() - new Date(dateStr)) / 1000);
  if (diff < 60) return `${diff} detik lalu`;
  if (diff < 3600) return `${Math.floor(diff / 60)} menit lalu`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} jam lalu`;
  return `${Math.floor(diff / 86400)} hari lalu`;
}

function riskLabel(label) {
  if (label === "high") return { text: "Risiko Tinggi", color: "text-red-400" };
  if (label === "medium") return { text: "Risiko Sedang", color: "text-yellow-400" };
  return { text: "Risiko Rendah", color: "text-[#64FFDA]" };
}

export default function DashboardPage() {
  const { user, logout, getToken } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [view, setView] = useState("search");
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [searching, setSearching] = useState(false);
  const [searchError, setSearchError] = useState(null);
  const [history, setHistory] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(true);

  // Load history saat pertama buka
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch(`${BASE_URL}/audits?page=1&limit=20`, {
          headers: { Authorization: `Bearer ${getToken()}` },
        });
        const data = await res.json();
        if (data.status === "success") {
          setHistory(data.data.data);
        }
      } catch {
        // gagal load history, biarkan kosong
      } finally {
        setHistoryLoading(false);
      }
    };
    fetchHistory();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    const username = searchInput.replace("@", "").trim();
    if (!username) return;

    setSearching(true);
    setSearchError(null);

    try {
      const res = await fetch(`${BASE_URL}/audits`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ ig_username: username }),
      });
      const data = await res.json();

      if (data.status === "success") {
        const result = data.data;
        setSelectedItem(result);
        setView("result");
        setSearchInput("");
        // Prepend ke history
        setHistory((prev) => [result, ...prev]);
      } else {
        setSearchError(data.message || "Gagal memproses audit.");
      }
    } catch {
      setSearchError("Terjadi kesalahan, coba lagi.");
    } finally {
      setSearching(false);
    }
  };

  // const handleSelectHistory = async (item) => {
  //   // Kalau sudah ada detail lengkap, langsung tampilkan
  //   if (item.bot_percentage !== undefined && item.recommendation) {
  //     setSelectedItem(item);
  //     setView("result");
  //     return;
  //   }
  //   // Kalau belum, fetch detail
  //   try {
  //     const res = await fetch(`${BASE_URL}/audits/${item.id}`, {
  //       headers: { Authorization: `Bearer ${getToken()}` },
  //     });
  //     const data = await res.json();
  //     if (data.status === "success") {
  //       setSelectedItem(data.data);
  //       setView("result");
  //     }
  //   } catch {}
  // };

  const handleSelectHistory = async (item) => {
    try {
      const res = await fetch(`${BASE_URL}/audits/${item.id}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      const data = await res.json();
      if (data.status === "success") {
        setSelectedItem(data.data);
        setView("result");
      }
    } catch {}
  };

  const handleCariKembali = () => {
    setView("search");
    setSelectedItem(null);
    setSearchError(null);
  };

  const risk = selectedItem ? riskLabel(selectedItem.risk_label) : null;

  return (
    <div className="min-h-screen bg-[#0A192F] flex">

      {/* ── SIDEBAR ── */}
      <aside className={`${sidebarOpen ? "w-64" : "w-0 overflow-hidden"} flex-shrink-0 bg-[#0D2137] border-r border-[#112240] flex flex-col transition-all duration-300`}>
        <div className="p-4 border-b border-[#112240]">
          <button
            onClick={handleCariKembali}
            className="text-[#64FFDA] text-sm font-semibold hover:text-[#4DDBBB] transition-colors cursor-pointer border-0 bg-transparent text-left w-full"
          >
            + Cari baru
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-2">
          {historyLoading ? (
            <p className="text-[#8892B0] text-xs px-4 py-3">Memuat riwayat...</p>
          ) : history.length === 0 ? (
            <p className="text-[#8892B0] text-xs px-4 py-3">Belum ada riwayat.</p>
          ) : (
            history.map((item) => {
              const r = riskLabel(item.risk_label);
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectHistory(item)}
                  className={`w-full text-left px-4 py-3 transition-colors cursor-pointer border-0 bg-transparent ${
                    selectedItem?.id === item.id && view === "result"
                      ? "bg-[#112240] border-r-2 border-r-[#64FFDA]"
                      : "hover:bg-[#112240]/50"
                  }`}
                >
                  <p className={`text-sm font-semibold ${
                    selectedItem?.id === item.id && view === "result" ? "text-[#64FFDA]" : "text-[#CCD6F6]"
                  }`}>
                    @{item.ig_username}
                  </p>
                  <p className={`text-xs mt-0.5 ${r.color}`}>{r.text}</p>
                  <p className="text-xs text-[#8892B0]/60 mt-0.5">{timeAgo(item.created_at)}</p>
                </button>
              );
            })
          )}
        </div>
      </aside>

      {/* ── MAIN ── */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Topbar */}
        <header className="flex items-center justify-between px-6 py-4 border-b border-[#112240] bg-[#0D2137]">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-[#8892B0] hover:text-[#64FFDA] transition-colors cursor-pointer border-0 bg-transparent p-1"
          >
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <button
            onClick={() => navigate("/profile")}
            className="flex items-center gap-2.5 cursor-pointer border-0 bg-transparent group"
          >
            <span className="text-sm text-[#8892B0] group-hover:text-[#CCD6F6] transition-colors">
              {user?.name || ""}
            </span>
            <img
              src={user?.picture}
              alt="avatar"
              className="w-9 h-9 rounded-full border-2 border-[#112240] group-hover:border-[#64FFDA] transition-colors object-cover"
            />
          </button>
        </header>

        {/* ── VIEW: SEARCH ── */}
        {view === "search" && (
          <main className="flex-1 flex items-center justify-center p-8">
            <div className="w-full max-w-xl">
              <form onSubmit={handleSearch}>
                <div className="flex items-center bg-[#0D2137] border border-[#112240] hover:border-[#64FFDA]/40 focus-within:border-[#64FFDA] rounded-full px-5 py-3 transition-all duration-200">
                  <input
                    type="text"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder="Masukkan username Instagram..."
                    className="flex-1 bg-transparent text-[#CCD6F6] placeholder-[#8892B0]/50 text-sm outline-none"
                    autoFocus
                    disabled={searching}
                  />
                  <button
                    type="submit"
                    disabled={searching || !searchInput.trim()}
                    className="w-8 h-8 bg-[#64FFDA] hover:bg-[#4DDBBB] rounded-full flex items-center justify-center transition-colors cursor-pointer border-0 flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {searching ? (
                      <div className="w-4 h-4 border-2 border-[#0A192F]/30 border-t-[#0A192F] rounded-full animate-spin" />
                    ) : (
                      <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#0A192F" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                      </svg>
                    )}
                  </button>
                </div>
              </form>

              {searching && (
                <p className="text-center text-[#8892B0] text-sm mt-4 animate-pulse">
                  Sedang menganalisis akun, mohon tunggu...
                </p>
              )}
              {searchError && (
                <p className="text-center text-red-400 text-sm mt-4">{searchError}</p>
              )}
            </div>
          </main>
        )}

        {/* ── VIEW: RESULT ── */}
        {view === "result" && selectedItem && (
          <main className="flex-1 flex items-start justify-center p-8 overflow-y-auto">
            <div className="w-full max-w-2xl bg-[#0D2137] border border-[#112240] rounded-2xl p-8">

              {/* Header */}
              <div className="flex items-center gap-3 mb-5 flex-wrap">
                <h2 className="text-[#E6F1FF] font-black text-xl tracking-tight">
                  @{selectedItem.ig_username}
                </h2>
                <span className="text-[#8892B0] text-sm">—</span>
                <span className={`text-sm font-semibold ${risk.color}`}>
                  {risk.text}
                </span>
              </div>

              <div className="h-px bg-[#112240] mb-5" />

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-[#0A192F] rounded-xl p-4 text-center">
                  <p className="text-2xl font-black text-red-400">{parseFloat(selectedItem.bot_percentage).toFixed(1)}%</p>
                  <p className="text-xs text-[#8892B0] mt-1">Bot</p>
                </div>
                <div className="bg-[#0A192F] rounded-xl p-4 text-center">
                  <p className="text-2xl font-black text-[#64FFDA]">{parseFloat(selectedItem.real_percentage).toFixed(1)}%</p>
                  <p className="text-xs text-[#8892B0] mt-1">Asli</p>
                </div>
                <div className="bg-[#0A192F] rounded-xl p-4 text-center">
                  <p className="text-2xl font-black text-[#CCD6F6]">{selectedItem.total_sample}</p>
                  <p className="text-xs text-[#8892B0] mt-1">Sampel</p>
                </div>
              </div>

              {/* Rekomendasi */}
              <div className="bg-[#0A192F] rounded-xl p-4">
                <p className="text-xs text-[#8892B0] uppercase tracking-widest font-medium mb-2">Rekomendasi</p>
                <p className="text-sm text-[#CCD6F6] leading-relaxed">{selectedItem.recommendation}</p>
              </div>
            </div>
          </main>
        )}
      </div>
    </div>
  );
}
