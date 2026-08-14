import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

function LoginPage() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setError("");

    // Simple mock auth – any non-empty credentials work
    if (!username.trim() || !password.trim()) {
      setError("Please enter both username and password.");
      return;
    }

    // Store token and redirect
    login(`mock-token-${Date.now()}`);
    navigate("/", { replace: true });
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white dark:bg-[#2B1517] rounded-3xl shadow-xl overflow-hidden border-2 border-[#3D0C02]/10 dark:border-[#FAAB18]/30">
          {/* Header */}
          <div className="bg-[#FAAB18] p-8 text-center">
            <div className="w-16 h-16 bg-[#FFFDF3] rounded-2xl flex items-center justify-center shadow-md mx-auto mb-3">
              <svg className="w-9 h-9 fill-[#3D0C02]" viewBox="0 0 24 24">
                <path d="M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3zm0 5.5a2.5 2.5 0 0 1 2.5 2.5c0 1.38-1.12 2.5-2.5 2.5S9.5 12.38 9.5 11s1.12-2.5 2.5-2.5z" />
              </svg>
            </div>
            <h1 className="text-3xl font-black text-[#3D0C02] uppercase tracking-tight">
              Welcome Back
            </h1>
            <p className="text-[#3D0C02]/70 font-bold text-sm mt-1">
              Sign in to PAWHOME to continue
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-5">
            {error && (
              <div className="bg-[#FDE8F0] dark:bg-[#1E0C0E] border-2 border-[#FA799F] rounded-2xl p-4 text-center">
                <p className="text-[#3D0C02] dark:text-[#FA799F] font-black text-sm">
                  ⚠️ {error}
                </p>
              </div>
            )}

            <div>
              <label
                htmlFor="login-username"
                className="block text-xs font-black uppercase tracking-widest text-[#3D0C02] dark:text-[#FAAB18] mb-2"
              >
                Username
              </label>
              <input
                id="login-username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                className="w-full px-5 py-3.5 bg-[#FFFDF3] dark:bg-[#1E0C0E] border-2 border-[#3D0C02]/20 dark:border-[#FAAB18]/40 text-[#3D0C02] dark:text-[#FFFDF3] placeholder-[#3D0C02]/50 dark:placeholder-[#FFFDF3]/40 rounded-2xl focus:outline-none focus:border-[#FAAB18] transition-colors font-extrabold"
              />
            </div>

            <div>
              <label
                htmlFor="login-password"
                className="block text-xs font-black uppercase tracking-widest text-[#3D0C02] dark:text-[#FAAB18] mb-2"
              >
                Password
              </label>
              <input
                id="login-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-5 py-3.5 bg-[#FFFDF3] dark:bg-[#1E0C0E] border-2 border-[#3D0C02]/20 dark:border-[#FAAB18]/40 text-[#3D0C02] dark:text-[#FFFDF3] placeholder-[#3D0C02]/50 dark:placeholder-[#FFFDF3]/40 rounded-2xl focus:outline-none focus:border-[#FAAB18] transition-colors font-extrabold"
              />
            </div>

            <button
              id="login-submit-btn"
              type="submit"
              className="w-full bg-[#FAAB18] hover:bg-[#e5990b] text-[#3D0C02] font-black py-4 px-4 rounded-2xl transition-all duration-200 transform hover:scale-[1.02] active:scale-95 shadow-sm hover:shadow-md text-base border-2 border-[#3D0C02]/20 cursor-pointer"
            >
              🔑 Sign In to PAWHOME
            </button>

            <p className="text-center text-[#3D0C02]/50 dark:text-[#FFFDF3]/50 text-xs font-semibold">
              Use any username & password to log in (mock auth)
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
