import { useEffect } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import useAuthStore from "../store/authStore";
import useUIStore from "../store/uiStore";

function Layout() {
  const token = useAuthStore((state) => state.token);
  const logout = useAuthStore((state) => state.logout);
  const darkMode = useUIStore((state) => state.darkMode);
  const toggleDarkMode = useUIStore((state) => state.toggleDarkMode);

  useEffect(() => {
    const htmlElement = document.documentElement;
    if (darkMode) {
      htmlElement.classList.add("dark");
    } else {
      htmlElement.classList.remove("dark");
    }
  }, [darkMode]);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `font-black text-sm uppercase tracking-widest px-4 py-2 rounded-xl transition-all duration-200 ${
      isActive
        ? "bg-[#FAAB18] text-[#3D0C02]"
        : "text-[#3D0C02] dark:text-[#FFFDF3] hover:bg-[#FEF2D6] dark:hover:bg-[#2B1517]"
    }`;

  return (
    <div className="min-h-screen bg-[#FFFDF3] dark:bg-[#1E0C0E] text-[#3D0C02] dark:text-[#FFFDF3] transition-colors duration-300">
      {/* Shared Navigation */}
      <header className="bg-[#FFFDF3] dark:bg-[#1E0C0E] border-b border-[#3D0C02]/10 dark:border-[#FAAB18]/20 sticky top-0 z-50 backdrop-blur-md bg-opacity-90 dark:bg-opacity-90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center flex-wrap gap-4">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 bg-[#FAAB18] rounded-2xl flex items-center justify-center shadow-md text-[#3D0C02] shrink-0 transform group-hover:scale-105 transition-transform">
                <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
                  <path d="M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3zm0 5.5a2.5 2.5 0 0 1 2.5 2.5c0 1.38-1.12 2.5-2.5 2.5S9.5 12.38 9.5 11s1.12-2.5 2.5-2.5z" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-black text-[#3D0C02] dark:text-[#FAAB18] tracking-wider uppercase">
                  PAWHOME
                </h1>
                <p className="text-[#3D0C02]/70 dark:text-[#FFFDF3]/70 text-xs font-bold">
                  Give this fluffy paw a new home.
                </p>
              </div>
            </Link>

            {/* Nav Links */}
            <nav className="flex items-center gap-1 flex-wrap">
              <NavLink to="/" end className={navLinkClass}>
                🏠 Home
              </NavLink>
              <NavLink to="/pets" className={navLinkClass}>
                🐾 Pets
              </NavLink>
              <NavLink to="/adopters" className={navLinkClass}>
                👤 Adopters
              </NavLink>
              <NavLink to="/requests" className={navLinkClass}>
                📋 Requests
              </NavLink>

              {/* Dark Mode Toggle */}
              <button
                id="dark-mode-toggle"
                onClick={toggleDarkMode}
                className="bg-[#FEF2D6] hover:bg-[#FEEAA1] dark:bg-[#2B1517] dark:hover:bg-[#3D1D20] text-[#3D0C02] dark:text-[#FAAB18] border-2 border-[#FAAB18]/50 px-4 py-2 rounded-xl font-black text-sm transition-all duration-200 flex items-center gap-1.5 shadow-sm cursor-pointer"
                title="Toggle Dark/Light Mode"
              >
                {darkMode ? "☀️ Light" : "🌙 Dark"}
              </button>

              {token ? (
                <button
                  id="logout-btn"
                  onClick={logout}
                  className="ml-1 bg-[#FA799F] hover:bg-[#f5668f] text-white font-black text-sm uppercase tracking-widest px-4 py-2 rounded-xl transition-all duration-200 cursor-pointer border-2 border-[#FA799F]"
                >
                  🔓 Logout
                </button>
              ) : (
                <NavLink
                  to="/login"
                  className="ml-1 bg-[#FAAB18] hover:bg-[#e5990b] text-[#3D0C02] font-black text-sm uppercase tracking-widest px-4 py-2 rounded-xl transition-all duration-200 border-2 border-[#3D0C02]/20"
                >
                  🔑 Login
                </NavLink>
              )}
            </nav>
          </div>
        </div>
      </header>

      {/* Page Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-[#3D0C02]/10 dark:border-[#FAAB18]/20 mt-12 py-6 text-center">
        <p className="text-[#3D0C02]/60 dark:text-[#FFFDF3]/60 text-sm font-bold">
          🐾 PAWHOME — Connecting paws with loving homes.
        </p>
      </footer>
    </div>
  );
}

export default Layout;
