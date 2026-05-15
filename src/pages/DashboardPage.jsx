import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const HISTORY_LIST = [
  { id: 1, username: "@baguskur", verdict: "Terindikasi Akun Palsu", isFake: true, time: "2 menit lalu" },
  { id: 2, username: "@risc_432", verdict: "Terindikasi Asli", isFake: false, time: "15 menit lalu" },
  { id: 3, username: "@fuad152", verdict: "Terindikasi Akun Palsu", isFake: true, time: "1 jam lalu" },
  { id: 4, username: "@bella_23", verdict: "Terindikasi Asli", isFake: false, time: "2 jam lalu" },
  { id: 5, username: "@diantang8", verdict: "Terindikasi Akun Palsu", isFake: true, time: "3 jam lalu" },
  { id: 6, username: "@qki220", verdict: "Terindikasi Asli", isFake: false, time: "5 jam lalu" },
];

// Hardcode hasil (nanti dari API)
const MOCK_RESULT = {
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  indicators: [
    "Murni : 96%",
    "Wallace : Palsu",
    "Placeholder untuk indikator lainnya",
    "Banyak menggunakan AI di setiap foto dengan filter tebal",
  ],
};

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // 3 state: "search" | "result"
  const [view, setView] = useState("search");
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchInput, setSearchInput] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    // Simulasi hasil (nanti dari API)
    setSelectedItem({
      username: "@" + searchInput.replace("@", ""),
      verdict: "Terindikasi Akun Palsu",
      isFake: true,
      ...MOCK_RESULT,
    });
    setSearchInput("");
    setView("result");
  };

  const handleSelectHistory = (item) => {
    setSelectedItem({ ...item, ...MOCK_RESULT });
    setView("result");
  };

  const handleCariKembali = () => {
    setView("search");
    setSelectedItem(null);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#0A192F] flex">

      {/* ── SIDEBAR ── */}
      <aside
        className={`${sidebarOpen ? "w-64" : "w-0 overflow-hidden"} flex-shrink-0 bg-[#0D2137] border-r border-[#112240] flex flex-col transition-all duration-300`}
      >
        {/* Cari kembali button */}
        <div className="p-4 border-b border-[#112240]">
          <button
            onClick={handleCariKembali}
            className="text-[#64FFDA] text-sm font-semibold hover:text-[#4DDBBB] transition-colors cursor-pointer border-0 bg-transparent text-left w-full"
          >
            Cari kembali
          </button>
        </div>

        {/* History list */}
        <div className="flex-1 overflow-y-auto py-2">
          {HISTORY_LIST.map((item) => (
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
                selectedItem?.id === item.id && view === "result"
                  ? "text-[#64FFDA]"
                  : "text-[#CCD6F6]"
              }`}>
                {item.username}
              </p>
              <p className="text-xs text-[#8892B0] mt-0.5 truncate">{item.verdict}</p>
              <p className="text-xs text-[#8892B0]/60 mt-0.5">{item.time}</p>
            </button>
          ))}
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
              {user?.username || user?.googleName || "capstone_team2026"}
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
            <form onSubmit={handleSearch} className="w-full max-w-xl">
              <div className="flex items-center bg-[#0D2137] border border-[#112240] hover:border-[#64FFDA]/40 focus-within:border-[#64FFDA] rounded-full px-5 py-3 transition-all duration-200">
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Masukkan username Instagram..."
                  className="flex-1 bg-transparent text-[#CCD6F6] placeholder-[#8892B0]/50 text-sm outline-none"
                  autoFocus
                />
                <button
                  type="submit"
                  className="w-8 h-8 bg-[#64FFDA] hover:bg-[#4DDBBB] rounded-full flex items-center justify-center transition-colors cursor-pointer border-0 flex-shrink-0"
                >
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#0A192F" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                  </svg>
                </button>
              </div>
            </form>
          </main>
        )}

        {/* ── VIEW: RESULT ── */}
        {view === "result" && selectedItem && (
          <main className="flex-1 flex items-start justify-center p-8 overflow-y-auto">
            <div className="w-full max-w-2xl bg-[#0D2137] border border-[#112240] rounded-2xl p-8">
              {/* Header */}
              <div className="flex items-center gap-3 mb-5">
                <h2 className="text-[#E6F1FF] font-black text-xl tracking-tight">
                  {selectedItem.username}
                </h2>
                <span className="text-[#8892B0] text-sm">—</span>
                <span className={`text-sm font-semibold ${selectedItem.isFake ? "text-red-400" : "text-[#64FFDA]"}`}>
                  {selectedItem.verdict}
                </span>
              </div>

              <div className="h-px bg-[#112240] mb-5" />

              <p className="text-[#8892B0] text-sm leading-relaxed mb-6">
                {selectedItem.description}
              </p>

              <ul className="space-y-2">
                {selectedItem.indicators.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-[#CCD6F6]">
                    <span className="text-[#64FFDA] mt-0.5 flex-shrink-0">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </main>
        )}
      </div>
    </div>
  );
}
