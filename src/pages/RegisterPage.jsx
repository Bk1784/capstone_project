import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function RegisterPage() {
  const { registerWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleGoogleRegister = async () => {
    setLoading(true);
    try {
      await registerWithGoogle();
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A192F] flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm bg-[#0D2137] border border-[#112240] rounded-2xl p-8">

        <h1 className="text-2xl font-black text-[#E6F1FF] text-center tracking-tight mb-2">
          Register
        </h1>
        <p className="text-[#8892B0] text-sm text-center leading-relaxed mb-7">
          Daftar dengan akun google untuk memulai deteksi fake account instagram
        </p>

        {/* Google Button — icon only with border */}
        <button
          onClick={handleGoogleRegister}
          disabled={loading}
          className="w-full flex items-center justify-center border border-[#64FFDA]/40 hover:border-[#64FFDA] hover:bg-[#64FFDA]/5 rounded-xl py-3.5 transition-all duration-200 cursor-pointer bg-transparent mb-5 group"
        >
          {loading ? (
            <div className="w-6 h-6 border-2 border-[#64FFDA]/30 border-t-[#64FFDA] rounded-full animate-spin" />
          ) : (
            <svg width="24" height="24" viewBox="0 0 48 48">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
            </svg>
          )}
        </button>

        <p className="text-right text-sm">
          <Link to="/login" className="text-[#64FFDA] hover:underline transition-colors">
            sudah punya akun?
          </Link>
        </p>
      </div>

      <div className="mt-5">
        <Link to="/" className="text-[#8892B0] hover:text-[#64FFDA] text-xs transition-colors">
          ← Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}
