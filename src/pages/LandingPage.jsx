import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white text-foreground overflow-hidden">

      {/* NAVBAR */}
      <nav className="flex items-center justify-between px-8 py-4 border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center shadow-sm">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={3}>
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
          </div>
          <span className="font-bold text-sm tracking-tight">FakeRadar</span>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" onClick={() => navigate("/login")}>Login</Button>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative px-8 pt-20 pb-24 max-w-5xl mx-auto">
        {/* Background blobs */}
        <div className="absolute top-10 right-0 w-80 h-80 bg-red-100 rounded-full blur-3xl opacity-50 pointer-events-none" />
        <div className="absolute top-32 right-24 w-48 h-48 bg-green-100 rounded-full blur-2xl opacity-60 pointer-events-none" />

        <div className="relative">
          <Badge variant="secondary" className="mb-5 bg-red-50 text-red-500 border-red-200 hover:bg-red-50">
            Deteksi Akun Instagram Palsu
          </Badge>
          <h1 className="text-6xl font-bold tracking-tight leading-[1.08] mb-5 max-w-2xl">
            Tahu mana<br />
            yang <span className="text-red-500">asli</span>,<br />
            mana yang <span className="relative inline-block">
              palsu
              <span className="absolute bottom-1 left-0 w-full h-2 bg-green-200 -z-10 rounded" />
            </span>.
          </h1>
          <p className="text-muted-foreground text-lg max-w-md mb-8 leading-relaxed">
            Masukkan username Instagram. FakeRadar menganalisis ratusan sinyal dan memberikan skor kepalsuan akun secara instan.
          </p>
          <div className="flex items-center gap-3">
            <Button size="lg" onClick={() => navigate("/register")} className="shadow-md">
              Mulai Gratis →
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate("/login")}>
              Masuk
            </Button>
          </div>
        </div>

        {/* Floating preview card */}
        <div className="relative mt-14 flex justify-center">
          <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl border p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-red-400" />
              <div className="w-2 h-2 rounded-full bg-yellow-400" />
              <div className="w-2 h-2 rounded-full bg-green-400" />
              <span className="ml-2 text-xs text-muted-foreground font-mono">fakradar.app/dashboard</span>
            </div>
            <div className="flex gap-4">
              {/* Mini sidebar */}
              <div className="w-36 border-r pr-4">
                <div className="text-xs text-muted-foreground mb-3 font-medium">Riwayat</div>
                {[
                  { name: "@your_account", risk: "Risiko Sedang", color: "text-orange-500" },
                  { name: "@influencer_x", risk: "Risiko Aman", color: "text-green-500" },
                  { name: "@brand.id", risk: "Risiko Bot", color: "text-red-500" },
                ].map((item) => (
                  <div key={item.name} className="mb-2">
                    <p className={`text-xs font-semibold ${item.color}`}>{item.name}</p>
                    <p className={`text-xs ${item.color} opacity-70`}>{item.risk}</p>
                  </div>
                ))}
              </div>
              {/* Mini result */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-sm font-bold">@your_account</span>
                  <span className="text-xs bg-orange-50 text-orange-500 border border-orange-200 px-2 py-0.5 rounded-full font-medium">Risiko Sedang</span>
                </div>
                <div className="grid grid-cols-3 gap-2 mb-2">
                  <div className="bg-red-50 rounded-lg p-2 text-center">
                    <p className="text-lg font-bold text-red-500">20%</p>
                    <p className="text-xs text-red-400">Bot</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-2 text-center">
                    <p className="text-lg font-bold text-green-500">80%</p>
                    <p className="text-xs text-green-400">Asli</p>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-2 text-center">
                    <p className="text-lg font-bold">50</p>
                    <p className="text-xs text-muted-foreground">Sampel</p>
                  </div>
                </div>
                <div className="bg-muted/30 rounded-lg p-2">
                  <p className="text-xs text-muted-foreground">Wajar. Terdeteksi sekitar 20% pengikut bot, masih dalam batas normal industri...</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-muted/30 border-y px-8 py-16">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-10 text-center">Cara Kerja</p>
          <div className="grid grid-cols-3 gap-5">
            {[
              { num: "01", title: "Masukkan Username", desc: "Ketik username Instagram tanpa @. Tidak perlu login atau link apapun.", accent: "bg-red-50 border-red-100", numColor: "text-red-400" },
              { num: "02", title: "AI Menganalisis", desc: "Sistem menganalisis follower ratio, pola posting, engagement rate, dan 15+ sinyal lainnya.", accent: "bg-orange-50 border-orange-100", numColor: "text-orange-400" },
              { num: "03", title: "Dapatkan Hasilnya", desc: "Skor kepalsuan beserta rekomendasi detail. Jelas, langsung, tidak berbelit.", accent: "bg-green-50 border-green-100", numColor: "text-green-500" },
            ].map((s) => (
              <Card key={s.num} className={`${s.accent} border`}>
                <CardContent className="py-5">
                  <span className={`text-2xl font-black ${s.numColor} opacity-60`}>{s.num}</span>
                  <h3 className="font-semibold text-sm mt-2 mb-1">{s.title}</h3>
                  <p className="text-muted-foreground text-xs leading-relaxed">{s.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* USE CASES */}
      <section className="px-8 py-16 max-w-5xl mx-auto">
        <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-10 text-center">Cocok Untuk</p>
        <div className="grid grid-cols-2 gap-4">
          {[
            { title: "Tim Marketing", desc: "Verifikasi influencer sebelum kolaborasi. Hindari bayar ke akun bot.", bg: "bg-blue-50 border-blue-100" },
            { title: "HR & Rekrutmen", desc: "Cek profil kandidat yang mencurigakan sebelum proses selanjutnya.", bg: "bg-purple-50 border-purple-100" },
            { title: "Brand Safety", desc: "Pastikan mitra dan follower brand kamu adalah akun nyata.", bg: "bg-green-50 border-green-100" },
            { title: "Peneliti Digital", desc: "Data sinyal lengkap untuk analisis ekosistem media sosial.", bg: "bg-orange-50 border-orange-100" },
          ].map((c) => (
            <Card key={c.title} className={`${c.bg} border hover:shadow-md transition-shadow`}>
              <CardContent className="py-5 flex gap-3 items-start">
                <span className="text-2xl">{c.icon}</span>
                <div>
                  <h4 className="font-semibold text-sm mb-1">{c.title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{c.desc}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative bg-primary text-primary-foreground px-8 py-16 overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/4" />
        <div className="max-w-5xl mx-auto text-center relative">
          <h2 className="text-3xl font-bold tracking-tight mb-2">Coba sekarang. Gratis.</h2>
          <p className="text-primary-foreground/70 text-sm mb-6">Tidak perlu setup. Langsung pakai dalam 30 detik.</p>
          <Button size="lg" variant="secondary" onClick={() => navigate("/register")} className="shadow-lg">
            Daftar dengan Google →
          </Button>
        </div>
      </section>

      <footer className="border-t text-center py-4 text-muted-foreground text-xs bg-white">
        © 2025 FakeRadar — Built for digital safety.
      </footer>
    </div>
  );
}
