import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0A192F] text-[#CCD6F6]">

      {/* ── NAVBAR ── */}
      <nav className="flex items-center justify-between px-10 py-6 border-b border-[#112240]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 border-2 border-[#64FFDA] rounded-lg flex items-center justify-center">
            <div className="w-3 h-3 bg-[#64FFDA] rounded-sm" />
          </div>
          <span className="font-bold text-base tracking-tight text-[#CCD6F6]">FakeRadar</span>
        </div>
        <div className="flex items-center gap-6">
          <button
            onClick={() => navigate("/login")}
            className="text-sm text-[#8892B0] hover:text-[#64FFDA] transition-colors bg-transparent border-0 cursor-pointer"
          >
            Masuk
          </button>
          <button
            onClick={() => navigate("/register")}
            className="text-sm border border-[#64FFDA] text-[#64FFDA] hover:bg-[#64FFDA]/10 px-5 py-2.5 rounded-lg transition-all cursor-pointer bg-transparent font-medium"
          >
            Mulai Gratis →
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="max-w-6xl mx-auto px-10 pt-24 pb-16">

        {/* Judul besar left-aligned */}
        <div className="max-w-3xl mb-10">
          <h1 className="text-6xl xl:text-7xl font-black tracking-tighter leading-[1.05] text-[#E6F1FF]">
            Tahu mana<br />
            yang asli,<br />
            mana yang{" "}
            <span className="text-[#64FFDA]">palsu.</span>
          </h1>
        </div>

        {/* Desc + CTA horizontal */}
        <div className="flex items-end justify-between gap-16 pb-14 border-b border-[#112240]">
          <p className="text-[#8892B0] text-lg leading-relaxed max-w-lg">
            Masukkan username Instagram. FakeRadar menganalisis ratusan sinyal
            dan memberikan skor kepalsuan akun secara instan — dirancang untuk
            profesional yang butuh jawaban cepat dan akurat.
          </p>
          <div className="flex-shrink-0 text-right">
            <button
              onClick={() => navigate("/register")}
              className="bg-[#64FFDA] text-[#0A192F] font-black px-8 py-4 rounded-xl hover:bg-[#4DDBBB] transition-all hover:scale-105 hover:shadow-xl hover:shadow-[#64FFDA]/20 cursor-pointer border-0 block mb-2 text-base"
            >
              Daftar dengan Google →
            </button>
            <p className="text-xs text-[#8892B0]">Gratis. Tanpa kartu kredit.</p>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="border-t border-[#112240] bg-[#0D2137]">
        <div className="max-w-6xl mx-auto px-10 py-20">
          <div className="flex items-start justify-between gap-16">

            {/* Steps */}
            <div className="flex-1 divide-y divide-[#112240]">
              {[
                {
                  num: "01",
                  title: "Masukkan username",
                  desc: "Cukup ketik username Instagram yang ingin kamu periksa. Tidak perlu link, tidak perlu login Instagram.",
                },
                {
                  num: "02",
                  title: "AI menganalisis",
                  desc: "Sistem kami menganalisis follower ratio, pola posting, usia akun, engagement rate, dan 15+ sinyal lainnya secara bersamaan.",
                },
                {
                  num: "03",
                  title: "Dapatkan hasilnya",
                  desc: "Skor kepalsuan 0–100 beserta breakdown detail setiap indikator. Jelas, langsung, tidak berbelit.",
                },
              ].map((s) => (
                <div key={s.num} className="flex items-start gap-10 py-8 group">
                  <span className="text-xs font-mono font-bold text-[#64FFDA]/40 group-hover:text-[#64FFDA] transition-colors w-6 flex-shrink-0 pt-1">{s.num}</span>
                  <div>
                    <h3 className="font-bold text-[#E6F1FF] text-lg mb-2 group-hover:text-[#64FFDA] transition-colors">{s.title}</h3>
                    <p className="text-[#8892B0] text-sm leading-relaxed max-w-xl">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── COCOK UNTUK ── */}
      <section className="border-t border-[#112240]">
        <div className="max-w-6xl mx-auto px-10 py-20">
          <div className="flex items-start justify-between gap-16">
            <div className="flex-1 grid grid-cols-2 gap-5">
              {[
                { title: "Tim Marketing", desc: "Verifikasi influencer sebelum kolaborasi. Hindari bayar ke akun bot." },
                { title: "HR & Rekrutmen", desc: "Cek profil kandidat yang mencurigakan sebelum proses selanjutnya." },
                { title: "Brand Safety", desc: "Pastikan mitra dan follower brand kamu adalah akun nyata." },
                { title: "Peneliti Digital", desc: "Data sinyal lengkap untuk analisis ekosistem media sosial." },
              ].map((c) => (
                <div
                  key={c.title}
                  className="bg-[#0D2137] border border-[#112240] hover:border-[#64FFDA]/40 rounded-2xl p-6 transition-all duration-200 group"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#64FFDA]" />
                    <h4 className="font-bold text-sm text-[#E6F1FF] group-hover:text-[#64FFDA] transition-colors">{c.title}</h4>
                  </div>
                  <p className="text-xs text-[#8892B0] leading-relaxed">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="border-t border-[#112240] bg-[#0D2137]">
        <div className="max-w-6xl mx-auto px-10 py-20 flex items-center justify-between gap-12">
          <div>
            <h2 className="text-4xl font-black text-[#E6F1FF] tracking-tighter leading-tight mb-3">
              Coba sekarang.<br />Gratis.
            </h2>
            <p className="text-[#8892B0] text-sm">Tidak perlu setup. Langsung pakai dalam 30 detik.</p>
          </div>
          <button
            onClick={() => navigate("/register")}
            className="flex-shrink-0 bg-[#64FFDA] text-[#0A192F] font-black px-8 py-4 rounded-xl hover:bg-[#4DDBBB] transition-all hover:scale-105 hover:shadow-2xl hover:shadow-[#64FFDA]/20 cursor-pointer border-0 text-base"
          >
            Daftar dengan Google →
          </button>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-[#112240] text-center py-6 text-[#8892B0] text-xs font-mono">
        © 2025 FakeRadar — Built for digital safety.
      </footer>
    </div>
  );
}
