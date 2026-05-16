import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const BASE_URL = "https://inspector-api-five.vercel.app/api";

export default function CallbackPage() {
  const { handleOAuthCallback } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  useEffect(() => {
    const processCallback = async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const accessToken = params.get("token");
        const refreshToken = params.get("refresh");

        if (!accessToken || !refreshToken) {
          setError("Login gagal, silakan coba lagi.");
          return;
        }

        const res = await fetch(`${BASE_URL}/auth/me`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        const data = await res.json();

        if (data.status === "success") {
          handleOAuthCallback(accessToken, refreshToken, data.data);
          navigate("/dashboard", { replace: true });
        } else {
          setError("Login gagal, silakan coba lagi.");
        }
      } catch {
        setError("Terjadi kesalahan saat proses login.");
      }
    };

    processCallback();
  }, []);

  if (error) {
    return (
      <div className="min-h-screen bg-[#0A192F] flex flex-col items-center justify-center gap-4">
        <p className="text-red-400 text-sm">{error}</p>
        <button
          onClick={() => navigate("/login")}
          className="text-[#64FFDA] text-sm hover:underline cursor-pointer border-0 bg-transparent"
        >
          Kembali ke Login
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A192F] flex flex-col items-center justify-center gap-4">
      <div className="w-8 h-8 border-2 border-[#112240] border-t-[#64FFDA] rounded-full animate-spin" />
      <p className="text-[#8892B0] text-sm">Memproses login...</p>
    </div>
  );
}
