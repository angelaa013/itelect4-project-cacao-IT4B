import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

function HomePage() {
  const navigate = useNavigate();
  const token = useAuthStore((state) => state.token);

  const handleBrowsePets = () => {
    navigate("/pets");
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="text-center py-16 sm:py-24">
        <div className="inline-block mb-6 animate-bounce">
          <div className="w-24 h-24 bg-[#FAAB18] rounded-3xl flex items-center justify-center shadow-xl mx-auto">
            <svg className="w-14 h-14 fill-[#3D0C02]" viewBox="0 0 24 24">
              <path d="M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3zm0 5.5a2.5 2.5 0 0 1 2.5 2.5c0 1.38-1.12 2.5-2.5 2.5S9.5 12.38 9.5 11s1.12-2.5 2.5-2.5z" />
            </svg>
          </div>
        </div>

        <h1 className="text-5xl sm:text-7xl font-black text-[#3D0C02] dark:text-[#FAAB18] tracking-tight uppercase mb-4">
          PAWHOME
        </h1>
        <p className="text-xl sm:text-2xl text-[#3D0C02]/70 dark:text-[#FFFDF3]/70 font-bold max-w-2xl mx-auto mb-2">
          Give this fluffy paw a new home. 🐾
        </p>
        <p className="text-base text-[#3D0C02]/50 dark:text-[#FFFDF3]/50 max-w-xl mx-auto mb-10 font-semibold">
          Connect with lovable pets waiting for a forever family. Browse
          available animals, submit adoption requests, and change a life today.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            id="browse-pets-btn"
            onClick={handleBrowsePets}
            className="bg-[#FAAB18] hover:bg-[#e5990b] text-[#3D0C02] font-black py-4 px-10 rounded-2xl text-lg shadow-md hover:shadow-xl transition-all duration-200 transform hover:scale-[1.03] active:scale-95 border-2 border-[#3D0C02]/20 cursor-pointer"
          >
            🐶 Browse Pets
          </button>

          {!token && (
            <button
              id="home-login-btn"
              onClick={() => navigate("/login")}
              className="bg-transparent hover:bg-[#FEF2D6] dark:hover:bg-[#2B1517] text-[#3D0C02] dark:text-[#FAAB18] font-black py-4 px-10 rounded-2xl text-lg border-2 border-[#FAAB18] transition-all duration-200 transform hover:scale-[1.03] active:scale-95 cursor-pointer"
            >
              🔑 Login to Adopt
            </button>
          )}
        </div>
      </section>

      {/* Feature Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
        {[
          {
            emoji: "🐕",
            title: "Find Your Match",
            desc: "Browse dogs, cats, and more looking for a loving home.",
            color: "border-[#FAAB18] bg-[#FEF2D6] dark:bg-[#2B1517]",
          },
          {
            emoji: "❤️",
            title: "Easy Adoption",
            desc: "Submit an adoption request in seconds and track its status.",
            color: "border-[#FA799F] bg-[#FDE8F0] dark:bg-[#2B1517]",
          },
          {
            emoji: "🏠",
            title: "Safe & Vetted",
            desc: "Every pet is health-checked. Every adopter is verified.",
            color: "border-[#FAAB18] bg-[#FFFDF3] dark:bg-[#2B1517]",
          },
        ].map((card) => (
          <div
            key={card.title}
            className={`rounded-3xl border-2 ${card.color} p-8 text-center shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}
          >
            <span className="text-5xl block mb-4">{card.emoji}</span>
            <h2 className="text-xl font-black text-[#3D0C02] dark:text-[#FAAB18] mb-2">
              {card.title}
            </h2>
            <p className="text-[#3D0C02]/70 dark:text-[#FFFDF3]/70 font-semibold text-sm">
              {card.desc}
            </p>
          </div>
        ))}
      </section>
    </div>
  );
}

export default HomePage;
